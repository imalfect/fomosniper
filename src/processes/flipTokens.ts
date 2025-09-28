// very very very simple, quickly shitcoded function to "flip" tokens.
import { erc20Abi, getContract, type Address } from "viem";
import kaspacomLfgBondingCurve from "../types/abis/kaspacom-lfg-bonding-curve";
import { walletClient } from "../network/wallet";
import { rpcClient } from "../network/clients";
import { appConfig } from "../appConfig";

export async function flipTokens(tokenAddress: Address, bondingCurve: Address) {
  const token = await getContract({
    address: tokenAddress,
    abi: erc20Abi,
    client: { public: rpcClient, wallet: walletClient },
  });
  const curve = await getContract({
    address: bondingCurve,
    abi: kaspacomLfgBondingCurve,
    client: { public: rpcClient, wallet: walletClient },
  });
  const balance = await token.read.balanceOf([walletClient.account.address]);
  console.log(`Dumping ${balance} tokens...`);
  const approval = await walletClient.writeContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [bondingCurve, balance],
  });
  console.log(`Approval tx sent: ${approval}`);
  const receipt = await rpcClient.waitForTransactionReceipt({
    hash: approval,
  });
  if (receipt.status !== "success") {
    console.error("Approval failed!");
    return;
  }
  console.log("Approval successful, proceeding to dump...");
  const baseGasFee = await rpcClient.getGasPrice();
  const gasBribeBps = BigInt(appConfig.bot.gasBribeBps);
  const maxPriorityFeePerGas = (baseGasFee * gasBribeBps) / 10_000n;
  while (true) {
    const sellApproximate = await curve.read
      .previewSellTokens([balance])
      .catch((e) => {
        console.error("Error when estimating sell:", e);
        return null;
      });
    if (!sellApproximate) {
      continue;
    }
    if (
      sellApproximate >
      (BigInt(appConfig.bot.purchaseAmount) * 105n) / 100n
    ) {
      const sell = await walletClient.writeContract({
        address: bondingCurve,
        abi: kaspacomLfgBondingCurve,
        functionName: "sellTokens",
        args: [
          balance,
          (sellApproximate * (10_000n - BigInt(appConfig.bot.slippageBps))) /
            10_000n,
        ],
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        maxFeePerGas: baseGasFee + maxPriorityFeePerGas,
      });
      console.log(`Sell tx sent: ${sell}`);
      const sellReceipt = await rpcClient.waitForTransactionReceipt({
        hash: sell,
      });
      if (sellReceipt.status !== "success") {
        console.error("Sell failed!");
        break;
      }
      console.log("Sell successful, exiting.");
      break;
    }
  }
}
