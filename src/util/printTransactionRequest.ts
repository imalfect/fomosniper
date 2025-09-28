import { formatUnits, type TransactionReceipt } from "viem";

export default function printTransactionRequest(request: TransactionReceipt) {
  console.table({
    address: request.to,
    eGasPrice: request.effectiveGasPrice
      ? formatUnits(request.effectiveGasPrice, 9) + " gwei"
      : undefined,
    gasUsage: request.gasUsed ? request.gasUsed.toString() : undefined,
    gasCost:
      request.gasUsed && request.effectiveGasPrice
        ? formatUnits(request.gasUsed * request.effectiveGasPrice, 18) + " KAS"
        : undefined,
  });
}
