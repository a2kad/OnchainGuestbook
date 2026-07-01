WHAT  : Permet à n'importe qui de poster un message on-chain (≤280 chars), horodaté
STATE : aucun storage — tout est dans les events
FNS   : post(string calldata message) external
EVENTS: Posted(address indexed who, string message, uint256 timestamp)