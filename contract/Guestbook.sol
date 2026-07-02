// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Guestbook {
    event Posted(address indexed who, string message, uint256 timestamp);

    error MessageTooLong();

    function post(string calldata message) external {
        if (bytes(message).length > 280) revert MessageTooLong();
        emit Posted(msg.sender, message, block.timestamp);
    }
}