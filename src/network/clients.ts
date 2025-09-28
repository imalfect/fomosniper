import { appConfig } from "../appConfig";
import { createPublicClient, http, webSocket } from "viem";
import { kasplexMainnetChain } from "./chain";

const connectionConfig = appConfig.connection;

export const rpcClient = createPublicClient({
  chain: kasplexMainnetChain,
  batch: {
    multicall: {
      deployless: true,
    },
  },
  transport: http(connectionConfig.rpc.url),
});

export const wsClient = createPublicClient({
  chain: kasplexMainnetChain,
  transport: webSocket(connectionConfig.ws.url),
});
