<p style="font-size:22px">"Injustice anywhere is a threat to justice everywhere." — Martin Luther King Jr</p>

# fomosniper

Fomosniper is a simple PoC "sniper bot" program that automatically purchases tokens created on the KaspaCom LFG Platform instantly after launch. This readme will summarize the reason behind this project, how it works, as well as how to run it on your own machine.

Made by iMalFect & Kaspador.

## Motivation

Despite the Kasplex L2 launching only a couple days ago, there's already sniper bots that ruin the fun on LFG.

The platform claims they implement _"Cutting edge anti-bot protection"_. Sadly, these mechanisms are easy to circumvent, which many people already did, and created bots to profit.

**Either everyone plays by the rules, or no one does**, this bot was created with the mission to eliminate the advantage people with technical knowledge have.

## How does the sniper protection work on LFG?

Upon looking at the decompiled version of the bonding curve smart contract, we can see the following in the `buyTokens(uint256)` function:

```sol
function buyTokens(uint256 amount) public payable {
    require(msg.data.length - 4 >= 32);
    0x180c();
    v0 = v1 = 0;
    if (v1) {
        v0 = msg.value > 0x7caee97613e6700000;
    }
    require(!v0, TransactionTooLarge());
    require(block.number - 0x93d71, fullExit()); // note this!
    require(0 - msg.value, ZeroValue());
    require(0 - amount, ZeroValue());
    require(!_previewBuyTokens, AlreadyGraduated());
```

The third `require()` statement performs a full exit in case the mathematical equation `block.number - 0x93d71` is bigger than 0\*, let's check what `0x93d71` could be...

\* a normal solidity `require()` statement typically requires a condition, but through this decompiled code we can assume the result of this equation should be bigger than 0

The only mention of `0x93d71` in the decompiled code can be found here:

```sol
function creationBlock() public nonPayable {
    return 0x93d71;
}
```

These two snippets are sufficient to understand the code's behavior. The transaction will fail if the buy transaction is placed in the same block as the bonding curve contract was created.

#### Circumvention

The easiest way to circumvent this is to wait until the next block (or two), and then submit the transaction, due to the fast block time on the Kasplex L2, it will still be substantially faster than human action.

## How to run

In order to run this program, install the [Bun JavaScript Runtime](https://bun.sh), download the source code of this program (green button in GitHub, download as zip), unpack, **configure** and then open that directory in your terminal and type `bun .`

### Configuration

The `config.json` files requires a couple variables to set up, they're described below, open that file in your favorite editor and configure the variables to your preference.

**BPS in this context means basis point, 1 percent is 100 basis points**

```js
{
  "lfg": {
    "factoryAddress": "0xb19219AF8a65522f13B51f6401093c8342E27e9D" // The factory address for LFG, for mainnet leave as-is
  },
  "connection": {
    "rpc": {
      "url": "https://evmrpc.kasplex.org" // The JSON-RPC node url for the Kasplex L2, for mainnet leave as-is
    },
    "ws": {
      "url": "wss://evmws.kasplex.org" // The WebSocket node url for the Kasplex L2, for mainnet leave as-is
    },
    "network": {
      // Network configuration, for Kasplex L2, leave as-is
      "name": "Kasplex Mainnet",
      "chainId": 202555,
      "nativeCurrency": {
        "decimals": 18,
        "name": "Wrapped Kaspa",
        "symbol": "WKAS"
      }
    }
  },
  "wallet": {
    "privateKey": "0x0000000000000000000000000000000000000000" // the private key of the wallet to be used with the sniper bot, ensure it begins with 0x
  },
  "bot": {
    "purchaseAmount": "69000000000000000000", // wei amount to use for purchasing each token, 1 kasplex L2 kaspa is equal to 10^18 wei
    "slippageBps": 300, // slippage setting in bps (how much less you're willing to receive in case your transaction gets frontrun, 3-10% is a safe setting considering many snipers running)
    "gasBribeBps": 2000 // EIP-1559 priority fee BPS, in case more transactions get included in the same block as yours, the one with the higher fee will get "executed" first, set to 20% as default (bps taken from base gas fee)
  }
}
```

## Donate

Research and implementation of this project took many hours. Donations are much appreciated and will be used for future initiatives. ❤️

### Kaspa

```
kaspa:qr97sn4qe5nqcukscp3rvuj7sgel5z86kdxl0pwa0dvqwkpa0swz2g4k8pw54
```

### Kasplex L2 (and other networks)

```
0x00000000888A717b1652aBED3183C79fE965d48c
```

## Future updates

This bot was made as a PoC (proof of concept), it is unlikely it will receive updates from us. You're welcome to fork this tool and utilize it for your own purpose, aligned with the GNU General Public License version 3.

## Warning

**THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.**

**This software is provided as a PoC, it is not guaranteed to work, and you run it at your own risk, excercise caution and do your own research before using it.**

## License

This code is licensed under [GNU General Public License version 3](https://opensource.org/license/gpl-3-0).
