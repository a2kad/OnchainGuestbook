# Onchain Guestbook

Un mini-dApp où n'importe qui peut laisser un message on-chain sur Base Sepolia.
Aucune donnée n'est stockée en storage — tout transite par les events (gas efficient).

## Contract
- Adresse : 0x6a69c72BE533a575159D6e6Ef2fF1711603de0b0
- Réseau : Base Sepolia (chainId 84532)

## Comment ça marche
1. Connecte ton wallet MetaMask (bouton "Connect Wallet")
2. Écris un message (≤280 caractères)
3. Clique "Post" → signe la transaction dans MetaMask
4. Le message apparaît dans la liste, lu directement depuis les events on-chain

## Lancer en local
\`\`\`bash
cd frontend
npx serve .
\`\`\`
Ouvre l'URL affichée dans le terminal (ex: http://localhost:3000).

## Live demo
[onchainguestbook.netlify.app](https://onchainguestbook.netlify.app/)

## Stack
Solidity 0.8.24 · Vanilla JS · ethers.js v6 (via esm.sh)

## ⚠️ Limitations
Ce projet est éducatif. Les messages sont stockés de façon permanente
et publique en tant qu'events blockchain, et ne peuvent pas être
supprimés ou censurés par le propriétaire du frontend.

Deployer: 0x15192bA08f3D6240E3DeF8524c547f13B2f40a2b
Deployed to: 0x6a69c72BE533a575159D6e6Ef2fF1711603de0b0
Transaction hash: 0x644a5b9b5787818159a7164ccee06495d5e39044e34a1bf8cfa388e6b3b13098