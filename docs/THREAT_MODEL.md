# OrbitDEX threat model (summary)

## Assets

- User ERC-20 balances via Permit2
- Intent signatures (authorization to settle)
- Solver bonds (roadmap)

## Trust boundaries

| Component | Trust |
|-----------|-------|
| User wallet | Root of auth |
| Quote API | Untrusted for settlement amounts — minAmountOut is binding |
| Solver | Untrusted; must satisfy on-chain checks |
| RPC | Untrusted; verify chainId + domain |

## Mitigations

- Domain-separated EIP-712
- Deadline + nonce
- Partial fill caps
- Optional exclusivity solver window
