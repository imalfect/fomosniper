import { defineChain } from "viem";
import { appConfig } from "../appConfig";
export const kasplexMainnetChain = defineChain({
  id: appConfig.connection.network.chainId,
  name: appConfig.connection.network.name,
  nativeCurrency: appConfig.connection.network.nativeCurrency,
  rpcUrls: {
    default: {
      http: [appConfig.connection.rpc.url],
      webSocket: [appConfig.connection.ws.url],
    },
  },
});
