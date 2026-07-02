# Onchain Guestbook

A mini dApp where anyone can leave an on-chain message on Base Sepolia.
No data is stored in contract storage — everything goes through events (gas efficient).

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

## Technical details
- No npm dependencies on the frontend — `ethers.js` is imported directly via CDN (`esm.sh`), no build step.
- Wallet connection uses `window.ethereum` (EIP-1193) directly, without RainbowKit/WalletConnect.
- Messages are read via `queryFilter` over the last 1999 blocks (a limit enforced by the public `sepolia.base.org` RPC on `eth_getLogs`).
- Transaction links point to `sepolia.basescan.org`.

## ⚠️ Limitations
This is an educational project. Messages are stored permanently
and publicly as blockchain events, and cannot be deleted or
censored by the frontend owner.

Reading messages is limited to the last ~1999 blocks (≈ 1h on Base Sepolia)
due to a limit on the public RPC used.