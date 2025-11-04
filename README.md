# CCTP (Circle) Data Provider Plugin

## Commands

```bash
# Install dependencies
bun install
```

```bash
# Run tests
bun test
```

```bash
# Verify functionality (server at http://localhost:3001)
bun run dev
```

## Configuration (.env)

Optional variables (Circle API is public):

```env
CCTP_BASE_URL=https://iris-api.circle.com/api/v2
CCTP_TIMEOUT=15000
MAX_REQUESTS_PER_SECOND=35
```
