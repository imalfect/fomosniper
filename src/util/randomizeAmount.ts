// this function adds a small random amount (0-999) wei to the given amount
// the bot would probably work well without this, but just in case some protection was made for that then it's there
export function randomizeAmount(amount: bigint) {
  const random = BigInt(Math.floor(Math.random() * 1000)); // Random value between 0 and 999
  return amount + random;
}
