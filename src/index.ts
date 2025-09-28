import { rpcClient, wsClient } from "./network/clients";
import { Logger } from "./logger/logger";
import { BigMath } from "./util/bigMath";
import { watchBondingSystemCreated } from "./watch/bondingCurveCreated";
import { appConfig } from "./appConfig";
import { formatUnits } from "viem/utils";

const log = new Logger("Main");

log.info("Starting up...");

console.table({
  purchaseAmount: formatUnits(BigInt(appConfig.bot.purchaseAmount), 18),
  slippagePercent: `${Number(appConfig.bot.slippageBps) / 100} %`,
  gasBribePercent: `${Number(appConfig.bot.gasBribeBps) / 100} %`,
  lfgFactory: appConfig.lfg.factoryAddress,
  rpcUrl: appConfig.connection.rpc.url,
  wsUrl: appConfig.connection.ws.url,
  network: `${appConfig.connection.network.name} (chainId: ${appConfig.connection.network.chainId})`,
});

async function main() {
  const rpcBlockNumber = await rpcClient.getBlockNumber();
  const wsBlockNumber = await wsClient.getBlockNumber();

  if (BigMath.abs(rpcBlockNumber - wsBlockNumber) > 2) {
    log.warn(
      "Block number discrepancy possible! Bigger differences could result in increased latency"
    );
    log.info(`RPC Block Number: ${rpcBlockNumber}`);
    log.info(`WS Block Number: ${wsBlockNumber}`);
  } else {
    log.success("<c_green>OK</c_green>: RPC/WS in sync with each other");
  }

  await watchBondingSystemCreated();
}

main();
