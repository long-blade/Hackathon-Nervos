# Task 7) Port An Existing Ethereum DApp To Polyjuice

For this task I used the exaple provided as a boilerplate from `https://github.com/Kuzirashi/blockchain-workshop.git -b ethereum-simple blockchain-workshop-ethereum-simple` in order to create a bank app with simple deposit and withdraw features.

1. Screenshots or video of your application running on Godwoken.
Video proof:
https://github.com/long-blade/Hackathon-Nervos/tree/main/task7/bank.mkv

2. Link to the GitHub repository with your application which has been ported to Godwoken. This must be a different application than the one covered in this guide.
https://github.com/long-blade/Hackathon-Nervos/tree/main/task7/app

Contract `Bank`:
- Transaction hash: 0xb187c6c12198d0a3744f4375369140ac061f6850821448cd77612e870146ee62
- Deployed contract address: 0xE3d92e2940DB711F7304deb0a2219f7E382369C9

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
      "type": "function"
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



