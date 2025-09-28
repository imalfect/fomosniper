import { appConfig } from "../appConfig";
import { createWalletClient, http, webSocket } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { kasplexMainnetChain } from "./chain";

export const walletClient = createWalletClient({
  chain: kasplexMainnetChain,
  transport: http(appConfig.connection.rpc.url),
  account: privateKeyToAccount(appConfig.wallet.privateKey as `0x${string}`),
});
