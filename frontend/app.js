import { ethers } from "https://esm.sh/ethers@6.13.4";

const contractAddress = "0x6a69c72BE533a575159D6e6Ef2fF1711603de0b0";
const abi = [
  "function post(string calldata message) external",
  "event Posted(address indexed who, string message, uint256 timestamp)",
];

const BASE_SEPOLIA_CHAIN_ID = "0x14a34";
const BASESCAN_TX_URL = "https://sepolia.basescan.org/tx/";

let provider, signer, contract;

const connectBtn = document.getElementById("connectBtn");
const accountEl = document.getElementById("account");
const postSection = document.getElementById("postSection");
const messageInput = document.getElementById("messageInput");
const postBtn = document.getElementById("postBtn");
const statusEl = document.getElementById("status");
const postsEl = document.getElementById("posts");

connectBtn.addEventListener("click", async () => {
  if (!window.ethereum) {
    alert("MetaMask not found. Install it first.");
    return;
  }

  try {
    statusEl.textContent = "Connecting...";

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: BASE_SEPOLIA_CHAIN_ID,
              chainName: "Base Sepolia",
              rpcUrls: ["https://sepolia.base.org"],
              nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
              blockExplorerUrls: ["https://sepolia.basescan.org"],
            }],
          });
        } else {
          throw switchError;
        }
      }
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    accountEl.textContent = `Connected: ${accounts[0]}`;
    postSection.style.display = "block";
    statusEl.textContent = "";
    connectBtn.textContent = "Connected";
    connectBtn.disabled = true;

    loadPosts();
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Connection failed: " + err.message;
  }
});

postBtn.addEventListener("click", async () => {
  const message = messageInput.value.trim();
  if (!message) return;

  try {
    postBtn.disabled = true;
    statusEl.innerHTML = "Sending transaction...";

    const tx = await contract.post(message);
    statusEl.innerHTML = `Waiting for confirmation... tx: <a href="${BASESCAN_TX_URL}${tx.hash}" target="_blank" rel="noopener noreferrer">${tx.hash}</a>`;

    await tx.wait();
    statusEl.innerHTML = `Confirmed! tx: <a href="${BASESCAN_TX_URL}${tx.hash}" target="_blank" rel="noopener noreferrer">${tx.hash}</a>`;
    messageInput.value = "";

    await loadPosts();
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Transaction failed: " + err.message;
  } finally {
    postBtn.disabled = false;
  }
});

async function loadPosts() {
  try {
    const readProvider = new ethers.JsonRpcProvider("https://sepolia.base.org");
    const readContract = new ethers.Contract(contractAddress, abi, readProvider);

    const filter = readContract.filters.Posted();
    const currentBlock = await readProvider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 1999);
    const events = await readContract.queryFilter(filter, fromBlock, currentBlock);

    postsEl.innerHTML = "";
    events.reverse().slice(0, 20).forEach((e) => {
      const li = document.createElement("li");
      const date = new Date(Number(e.args.timestamp) * 1000);
      const formattedDate = date.toLocaleString();

      li.innerHTML = `
        <div style="margin-bottom: 12px;">
          <div style="font-size: 0.85em; color: #666;">
            ${e.args.who.slice(0, 6)}...${e.args.who.slice(-4)} — ${formattedDate}
          </div>
          <div>${escapeHtml(e.args.message)}</div>
        </div>
      `;
      postsEl.appendChild(li);
    });
  } catch (err) {
    console.error("loadPosts failed:", err);
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}