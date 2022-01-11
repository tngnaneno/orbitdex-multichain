# OrbitDEX

**Multi-chain intent-based DEX aggregator — production monorepo**

OrbitDEX routes swaps across Ethereum, Arbitrum, Base, Optimism, Polygon, BSC, Avalanche, and Scroll. Users sign EIP-712 intents; a competitive solver network fills them with best execution, MEV protection, and cross-chain settlement.

[![License: BSL 1.1](https://img.shields.io/badge/license-BSL%201.1-blue)](./LICENSE)
[![Networks](https://img.shields.io/badge/networks-8%2B-0ea5e9)](#supported-networks)
[![Audits](https://img.shields.io/badge/audits-planned%20%2F%20in%20progress-amber)](#security)

---

## Why OrbitDEX

| Benefit | What it means for users & integrators |
|--------|----------------------------------------|
| **Best price across venues** | Aggregates Uniswap V2/V3, Curve, Balancer, Solidly-style forks, and RFQ makers in one quote |
| **Intent-based UX** | Sign once; solvers compete on fill quality — no manual route picking |
| **MEV-aware execution** | Private orderflow + exclusivity windows reduce sandwich exposure |
| **Cross-chain in one flow** | Bridge + swap composed under a single min-out and deadline |
| **Institutional controls** | Permit2, smart-account (ERC-1271) support, allowlists, and audit trails |
| **Integrator-ready SDK** | Type-safe viem/wagmi SDK, REST + WebSocket quotes, simulation helpers |

### Product pillars

1. **Quote engine** — multi-source pricing with stale-quote epoch guards  
2. **Settlement** — on-chain intent settlement with partial fills  
3. **Solver network** — open participation with bonding & slashing roadmap  
4. **App + API** — production Next.js UI and quoting API

---

## Supported networks

| Chain | Chain ID | Status |
|-------|----------|--------|
| Ethereum | 1 | Live-ready |
| Arbitrum One | 42161 | Live-ready |
| Base | 8453 | Live-ready |
| Optimism | 10 | Live-ready |
| Polygon | 137 | Live-ready |
| BNB Smart Chain | 56 | Live-ready |
| Avalanche C-Chain | 43114 | Live-ready |
| Scroll | 534352 | Live-ready |

---

## Monorepo layout

```text
01-orbitdex-multichain/
├── apps/web          # Next.js trading UI
├── apps/api          # Quote + intent indexing API
├── packages/sdk      # TypeScript SDK (viem)
├── packages/config   # Chains, tokens, addresses
├── contracts/        # Settlement + permit helpers (Solidity)
└── docs/             # Architecture & runbooks
```

---

## Quick start

```bash
npm run server
```

Open **http://localhost:3000**

Optional: `npm start` does the same thing. Set `PORT=4000` if you need another port.

---

## Architecture (high level)

```text
Wallet / dApp
    │  EIP-712 intent
    ▼
Orbit API (quotes, simulation)
    │
    ├─► Public mempool solvers
    └─► Private relays (optional)
            │
            ▼
   IntentSettlement (per chain)
```

---

## Security

- Fail-closed domain separation on EIP-712  
- Permit2-first allowances; no infinite approvals by default in UI  
- Partial-fill accounting with bigint-safe amounts  
- See `docs/THREAT_MODEL.md` for trust boundaries  

---

## License

Business Source License 1.1 — see `LICENSE`.
