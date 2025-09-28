export default function printTokenDetailsTable(tokenDetails: {
  symbol: string;
  name: string;
  [key: string]: any;
}) {
  console.table(tokenDetails);
}
