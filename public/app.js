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

// SILA_TX_DETAILS_PAGE_START
function silaTxEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function silaTxHexToDec(value) {
  if (!value || typeof value !== "string" || !value.startsWith("0x")) return "—";
  try { return BigInt(value).toString(10); } catch { return "—"; }
}

function silaTxWeiToSila(value) {
  if (!value || typeof value !== "string" || !value.startsWith("0x")) return "—";
  try {
    const wei = BigInt(value);
    const base = 1000000000000000000n;
    const whole = wei / base;
    const frac = (wei % base).toString().padStart(18, "0").replace(/0+$/, "");
    return frac ? whole.toString() + "." + frac + " SILA" : whole.toString() + " SILA";
  } catch {
    return "—";
  }
}

function silaTxEnsureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view page";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaTxShowView() {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaTxEnsureView();
  view.classList.add("active-view");
  return view;
}

function silaTxRow(label, value, mono, copy) {
  const safeValue = silaTxEscape(value);
  const copyButton = copy && value && value !== "—"
    ? " <button class=\"sila-copy-btn\" type=\"button\" data-copy=\"" + safeValue + "\">Copy</button>"
    : "";

  return ""
    + "<div class=\"sila-detail-label\">" + silaTxEscape(label) + "</div>"
    + "<div class=\"sila-detail-value" + (mono ? " mono" : "") + "\">" + safeValue + copyButton + "</div>";
}

function silaTxStatusText(receipt) {
  if (!receipt || !receipt.ok || !receipt.value) return "<span class=\"sila-tx-status-warn\">Pending / Not indexed</span>";
  if (receipt.value.status === "0x1") return "<span class=\"sila-tx-status-ok\">Success</span>";
  if (receipt.value.status === "0x0") return "<span class=\"sila-tx-status-warn\">Failed</span>";
  return "<span class=\"sila-tx-status-warn\">Unknown</span>";
}

async function silaRenderTxDetails(txHash) {
  const view = silaTxShowView();

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Transaction Details</small>"
    + "    <h1>Sila Transaction</h1>"
    + "    <p class=\"muted\">Loading Sila transaction details...</p>"
    + "  </div>"
    + "</section>";

  let data;

  try {
    data = await fetch("/api/sila/tx/" + encodeURIComponent(txHash), { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    view.innerHTML = "<section class=\"panel\"><h2>Sila Transaction</h2><p class=\"muted\">Transaction API error: " + silaTxEscape(error.message) + "</p></section>";
    return;
  }

  if (!data || !data.ok || !data.transaction || !data.transaction.value) {
    view.innerHTML = ""
      + "<section class=\"sila-detail-hero\">"
      + "  <div>"
      + "    <small>Transaction Details</small>"
      + "    <h1>Sila Transaction</h1>"
      + "    <p class=\"muted\">This Sila transaction was not found in the current node data.</p>"
      + "  </div>"
      + "</section>"
      + "<section class=\"panel sila-detail-card\">"
      + "  <h2>Lookup Result</h2>"
      + "  <div class=\"sila-detail-grid\">"
      + silaTxRow("Transaction Hash", txHash, true, true)
      + silaTxRow("Status", "Not found / not in recent chain data", false, false)
      + "  </div>"
      + "  <pre>" + silaTxEscape(JSON.stringify(data, null, 2)) + "</pre>"
      + "</section>";
    return;
  }

  const tx = data.transaction.value;
  const receipt = data.receipt;
  const receiptValue = receipt && receipt.value ? receipt.value : null;

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Transaction Details</small>"
    + "    <h1>Sila Transaction</h1>"
    + "    <p class=\"muted\">Detailed execution-layer transaction information from Sila RPC.</p>"
    + "  </div>"
    + "  <div class=\"sila-detail-actions\">"
    + "    <button type=\"button\" data-page=\"txs\">All Transactions</button>"
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Overview</h2>"
    + "  <div class=\"sila-detail-grid\">"
    + silaTxRow("Transaction Hash", tx.hash || txHash, true, true)
    + silaTxRow("Status", silaTxStatusText(receipt), false, false)
    + silaTxRow("Block", tx.blockNumber ? "#" + silaTxHexToDec(tx.blockNumber) : "Pending", false, false)
    + silaTxRow("From", tx.from || "—", true, true)
    + silaTxRow("To", tx.to || "Contract Creation / —", true, tx.to ? true : false)
    + silaTxRow("Value", tx.value ? silaTxWeiToSila(tx.value) : "0 SILA", false, false)
    + silaTxRow("Transaction Fee", receiptValue && receiptValue.gasUsed && tx.gasPrice ? silaTxWeiToSila("0x" + (BigInt(receiptValue.gasUsed) * BigInt(tx.gasPrice)).toString(16)) : "—", false, false)
    + silaTxRow("Gas Price", tx.gasPrice ? silaTxHexToDec(tx.gasPrice) + " wei" : "—", false, false)
    + silaTxRow("Gas Limit", tx.gas ? silaTxHexToDec(tx.gas) : "—", false, false)
    + silaTxRow("Gas Used", receiptValue && receiptValue.gasUsed ? silaTxHexToDec(receiptValue.gasUsed) : "—", false, false)
    + silaTxRow("Nonce", tx.nonce ? silaTxHexToDec(tx.nonce) : "—", false, false)
    + silaTxRow("Input Data", tx.input || "0x", true, true)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Raw Sila Transaction JSON</h2>"
    + "  <pre>" + silaTxEscape(JSON.stringify(data, null, 2)) + "</pre>"
    + "</section>";
}

document.addEventListener("click", (event) => {
  const txButton = event.target.closest("[data-tx]");
  if (!txButton) return;

  const txHash = txButton.getAttribute("data-tx");
  if (!txHash) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRenderTxDetails(txHash);
}, true);

window.silaRenderTxDetails = silaRenderTxDetails;
// SILA_TX_DETAILS_PAGE_END

// SILA_ADDRESS_DETAILS_PAGE_START
function silaAddressEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function silaAddressRpcValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "object" && Object.prototype.hasOwnProperty.call(value, "value")) return value.value;
  return value;
}

function silaAddressHexToDec(value) {
  if (!value || typeof value !== "string" || !value.startsWith("0x")) return "—";
  try { return BigInt(value).toString(10); } catch { return "—"; }
}

function silaAddressWeiToSila(value) {
  if (!value || typeof value !== "string" || !value.startsWith("0x")) return "—";
  try {
    const wei = BigInt(value);
    const base = 1000000000000000000n;
    const whole = wei / base;
    const frac = (wei % base).toString().padStart(18, "0").replace(/0+$/, "");
    return frac ? whole.toString() + "." + frac + " SILA" : whole.toString() + " SILA";
  } catch {
    return "—";
  }
}

function silaAddressCodeSize(code) {
  if (!code || typeof code !== "string" || code === "0x") return 0;
  return Math.max(0, Math.floor((code.length - 2) / 2));
}

function silaAddressEnsureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view page";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaAddressShowView() {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaAddressEnsureView();
  view.classList.add("active-view");
  return view;
}

function silaAddressRow(label, value, mono, copy) {
  const safeValue = silaAddressEscape(value);
  const copyButton = copy && value && value !== "—"
    ? " <button class=\"sila-copy-btn\" type=\"button\" data-copy=\"" + safeValue + "\">Copy</button>"
    : "";

  return ""
    + "<div class=\"sila-detail-label\">" + silaAddressEscape(label) + "</div>"
    + "<div class=\"sila-detail-value" + (mono ? " mono" : "") + "\">" + safeValue + copyButton + "</div>";
}

function silaAddressRowHtml(label, htmlValue) {
  return ""
    + "<div class=\"sila-detail-label\">" + silaAddressEscape(label) + "</div>"
    + "<div class=\"sila-detail-value\">" + htmlValue + "</div>";
}

function silaAddressTypeBadge(code) {
  const size = silaAddressCodeSize(code);
  if (size > 0) return "<span class=\"sila-address-badge contract\">Contract</span>";
  return "<span class=\"sila-address-badge\">Externally Owned Account</span>";
}

async function silaRenderAddressDetails(address) {
  const view = silaAddressShowView();

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Address Details</small>"
    + "    <h1>Sila Address</h1>"
    + "    <p class=\"muted\">Loading Sila address details...</p>"
    + "  </div>"
    + "</section>";

  let data;

  try {
    data = await fetch("/api/sila/address/" + encodeURIComponent(address), { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    view.innerHTML = "<section class=\"panel\"><h2>Sila Address</h2><p class=\"muted\">Address API error: " + silaAddressEscape(error.message) + "</p></section>";
    return;
  }

  if (!data || !data.ok) {
    view.innerHTML = ""
      + "<section class=\"sila-detail-hero\">"
      + "  <div>"
      + "    <small>Address Details</small>"
      + "    <h1>Sila Address</h1>"
      + "    <p class=\"muted\">This Sila address could not be loaded from the current node.</p>"
      + "  </div>"
      + "</section>"
      + "<section class=\"panel sila-detail-card\">"
      + "  <h2>Lookup Result</h2>"
      + "  <div class=\"sila-detail-grid\">"
      + silaAddressRow("Address", address, true, true)
      + silaAddressRow("Status", "Not available", false, false)
      + "  </div>"
      + "  <pre>" + silaAddressEscape(JSON.stringify(data, null, 2)) + "</pre>"
      + "</section>";
    return;
  }

  const balanceHex = data.balanceWeiHex || silaAddressRpcValue(data.balance);
  const nonceHex = data.nonceHex || silaAddressRpcValue(data.transactionCount || data.nonce);
  const code = silaAddressRpcValue(data.code) || (data.checks && data.checks.code ? data.checks.code.value : null) || "0x";
  const codeSize = silaAddressCodeSize(code);
  const displayAddress = data.address || data.query || address;

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Address Details</small>"
    + "    <h1>Sila Address</h1>"
    + "    <p class=\"muted mono\">" + silaAddressEscape(displayAddress) + "</p>"
    + "  </div>"
    + "  <div class=\"sila-detail-actions\">"
    + "    <button type=\"button\" data-copy=\"" + silaAddressEscape(displayAddress) + "\">Copy Address</button>"
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Overview</h2>"
    + "  <div class=\"sila-detail-grid\">"
    + silaAddressRow("Address", displayAddress, true, true)
    + silaAddressRowHtml("Type", silaAddressTypeBadge(code))
    + silaAddressRow("Balance", balanceHex ? silaAddressWeiToSila(balanceHex) : "—", false, false)
    + silaAddressRow("Balance Wei", balanceHex ? silaAddressHexToDec(balanceHex) : "—", false, false)
    + silaAddressRow("Nonce", nonceHex ? silaAddressHexToDec(nonceHex) : "—", false, false)
    + silaAddressRow("Contract Code Size", codeSize + " bytes", false, false)
    + silaAddressRow("Code", code && codeSize > 0 ? code : "0x", true, code && codeSize > 0)
    + "  </div>"
    + "  <p class=\"sila-address-note\">Transactions list requires a Sila indexer. This page uses live Sila RPC state only.</p>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Raw Sila Address JSON</h2>"
    + "  <pre>" + silaAddressEscape(JSON.stringify(data, null, 2)) + "</pre>"
    + "</section>";
}

document.addEventListener("click", (event) => {
  const addressButton = event.target.closest("[data-address]");
  if (!addressButton) return;

  const address = addressButton.getAttribute("data-address");
  if (!address) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRenderAddressDetails(address);
}, true);

window.silaRenderAddressDetails = silaRenderAddressDetails;
// SILA_ADDRESS_DETAILS_PAGE_END

// SILA_SEARCH_ROUTER_START
function silaSearchNormalize(value) {
  return String(value || "").trim();
}

function silaSearchKind(query) {
  const q = silaSearchNormalize(query);

  if (/^[0-9]+$/.test(q)) return "block";
  if (/^0x[0-9a-fA-F]{40}$/.test(q)) return "address";
  if (/^0x[0-9a-fA-F]{64}$/.test(q)) return "hash";
  if (/^0x[0-9a-fA-F]{1,16}$/.test(q)) return "block";

  return "unknown";
}

function silaSearchEnsureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view page";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaSearchShowMessage(title, message, query) {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaSearchEnsureView();
  view.classList.add("active-view");
  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Search</small>"
    + "    <h1>" + String(title).replaceAll("<", "&lt;").replaceAll(">", "&gt;") + "</h1>"
    + "    <p class=\"muted\">" + String(message).replaceAll("<", "&lt;").replaceAll(">", "&gt;") + "</p>"
    + "    <p class=\"muted mono\">" + String(query || "").replaceAll("<", "&lt;").replaceAll(">", "&gt;") + "</p>"
    + "  </div>"
    + "</section>";
}

async function silaSearchRouteHash(query) {
  try {
    const tx = await fetch("/api/sila/tx/" + encodeURIComponent(query), { cache: "no-store" }).then((res) => res.json());
    if (tx && tx.ok && tx.transaction && tx.transaction.value) {
      window.silaRenderTxDetails(query);
      return;
    }
  } catch {
  }

  try {
    const block = await fetch("/api/sila/block/" + encodeURIComponent(query), { cache: "no-store" }).then((res) => res.json());
    if (block && block.ok && block.block) {
      window.silaRenderBlockDetails(query);
      return;
    }
  } catch {
  }

  window.silaRenderTxDetails(query);
}

async function silaRouteSearchQuery(query) {
  const q = silaSearchNormalize(query);
  const kind = silaSearchKind(q);

  if (!q) return false;

  if (kind === "block") {
    if (typeof window.silaRenderBlockDetails === "function") window.silaRenderBlockDetails(q);
    return true;
  }

  if (kind === "address") {
    if (typeof window.silaRenderAddressDetails === "function") window.silaRenderAddressDetails(q);
    return true;
  }

  if (kind === "hash") {
    await silaSearchRouteHash(q);
    return true;
  }

  silaSearchShowMessage("Unsupported Search", "Enter a Sila block number, transaction hash, block hash, or address.", q);
  return true;
}

function silaFindSearchInput(scope) {
  const roots = [];
  if (scope) {
    const form = scope.closest ? scope.closest("form") : null;
    if (form) roots.push(form);
    const section = scope.closest ? scope.closest("section, header, main, .hero, .panel, .search, .search-box, .searchbar") : null;
    if (section) roots.push(section);
  }
  roots.push(document);

  for (const root of roots) {
    const inputs = Array.from(root.querySelectorAll("input"));
    for (const input of inputs) {
      const type = (input.getAttribute("type") || "text").toLowerCase();
      if (type === "hidden" || type === "checkbox" || type === "radio" || type === "button" || type === "submit") continue;
      if (input.offsetParent === null && root !== document) continue;
      return input;
    }
  }

  return null;
}

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!form || typeof form.querySelector !== "function") return;

  const input = silaFindSearchInput(form);
  if (!input) return;

  const q = silaSearchNormalize(input.value);
  if (silaSearchKind(q) === "unknown" && !q) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRouteSearchQuery(q);
}, true);

document.addEventListener("click", (event) => {
  if (!event.target || typeof event.target.closest !== "function") return;

  const button = event.target.closest("button, [role=\"button\"], input[type=\"submit\"]");
  if (!button) return;

  const label = (button.getAttribute("aria-label") || button.value || button.textContent || "").trim().toLowerCase();
  const looksLikeSearch = label.includes("search") || label.includes("بحث") || button.hasAttribute("data-search");
  if (!looksLikeSearch) return;

  const input = silaFindSearchInput(button);
  if (!input) return;

  const q = silaSearchNormalize(input.value);
  if (!q) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRouteSearchQuery(q);
}, true);

document.addEventListener("keydown", (event) => {
  const target = event.target;
  if (!target || target.tagName !== "INPUT") return;
  if (event.key !== "Enter") return;

  const q = silaSearchNormalize(target.value);
  if (!q) return;

  const kind = silaSearchKind(q);
  if (kind === "unknown") return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRouteSearchQuery(q);
}, true);

window.silaRouteSearchQuery = silaRouteSearchQuery;
// SILA_SEARCH_ROUTER_END

// SILA_TRANSACTIONS_PAGE_START
function silaTransactionsEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function silaTransactionsEnsureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view page";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaTransactionsShowView() {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaTransactionsEnsureView();
  view.classList.add("active-view");
  return view;
}

function silaTransactionsRows(transactions) {
  if (!transactions || !transactions.length) {
    return ""
      + "<div class=\"sila-empty-state\">"
      + "  <div>"
      + "    <strong>No Sila transactions in recent blocks yet.</strong>"
      + "    <span>SilaScan is connected and will display transactions automatically when they appear.</span>"
      + "  </div>"
      + "</div>";
  }

  const rows = transactions.map((tx) => ""
    + "<tr>"
    + "  <td><button type=\"button\" class=\"linklike\" data-tx=\"" + silaTransactionsEscape(tx.hash) + "\">" + silaTransactionsEscape(tx.hashShort || tx.hash) + "</button></td>"
    + "  <td><button type=\"button\" class=\"linklike\" data-sila-block-detail=\"" + silaTransactionsEscape(tx.blockNumber) + "\">#" + silaTransactionsEscape(tx.blockNumber) + "</button></td>"
    + "  <td><button type=\"button\" class=\"linklike\" data-address=\"" + silaTransactionsEscape(tx.from) + "\">" + silaTransactionsEscape(tx.fromShort || tx.from) + "</button></td>"
    + "  <td>" + (tx.to ? "<button type=\"button\" class=\"linklike\" data-address=\"" + silaTransactionsEscape(tx.to) + "\">" + silaTransactionsEscape(tx.toShort || tx.to) + "</button>" : "Contract Creation") + "</td>"
    + "  <td>" + silaTransactionsEscape(tx.valueWei || "0") + " wei</td>"
    + "</tr>"
  ).join("");

  return ""
    + "<div class=\"table-wrap\">"
    + "  <table class=\"sila-tx-table\">"
    + "    <thead><tr><th>Txn Hash</th><th>Block</th><th>From</th><th>To</th><th>Value</th></tr></thead>"
    + "    <tbody>" + rows + "</tbody>"
    + "  </table>"
    + "</div>";
}

async function silaRenderTransactionsPage() {
  const view = silaTransactionsShowView();

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Transactions</small>"
    + "    <h1>Transactions</h1>"
    + "    <p class=\"muted\">Loading recent Sila transactions...</p>"
    + "  </div>"
    + "</section>";

  let data;

  try {
    data = await fetch("/api/sila/transactions?limit=25&blocks=80", { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    view.innerHTML = "<section class=\"panel\"><h2>Sila Transactions</h2><p class=\"muted\">Transactions API error: " + silaTransactionsEscape(error.message) + "</p></section>";
    return;
  }

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Transactions</small>"
    + "    <h1>Transactions</h1>"
    + "    <p class=\"muted\">Recent transactions scanned from live Sila blocks.</p>"
    + "  </div>"
    + "  <div class=\"sila-detail-actions\">"
    + "    <button type=\"button\" data-page=\"blocks\">View Blocks</button>"
    + "    <button type=\"button\" onclick=\"window.silaRenderTransactionsPage()\">Refresh</button>"
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Latest Transactions</h2>"
    + "  <p class=\"muted\">Scanned " + silaTransactionsEscape(data.scannedBlockCount || 0) + " recent blocks. Found " + silaTransactionsEscape(data.count || 0) + " transaction(s).</p>"
    + silaTransactionsRows(data.transactions || [])
    + "</section>";
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-page]");
  if (!target) return;

  const page = target.getAttribute("data-page");
  if (page !== "txs" && page !== "transactions" && page !== "pending-txs") return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRenderTransactionsPage();
}, true);

window.silaRenderTransactionsPage = silaRenderTransactionsPage;
// SILA_TRANSACTIONS_PAGE_END

// SILA_MENU_ROUTER_START
function silaMenuText(node) {
  return String(node ? node.textContent || "" : "").trim().toLowerCase();
}

function silaMenuClosestText(event) {
  const item = event.target.closest("a, button, [data-page], [role=\"button\"], li");
  return item ? silaMenuText(item) : "";
}

document.addEventListener("click", (event) => {
  if (!event.target || typeof event.target.closest !== "function") return;

  const item = event.target.closest("a, button, [data-page], [role=\"button\"], li");
  if (!item) return;

  const page = item.getAttribute("data-page");
  const text = silaMenuClosestText(event);

  const wantsBlocks = page === "blocks"
    || text === "view blocks"
    || text === "blocks"
    || text.includes("view blocks");

  const wantsTransactions = page === "txs"
    || page === "transactions"
    || page === "pending-txs"
    || text === "sila transactions"
    || text === "transactions"
    || text === "pending sila transactions"
    || text.includes("sila transactions")
    || text.includes("pending sila transactions");

  if (wantsBlocks && typeof window.silaRenderBlocksPage === "function") {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.silaRenderBlocksPage();
    return;
  }

  if (wantsTransactions && typeof window.silaRenderTransactionsPage === "function") {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.silaRenderTransactionsPage();
    return;
  }
}, true);
// SILA_MENU_ROUTER_END

// SILA_HOME_LINK_ROUTER_START
function silaHomeText(node) {
  return String(node ? node.textContent || "" : "").trim();
}

function silaHomeLooksLikeInteractive(node) {
  if (!node || typeof node.closest !== "function") return false;
  return !!node.closest("button, a, input, textarea, select, [data-block], [data-tx], [data-address], [data-sila-block-detail]");
}

function silaHomeNearestRecord(node) {
  if (!node || typeof node.closest !== "function") return null;
  return node.closest("tr, li, article, .block, .tx, .item, .row, .card, .panel");
}

function silaHomeInLatestArea(node) {
  if (!node || typeof node.closest !== "function") return false;
  const area = node.closest("section, .panel, main");
  const text = silaHomeText(area).toLowerCase();
  return text.includes("latest") || text.includes("recent") || text.includes("blocks") || text.includes("transactions");
}

function silaHomeFindBlockNumber(text) {
  const withHash = String(text || "").match(/#([0-9]{1,20})/);
  if (withHash) return withHash[1];

  const plain = String(text || "").trim();
  if (/^[0-9]{1,20}$/.test(plain)) return plain;

  return null;
}

function silaHomeFindAddress(text) {
  const match = String(text || "").match(/0x[0-9a-fA-F]{40}/);
  return match ? match[0] : null;
}

function silaHomeFindHash(text) {
  const match = String(text || "").match(/0x[0-9a-fA-F]{64}/);
  return match ? match[0] : null;
}

document.addEventListener("click", (event) => {
  if (!event.target || typeof event.target.closest !== "function") return;

  if (silaHomeLooksLikeInteractive(event.target)) return;
  if (!silaHomeInLatestArea(event.target)) return;

  const targetText = silaHomeText(event.target);
  const record = silaHomeNearestRecord(event.target);
  const recordText = silaHomeText(record);

  const hash = silaHomeFindHash(targetText) || silaHomeFindHash(recordText);
  if (hash && typeof window.silaRouteSearchQuery === "function") {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.silaRouteSearchQuery(hash);
    return;
  }

  const address = silaHomeFindAddress(targetText);
  if (address && typeof window.silaRenderAddressDetails === "function") {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.silaRenderAddressDetails(address);
    return;
  }

  const blockNumber = silaHomeFindBlockNumber(targetText);
  if (blockNumber && typeof window.silaRenderBlockDetails === "function") {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.silaRenderBlockDetails(blockNumber);
  }
}, true);

window.silaHomeFindBlockNumber = silaHomeFindBlockNumber;
// SILA_HOME_LINK_ROUTER_END

// SILA_HOME_DASHBOARD_START
function silaHomeDashboardEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function silaHomeDashboardShort(value) {
  if (!value || typeof value !== "string") return "—";
  return value.length <= 18 ? value : value.slice(0, 10) + "..." + value.slice(-8);
}

function silaHomeDashboardFindHomeRoot() {
  const main = document.querySelector("main");
  if (!main) return null;

  const featureView = document.getElementById("featureView");
  if (featureView && featureView.classList.contains("active-view")) return null;

  const views = Array.from(document.querySelectorAll(".view"));
  const homeView = views.find((view) => view.id !== "featureView" && view.classList.contains("active-view"))
    || views.find((view) => view.id !== "featureView" && /latest|search|explorer/i.test(view.textContent || ""));

  return homeView || main;
}

function silaHomeDashboardMetric(label, value, sub, action) {
  const actionAttr = action ? " data-sila-home-action=\"" + silaHomeDashboardEscape(action) + "\"" : "";
  const className = action ? "sila-home-metric-card clickable" : "sila-home-metric-card";

  return ""
    + "<article class=\"" + className + "\"" + actionAttr + ">"
    + "  <div class=\"sila-home-metric-label\">" + silaHomeDashboardEscape(label) + "</div>"
    + "  <div class=\"sila-home-metric-value\">" + silaHomeDashboardEscape(value) + "</div>"
    + "  <div class=\"sila-home-metric-sub\">" + sub + "</div>"
    + "</article>";
}

function silaHomeDashboardStatus(ok, onlineText, offlineText) {
  return ok
    ? "<span class=\"sila-home-status-online\">" + silaHomeDashboardEscape(onlineText) + "</span>"
    : "<span class=\"sila-home-status-warn\">" + silaHomeDashboardEscape(offlineText) + "</span>";
}

async function silaRenderHomeDashboard() {
  const root = silaHomeDashboardFindHomeRoot();
  if (!root) return;

  let holder = document.getElementById("silaHomeDashboard");
  if (!holder) {
    holder = document.createElement("section");
    holder.id = "silaHomeDashboard";
    holder.className = "sila-home-dashboard panel";

    const firstPanel = root.querySelector(".panel");
    if (firstPanel && firstPanel.parentNode) {
      firstPanel.parentNode.insertBefore(holder, firstPanel);
    } else {
      root.insertBefore(holder, root.firstChild);
    }
  }

  holder.innerHTML = ""
    + "<div class=\"sila-home-dashboard-head\">"
    + "  <div>"
    + "    <h2>Sila Network Overview</h2>"
    + "    <p>Live execution and consensus data from your local Sila devnet.</p>"
    + "  </div>"
    + "  <button type=\"button\" onclick=\"window.silaRenderHomeDashboard()\">Refresh</button>"
    + "</div>"
    + "<div class=\"sila-empty-state\"><div><strong>Loading Sila network overview...</strong><span>Reading live Sila RPC data.</span></div></div>";

  let data;
  try {
    data = await fetch("/api/sila/summary", { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    holder.innerHTML = "<h2>Sila Network Overview</h2><p class=\"muted\">Summary API error: " + silaHomeDashboardEscape(error.message) + "</p>";
    return;
  }

  const latestNumber = data.execution && data.execution.latestBlock ? data.execution.latestBlock.number : "—";
  const latestHash = data.execution && data.execution.latestBlock ? data.execution.latestBlock.hash : "";
  const txCount = data.stats ? data.stats.recentTransactionCount : 0;
  const tps = data.stats ? data.stats.tps : "0.00";
  const gas = data.display ? data.display.gas : "—";
  const executionOk = !!(data.execution && data.execution.ok);
  const consensusOk = !!(data.consensus && data.consensus.ok);
  const headSlot = data.consensus ? data.consensus.headSlot : "—";
  const syncDistance = data.consensus ? data.consensus.syncDistance : "—";

  holder.innerHTML = ""
    + "<div class=\"sila-home-dashboard-head\">"
    + "  <div>"
    + "    <h2>Sila Network Overview</h2>"
    + "    <p>Live execution and consensus data from your local Sila devnet.</p>"
    + "  </div>"
    + "  <button type=\"button\" onclick=\"window.silaRenderHomeDashboard()\">Refresh</button>"
    + "</div>"
    + "<div class=\"sila-home-metrics-grid\">"
    + silaHomeDashboardMetric("Latest Block", "#" + latestNumber, latestHash ? "Hash " + silaHomeDashboardEscape(silaHomeDashboardShort(latestHash)) : "Latest execution block", "latest-block")
    + silaHomeDashboardMetric("Total Blocks", latestNumber, "Open the Sila blocks explorer", "blocks")
    + silaHomeDashboardMetric("Recent Txns", txCount, "TPS " + silaHomeDashboardEscape(tps), "transactions")
    + silaHomeDashboardMetric("Gas", gas, "Current Sila gas price", "")
    + silaHomeDashboardMetric("Execution", executionOk ? "Online" : "Offline", silaHomeDashboardStatus(executionOk, "Sila execution RPC connected", "Sila execution RPC unavailable"), "")
    + silaHomeDashboardMetric("Consensus", consensusOk ? "Online" : "Offline", silaHomeDashboardStatus(consensusOk, "Head slot " + headSlot + " / distance " + syncDistance, "Sila consensus REST unavailable"), "")
    + "</div>";
}

document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-sila-home-action]");
  if (!card) return;

  const action = card.getAttribute("data-sila-home-action");

  if (action === "latest-block") {
    event.preventDefault();
    event.stopImmediatePropagation();
    fetch("/api/sila/summary", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const latestNumber = data.execution && data.execution.latestBlock ? data.execution.latestBlock.number : null;
        if (latestNumber && typeof window.silaRenderBlockDetails === "function") window.silaRenderBlockDetails(latestNumber);
      });
    return;
  }

  if (action === "blocks" && typeof window.silaRenderBlocksPage === "function") {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.silaRenderBlocksPage();
    return;
  }

  if (action === "transactions" && typeof window.silaRenderTransactionsPage === "function") {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.silaRenderTransactionsPage();
  }
}, true);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => { window.silaRenderHomeDashboard(); }, 250);
});

window.silaRenderHomeDashboard = silaRenderHomeDashboard;
// SILA_HOME_DASHBOARD_END