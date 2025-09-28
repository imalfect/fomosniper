import type { Address } from "viem";

interface Lfg {
  factoryAddress: Address;
}
interface Network {
  name: string;
  chainId: number;
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
}
interface ConnectionConfig {
  rpc: {
    url: string;
  };
  ws: {
    url: string;
  };
  network: Network;
}
interface WalletConfig {
  privateKey: string;
}

interface BotConfig {
  purchaseAmount: string; // string because number would overflow and JSON does not support bigint
  slippageBps: number;
  gasBribeBps: number;
}

export interface Config {
  lfg: Lfg;
  connection: ConnectionConfig;
  wallet: WalletConfig;
  bot: BotConfig;
}
