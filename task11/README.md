## Gitcoin: 11) Use a Tron Wallet to Execute a Smart Contract Call


1. A screenshot of the accounts you created (account list) in ckb-cli.
 ![](./account_list.png)

2. A link to the Layer 1 address you funded on the Testnet Explorer.
https://explorer.nervos.org/aggron/address/ckt1qyqyvzfurkc0l5kfdyjhwvezffwg68dntc4qpypy8n

3. A screenshot of the console output immediately after you have successfully submitted a CKByte deposit to your Tron account on Layer 2.
 ![](./deposit.png)

4. A screenshot of the console output immediately after you have successfully issued a smart contract calls on Layer 2.
 ![](./contract.png)

5. The transaction hash of the "Contract call" from the console output (in text format).
0xf975a3900ba0054e102d1b96e1921083e4e3b4ff81eb875fc701b36c5df714de

6. The contract address that you called (in text format).
0xE3d92e2940DB711F7304deb0a2219f7E382369C9

7. The ABI for contract you made a call on (in text format).

```
"abi": [
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"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
    },
    {
      "inputs": [],
      "name": "bankReport",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

```

8. Your Tron address (in text format).
TCnBLwN9nwQHUp46u5JRygX4zGk9QaXm4T
