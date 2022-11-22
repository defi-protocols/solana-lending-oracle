export const IDL = {
    "version": "0.1.0",
    "name": "lending",
    "constants": [
      {
        "name": "CREDIT_MINT_DECIMALS",
        "type": "u8",
        "value": "9"
      },
      {
        "name": "MAX_SLICE_SIZE",
        "type": {
          "defined": "usize"
        },
        "value": "10"
      }
    ],
    "instructions": [
      {
        "name": "initializeAuthority",
        "accounts": [
          {
            "name": "admin",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "updateAuthority",
        "accounts": [
          {
            "name": "admin",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": false,
            "isSigner": true
          }
        ],
        "args": [
          {
            "name": "newAuthority",
            "type": "publicKey"
          }
        ]
      },
      {
        "name": "initializeOracle",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "oracle",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "decimals",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          }
        ]
      },
      {
        "name": "updateOracle",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "oracle",
            "isMut": true,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "price",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initializeCollection",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "collection",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "collectionOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "maxCollaterals",
            "type": "u64"
          }
        ]
      },
      {
        "name": "updateCollection",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "collection",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collectionOracle",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "maxCollaterals",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initializeNSlopeModel",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "model",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "slopes",
            "type": {
              "vec": {
                "array": [
                  "u64",
                  3
                ]
              }
            }
          },
          {
            "name": "length",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initializeLendingPool",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "nSlopeModel",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "baseOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "baseMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "reserve",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "feeTokenAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "creditMint",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "params",
            "type": {
              "defined": "PoolParams"
            }
          }
        ]
      },
      {
        "name": "updateLendingPool",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "nSlopeModel",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "baseOracle",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "params",
            "type": {
              "defined": "PoolParams"
            }
          }
        ]
      },
      {
        "name": "initializeBorrowingNode",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "pool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "collection",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "node",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "params",
            "type": {
              "defined": "NodeParams"
            }
          }
        ]
      },
      {
        "name": "updateBorrowingNode",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "node",
            "isMut": true,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "params",
            "type": {
              "defined": "NodeParams"
            }
          }
        ]
      },
      {
        "name": "initializeSlice",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "collection",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "slice",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "sliceNumber",
            "type": "u64"
          }
        ]
      },
      {
        "name": "depositTokens",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "creditMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "interestRateModel",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "baseTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "creditTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "withdrawTokens",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "creditMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "interestRateModel",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "baseTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "creditTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initializeBorrowAccount",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "node",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "borrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collaterals",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "maxCollaterals",
            "type": "u64"
          }
        ]
      },
      {
        "name": "closeBorrowAccount",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "node",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "borrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collaterals",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "receiver",
            "isMut": true,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "depositCollateral",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "node",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "collection",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "borrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collaterals",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "whitelisted",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "collateralAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralTokenAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "userTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "withdrawCollateral",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "baseOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "interestRateModel",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "node",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "collection",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collectionOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "borrower",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "borrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collaterals",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "receiver",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "borrow",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "baseOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "interestRateModel",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "node",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "collection",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "collectionOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "borrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collaterals",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "repay",
        "accounts": [
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "interestRateModel",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "node",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "borrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "userTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "liquidate",
        "accounts": [
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "baseOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "interestRateModel",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "node",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collection",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collectionOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "borrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collaterals",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "receiver",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "lastSlice",
            "isMut": true,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "purchase",
        "accounts": [
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "treasury",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "reserve",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "baseOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "node",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collection",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collectionOracle",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "collateralAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collaterals",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "receiver",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "paymentTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "toTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "lockingProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "lockingAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "membershipAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "aSlice",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "lastSlice",
            "isMut": true,
            "isSigner": false
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "AdminAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "authority",
              "type": "publicKey"
            }
          ]
        }
      },
      {
        "name": "BorrowAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "node",
              "type": "publicKey"
            },
            {
              "name": "shares",
              "type": "u64"
            },
            {
              "name": "outstanding",
              "type": "u64"
            },
            {
              "name": "collaterals",
              "type": "publicKey"
            }
          ]
        }
      },
      {
        "name": "BorrowingNode",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "pool",
              "type": "publicKey"
            },
            {
              "name": "collection",
              "type": "publicKey"
            },
            {
              "name": "debtShares",
              "type": "u64"
            },
            {
              "name": "pendingTokens",
              "type": "u64"
            },
            {
              "name": "params",
              "type": {
                "defined": "NodeParams"
              }
            }
          ]
        }
      },
      {
        "name": "CollateralAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "mint",
              "type": "publicKey"
            },
            {
              "name": "borrower",
              "type": "publicKey"
            },
            {
              "name": "collateralTokenAccount",
              "type": "publicKey"
            },
            {
              "name": "collaterals",
              "type": "publicKey"
            }
          ]
        }
      },
      {
        "name": "CollateralList",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "borrower",
              "type": "publicKey"
            },
            {
              "name": "size",
              "type": "u64"
            },
            {
              "name": "pendingTokensPerCollateral",
              "type": "u64"
            },
            {
              "name": "sliceNumber",
              "type": "u64"
            },
            {
              "name": "isPendingLiquidation",
              "type": "bool"
            },
            {
              "name": "vector",
              "type": {
                "vec": "publicKey"
              }
            }
          ]
        }
      },
      {
        "name": "CollectionAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "collectionOracle",
              "type": "publicKey"
            },
            {
              "name": "maxCollaterals",
              "type": "u64"
            },
            {
              "name": "collateralsInUse",
              "type": "u64"
            },
            {
              "name": "pendingLiquidations",
              "type": "u64"
            },
            {
              "name": "totalLiquidations",
              "type": "u64"
            },
            {
              "name": "totalSlicesLength",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "LendingPool",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "baseMint",
              "type": "publicKey"
            },
            {
              "name": "creditMint",
              "type": "publicKey"
            },
            {
              "name": "treasury",
              "type": "publicKey"
            },
            {
              "name": "reserve",
              "type": "publicKey"
            },
            {
              "name": "feeTokenAccount",
              "type": "publicKey"
            },
            {
              "name": "availableTokens",
              "type": "u64"
            },
            {
              "name": "utilisedTokens",
              "type": "u64"
            },
            {
              "name": "pendingTokens",
              "type": "u64"
            },
            {
              "name": "lostTokens",
              "type": "u64"
            },
            {
              "name": "creditShares",
              "type": "u64"
            },
            {
              "name": "debtShares",
              "type": "u64"
            },
            {
              "name": "lastUpdateTimestamp",
              "type": "u64"
            },
            {
              "name": "interestRate",
              "type": "u64"
            },
            {
              "name": "interestRateModel",
              "type": "publicKey"
            },
            {
              "name": "baseOracle",
              "type": "publicKey"
            },
            {
              "name": "params",
              "type": {
                "defined": "PoolParams"
              }
            }
          ]
        }
      },
      {
        "name": "NSlopeModel",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "slopes",
              "type": {
                "vec": {
                  "array": [
                    "u64",
                    3
                  ]
                }
              }
            }
          ]
        }
      },
      {
        "name": "OracleAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "price",
              "type": "u64"
            },
            {
              "name": "decimals",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "LSlice",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "number",
              "type": "u64"
            },
            {
              "name": "vector",
              "type": {
                "vec": "publicKey"
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "NodeParams",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "enabled",
              "type": "bool"
            },
            {
              "name": "maxBorrowRatio",
              "type": "u64"
            },
            {
              "name": "liquidationRatio",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "PoolParams",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "facilitatorFee",
              "type": "u64"
            }
          ]
        }
      }
    ],
    "events": [
      {
        "name": "Borrow",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "collection",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "borrower",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "amount",
            "type": "u64",
            "index": false
          },
          {
            "name": "timestamp",
            "type": "u64",
            "index": false
          }
        ]
      },
      {
        "name": "Liquidate",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "collection",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "borrower",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "amount",
            "type": "u64",
            "index": false
          },
          {
            "name": "timestamp",
            "type": "u64",
            "index": false
          }
        ]
      },
      {
        "name": "Purchase",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "collection",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "buyer",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "mint",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "price",
            "type": "u64",
            "index": false
          },
          {
            "name": "timestamp",
            "type": "u64",
            "index": false
          }
        ]
      },
      {
        "name": "Repay",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "collection",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "borrower",
            "type": "publicKey",
            "index": false
          },
          {
            "name": "amount",
            "type": "u64",
            "index": false
          },
          {
            "name": "timestamp",
            "type": "u64",
            "index": false
          }
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "NumericalError",
        "msg": "Numerical overflow error"
      },
      {
        "code": 6001,
        "name": "InsufficientFunds",
        "msg": "Not enough tokens in token account"
      },
      {
        "code": 6002,
        "name": "UtilisationTooHigh",
        "msg": "Cannot withdraw due to high utilisation"
      },
      {
        "code": 6003,
        "name": "InsufficientCollateral",
        "msg": "You don't have sufficient collateral to borrow the requested amount"
      },
      {
        "code": 6004,
        "name": "OutstandingDebt",
        "msg": "Debt has not been fully repaid"
      },
      {
        "code": 6005,
        "name": "InvalidLiquidation",
        "msg": "Cannot liquidate this position"
      },
      {
        "code": 6006,
        "name": "InsufficientAvailability",
        "msg": "Not enough funds to borrow"
      },
      {
        "code": 6007,
        "name": "NotPurchasable",
        "msg": "This collateral has not been liquidated"
      },
      {
        "code": 6008,
        "name": "InvalidFee",
        "msg": "Specified fee was too large"
      },
      {
        "code": 6009,
        "name": "InvalidRate",
        "msg": "Specified rate was too large"
      },
      {
        "code": 6010,
        "name": "CannotWithdrawCollateral",
        "msg": "Cannot withdraw collateral"
      },
      {
        "code": 6011,
        "name": "CannotCloseBorrowAccount",
        "msg": "Cannot close borrow account unless all associated collateral has been withdrawn"
      },
      {
        "code": 6012,
        "name": "MaxCollaterals",
        "msg": "Cannot deposit more collateral"
      },
      {
        "code": 6013,
        "name": "SomethingWentWrong",
        "msg": "Something went wrong"
      },
      {
        "code": 6014,
        "name": "InvalidSlice",
        "msg": "Incorrect slice was provided"
      },
      {
        "code": 6015,
        "name": "DisabledNode",
        "msg": "This borrowing node is currently disabled"
      },
      {
        "code": 6016,
        "name": "NoSpaceLeft",
        "msg": "No space left in the vector"
      },
      {
        "code": 6017,
        "name": "ElementNotFound",
        "msg": "Element not found in the vector"
      },
      {
        "code": 6018,
        "name": "IndexOutOfBounds",
        "msg": "Index out of vector bounds"
      }
    ]
  };