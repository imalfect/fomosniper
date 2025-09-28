import { formatUnits } from "viem";

export default function printPriceEstimationTable(
  estimation: bigint,
  spend: bigint,
  tokenSymbol: string,
  bondingCurveAddress: `0x${string}`
) {
  console.table({
    estimation: `${formatUnits(estimation, 18)} ${tokenSymbol}`,
    spend: `${formatUnits(spend, 18)} KAS`,
    tokensPerKAS: `${formatUnits(
      (estimation * 1000n) / spend,
      18
    )} ${tokenSymbol}/KAS`,
    bondingCurve: bondingCurveAddress,
  });
}
