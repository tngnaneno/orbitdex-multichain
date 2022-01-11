import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>OrbitDEX</title>
  <style>
    :root { --bg:#070b12; --ink:#e8eef7; --muted:#8fa3bf; --accent:#3d8bfd; }
    * { box-sizing: border-box; }
    body { margin:0; min-height:100vh; font-family: "Segoe UI", system-ui, sans-serif;
      color:var(--ink); background: radial-gradient(900px 500px at 10% 0%, #132238, transparent), var(--bg); }
    main { max-width: 720px; margin: 0 auto; padding: 4rem 1.25rem; }
    h1 { font-size: clamp(2.5rem, 6vw, 4rem); margin: 0 0 .5rem; letter-spacing: -0.03em; }
    p { color: var(--muted); line-height: 1.6; font-size: 1.1rem; }
    .cta { display:inline-block; margin-top:1.5rem; padding:.85rem 1.2rem; background:var(--accent);
      color:#041018; text-decoration:none; font-weight:700; border-radius:8px; }
    code { background:#121a28; padding:.15rem .4rem; border-radius:4px; }
  </style>
</head>
<body>
  <main>
    <h1>OrbitDEX</h1>
    <p>Multi-chain intent-based DEX aggregator. Sign once — solvers compete on execution across Ethereum, Arbitrum, Base, Optimism, and more.</p>
    <p>API health: <code>/health</code> · Quote: <code>POST /v1/quote</code></p>
    <a class="cta" href="/health">Check health</a>
  </main>
</body>
</html>`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (url.pathname === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "orbitdex", node: process.version }));
    return;
  }

  if (url.pathname === "/v1/quote" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let parsed = {};
    try { parsed = JSON.parse(body || "{}"); } catch { /* ignore */ }
    const amountIn = BigInt(parsed.amountIn || "1000000");
    const amountOut = (amountIn * 997n) / 1000n;
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
      quoteId: `q_${Date.now()}`,
      chainId: parsed.chainId || 1,
      amountOut: amountOut.toString(),
      routeVenues: ["uniswap-v3", "curve"],
      gasEstimate: "180000",
      createdAt: Date.now(),
    }));
    return;
  }

  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`[orbitdex] server running at http://localhost:${PORT}`);
});
