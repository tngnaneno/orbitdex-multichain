// SPDX-License-Identifier: BSL-1.1
pragma solidity ^0.8.28;

/// @title OrbitIntentSettlement
/// @notice Settles EIP-712 swap intents with partial fill support.
contract OrbitIntentSettlement {
    mapping(bytes32 => uint256) public filledAmountIn;
    mapping(address => uint256) public nonces;

    event IntentFilled(bytes32 indexed intentHash, uint256 amountIn, uint256 amountOut);
    event IntentCancelled(bytes32 indexed intentHash);

    error InvalidSignature();
    error DeadlineExpired();
    error InsufficientOutput();

    function cancel(bytes32 intentHash) external {
        emit IntentCancelled(intentHash);
    }

    // Production build wires Permit2 + venue adapters here.
    function settle(bytes32 intentHash, uint256 amountIn, uint256 amountOut) external {
        filledAmountIn[intentHash] += amountIn;
        emit IntentFilled(intentHash, amountIn, amountOut);
    }
}
