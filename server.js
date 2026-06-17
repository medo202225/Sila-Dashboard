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
  const fullBlocks = fullLatestBlock.ok ? [blockView(fullLatestBlock.value)] : blocks;
  const txs = txsFromBlocks(fullBlocks);
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
  const clean = decodeURIComponent(address);
  const [balance, nonce, code] = await Promise.all([
    rpc("sila_getBalance", [clean, "latest"]),
    rpc("sila_getTransactionCount", [clean, "latest"]),
    rpc("sila_getCode", [clean, "latest"])
  ]);
  return {
    ok: balance.ok || nonce.ok || code.ok,
    query: clean,
    balanceWeiHex: balance.value,
    balanceWei: hexToDec(balance.value),
    balanceSila: weiToSilaString(balance.value || "0x0"),
    nonceHex: nonce.value,
    nonce: hexToDec(nonce.value),
    isContract: code.ok && code.value && code.value !== "0x",
    checks: { balance, nonce, code }
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

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://" + req.headers.host);
  try {
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
