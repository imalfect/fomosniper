import { Logger } from "../logger/logger";
import { rpcClient, wsClient } from "../network/clients";
const log = new Logger("WaitBlocks");
// this is an alternative solution to the "hacky-looking" while(true) loop with contract simulations
// basically, you can wait one block and then send the transaction, although this "clean" solution imposes more latency

// UNUSED
export default async function waitBlocks(
  blocks: bigint,
  initialBlock?: bigint
) {
  const currentBlock = initialBlock
    ? initialBlock
    : await rpcClient.getBlockNumber();
  return new Promise<void>((resolve) => {
    const unwatch = wsClient.watchBlockNumber({
      emitOnBegin: true,
      onBlockNumber: (blockNumber) => {
        log.info(`Δ: ${blockNumber - currentBlock} / ${blocks} blocks`);
        if (blockNumber >= currentBlock + blocks) {
          resolve();
          unwatch();
        }
      },
    });
  });
}
