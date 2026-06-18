const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = "127.0.0.1";
const PORT = Number(process.env.SILA_SCAN_PORT || process.env.SILA_DASHBOARD_PORT || 8787);
const SILA_EL_RPC = process.env.SILA_EL_RPC || "http://127.0.0.1:8545";
const SILA_CL_API = process.env.SILA_CL_API || "http://127.0.0.1:3500";
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

function sendJson(res, status, value) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(value, null, 2));
}

function hexToDec(hex) {
  if (typeof hex !== "string" || !hex.startsWith("0x")) return null;
  try { return BigInt(hex).toString(10); } catch { return null; }
}

function decToHex(value) {
  try { return "0x" + BigInt(value).toString(16); } catch { return null; }
}

function shortHash(value, left = 10, right = 8) {
  if (!value || typeof value !== "string") return null;
  if (value.length <= left + right + 3) return value;
  return value.slice(0, left) + "..." + value.slice(-right);
}

function weiToSilaString(wei) {
  if (typeof wei !== "string" || !wei.startsWith("0x")) return "0 SILA";
  try {
    const n = BigInt(wei);
    const whole = n / 1000000000000000000n;
    const frac = n % 1000000000000000000n;
    if (frac === 0n) return whole.toString() + " SILA";
    const fracStr = frac.toString().padStart(18, "0").replace(/0+$/, "").slice(0, 6);
    return whole.toString() + "." + fracStr + " SILA";
  } catch {
    return "0 SILA";
  }
}

async function withTimeout(task, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try { return await task(controller.signal); } finally { clearTimeout(timer); }
}

async function rpc(method, params = []) {
  try {
    return await withTimeout(async (signal) => {
      const response = await fetch(SILA_EL_RPC, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        signal
      });
      const payload = await response.json();
      if (payload.error) {
        return { ok: false, method, params, error: payload.error.message || "Sila RPC error", value: null };
      }
      return { ok: true, method, params, error: null, value: payload.result };
    });
  } catch (error) {
    return { ok: false, method, params, error: error.message, value: null };
  }
}

async function restJson(endpoint) {
  try {
    return await withTimeout(async (signal) => {
      const response = await fetch(SILA_CL_API + endpoint, { signal });
      if (!response.ok) {
        return { ok: false, endpoint, status: response.status, error: "HTTP " + response.status, value: null };
      }
      const payload = await response.json();
      return { ok: true, endpoint, status: response.status, error: null, value: payload };
    });
  } catch (error) {
    return { ok: false, endpoint, status: null, error: error.message, value: null };
  }
}

async function restStatus(endpoint) {
  try {
    return await withTimeout(async (signal) => {
      const response = await fetch(SILA_CL_API + endpoint, { signal });
      return { ok: response.status >= 200 && response.status < 300, endpoint, status: response.status, error: null };
    });
  } catch (error) {
    return { ok: false, endpoint, status: null, error: error.message };
  }
}

function blockView(block) {
  if (!block) return null;
  const txs = Array.isArray(block.transactions) ? block.transactions : [];
  return {
    numberHex: block.number || null,
    number: hexToDec(block.number),
    hash: block.hash || null,
    hashShort: shortHash(block.hash),
    parentHash: block.parentHash || null,
    parentHashShort: shortHash(block.parentHash),
    miner: block.miner || block.author || null,
    minerShort: shortHash(block.miner || block.author || ""),
    timestampHex: block.timestamp || null,
    timestamp: hexToDec(block.timestamp),
    gasUsed: hexToDec(block.gasUsed),
    gasLimit: hexToDec(block.gasLimit),
    baseFeePerGas: hexToDec(block.baseFeePerGas),
    baseFeePerGasHex: block.baseFeePerGas || null,
    reward: "0 SILA",
    transactionCount: txs.length,
    transactions: txs
  };
}

function txView(tx, blockNumber) {
  if (!tx) return null;
  if (typeof tx === "string") {
    return { hash: tx, hashShort: shortHash(tx), blockNumber: blockNumber || null, from: null, to: null, value: "0 SILA" };
  }
  return {
    hash: tx.hash || null,
    hashShort: shortHash(tx.hash),
    blockNumber: hexToDec(tx.blockNumber) || blockNumber || null,
    from: tx.from || null,
    fromShort: shortHash(tx.from || ""),
    to: tx.to || null,
    toShort: shortHash(tx.to || ""),
    value: weiToSilaString(tx.value || "0x0")
  };
}

function headView(result) {
  const value = result.ok ? result.value : null;
  const data = value && value.data ? value.data : null;
  const header = data && data.header ? data.header : null;
  const msg = header && header.message ? header.message : null;
  return {
    ok: result.ok,
    root: data ? data.root : null,
    rootShort: data && data.root ? shortHash(data.root) : null,
    canonical: data ? data.canonical : null,
    finalized: value ? value.finalized : null,
    executionOptimistic: value ? value.execution_optimistic : null,
    slot: msg ? msg.slot : null,
    proposerIndex: msg ? msg.proposer_index : null,
    parentRoot: msg ? msg.parent_root : null,
    stateRoot: msg ? msg.state_root : null,
    bodyRoot: msg ? msg.body_root : null
  };
}

async function getRecentBlocks(latestHex, includeFullTxs = false) {
  const latestDec = hexToDec(latestHex);
  if (latestDec === null) return [];
  const latest = BigInt(latestDec);
  const jobs = [];
  for (let i = 0n; i < 8n; i++) {
    const n = latest - i;
    if (n < 0n) break;
    jobs.push(rpc("sila_getBlockByNumber", [decToHex(n), includeFullTxs]));
  }
  const results = await Promise.all(jobs);
  return results.filter((r) => r.ok && r.value).map((r) => blockView(r.value));
}

function txsFromBlocks(blocks) {
  const out = [];
  for (const block of blocks) {
    const txs = Array.isArray(block.transactions) ? block.transactions : [];
    for (const tx of txs) {
      const item = txView(tx, block.number);
      if (item && item.hash) out.push(item);
      if (out.length >= 10) return out;
    }
  }
  return out;
}

function estimateTps(blocks) {
  if (!Array.isArray(blocks) || blocks.length < 2) return "0.00";
  const newest = Number(blocks[0].timestamp || 0);
  const oldest = Number(blocks[blocks.length - 1].timestamp || 0);
  const seconds = Math.max(1, newest - oldest);
  const total = blocks.reduce((sum, b) => sum + Number(b.transactionCount || 0), 0);
  return (total / seconds).toFixed(2);
}

async function getSummary() {
  const [
    chainId,
    blockNumber,
    latestBlock,
    fullLatestBlock,
    clientVersion,
    networkVersion,
    gasPrice,
    clHealth,
    clVersion,
    clSyncing,
    clHead,
    clHeadBlock
  ] = await Promise.all([
    rpc("sila_chainId"),
    rpc("sila_blockNumber"),
    rpc("sila_getBlockByNumber", ["latest", false]),
    rpc("sila_getBlockByNumber", ["latest", true]),
    rpc("silaWeb3_clientVersion"),
    rpc("silaNet_version"),
    rpc("sila_gasPrice"),
    restStatus("/sila/v1/node/health"),
    restJson("/sila/v1/node/version"),
    restJson("/sila/v1/node/syncing"),
    restJson("/sila/v1/beacon/headers/head"),
    restStatus("/sila/v2/beacon/blocks/head")
  ]);

  const latest = latestBlock.ok ? blockView(latestBlock.value) : null;
  const blocks = await getRecentBlocks(blockNumber.value, false);
  const transactionScan = await transactionsPage(new URL("http://127.0.0.1/api/sila/transactions?limit=25&blocks=500"));
  const txs = transactionScan.ok && Array.isArray(transactionScan.transactions) ? transactionScan.transactions : [];
  const sync = clSyncing.ok && clSyncing.value && clSyncing.value.data ? clSyncing.value.data : null;
  const executionOk = chainId.ok && blockNumber.ok && latestBlock.ok && clientVersion.ok && networkVersion.ok;
  const consensusOk = clHealth.ok && clVersion.ok && clSyncing.ok && clHead.ok && clHeadBlock.ok;

  const baseFee = latest && latest.baseFeePerGas ? latest.baseFeePerGas : null;
  const gasWei = gasPrice.ok ? hexToDec(gasPrice.value) : baseFee;

  return {
    generatedAt: new Date().toISOString(),
    name: "SilaScan",
    status: executionOk && consensusOk ? "online" : "warning",
    display: {
      price: "Local Devnet",
      marketCap: "—",
      gas: gasWei ? gasWei + " wei" : "—",
      gasHex: gasPrice.ok ? gasPrice.value : latest ? latest.baseFeePerGasHex : null
    },
    stats: {
      tps: estimateTps(blocks),
      recentTransactionCount: txs.length,
      marketCap: "—"
    },
    execution: {
      ok: executionOk,
      chainIdHex: chainId.value,
      chainId: hexToDec(chainId.value),
      blockNumberHex: blockNumber.value,
      blockNumber: hexToDec(blockNumber.value),
      clientVersion: clientVersion.value,
      networkVersion: networkVersion.value,
      latestBlock: latest,
      recentBlocks: blocks,
      recentTransactions: txs,
      checks: { chainId, blockNumber, latestBlock, fullLatestBlock, clientVersion, networkVersion, gasPrice }
    },
    consensus: {
      ok: consensusOk,
      healthStatus: clHealth.status,
      version: clVersion.ok && clVersion.value && clVersion.value.data ? clVersion.value.data.version : null,
      syncing: {
        ok: clSyncing.ok,
        headSlot: sync ? sync.head_slot : null,
        syncDistance: sync ? sync.sync_distance : null,
        isSyncing: sync ? sync.is_syncing : null,
        isOptimistic: sync ? sync.is_optimistic : null,
        elOffline: sync ? sync.el_offline : null
      },
      headHeader: headView(clHead),
      headBlockStatus: clHeadBlock.status,
      checks: { health: clHealth, version: clVersion, syncing: clSyncing, headHeader: clHead, headBlock: clHeadBlock }
    }
  };
}

async function getBlock(id) {
  const clean = decodeURIComponent(id).replace(/^#/, "");
  let result;
  if (/^0x[0-9a-fA-F]{64}$/.test(clean)) result = await rpc("sila_getBlockByHash", [clean, true]);
  else result = await rpc("sila_getBlockByNumber", [clean.startsWith("0x") ? clean : decToHex(clean), true]);
  return { ok: result.ok && !!result.value, query: clean, block: result.value ? blockView(result.value) : null, raw: result };
}

async function getTx(hash) {
  const clean = decodeURIComponent(hash);
  const [tx, receipt] = await Promise.all([
    rpc("sila_getTransactionByHash", [clean]),
    rpc("sila_getTransactionReceipt", [clean])
  ]);
  return { ok: tx.ok && !!tx.value, query: clean, transaction: tx, receipt };
}

async function getAddress(address) {
  const clean = normalizeHash(address);
  const isValidAddress = /^0x[0-9a-fA-F]{40}$/.test(clean);

  if (!isValidAddress) {
    return { ok: false, query: address, address: clean, error: "Invalid Sila address" };
  }

  const [balance, nonce, code, txScan] = await Promise.all([
    rpc("sila_getBalance", [clean, "latest"]),
    rpc("sila_getTransactionCount", [clean, "latest"]),
    rpc("sila_getCode", [clean, "latest"]),
    silaAddressTransactions(clean, 25, 500)
  ]);

  const balanceHex = balance.ok && balance.value ? balance.value : "0x0";
  const nonceHex = nonce.ok && nonce.value ? nonce.value : "0x0";
  const codeHex = code.ok && code.value ? code.value : "0x";
  const codeSize = codeHex && codeHex !== "0x" ? Math.max(0, (codeHex.length - 2) / 2) : 0;

  return {
    ok: balance.ok || nonce.ok || code.ok,
    query: clean,
    address: clean,

    balance,
    balanceWeiHex: balanceHex,
    balanceWei: hexToDec(balanceHex).toString(),
    balanceSila: weiToSilaString(balanceHex),

    nonce,
    nonceHex,
    nonceValue: hexToDec(nonceHex).toString(),
    transactionCount: hexToDec(nonceHex).toString(),

    code,
    codeHex,
    codeSize,
    isContract: code.ok && codeHex !== "0x",

    recentTransactionCount: txScan.ok ? txScan.count : 0,
    recentTransactions: txScan.ok ? txScan.transactions : [],
    transactionScan: txScan,

    checks: { balance, nonce, code, transactionScan: txScan }
  };
}

function serveStatic(req, res) {
  const url = new URL(req.url, "http://" + req.headers.host);
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const normalized = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, normalized);
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); res.end("Forbidden"); return; }
  fs.readFile(filePath, (error, content) => {
    if (error) { res.writeHead(404); res.end("Not found"); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { "content-type": MIME[ext] || "application/octet-stream", "cache-control": "no-store" });
    res.end(content);
  });
}



 // SILA_RUNTIME_API_START
function silaRuntimeArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function silaRuntimeProcessOk(processes, name) {
  return silaRuntimeArray(processes).some((item) =>
    item && typeof item.Name === "string" && item.Name.toLowerCase() === name.toLowerCase()
  );
}

async function silaRuntimePowerShell(script) {
  return await new Promise((resolve) => {
    let childProcess;
    try {
      childProcess = require("child_process");
    } catch (error) {
      resolve({ ok: false, error: error.message, value: null });
      return;
    }

    childProcess.execFile(
      "powershell.exe",
      ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
      { windowsHide: true, timeout: 4000, maxBuffer: 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          resolve({
            ok: false,
            error: error.message,
            stderr: String(stderr || "").trim(),
            value: null
          });
          return;
        }

        const text = String(stdout || "").trim();
        if (!text) {
          resolve({ ok: true, error: null, value: [] });
          return;
        }

        try {
          resolve({ ok: true, error: null, value: JSON.parse(text) });
        } catch (parseError) {
          resolve({
            ok: false,
            error: parseError.message,
            stdout: text,
            value: null
          });
        }
      }
    );
  });
}

async function silaRuntimeLocal() {
  const processScript = `
$items = Get-CimInstance Win32_Process |
  Where-Object { $_.Name -in @('sila.exe','beacon-chain.exe','validator.exe','node.exe') } |
  Select-Object Name,ProcessId,CreationDate,ExecutablePath,CommandLine
@($items) | ConvertTo-Json -Depth 8
`;

  const portScript = `
$items = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
  Where-Object { $_.LocalPort -in 8545,8551,3500,4000,8787 } |
  Select-Object LocalAddress,LocalPort,OwningProcess |
  Sort-Object LocalPort
@($items) | ConvertTo-Json -Depth 8
`;

  const [processes, ports] = await Promise.all([
    silaRuntimePowerShell(processScript),
    silaRuntimePowerShell(portScript)
  ]);

  const processList = processes.ok ? silaRuntimeArray(processes.value) : [];
  const portList = ports.ok ? silaRuntimeArray(ports.value) : [];

  return {
    ok: processes.ok || ports.ok,
    processes: {
      ok: processes.ok,
      error: processes.error || null,
      items: processList,
      sila: silaRuntimeProcessOk(processList, "sila.exe"),
      beacon: silaRuntimeProcessOk(processList, "beacon-chain.exe"),
      validator: silaRuntimeProcessOk(processList, "validator.exe"),
      dashboard: silaRuntimeProcessOk(processList, "node.exe")
    },
    ports: {
      ok: ports.ok,
      error: ports.error || null,
      items: portList,
      required: {
        elRpc8545: portList.some((item) => Number(item.LocalPort) === 8545),
        elAuth8551: portList.some((item) => Number(item.LocalPort) === 8551),
        clRest3500: portList.some((item) => Number(item.LocalPort) === 3500),
        clGrpc4000: portList.some((item) => Number(item.LocalPort) === 4000),
        dashboard8787: portList.some((item) => Number(item.LocalPort) === 8787)
      }
    }
  };
}

async function runtimePage() {
  const [
    chainId,
    blockNumber,
    latestBlockRaw,
    syncing,
    health,
    version,
    head,
    local
  ] = await Promise.all([
    rpc("sila_chainId"),
    rpc("sila_blockNumber"),
    rpc("sila_getBlockByNumber", ["latest", false]),
    restJson("/sila/v1/node/syncing"),
    restStatus("/sila/v1/node/health"),
    restJson("/sila/v1/node/version"),
    restJson("/sila/v1/beacon/headers/head"),
    silaRuntimeLocal()
  ]);

  const latestBlock = latestBlockRaw.ok ? blockView(latestBlockRaw.value) : null;
  const recentBlocks = blockNumber.ok ? await getRecentBlocks(blockNumber.value, false) : [];
  const sync = syncing.ok && syncing.value && syncing.value.data ? syncing.value.data : null;
  const headData = head.ok && head.value && head.value.data ? head.value.data : null;

  const latestTimestamp = latestBlock && latestBlock.timestamp ? Number(latestBlock.timestamp) : 0;
  const latestAgeSeconds = latestTimestamp > 0 ? Math.max(0, Math.floor(Date.now() / 1000) - latestTimestamp) : null;
  const productionMoving = latestAgeSeconds !== null && latestAgeSeconds <= 45;

  const executionOk = chainId.ok && blockNumber.ok && latestBlockRaw.ok;
  const consensusRestOk = health.ok && syncing.ok && head.ok;
  const validatorProcessOk = !!(local.processes && local.processes.validator);

  return {
    ok: executionOk && consensusRestOk,
    generatedAt: new Date().toISOString(),
    chain: "Sila",
    title: "Sila Network Status",
    endpoints: {
      executionRpc: "http://127.0.0.1:8545",
      consensusRest: "http://127.0.0.1:3500",
      consensusGrpc: "127.0.0.1:4000",
      dashboard: "http://127.0.0.1:8787"
    },
    execution: {
      ok: executionOk,
      chainId: chainId.ok ? hexToDec(chainId.value) : null,
      latestBlockNumber: blockNumber.ok ? hexToDec(blockNumber.value) : null,
      latestBlock,
      latestAgeSeconds,
      productionMoving,
      recentBlocks,
      checks: { chainId, blockNumber, latestBlock: latestBlockRaw }
    },
    consensus: {
      ok: consensusRestOk,
      healthStatus: health.status || null,
      version: version.ok && version.value && version.value.data ? version.value.data.version : null,
      headSlot: sync ? sync.head_slot : null,
      syncDistance: sync ? sync.sync_distance : null,
      isSyncing: sync ? sync.is_syncing === true : null,
      isOptimistic: sync ? sync.is_optimistic === true : null,
      elOffline: sync ? sync.el_offline === true : null,
      headRoot: headData ? headData.root : null,
      finalized: headData ? headData.finalized === true : null,
      executionOptimistic: head.value ? head.value.execution_optimistic === true : null,
      checks: { health, version, syncing, head }
    },
    validator: {
      ok: validatorProcessOk,
      source: "local process inspection",
      processDetected: validatorProcessOk,
      note: validatorProcessOk
        ? "validator.exe process is running locally."
        : "validator.exe process was not detected locally."
    },
    local
  };
}
// SILA_RUNTIME_API_END

// SILA_BLOCKS_PAGE_START
async function blocksPage(query) {
  const limitRaw = Number(query.searchParams.get("limit") || 25);
  const limit = Math.max(1, Math.min(50, Number.isFinite(limitRaw) ? limitRaw : 25));

  const startParam = query.searchParams.get("start");
  let startHex = null;

  if (startParam) {
    startHex = startParam.startsWith("0x") ? startParam : decToHex(startParam);
  } else {
    const latest = await rpc("sila_blockNumber");
    if (!latest.ok || !latest.value) {
      return { ok: false, error: latest.error || "Unable to read latest Sila block number", blocks: [] };
    }
    startHex = latest.value;
  }

  const startDecRaw = hexToDec(startHex);
  if (startDecRaw === null) {
    return { ok: false, error: "Invalid Sila start block", blocks: [] };
  }

  const startDec = BigInt(startDecRaw);
  const jobs = [];

  for (let i = 0n; i < BigInt(limit); i++) {
    const n = startDec - i;
    if (n < 0n) break;
    jobs.push(rpc("sila_getBlockByNumber", [decToHex(n), false]));
  }

  const results = await Promise.all(jobs);
  const blocks = results
    .filter((item) => item.ok && item.value)
    .map((item) => blockView(item.value));

  const last = blocks.length ? BigInt(blocks[blocks.length - 1].number) : startDec;
  const nextStart = last > 0n ? (last - 1n).toString(10) : null;

  return {
    ok: true,
    generatedAt: new Date().toISOString(),
    chain: "Sila",
    startBlock: startDec.toString(10),
    nextStart,
    limit,
    count: blocks.length,
    blocks
  };
}
// SILA_BLOCKS_PAGE_END

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://" + req.headers.host);
  try {
    if (url.pathname === "/api/sila/runtime") return sendJson(res, 200, await runtimePage());
    if (url.pathname === "/api/sila/consensus") return sendJson(res, 200, await consensusPage());
    // SILA_FAVICON_ROUTE_START
    if (url.pathname === "/favicon.ico") {
      res.writeHead(302, { Location: "/favicon.svg" });
      return res.end();
    }
    // SILA_FAVICON_ROUTE_END
    if (url.pathname === "/api/sila/transactions") return sendJson(res, 200, await transactionsPage(url));
    if (url.pathname === "/api/sila/blocks") return sendJson(res, 200, await blocksPage(url));
    if (url.pathname === "/api/sila/summary") return sendJson(res, 200, await getSummary());
    if (url.pathname.startsWith("/api/sila/block/")) return sendJson(res, 200, await getBlock(url.pathname.slice("/api/sila/block/".length)));
    if (url.pathname.startsWith("/api/sila/tx/")) return sendJson(res, 200, await getTx(url.pathname.slice("/api/sila/tx/".length)));
    if (url.pathname.startsWith("/api/sila/address/")) return sendJson(res, 200, await getAddress(url.pathname.slice("/api/sila/address/".length)));
    return serveStatic(req, res);
  } catch (error) {
    return sendJson(res, 500, { ok: false, error: error.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log("SilaScan running at http://" + HOST + ":" + PORT);
  console.log("Sila EL RPC: " + SILA_EL_RPC);
  console.log("Sila CL API:  " + SILA_CL_API);
});


// SILA_TRANSACTIONS_PAGE_START
function silaTxDecToHex(value) {
  return "0x" + BigInt(value).toString(16);
}

function silaTxHexToBigInt(value, fallback = 0n) {
  try {
    if (typeof value === "number") return BigInt(value);
    if (typeof value === "bigint") return value;
    if (typeof value === "string" && value.startsWith("0x")) return BigInt(value);
    if (typeof value === "string" && value.length) return BigInt(value);
  } catch (_) {
    return fallback;
  }
  return fallback;
}

function silaTxHexToDecString(value) {
  return silaTxHexToBigInt(value, 0n).toString(10);
}

function silaTxShort(value) {
  if (!value || typeof value !== "string") return "";
  return value.length > 18 ? value.slice(0, 10) + "..." + value.slice(-8) : value;
}

function silaNormalizeTx(block, tx) {
  const blockNumberHex = tx.blockNumber || block.number || "0x0";
  const txHash = tx.hash || "";

  return {
    hash: txHash,
    hashShort: silaTxShort(txHash),
    blockNumber: silaTxHexToDecString(blockNumberHex),
    blockNumberHex,
    blockHash: tx.blockHash || block.hash || "",
    from: tx.from || "",
    fromShort: silaTxShort(tx.from || ""),
    to: tx.to || "",
    toShort: tx.to ? silaTxShort(tx.to) : "",
    valueWei: tx.value || "0x0",
    gas: tx.gas || "0x0",
    gasPrice: tx.gasPrice || tx.maxFeePerGas || "0x0",
    nonce: tx.nonce || "0x0",
    transactionIndex: tx.transactionIndex || "0x0",
    type: tx.type || "0x0",
    chainId: tx.chainId || null
  };
}

async function transactionsPage(query) {
  const limit = Math.max(1, Math.min(Number(query.searchParams.get("limit") || 25), 100));
  const blockLimit = Math.max(1, Math.min(Number(query.searchParams.get("blocks") || 250), 500));

  const latestRaw = await rpc("sila_blockNumber", []);
  if (!latestRaw.ok || !latestRaw.value) {
    return {
      ok: false,
      chain: "Sila",
      generatedAt: new Date().toISOString(),
      error: latestRaw.error || "Unable to read latest Sila block number",
      latestBlock: null,
      scannedBlockCount: 0,
      scannedBlocks: [],
      requestedBlockLimit: blockLimit,
      count: 0,
      transactions: [],
      errors: []
    };
  }

  const latest = silaTxHexToBigInt(latestRaw.value, -1n);
  if (latest < 0n) {
    return {
      ok: false,
      chain: "Sila",
      generatedAt: new Date().toISOString(),
      error: "Invalid latest Sila block number",
      latestBlock: null,
      scannedBlockCount: 0,
      scannedBlocks: [],
      requestedBlockLimit: blockLimit,
      count: 0,
      transactions: [],
      errors: []
    };
  }

  const transactions = [];
  const scannedBlocks = [];
  const errors = [];

  for (let offset = 0n; offset < BigInt(blockLimit); offset++) {
    const blockNumber = latest - offset;
    if (blockNumber < 0n) break;

    const blockRaw = await rpc("sila_getBlockByNumber", [silaTxDecToHex(blockNumber), true]);

    if (!blockRaw.ok || !blockRaw.value) {
      if (errors.length < 8) {
        errors.push({
          blockNumber: blockNumber.toString(10),
          error: blockRaw.error || "Unable to read block"
        });
      }
      continue;
    }

    const block = blockRaw.value;
    scannedBlocks.push(silaTxHexToDecString(block.number || silaTxDecToHex(blockNumber)));

    const txs = Array.isArray(block.transactions) ? block.transactions : [];
    for (const tx of txs) {
      if (!tx || typeof tx !== "object") continue;
      transactions.push(silaNormalizeTx(block, tx));
      if (transactions.length >= limit) break;
    }

    if (transactions.length >= limit) break;
  }

  return {
    ok: true,
    chain: "Sila",
    generatedAt: new Date().toISOString(),
    latestBlock: latest.toString(10),
    scannedBlockCount: scannedBlocks.length,
    scannedBlocks,
    requestedBlockLimit: blockLimit,
    count: transactions.length,
    transactions,
    errors
  };
}
// SILA_TRANSACTIONS_PAGE_END
function silaAddressNormalize(value) {
  return String(value || "").toLowerCase();
}

async function silaAddressTransactions(address, limit = 25, blocks = 500) {
  const scanUrl = new URL("http://127.0.0.1/api/sila/transactions?limit=100&blocks=" + String(blocks));
  const scan = await transactionsPage(scanUrl);

  if (!scan.ok || !Array.isArray(scan.transactions)) {
    return {
      ok: false,
      scannedBlockCount: scan.scannedBlockCount || 0,
      scannedBlocks: scan.scannedBlocks || [],
      count: 0,
      transactions: [],
      error: scan.error || "Unable to scan Sila transactions"
    };
  }

  const target = silaAddressNormalize(address);
  const matches = scan.transactions
    .filter((tx) => silaAddressNormalize(tx.from) === target || silaAddressNormalize(tx.to) === target)
    .slice(0, Math.max(1, Math.min(Number(limit || 25), 100)));

  return {
    ok: true,
    scannedBlockCount: scan.scannedBlockCount || 0,
    scannedBlocks: scan.scannedBlocks || [],
    count: matches.length,
    transactions: matches
  };
}

// SILA_CONSENSUS_PAGE_START
async function consensusPage() {
  const summary = await getSummary();
  const consensus = summary.consensus || { ok: false };
  const syncing = consensus.syncing || {};
  const headHeader = consensus.headHeader || {};

  return {
    ok: !!consensus.ok,
    generatedAt: new Date().toISOString(),
    chain: "Sila",
    source: "Sila-Prysm",
    status: consensus.ok ? "online" : "offline",
    healthStatus: consensus.healthStatus || null,
    version: consensus.version || null,
    headSlot: syncing.headSlot || null,
    syncDistance: syncing.syncDistance || null,
    isSyncing: syncing.isSyncing === true,
    isOptimistic: syncing.isOptimistic === true,
    elOffline: syncing.elOffline === true,
    headRoot: headHeader.root || null,
    headRootShort: headHeader.rootShort || null,
    canonical: headHeader.canonical === true,
    finalized: headHeader.finalized === true,
    executionOptimistic: headHeader.executionOptimistic === true,
    proposerIndex: headHeader.proposerIndex || null,
    parentRoot: headHeader.parentRoot || null,
    stateRoot: headHeader.stateRoot || null,
    bodyRoot: headHeader.bodyRoot || null,
    headBlockStatus: consensus.headBlockStatus || null,
    validatorRegistry: {
      available: false,
      reason: "Validator list endpoint is not indexed in this lightweight SilaScan page yet."
    },
    raw: consensus
  };
}
// SILA_CONSENSUS_PAGE_END