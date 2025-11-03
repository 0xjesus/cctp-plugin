# CCTP (Circle) Data Provider Plugin

Market data collection plugin for Circle Cross-Chain Transfer Protocol (CCTP).

## Quick Start

### Installation

```bash
# Install dependencies
bun install

# Copy configuration
cp packages/_plugin_template/.env.example packages/_plugin_template/.env

# Start server
bun dev
```

Navigate to `http://localhost:3001` to interact with the plugin.

### Verify Functionality

```bash
# Run tests
bun test
```

## Configuration

Optional variables in `.env`:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `CCTP_BASE_URL` | `https://iris-api.circle.com/api/v2` | Circle API base URL |
| `CCTP_TIMEOUT` | `15000` | Timeout in milliseconds |
| `MAX_REQUESTS_PER_SECOND` | `35` | Request rate limit |

Circle API is public, no API key required.

## Data Collection

| Metric | Source | Endpoint |
| :--- | :--- | :--- |
| **Fees** | Circle API | `GET /v2/burn/USDC/fees/{source}/{dest}` |
| **Liquidity** | Circle API | `GET /v2/fastBurn/USDC/allowance` |
| **Assets** | Circle Docs | Official USDC contracts |
| **Volume** | DefiLlama | `GET /bridge/cctp` |

## Domain Mappings

Plugin uses official Circle domain IDs from `config/cctp-domains.json`:

- Ethereum = 0
- Avalanche = 1
- Optimism = 2
- Arbitrum = 3
- Solana = 5
- Base = 6
- Polygon PoS = 7
- Unichain = 10
- Linea = 11

Source: https://developers.circle.com/stablecoins/docs/cctp-protocol-contract

## How CCTP Works

CCTP uses a burn-and-mint model:
- Burns USDC on source chain
- Mints native USDC on destination chain
- No wrapped tokens or liquidity pools
- 1:1 transfers (minus fees)

### Transfer Options

- **Fast Transfer** (~8-20s): Uses Circle allowance for instant confirmation, ~0.01% fee
- **Standard Transfer** (~15 min): Waits for full finality, no fee

## Architecture

```
Client
  ↓
getSnapshot()
  ↓
┌──────────────┬──────────────┬───────────────┬─────────────────┐
│ getVolumes   │ getRates     │ getLiquidity  │ getListedAssets │
│ (DefiLlama)  │ (Circle API) │ (Circle API)  │ (Circle Docs)   │
└──────────────┴──────────────┴───────────────┴─────────────────┘
  ↓
ProviderSnapshot
```

## Limitations

1. **USDC Only**: CCTP exclusively supports native USDC
2. **Third-party Volume**: Circle doesn't expose historical volume data, using DefiLlama
3. **Non-traditional Liquidity**: Fast Transfer Allowance is not a liquidity pool
4. **Official Domains Only**: Only chains with official Circle domain IDs supported

## Robustness

- Automatic retries with exponential backoff (up to 3 attempts)
- Rate limiting with token bucket algorithm (35 req/sec)
- Verified domain mappings from official documentation
- 10-minute cache for volume data

## Resources

- **Circle CCTP Docs**: https://developers.circle.com/cctp
- **API Docs**: https://developers.circle.com/stablecoins/docs/cctp-api
- **Support**: https://t.me/+Xfx2Mx6pbRYxMzA5

## License

MIT
