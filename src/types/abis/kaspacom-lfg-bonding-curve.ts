export default [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "uniswapRouter",
            type: "address",
          },
          {
            internalType: "address",
            name: "uniswapFactory",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "treasury",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "devLock",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "devAddress",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isHypedLaunch",
            type: "bool",
          },
        ],
        internalType: "struct BondingCurve.CurveInit",
        name: "config",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyGraduated",
    type: "error",
  },
  {
    inputs: [],
    name: "DevPurchaseAlreadyDone",
    type: "error",
  },
  {
    inputs: [],
    name: "ETHRefundFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTotalSupply",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyFactory",
    type: "error",
  },
  {
    inputs: [],
    name: "SlippageError",
    type: "error",
  },
  {
    inputs: [],
    name: "SniperBlocked",
    type: "error",
  },
  {
    inputs: [],
    name: "TransactionTooLarge",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroValue",
    type: "error",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "lpPool",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "liquidityAdded",
        type: "uint256",
      },
      {
        indexed: !0,
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "BondingGraduated",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "devAddress",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DevTokensClaimed",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "lpPool",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "liquidityAmount",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
    ],
    name: "LiquidityAdded",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "tokensAdjusted",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "ethAdjusted",
        type: "uint256",
      },
    ],
    name: "ReservesAdjustedForLiquidity",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: !0,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "SkimmedAssetsWithdrawn",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: !0,
        internalType: "address",
        name: "bondingCurve",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "isBuy",
        type: "bool",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "currentEthReserves",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "currentTokenReserves",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "isGraduated",
        type: "bool",
      },
    ],
    name: "TokenSwap",
    type: "event",
  },
  {
    inputs: [],
    name: "DEAD_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_HYPED_TX_VALUE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minTokensOut",
        type: "uint256",
      },
    ],
    name: "buyTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimDevTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "creationBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minTokensOut",
        type: "uint256",
      },
    ],
    name: "factoryDevBuy",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDevLockInfo",
    outputs: [
      {
        internalType: "bool",
        name: "isLocked",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "lockEndTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDevPooledTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isHypedLaunch",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "ethIn",
        type: "uint256",
      },
    ],
    name: "previewBuyTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "tokensOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "previewSellTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "netEthOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minEthOut",
        type: "uint256",
      },
    ],
    name: "sellTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenData",
    outputs: [
      {
        internalType: "uint256",
        name: "virtualReserve",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actualReserve",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "availableSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lpReserve",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "devPooledTokens",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "graduated",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "devLockUntil",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "lpPool",
        type: "address",
      },
      {
        internalType: "address",
        name: "devAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapFactory",
    outputs: [
      {
        internalType: "contract IFomodotbizV2Factory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouter",
    outputs: [
      {
        internalType: "contract IFomodotbizV2Router02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "withdrawSkimmedAssets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
