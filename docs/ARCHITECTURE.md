# Architecture notes

## Settlement

Per-chain `OrbitIntentSettlement` verifies EIP-712 intents and executes venue adapters.

## Quoting

API aggregates venue prices, applies gas and slippage, returns a route + quoteId.

## Solvers

Bonded solvers subscribe to intent gossip and compete on minAmountOut fill quality.
