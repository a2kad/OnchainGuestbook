# Onchain Guestbook

A mini dApp where anyone can leave an on-chain message on Base Sepolia.
No data is stored in contract storage — everything goes through events (gas efficient).

## 🏆 Competition
This project is part of the 42Blockchain launch competition.
🔗 [My Twitter/X post](https://x.com/r_reshetnikov/status/2068420820435599863)

## Contract
- Address: `0x6a69c72BE533a575159D6e6Ef2fF1711603de0b0`
- Network: Base Sepolia (chainId 84532)
- Deployer: `0x15192bA08f3D6240E3DeF8524c547f13B2f40a2b`
- Deployed via: `forge create` (Foundry)

## How it works
1. Connect your MetaMask wallet ("Connect Wallet" button)
2. Write a message (≤280 characters)
3. Click "Post" → sign the transaction in MetaMask
4. A link to the transaction on BaseScan appears while it's confirming
5. Once confirmed, the message shows up in the list with the author's address, timestamp, and text — all read directly from the on-chain `Posted` events

## Run locally
```bash
cd frontend
npx serve .
```
Open the URL shown in the terminal (e.g. http://localhost:3000).

## Live demo
[onchainguestbook.netlify.app](https://onchainguestbook.netlify.app/)

## Stack
Solidity 0.8.24 · Vanilla JS · ethers.js v6 (via esm.sh)

## ⚠️ Limitations
This is an educational project. Messages are stored permanently
and publicly as blockchain events, and cannot be deleted or
censored by the frontend owner.
