 ## Gitcoin: 3) Issue A Smart Contract Call To The Deployed Smart Contract

1. A screenshot of the console output immediately after you have successfully issued a smart contract call.

![contract_call.png](https://github.com/long-blade/Hackathon-Nervos/tree/main/task3/contract_call.png?raw=true)

2. The transaction hash from the console output (in text format).

0xc5533dbf34a3d95ce5c5b9d9371a28f360ed665ecaf14d531016c6e3b778cbba

3. The contract address that you called (in text format).

0x5344f5F01Ba260BbE9C0c7C16CD5635c419Ff295


4. The ABI for contract you made a call on (in text format).

```
abi = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get",
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
  ];
  ```

