const byId = (id) => document.getElementById(id);

const state = {
  lang: localStorage.getItem("silaLang") || "en",
  theme: localStorage.getItem("silaTheme") || "light",
  autoRefresh: localStorage.getItem("silaAutoRefresh") !== "off",
  refreshInterval: Number(localStorage.getItem("silaRefreshInterval") || "5000"),
  rawJson: localStorage.getItem("silaRawJson") !== "hide",
  timer: null
};

const dict = {
  en: {
    priceLabel: "SILA Price", gasLabel: "Gas", navHome: "Home", navBlockchain: "Blockchain", navWallet: "Wallet", navValidators: "Validators", navDevelopers: "Developers", navMore: "More",
    heroTitle: "The Sila Blockchain Explorer", allFilters: "All Filters", block: "Block", transaction: "Transaction", address: "Address", searchPlaceholder: "Search by Address / Txn Hash / Block",
    silaPriceTitle: "SILA PRICE", marketCap: "MARKET CAP", transactionsTitle: "TRANSACTIONS", gasTitle: "SILA GAS", headSlotTitle: "HEAD SLOT", latestBlockTitle: "LATEST BLOCK", historyTitle: "SILA ACTIVITY",
    latestBlocks: "Latest Blocks", latestTransactions: "Latest Transactions", customize: "Customize", viewAllBlocks: "View all blocks →", viewAllTransactions: "View all transactions →",
    loadingBlocks: "Loading Sila blocks...", loadingTxs: "Loading Sila transactions...", explorerTitle: "Blockchain Explorer", search: "Search", blockHeight: "Block Height", transactions: "Transactions", headSlot: "Head Slot", tps: "TPS", gasUsed: "GAS USED", status: "STATUS", recentBlocks: "Recent Blocks", recentTransactions: "Recent Transactions",
    walletTitle: "Sila Wallet", walletDesc: "Read-only address inspection. No private keys, no seed phrase, no signing, no sending.", inspect: "Inspect", balanceWei: "Balance Wei", nonce: "Nonce", contract: "Contract",
    validatorsTitle: "Sila Validators", validatorsDesc: "Validator monitoring only. Key management stays outside the Explorer.", syncDistance: "Sync Distance", executionOffline: "Execution Offline",
    developersTitle: "Sila Developers", developersDesc: "Visible Sila API contract used by this Explorer.", moreTitle: "More Sila Tools", networkStatus: "Network Status", apiDocs: "API Documentation", addressTools: "Address Tools",
    footerDesc: "SilaScan is a Sila block explorer and analytics interface for the Sila network.", company: "Company", about: "About", contact: "Contact", brandAssets: "Brand Assets", community: "Community", products: "Products & Services",
    refreshNow: "Refresh now", autoRefresh: "Auto refresh", refreshInterval: "Refresh interval", developerJson: "Developer JSON"
  },
  ar: {
    priceLabel: "سعر سيلا", gasLabel: "الغاز", navHome: "الرئيسية", navBlockchain: "البلوكشين", navWallet: "المحفظة", navValidators: "المدققون", navDevelopers: "المطورون", navMore: "المزيد",
    heroTitle: "مستكشف بلوكشين سيلا", allFilters: "كل الفلاتر", block: "بلوك", transaction: "معاملة", address: "عنوان", searchPlaceholder: "ابحث بعنوان / هاش معاملة / رقم بلوك",
    silaPriceTitle: "سعر سيلا", marketCap: "القيمة السوقية", transactionsTitle: "المعاملات", gasTitle: "غاز سيلا", headSlotTitle: "رأس السلسلة", latestBlockTitle: "آخر بلوك", historyTitle: "نشاط سيلا",
    latestBlocks: "آخر البلوكات", latestTransactions: "آخر المعاملات", customize: "تخصيص", viewAllBlocks: "عرض كل البلوكات ←", viewAllTransactions: "عرض كل المعاملات ←",
    loadingBlocks: "جاري تحميل بلوكات سيلا...", loadingTxs: "جاري تحميل معاملات سيلا...", explorerTitle: "مستكشف البلوكشين", search: "بحث", blockHeight: "ارتفاع البلوك", transactions: "المعاملات", headSlot: "Head Slot", tps: "TPS", gasUsed: "الغاز المستخدم", status: "الحالة", recentBlocks: "البلوكات الأخيرة", recentTransactions: "المعاملات الأخيرة",
    walletTitle: "محفظة سيلا", walletDesc: "فحص عنوان للقراءة فقط. لا مفاتيح خاصة، لا عبارة استرداد، لا توقيع، لا إرسال.", inspect: "فحص", balanceWei: "الرصيد Wei", nonce: "Nonce", contract: "عقد",
    validatorsTitle: "مدققو سيلا", validatorsDesc: "مراقبة المدققين فقط. إدارة المفاتيح تبقى خارج المستكشف.", syncDistance: "مسافة المزامنة", executionOffline: "التنفيذ غير متصل",
    developersTitle: "مطورو سيلا", developersDesc: "عقد API الظاهر المستخدم في هذا المستكشف.", moreTitle: "أدوات سيلا", networkStatus: "حالة الشبكة", apiDocs: "توثيق API", addressTools: "أدوات العناوين",
    footerDesc: "SilaScan هو مستكشف بلوكات وتحليلات لشبكة سيلا.", company: "الشركة", about: "حول", contact: "تواصل", brandAssets: "أصول العلامة", community: "المجتمع", products: "المنتجات والخدمات",
    refreshNow: "تحديث الآن", autoRefresh: "تحديث تلقائي", refreshInterval: "فترة التحديث", developerJson: "JSON للمطور"
  },
  fr: {
    priceLabel: "Prix SILA", gasLabel: "Gaz", navHome: "Accueil", navBlockchain: "Blockchain", navWallet: "Portefeuille", navValidators: "Validateurs", navDevelopers: "Développeurs", navMore: "Plus",
    heroTitle: "Explorateur de la blockchain Sila", allFilters: "Tous les filtres", block: "Bloc", transaction: "Transaction", address: "Adresse", searchPlaceholder: "Rechercher par adresse / hash / bloc",
    silaPriceTitle: "PRIX SILA", marketCap: "CAPITALISATION", transactionsTitle: "TRANSACTIONS", gasTitle: "GAZ SILA", headSlotTitle: "HEAD SLOT", latestBlockTitle: "DERNIER BLOC", historyTitle: "ACTIVITÉ SILA",
    latestBlocks: "Derniers blocs", latestTransactions: "Dernières transactions", customize: "Personnaliser", viewAllBlocks: "Voir tous les blocs →", viewAllTransactions: "Voir toutes les transactions →",
    loadingBlocks: "Chargement des blocs Sila...", loadingTxs: "Chargement des transactions Sila...", explorerTitle: "Explorateur blockchain", search: "Rechercher", blockHeight: "Hauteur du bloc", transactions: "Transactions", headSlot: "Head Slot", tps: "TPS", gasUsed: "GAZ UTILISÉ", status: "STATUT", recentBlocks: "Blocs récents", recentTransactions: "Transactions récentes",
    walletTitle: "Portefeuille Sila", walletDesc: "Inspection d’adresse en lecture seule. Pas de clés privées, pas de seed phrase, pas de signature, pas d’envoi.", inspect: "Inspecter", balanceWei: "Solde Wei", nonce: "Nonce", contract: "Contrat",
    validatorsTitle: "Validateurs Sila", validatorsDesc: "Surveillance uniquement. La gestion des clés reste hors de l’explorateur.", syncDistance: "Distance de synchronisation", executionOffline: "Exécution hors ligne",
    developersTitle: "Développeurs Sila", developersDesc: "Contrat API Sila visible utilisé par cet explorateur.", moreTitle: "Outils Sila", networkStatus: "État du réseau", apiDocs: "Documentation API", addressTools: "Outils d’adresse",
    footerDesc: "SilaScan est un explorateur de blocs et une interface d’analyse pour le réseau Sila.", company: "Entreprise", about: "À propos", contact: "Contact", brandAssets: "Marque", community: "Communauté", products: "Produits et services",
    refreshNow: "Actualiser", autoRefresh: "Actualisation auto", refreshInterval: "Intervalle", developerJson: "JSON développeur"
  }
};

function t(key) {
  return (dict[state.lang] && dict[state.lang][key]) || dict.en[key] || key;
}

function setText(id, value) {
  const node = byId(id);
  if (node) node.textContent = value === null || value === undefined || value === "" ? "—" : String(value);
}

function yesNo(value) {
  if (value === true) return state.lang === "ar" ? "نعم" : state.lang === "fr" ? "Oui" : "Yes";
  if (value === false) return state.lang === "ar" ? "لا" : state.lang === "fr" ? "Non" : "No";
  return "—";
}

function shortHash(value) {
  if (!value || typeof value !== "string") return "—";
  if (value.length <= 18) return value;
  return value.slice(0, 8) + "..." + value.slice(-6);
}

function timeAgo(timestampSeconds) {
  const ts = Number(timestampSeconds || 0);
  if (!ts) return "—";
  const diff = Math.max(0, Math.floor(Date.now() / 1000) - ts);
  if (diff < 60) return diff + " secs ago";
  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return minutes + " min ago";
  return Math.floor(minutes / 60) + " hrs ago";
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n")); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"))); });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active-menu", button.getAttribute("data-lang") === state.lang);
  });
  localStorage.setItem("silaLang", state.lang);
}

function applyTheme() {
  document.body.classList.remove("dark", "dim");
  if (state.theme === "dark") document.body.classList.add("dark");
  if (state.theme === "dim") document.body.classList.add("dim");
  byId("themeToggle").textContent = state.theme === "light" ? "☼" : state.theme === "dim" ? "◐" : "☾";
  localStorage.setItem("silaTheme", state.theme);
}

function closeMenus() {
  ["settingsDropdown", "languageDropdown", "networkDropdown"].forEach((id) => {
    const node = byId(id);
    if (node) node.classList.add("hidden");
  });
}

function toggleMenu(id) {
  const menu = byId(id);
  if (!menu) return;
  const wasHidden = menu.classList.contains("hidden");
  closeMenus();
  if (wasHidden) menu.classList.remove("hidden");
}

function showView(name) {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  document.querySelectorAll(".nav-btn").forEach((node) => node.classList.remove("active"));
  const view = byId(name + "View");
  const button = document.querySelector("[data-view=\"" + name + "\"]");
  if (view) view.classList.add("active-view");
  if (button) button.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showResult(title, data) {
  showView("explorer");
  byId("resultPanel").classList.remove("hidden");
  setText("resultTitle", title);
  byId("resultBody").textContent = JSON.stringify(data, null, 2);
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  return await response.json();
}

function blockRow(block) {
  return `
    <div class="feed-row">
      <div class="feed-icon">□</div>
      <div class="feed-main">
        <b data-block="${block.number}">${block.number || "—"}</b>
        <small>${timeAgo(block.timestamp)}</small>
      </div>
      <div class="feed-side">
        <div>${block.transactionCount || 0} txns</div>
        <span class="pill">${block.reward || "0 SILA"}</span>
      </div>
    </div>
  `;
}

function txRow(tx) {
  return `
    <div class="feed-row">
      <div class="feed-icon">▤</div>
      <div class="feed-main">
        <b data-tx="${tx.hash}">${shortHash(tx.hash)}</b>
        <small>Block #${tx.blockNumber || "—"}</small>
      </div>
      <div class="feed-side">
        <div>${tx.toShort ? "To " + tx.toShort : "Seen"}</div>
        <span class="pill">${tx.value || "0 SILA"}</span>
      </div>
    </div>
  `;
}

function renderSparkline(blocks) {
  const node = byId("sparkline");
  const safe = Array.isArray(blocks) ? blocks : [];
  if (!safe.length) {
    node.innerHTML = "<i style=\"height:6px\"></i>";
    return;
  }
  const max = Math.max(1, ...safe.map((b) => Number(b.transactionCount || 0)));
  node.innerHTML = safe.slice().reverse().map((b) => {
    const h = 8 + Math.round((Number(b.transactionCount || 0) / max) * 78);
    return `<i title="Block ${b.number}" style="height:${h}px"></i>`;
  }).join("");
}

function renderBlocks(blocks) {
  const safe = Array.isArray(blocks) ? blocks : [];
  byId("homeBlocksList").innerHTML = safe.length ? safe.slice(0, 6).map(blockRow).join("") : `<div class="loading">No Sila blocks available</div>`;
  byId("blocksBody").innerHTML = safe.length
    ? safe.map((block) => `<tr><td class="link" data-block="${block.number}">#${block.number}</td><td>${block.transactionCount || 0}</td><td>${block.gasUsed || "—"}</td><td class="link" data-block="${block.hash}">${shortHash(block.hash)}</td></tr>`).join("")
    : `<tr><td colspan="4">No Sila blocks available</td></tr>`;
  renderSparkline(safe);
}

function renderTransactions(txs) {
  const safe = Array.isArray(txs) ? txs : [];
  byId("homeTxList").innerHTML = safe.length ? safe.slice(0, 6).map(txRow).join("") : `<div class="loading">No Sila transactions in recent blocks yet</div>`;
  byId("txBody").innerHTML = safe.length
    ? safe.map((tx) => `<tr><td class="link" data-tx="${tx.hash}">${shortHash(tx.hash)}</td><td>#${tx.blockNumber || "—"}</td><td><span class="pill">Seen</span></td></tr>`).join("")
    : `<tr><td colspan="3">No Sila transactions in recent blocks yet</td></tr>`;
}

function render(data) {
  setText("silaPrice", data.display.price);
  setText("gasPrice", data.display.gas);
  setText("homePrice", data.display.price);
  setText("homeMarketCap", data.display.marketCap);
  setText("homeTransactions", data.stats.recentTransactionCount);
  setText("homeTps", "(" + data.stats.tps + " TPS)");
  setText("homeGas", data.display.gas);
  setText("homeHeadSlot", data.consensus.syncing.headSlot);
  setText("homeLatestBlock", data.execution.blockNumber);
  setText("networkLine", data.status === "online" ? "Sila Network Online" : "Sila Network Needs Check");
  setText("blockHeight", data.execution.blockNumber);
  setText("txCount", data.stats.recentTransactionCount);
  setText("headSlot", data.consensus.syncing.headSlot);
  setText("tps", data.stats.tps);
  setText("validatorHeadSlot", data.consensus.syncing.headSlot);
  setText("validatorSyncDistance", data.consensus.syncing.syncDistance);
  setText("validatorElOffline", yesNo(data.consensus.syncing.elOffline));
  renderBlocks(data.execution.recentBlocks);
  renderTransactions(data.execution.recentTransactions);
}

async function refresh() {
  try {
    render(await fetchJson("/api/sila/summary"));
  } catch (error) {
    setText("homeSearchStatus", "SilaScan error: " + error.message);
    setText("networkLine", "SilaScan error: " + error.message);
  }
}

async function lookup(value, statusId) {
  const input = value.trim();
  if (!input) return;
  setText(statusId, "Searching Sila...");
  const cleanBlock = input.replace(/^#/, "");
  const isAddress = /^0x[0-9a-fA-F]{40}$/.test(input);
  const isHash = /^0x[0-9a-fA-F]{64}$/.test(input);
  const isBlock = /^[0-9]+$/.test(cleanBlock) || /^0x[0-9a-fA-F]+$/.test(cleanBlock);
  try {
    if (isAddress) {
      const data = await fetchJson("/api/sila/address/" + encodeURIComponent(input));
      showResult("Sila Address", data);
      setText(statusId, data.ok ? "Sila address loaded." : "Limited Sila address data.");
      return;
    }
    if (isHash) {
      const tx = await fetchJson("/api/sila/tx/" + encodeURIComponent(input));
      if (tx.ok) {
        showResult("Sila Transaction", tx);
        setText(statusId, "Sila transaction loaded.");
        return;
      }
      const block = await fetchJson("/api/sila/block/" + encodeURIComponent(input));
      showResult("Sila Hash Lookup", { transaction: tx, block });
      setText(statusId, block.ok ? "Sila block loaded." : "No Sila transaction or block found.");
      return;
    }
    if (isBlock) {
      const data = await fetchJson("/api/sila/block/" + encodeURIComponent(cleanBlock));
      showResult("Sila Block", data);
      setText(statusId, data.ok ? "Sila block loaded." : "Sila block not found.");
      return;
    }
    setText(statusId, "Enter a Sila block number, transaction hash, block hash, or address.");
  } catch (error) {
    setText(statusId, "Sila lookup error: " + error.message);
  }
}

async function inspectWallet(address) {
  const input = address.trim();
  if (!/^0x[0-9a-fA-F]{40}$/.test(input)) {
    setText("walletStatus", "Enter a valid Sila address.");
    return;
  }
  setText("walletStatus", "Inspecting Sila address...");
  try {
    const data = await fetchJson("/api/sila/address/" + encodeURIComponent(input));
    setText("walletBalance", data.balanceSila || data.balanceWei);
    setText("walletNonce", data.nonce);
    setText("walletContract", yesNo(data.isContract));
    byId("walletRaw").textContent = JSON.stringify(data, null, 2);
    setText("walletStatus", data.ok ? "Sila address loaded." : "Limited Sila address data.");
  } catch (error) {
    setText("walletStatus", "Sila wallet lookup error: " + error.message);
  }
}

function restartAutoRefresh() {
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
  if (state.autoRefresh) state.timer = setInterval(refresh, state.refreshInterval);
  byId("autoRefreshState").textContent = state.autoRefresh ? "ON" : "OFF";
  localStorage.setItem("silaAutoRefresh", state.autoRefresh ? "on" : "off");
  localStorage.setItem("silaRefreshInterval", String(state.refreshInterval));
}

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => showView(button.getAttribute("data-view")));
});

document.querySelectorAll("[data-view-link]").forEach((button) => {
  button.addEventListener("click", () => showView(button.getAttribute("data-view-link")));
});

byId("homeSearchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  lookup(byId("homeSearchInput").value, "homeSearchStatus");
});

byId("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  lookup(byId("searchInput").value, "searchStatus");
});

byId("walletForm").addEventListener("submit", (event) => {
  event.preventDefault();
  inspectWallet(byId("walletAddress").value);
});

document.addEventListener("click", (event) => {
  const block = event.target.getAttribute("data-block");
  const tx = event.target.getAttribute("data-tx");
  if (block) lookup(block, "searchStatus");
  if (tx) lookup(tx, "searchStatus");
});

byId("settingsButton").addEventListener("click", (event) => { event.stopPropagation(); toggleMenu("settingsDropdown"); });
byId("languageButton").addEventListener("click", (event) => { event.stopPropagation(); toggleMenu("languageDropdown"); });
byId("networkButton").addEventListener("click", (event) => { event.stopPropagation(); toggleMenu("networkDropdown"); });

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.getAttribute("data-lang");
    applyLanguage();
    closeMenus();
  });
});

byId("themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "light" ? "dim" : state.theme === "dim" ? "dark" : "light";
  applyTheme();
});

byId("settingsRefreshNow").addEventListener("click", () => {
  refresh();
  closeMenus();
});

byId("settingsAutoRefresh").addEventListener("click", () => {
  state.autoRefresh = !state.autoRefresh;
  restartAutoRefresh();
});

document.querySelectorAll("[data-refresh-interval]").forEach((button) => {
  button.addEventListener("click", () => {
    state.refreshInterval = Number(button.getAttribute("data-refresh-interval"));
    restartAutoRefresh();
    closeMenus();
  });
});

byId("settingsRawJson").addEventListener("click", () => {
  state.rawJson = !state.rawJson;
  document.body.classList.toggle("developer-json-hidden", !state.rawJson);
  byId("rawJsonState").textContent = state.rawJson ? "SHOW" : "HIDE";
  localStorage.setItem("silaRawJson", state.rawJson ? "show" : "hide");
});

document.addEventListener("click", closeMenus);

applyLanguage();
applyTheme();
document.body.classList.toggle("developer-json-hidden", !state.rawJson);
byId("rawJsonState").textContent = state.rawJson ? "SHOW" : "HIDE";
restartAutoRefresh();
refresh();


// SILA_REAL_BLOCKS_PAGE_START
let silaBlocksNextStart = null;
let silaBlocksCurrentStart = null;

function silaBlocksEscape(value) {
  return String(value === null || value === undefined ? "" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function silaBlocksShort(value) {
  if (!value || typeof value !== "string") return "—";
  return value.length <= 18 ? value : value.slice(0, 10) + "..." + value.slice(-8);
}

function silaBlocksAge(timestamp) {
  if (!timestamp) return "—";
  const seconds = Math.max(0, Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(seconds)) return "—";
  if (seconds < 60) return seconds + " secs ago";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + " mins ago";
  const hours = Math.floor(minutes / 60);
  return hours + " hrs ago";
}

function silaBlocksEnsureFeatureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view page";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaBlocksShowFeatureView() {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaBlocksEnsureFeatureView();
  view.classList.add("active-view");
  return view;
}

async function silaRenderBlocksPage(start) {
  const view = silaBlocksShowFeatureView();
  view.innerHTML = ""
    + "<section class=\"feature-hero\">"
    + "  <small>Blockchain</small>"
    + "  <h1>Sila Blocks</h1>"
    + "  <p>View the latest blocks validated on the Sila network.</p>"
    + "</section>"
    + "<section class=\"panel\" style=\"margin-top:20px\">"
    + "  <div class=\"sila-blocks-toolbar\">"
    + "    <div class=\"left\">"
    + "      <h2 style=\"margin:0\">Latest Sila Blocks</h2>"
    + "      <small id=\"silaBlocksMeta\">Loading Sila blocks...</small>"
    + "    </div>"
    + "    <div class=\"sila-blocks-actions\">"
    + "      <button type=\"button\" id=\"silaBlocksRefresh\">Refresh</button>"
    + "      <button type=\"button\" id=\"silaBlocksOlder\">Older Blocks</button>"
    + "    </div>"
    + "  </div>"
    + "  <div id=\"silaBlocksContent\" class=\"sila-blocks-table-wrap\"><div class=\"sila-empty-note\">Loading...</div></div>"
    + "</section>";

  const query = start ? "?limit=25&start=" + encodeURIComponent(start) : "?limit=25";
  let data;

  try {
    data = await fetch("/api/sila/blocks" + query, { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    document.getElementById("silaBlocksContent").innerHTML = "<div class=\"sila-empty-note\">Sila blocks API error: " + silaBlocksEscape(error.message) + "</div>";
    return;
  }

  silaBlocksNextStart = data.nextStart || null;
  silaBlocksCurrentStart = data.startBlock || null;

  const meta = document.getElementById("silaBlocksMeta");
  if (meta) {
    meta.textContent = data.ok ? "Showing " + data.count + " blocks from #" + data.startBlock : "Unable to load Sila blocks";
  }

  const content = document.getElementById("silaBlocksContent");

  if (!data.ok || !Array.isArray(data.blocks) || data.blocks.length === 0) {
    content.innerHTML = "<div class=\"sila-empty-note\">No Sila blocks available.</div>";
  } else {
    content.innerHTML = ""
      + "<table class=\"sila-blocks-table\">"
      + "  <thead>"
      + "    <tr>"
      + "      <th>Block</th>"
      + "      <th>Age</th>"
      + "      <th>Txn</th>"
      + "      <th>Gas Used</th>"
      + "      <th>Gas Limit</th>"
      + "      <th>Base Fee</th>"
      + "      <th>Fee Recipient</th>"
      + "      <th>Hash</th>"
      + "    </tr>"
      + "  </thead>"
      + "  <tbody>"
      + data.blocks.map((block) => ""
      + "    <tr>"
      + "      <td><span class=\"block-number\" data-block=\"" + silaBlocksEscape(block.number) + "\">#" + silaBlocksEscape(block.number) + "</span></td>"
      + "      <td>" + silaBlocksEscape(silaBlocksAge(block.timestamp)) + "</td>"
      + "      <td>" + silaBlocksEscape(block.transactionCount || 0) + "</td>"
      + "      <td>" + silaBlocksEscape(block.gasUsed || "0") + "</td>"
      + "      <td>" + silaBlocksEscape(block.gasLimit || "—") + "</td>"
      + "      <td>" + silaBlocksEscape(block.baseFeePerGas || "—") + " wei</td>"
      + "      <td class=\"mono\">" + silaBlocksEscape(block.minerShort || silaBlocksShort(block.miner)) + "</td>"
      + "      <td><span class=\"hash-link\" data-block=\"" + silaBlocksEscape(block.hash) + "\">" + silaBlocksEscape(block.hashShort || silaBlocksShort(block.hash)) + "</span></td>"
      + "    </tr>").join("")
      + "  </tbody>"
      + "</table>";
  }

  const refresh = document.getElementById("silaBlocksRefresh");
  if (refresh) refresh.addEventListener("click", () => silaRenderBlocksPage(null));

  const older = document.getElementById("silaBlocksOlder");
  if (older) {
    older.disabled = !silaBlocksNextStart;
    older.addEventListener("click", () => {
      if (silaBlocksNextStart) silaRenderBlocksPage(silaBlocksNextStart);
    });
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (!button) return;

  const page = button.getAttribute("data-page");
  if (page !== "blocks") return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRenderBlocksPage(null);
}, true);

window.silaRenderBlocksPage = silaRenderBlocksPage;
// SILA_REAL_BLOCKS_PAGE_END

// SILA_BLOCK_DETAILS_PAGE_START
function silaDetailEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function silaDetailShort(value) {
  if (!value || typeof value !== "string") return "—";
  return value.length <= 22 ? value : value.slice(0, 12) + "..." + value.slice(-10);
}

function silaDetailAge(timestamp) {
  if (!timestamp) return "—";
  const seconds = Math.max(0, Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(seconds)) return "—";
  if (seconds < 60) return seconds + " secs ago";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + " mins ago";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + " hrs ago";
  const days = Math.floor(hours / 24);
  return days + " days ago";
}

function silaDetailEnsureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view page";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaDetailShowView() {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaDetailEnsureView();
  view.classList.add("active-view");
  return view;
}

function silaDetailRow(label, value, mono, copy) {
  const safeValue = silaDetailEscape(value);
  const copyButton = copy && value && value !== "—"
    ? " <button class=\"sila-copy-btn\" type=\"button\" data-copy=\"" + safeValue + "\">Copy</button>"
    : "";

  return ""
    + "<div class=\"sila-detail-label\">" + silaDetailEscape(label) + "</div>"
    + "<div class=\"sila-detail-value" + (mono ? " mono" : "") + "\">" + safeValue + copyButton + "</div>";
}

async function silaRenderBlockDetails(blockId) {
  const view = silaDetailShowView();

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Block Details</small>"
    + "    <h1>Sila Block</h1>"
    + "    <p class=\"muted\">Loading Sila block details...</p>"
    + "  </div>"
    + "</section>";

  let data;

  try {
    data = await fetch("/api/sila/block/" + encodeURIComponent(blockId), { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    view.innerHTML = "<section class=\"panel\"><h2>Sila Block</h2><p class=\"muted\">Block API error: " + silaDetailEscape(error.message) + "</p></section>";
    return;
  }

  if (!data || !data.ok || !data.block) {
    view.innerHTML = "<section class=\"panel\"><h2>Sila Block</h2><p class=\"muted\">Sila block not found.</p><pre>" + silaDetailEscape(JSON.stringify(data, null, 2)) + "</pre></section>";
    return;
  }

  const block = data.block;
  const number = block.number || "—";
  const prev = number !== "—" && Number(number) > 0 ? String(Number(number) - 1) : null;
  const next = number !== "—" ? String(Number(number) + 1) : null;

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Block Details</small>"
    + "    <h1>Sila Block #" + silaDetailEscape(number) + "</h1>"
    + "    <p class=\"muted\">Detailed execution-layer block information from Sila RPC.</p>"
    + "  </div>"
    + "  <div class=\"sila-detail-actions\">"
    + "    <button type=\"button\" data-page=\"blocks\">All Blocks</button>"
    + (prev ? "    <button type=\"button\" data-sila-block-detail=\"" + silaDetailEscape(prev) + "\">Previous</button>" : "")
    + (next ? "    <button type=\"button\" data-sila-block-detail=\"" + silaDetailEscape(next) + "\">Next</button>" : "")
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Overview</h2>"
    + "  <div class=\"sila-detail-grid\">"
    + silaDetailRow("Block Height", "#" + number, false, false)
    + silaDetailRow("Status", "Finalized / canonical data depends on consensus finality endpoint", false, false)
    + silaDetailRow("Timestamp", block.timestamp ? block.timestamp + " (" + silaDetailAge(block.timestamp) + ")" : "—", false, false)
    + silaDetailRow("Transactions", block.transactionCount || 0, false, false)
    + silaDetailRow("Fee Recipient", block.miner || "—", true, true)
    + silaDetailRow("Block Reward", block.reward || "0 SILA", false, false)
    + silaDetailRow("Gas Used", block.gasUsed || "0", false, false)
    + silaDetailRow("Gas Limit", block.gasLimit || "—", false, false)
    + silaDetailRow("Base Fee Per Gas", block.baseFeePerGas ? block.baseFeePerGas + " wei" : "—", false, false)
    + silaDetailRow("Hash", block.hash || "—", true, true)
    + silaDetailRow("Parent Hash", block.parentHash || "—", true, true)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Raw Sila Block JSON</h2>"
    + "  <pre>" + silaDetailEscape(JSON.stringify(data.raw && data.raw.value ? data.raw.value : data, null, 2)) + "</pre>"
    + "</section>";
}

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-sila-block-detail]");
  if (detailButton) {
    event.preventDefault();
    event.stopImmediatePropagation();
    silaRenderBlockDetails(detailButton.getAttribute("data-sila-block-detail"));
    return;
  }

  const blockButton = event.target.closest("[data-block]");
  if (!blockButton) return;

  const blockId = blockButton.getAttribute("data-block");
  if (!blockId) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRenderBlockDetails(blockId);
}, true);

document.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy]");
  if (!copyButton) return;

  const value = copyButton.getAttribute("data-copy");
  navigator.clipboard.writeText(value).then(() => {
    copyButton.textContent = "Copied";
    setTimeout(() => { copyButton.textContent = "Copy"; }, 900);
  }).catch(() => {
    copyButton.textContent = "Copy failed";
    setTimeout(() => { copyButton.textContent = "Copy"; }, 900);
  });
});

window.silaRenderBlockDetails = silaRenderBlockDetails;
// SILA_BLOCK_DETAILS_PAGE_END