import { formatUnits, getContract } from "viem";
import { appConfig } from "../appConfig";
import { Logger } from "../logger/logger";
import { rpcClient, wsClient } from "../network/clients";
import kaspacomLfgFactory from "../types/abis/kaspacom-lfg-factory";
import printTokenDetailsTable from "../util/printTokenDetailsTable";
import { walletClient } from "../network/wallet";
import kaspacomLfgBondingCurve from "../types/abis/kaspacom-lfg-bonding-curve";
import printPurchaseEstimationTable from "../util/printPurchaseEstimationTable";
import printTransactionRequest from "../util/printTransactionRequest";
import { randomizeAmount } from "../util/randomizeAmount";
const logger = new Logger("LFGWatcher");
export async function watchBondingSystemCreated() {
  logger.info("Listening to BondingSystemCreated events... ");
  wsClient.watchContractEvent({
    address: appConfig.lfg.factoryAddress,
    abi: kaspacomLfgFactory,
    onLogs: async (logs) => {
      for (const eventLog of logs) {
        if (eventLog.eventName !== "BondingSystemCreated") {
          // eventName filter does not work for some reason, hacky solution ahead!
          return;
        }

        const {
          token,
          bondingCurve: bondingCurveAddress,
          tokenDetails: tokenDetailsString,
          totalSupply,
          devPurchaseETH,
          isHypedLaunch,
        } = eventLog.args;

        if (
          !token ||
          !bondingCurveAddress ||
          !tokenDetailsString ||
          !totalSupply ||
          devPurchaseETH === undefined ||
          isHypedLaunch === undefined
        ) {
          logger.warn("Invalid event log, did LFG change?");
          continue;
        }

        const tokenDetails = JSON.parse(tokenDetailsString);
        const purchaseAmount = randomizeAmount(
          BigInt(appConfig.bot.purchaseAmount)
        );

        logger.info(
          `New bonding curve created! Token: <c_bold>${token}</c_bold>, Bonding Curve: <c_bold>${bondingCurveAddress}</c_bold>`
        );

        const table = {
          symbol: tokenDetails.symbol,
          name: tokenDetails.name,
          devPurchaseKAS: devPurchaseETH,
          isHypedLaunch: isHypedLaunch,
          totalSupply: formatUnits(totalSupply, 18),
        };
        printTokenDetailsTable(table);

        const bondingCurve = getContract({
          address: bondingCurveAddress,
          abi: kaspacomLfgBondingCurve,
          client: { public: rpcClient, wallet: walletClient },
        });

        const estimation = await bondingCurve.read.previewBuyTokens([
          purchaseAmount,
        ]);

        printPurchaseEstimationTable(
          estimation,
          purchaseAmount,
          tokenDetails.symbol,
          bondingCurveAddress
        );

        // could use better EIP-1559 logic here
        const baseGasFee = await rpcClient.getGasPrice();
        const gasBribeBps = BigInt(appConfig.bot.gasBribeBps);
        const maxPriorityFeePerGas = (baseGasFee * gasBribeBps) / 10_000n;
        let purchase = null;

        // this is the "bypass" for the sniper blocking system for lfg (read doc)
        while (true) {
          purchase = await rpcClient
            .simulateContract({
              account: walletClient.account,
              address: bondingCurveAddress,
              abi: kaspacomLfgBondingCurve,
              functionName: "buyTokens",
              args: [
                (estimation * (10_000n - BigInt(appConfig.bot.slippageBps))) /
                  10_000n,
              ],
              value: purchaseAmount,
              maxPriorityFeePerGas: maxPriorityFeePerGas,
              maxFeePerGas: baseGasFee + maxPriorityFeePerGas,
            })
            .catch(() => {
              logger.warn("Cannot send tx yet.");
              return null;
            });
          if (purchase) {
            break;
          }
        }

        // buy the tokens
        const tx = await walletClient.writeContract(purchase!.request);

        logger.info(`Purchase transaction sent: <c_bold>${tx}</c_bold>`);

        const receipt = await rpcClient
          .waitForTransactionReceipt({
            hash: tx,
          })
          .catch((e) => {
            logger.error(e);
            return { status: "error" } as const;
          });
        if (receipt.status === "error") {
          logger.error("Transaction failed!");
          return;
        }
        if (receipt.status === "success") {
          printTransactionRequest(receipt);
          logger.info(
            `Purchase transaction confirmed! At hash <c_bold>${tx}</c_bold>`
          );
          logger.success(
            "<c_green><c_bold>Purchase complete!</c_bold></c_green>"
          );
          // NOTE: uncomment to enable the "flipping" feature
          // it's not finished fully, therefore it is disabled by default and cannot be enabled through config
          // file: src/processes/flipTokens.ts
          // await flipTokens(token, bondingCurveAddress);
        } else {
          logger.error(`Purchase transaction failed!`);
        }
      }
    },
  });

  // keep alive
  const p = new Promise<void>(() => {});
  await p;
}
