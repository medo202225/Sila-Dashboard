# SilaScan

Etherscan-style Sila home/explorer UI.

## Run

```powershell
Set-Location 'C:\Users\AHMED IBRAHIM\Desktop\Sila-Dashboard'
node .\server.js
```

Open:

```text
http://127.0.0.1:8787
```

## API contract

Sila EL:
- sila_chainId
- sila_blockNumber
- sila_getBlockByNumber
- sila_getBlockByHash
- sila_getTransactionByHash
- sila_getTransactionReceipt
- sila_getBalance
- sila_getTransactionCount
- sila_getCode
- sila_gasPrice when available

Sila CL:
- /sila/v1/node/health
- /sila/v1/node/version
- /sila/v1/node/syncing
- /sila/v1/beacon/headers/head
- /sila/v2/beacon/blocks/head
