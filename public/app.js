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
  ["settingsDropdown", "languageDropdown", "networkDropdown", "blockchainDropdown"].forEach((id) => {
    const node = byId(id);
    if (node) node.classList.add("hidden");
  });

  const blockchainButton = byId("blockchainMenuButton");
  if (blockchainButton) blockchainButton.setAttribute("aria-expanded", "false");
}
function toggleMenu(id) {
  const menu = byId(id);
  if (!menu) return;
  const wasHidden = menu.classList.contains("hidden");
  closeMenus();
  if (wasHidden) menu.classList.remove("hidden");
}

function showView(name) {
  closeMenus();

  document.querySelectorAll(".view").forEach((node) => {
    node.classList.remove("active-view");
    node.classList.add("hidden");
    node.style.display = "none";
  });

  document.querySelectorAll(".nav-btn").forEach((node) => node.classList.remove("active"));

  const view = byId(name + "View");
  const button = document.querySelector("[data-view=\"" + name + "\"]");

  if (view) {
    view.classList.remove("hidden");
    view.classList.add("active-view");
    view.style.display = "block";
  }

  if (button) {
    button.classList.add("active");
  }

  if (name === "explorer") {
    const blockchainButton = byId("blockchainMenuButton");
    if (blockchainButton) blockchainButton.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.showView = showView;
function showResult(title, data) {
  showView("explorer");
  byId("resultPanel").classList.remove("hidden");
  setText("resultTitle", title);
  byId("resultBody").textContent = JSON.stringify(data, null, 2);
}


// SILA_EARLY_NAV_ROUTER_START
(function () {
  "use strict";

  function closeMenusEarly() {
    ["settingsDropdown", "languageDropdown", "networkDropdown", "blockchainDropdown"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.classList.add("hidden");
    });

    const button = document.getElementById("blockchainMenuButton");
    if (button) button.setAttribute("aria-expanded", "false");
  }

  function pushPath(path) {
    if (path && window.location.pathname !== path) {
      history.pushState({ silaEarlyPath: path }, "", path);
    }
  }

  function setActive(viewName) {
    document.querySelectorAll(".nav-btn").forEach((node) => node.classList.remove("active"));

    if (viewName === "blocks" || viewName === "transactions" || viewName === "explorer") {
      const blockchainButton = document.getElementById("blockchainMenuButton");
      if (blockchainButton) blockchainButton.classList.add("active");
      return;
    }

    const button = document.querySelector("[data-view=\"" + viewName + "\"]");
    if (button) button.classList.add("active");
  }

  function routePageEarly(page, push) {
    if (page === "blocks") {
      closeMenusEarly();
      setActive("blocks");

      if (typeof window.silaRenderBlocksPage === "function") {
        window.silaRenderBlocksPage(null);
      } else if (typeof window.showView === "function") {
        window.showView("explorer");
      }

      if (push) pushPath("/blocks");
      return true;
    }

    if (page === "transactions" || page === "txs" || page === "pending-txs") {
      closeMenusEarly();
      setActive("transactions");

      if (typeof window.silaRenderTransactionsPage === "function") {
        window.silaRenderTransactionsPage();
      } else if (typeof window.showView === "function") {
        window.showView("explorer");
      }

      if (push) pushPath("/transactions");
      return true;
    }

    if (page === "runtime" || page === "status") {
      closeMenusEarly();
      setActive("more");

      if (typeof window.silaRenderRuntimePage === "function") {
        window.silaRenderRuntimePage();
      } else if (typeof window.showView === "function") {
        window.showView("more");
      }

      if (push) pushPath("/runtime");
      return true;
    }

    if (page === "consensus") {
      closeMenusEarly();
      setActive("validators");

      if (typeof window.silaRenderConsensusPage === "function") {
        window.silaRenderConsensusPage();
      } else if (typeof window.showView === "function") {
        window.showView("validators");
      }

      if (push) pushPath("/consensus");
      return true;
    }

    return false;
  }

  function routeViewEarly(view, push) {
    closeMenusEarly();

    if (view === "explorer") return routePageEarly("blocks", push);
    if (view === "validators") return routePageEarly("consensus", push);
    if (view === "more") return routePageEarly("runtime", push);

    if (typeof window.showView === "function") {
      window.showView(view);
      setActive(view);
      if (push) pushPath("/");
      return true;
    }

    return false;
  }

  function routeBlockEarly(blockId, push) {
    closeMenusEarly();
    setActive("blocks");

    if (push) pushPath("/blocks");

    if (typeof window.silaRenderBlockDetails === "function") {
      window.silaRenderBlockDetails(blockId);
      return true;
    }

    return routePageEarly("blocks", false);
  }

  function routeTxEarly(txHash, push) {
    closeMenusEarly();
    setActive("transactions");

    if (push) pushPath("/transactions");

    if (typeof window.silaRenderTxDetails === "function") {
      window.silaRenderTxDetails(txHash);
      return true;
    }

    return routePageEarly("transactions", false);
  }

  function routeAddressEarly(address, push) {
    closeMenusEarly();

    if (typeof window.silaRenderAddressDetails === "function") {
      window.silaRenderAddressDetails(address);
      if (push) pushPath("/");
      return true;
    }

    return false;
  }

  function toggleBlockchainEarly() {
    const dropdown = document.getElementById("blockchainDropdown");
    const button = document.getElementById("blockchainMenuButton");
    if (!dropdown || !button) return false;

    const shouldOpen = dropdown.classList.contains("hidden");
    closeMenusEarly();

    if (shouldOpen) {
      dropdown.classList.remove("hidden");
      button.setAttribute("aria-expanded", "true");
    }

    return true;
  }

  document.addEventListener("click", function (event) {
    if (!event.target || typeof event.target.closest !== "function") return;

    const blockchainButton = event.target.closest("#blockchainMenuButton");
    if (blockchainButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleBlockchainEarly();
      return;
    }

    const pageTarget = event.target.closest("[data-page]");
    if (pageTarget) {
      const page = pageTarget.getAttribute("data-page");
      if (routePageEarly(page, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    const blockTarget = event.target.closest("[data-sila-block-detail], [data-block]");
    if (blockTarget) {
      const blockId = blockTarget.getAttribute("data-sila-block-detail")
        || blockTarget.getAttribute("data-sila-block-open")
        || blockTarget.getAttribute("data-block");

      if (blockId && routeBlockEarly(blockId, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    const txTarget = event.target.closest("[data-tx]");
    if (txTarget) {
      const txHash = txTarget.getAttribute("data-tx");

      if (txHash && routeTxEarly(txHash, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    const addressTarget = event.target.closest("[data-address]");
    if (addressTarget) {
      const address = addressTarget.getAttribute("data-address");

      if (address && routeAddressEarly(address, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    const viewTarget = event.target.closest("[data-view]");
    if (viewTarget) {
      const view = viewTarget.getAttribute("data-view");

      if (view && routeViewEarly(view, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    if (!event.target.closest(".dropdown, .menu-wrap")) {
      closeMenusEarly();
    }
  }, true);

  window.silaRoutePage = routePageEarly;
  window.silaRouteView = routeViewEarly;
  window.silaCloseBlockchainDropdown = closeMenusEarly;
})();
// SILA_EARLY_NAV_ROUTER_END
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



// SILA_BLOCK_TXS_RENDER_START
function silaBlockTxEscape(value) {
  return String(value === undefined || value === null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function silaBlockTxShort(value) {
  const text = String(value || "");
  return text.length > 18 ? text.slice(0, 10) + "..." + text.slice(-8) : text;
}

function silaBlockTxRows(block) {
  const txs = block && Array.isArray(block.transactions) ? block.transactions : [];

  if (!txs.length) {
    return "<section class=\"panel sila-detail-card\"><h2>Block Transactions</h2><div class=\"sila-empty-state\"><div><strong>No transactions in this Sila block.</strong><span>This block was produced without execution transactions.</span></div></div></section>";
  }

  return "<section class=\"panel sila-detail-card\">"
    + "  <h2>Block Transactions</h2>"
    + "  <div class=\"sila-blocks-table-wrap\"><table class=\"sila-blocks-table\">"
    + "    <thead><tr><th>Hash</th><th>From</th><th>To</th><th>Value</th><th>Gas</th></tr></thead><tbody>"
    + txs.map((tx) => ""
      + "<tr>"
      + "  <td><button type=\"button\" class=\"linklike\" data-tx=\"" + silaBlockTxEscape(tx.hash || "") + "\">" + silaBlockTxEscape(silaBlockTxShort(tx.hash || "")) + "</button></td>"
      + "  <td><button type=\"button\" class=\"linklike\" data-address=\"" + silaBlockTxEscape(tx.from || "") + "\">" + silaBlockTxEscape(silaBlockTxShort(tx.from || "")) + "</button></td>"
      + "  <td>" + (tx.to ? "<button type=\"button\" class=\"linklike\" data-address=\"" + silaBlockTxEscape(tx.to) + "\">" + silaBlockTxEscape(silaBlockTxShort(tx.to)) + "</button>" : "Contract Creation") + "</td>"
      + "  <td>" + silaBlockTxEscape(tx.value || "0x0") + " wei</td>"
      + "  <td>" + silaBlockTxEscape(tx.gas || "0x0") + "</td>"
      + "</tr>").join("")
    + "    </tbody></table></div>"
    + "</section>";
}
// SILA_BLOCK_TXS_RENDER_END

// SILA_COPY_HELPER_START
function silaCopyEscape(value) {
  return String(value === null || value === undefined ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function silaCopyButton(value) {
  const text = String(value === null || value === undefined ? "" : value);
  if (!text || text === "—") return "";
  return " <button type=\"button\" class=\"sila-copy-btn\" data-copy=\"" + silaCopyEscape(text) + "\">Copy</button>";
}

async function silaCopyText(value, button) {
  const text = String(value || "");
  if (!text) return;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "readonly");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }

    if (button) {
      const original = button.textContent;
      button.textContent = "Copied";
      button.classList.add("copied");
      window.setTimeout(() => {
        button.textContent = original || "Copy";
        button.classList.remove("copied");
      }, 1200);
    }
  } catch (_) {
    if (button) {
      const original = button.textContent;
      button.textContent = "Copy failed";
      window.setTimeout(() => {
        button.textContent = original || "Copy";
      }, 1200);
    }
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  silaCopyText(button.getAttribute("data-copy"), button);
});
// SILA_COPY_HELPER_END
// SILA_TX_DETAILS_PAGE_START
function silaTxEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function silaTxShort(value) {
  const text = String(value || "");
  return text.length > 18 ? text.slice(0, 10) + "..." + text.slice(-8) : text;
}

function silaTxHexToDec(value) {
  try {
    if (typeof value !== "string" || !value.startsWith("0x")) return String(value || "0");
    return BigInt(value).toString(10);
  } catch (_) {
    return String(value || "0");
  }
}

function silaTxStatusLabel(receipt) {
  if (!receipt) return "Pending / not found";
  if (receipt.status === "0x1") return "Success";
  if (receipt.status === "0x0") return "Failed";
  return receipt.status || "Unknown";
}

function silaTxStatusClass(receipt) {
  if (!receipt) return "warn";
  if (receipt.status === "0x1") return "ok";
  if (receipt.status === "0x0") return "bad";
  return "warn";
}

function silaTxLinkBlock(value) {
  const text = silaTxHexToDec(value || "0x0");
  return "<button type=\"button\" class=\"linklike\" data-sila-block-detail=\"" + silaTxEscape(text) + "\">#" + silaTxEscape(text) + "</button>";
}

function silaTxLinkAddress(value) {
  if (!value) return "Contract Creation";
  return "<button type=\"button\" class=\"linklike\" data-address=\"" + silaTxEscape(value) + "\">" + silaTxEscape(value) + "</button>" + silaCopyButton(value);
}

function silaTxDetailRow(label, value, raw) {
  return "<div class=\"sila-detail-row\">"
    + "<span>" + silaTxEscape(label) + "</span>"
    + "<strong" + (raw ? " class=\"mono\"" : "") + ">" + value + "</strong>"
    + "</div>";
}

function silaTxMiniCard(label, value) {
  return "<div class=\"sila-stat-card\">"
    + "<span>" + silaTxEscape(label) + "</span>"
    + "<strong>" + silaTxEscape(value) + "</strong>"
    + "</div>";
}

function silaTxEnsureView() {
  document.querySelectorAll(".view").forEach((node) => {
    node.classList.add("hidden");
    node.classList.remove("active-view");
    node.style.display = "none";
  });

  let view = document.getElementById("featureView");
  if (!view) {
    view = document.createElement("section");
    view.id = "featureView";
    view.className = "view page";
    (document.querySelector("main") || document.body).appendChild(view);
  }

  view.classList.remove("hidden");
  view.classList.add("active-view");
  view.style.display = "block";

  return view;
}
async function silaRenderTxDetails(hash) {
  const view = silaTxEnsureView();

  view.innerHTML = "<section class=\"panel sila-detail-card\"><h2>Sila Transaction</h2><p class=\"muted\">Loading transaction details...</p></section>";

  let data;
  try {
    data = await fetch("/api/sila/tx/" + encodeURIComponent(hash), { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    view.innerHTML = "<section class=\"panel sila-detail-card\"><h2>Sila Transaction</h2><p class=\"muted\">Transaction API error: " + silaTxEscape(error.message) + "</p></section>";
    return;
  }

  const tx = data && data.transaction ? data.transaction.value : null;
  const receipt = data && data.receipt ? data.receipt.value : null;

  if (!data || !data.ok || !tx) {
    view.innerHTML = "<section class=\"panel sila-detail-card\"><h2>Sila Transaction</h2><p class=\"muted\">Transaction not found: " + silaTxEscape(hash) + "</p></section>";
    return;
  }

  const statusLabel = silaTxStatusLabel(receipt);
  const statusClass = silaTxStatusClass(receipt);
  const blockNumber = tx.blockNumber || (receipt ? receipt.blockNumber : null);
  const gasUsed = receipt && receipt.gasUsed ? receipt.gasUsed : "0x0";
  const effectiveGasPrice = receipt && receipt.effectiveGasPrice ? receipt.effectiveGasPrice : (tx.gasPrice || "0x0");
  const input = tx.input || "0x";
  const inputSize = input && input.startsWith("0x") ? Math.max(0, (input.length - 2) / 2) : 0;

  view.innerHTML = ""
    + "<section class=\"panel sila-detail-card\">"
    + "  <div class=\"sila-page-head\">"
    + "    <div>"
    + "      <p class=\"eyebrow\">Sila Transaction</p>"
    + "      <h1>Transaction Details</h1>"
    + "      <p class=\"muted mono\">" + silaTxEscape(tx.hash || hash) + "</p>"
    + "    </div>"
    + "    <span class=\"sila-status-pill " + statusClass + "\">" + silaTxEscape(statusLabel) + "</span>"
    + "  </div>"
    + "  <div class=\"sila-stats-grid\">"
    + silaTxMiniCard("Value", silaTxHexToDec(tx.value || "0x0") + " wei")
    + silaTxMiniCard("Gas Used", silaTxHexToDec(gasUsed))
    + silaTxMiniCard("Gas Price", silaTxHexToDec(effectiveGasPrice) + " wei")
    + silaTxMiniCard("Nonce", silaTxHexToDec(tx.nonce || "0x0"))
    + "  </div>"
    + "  <div class=\"sila-detail-grid\">"
    + silaTxDetailRow("Hash", silaTxEscape(tx.hash || hash) + silaCopyButton(tx.hash || hash), true)
    + silaTxDetailRow("Status", "<span class=\"sila-status-pill " + statusClass + "\">" + silaTxEscape(statusLabel) + "</span>", false)
    + silaTxDetailRow("Block", blockNumber ? silaTxLinkBlock(blockNumber) : "Pending", false)
    + silaTxDetailRow("Transaction Index", silaTxHexToDec(tx.transactionIndex || (receipt ? receipt.transactionIndex : "0x0")), false)
    + silaTxDetailRow("From", silaTxLinkAddress(tx.from), false)
    + silaTxDetailRow("To", silaTxLinkAddress(tx.to), false)
    + silaTxDetailRow("Value", silaTxHexToDec(tx.value || "0x0") + " wei", false)
    + silaTxDetailRow("Gas Limit", silaTxHexToDec(tx.gas || "0x0"), false)
    + silaTxDetailRow("Gas Used", silaTxHexToDec(gasUsed), false)
    + silaTxDetailRow("Gas Price", silaTxHexToDec(effectiveGasPrice) + " wei", false)
    + silaTxDetailRow("Nonce", silaTxHexToDec(tx.nonce || "0x0"), false)
    + silaTxDetailRow("Type", tx.type || "0x0", true)
    + silaTxDetailRow("Chain ID", tx.chainId ? silaTxHexToDec(tx.chainId) : "—", false)
    + silaTxDetailRow("Input Size", String(inputSize) + " bytes", false)
    + silaTxDetailRow("Input", silaTxEscape(input) + silaCopyButton(input), true)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Raw Sila Transaction JSON</h2>"
    + "  <pre class=\"sila-json\">" + silaTxEscape(JSON.stringify(data, null, 2)) + "</pre>"
    + "</section>";
}

document.addEventListener("click", (event) => {
  const txButton = event.target.closest("[data-tx]");
  if (!txButton) return;
  event.preventDefault();
  silaRenderTxDetails(txButton.getAttribute("data-tx"));
});

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
    + "  <p class=\"sila-address-note\">Recent Sila transactions scanned from live execution-layer blocks.</p>"
    + "  <h2>Recent Transactions</h2>"
    + silaAddressTxRows(data.recentTransactions || [])
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


// SILA_ADDRESS_TXS_RENDER_START
function silaAddressTxRows(transactions) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return "<div class=\"sila-empty-state\"><div><strong>No recent Sila transactions for this address.</strong><span>The live scan did not find matching transactions in the recent block window.</span></div></div>";
  }

  return "<div class=\"sila-blocks-table-wrap\"><table class=\"sila-blocks-table\">"
    + "<thead><tr><th>Hash</th><th>Block</th><th>From</th><th>To</th><th>Value</th></tr></thead><tbody>"
    + transactions.map((tx) => ""
      + "<tr>"
      + "  <td><button type=\"button\" class=\"linklike\" data-tx=\"" + silaAddressEscape(tx.hash || "") + "\">" + silaAddressEscape(tx.hashShort || tx.hash || "") + "</button></td>"
      + "  <td><button type=\"button\" class=\"linklike\" data-sila-block-detail=\"" + silaAddressEscape(tx.blockNumber || "") + "\">#" + silaAddressEscape(tx.blockNumber || "") + "</button></td>"
      + "  <td><button type=\"button\" class=\"linklike\" data-address=\"" + silaAddressEscape(tx.from || "") + "\">" + silaAddressEscape(tx.fromShort || tx.from || "") + "</button></td>"
      + "  <td>" + (tx.to ? "<button type=\"button\" class=\"linklike\" data-address=\"" + silaAddressEscape(tx.to) + "\">" + silaAddressEscape(tx.toShort || tx.to) + "</button>" : "Contract Creation") + "</td>"
      + "  <td>" + silaAddressEscape(tx.valueWei || "0x0") + " wei</td>"
      + "</tr>").join("")
    + "</tbody></table></div>";
}
// SILA_ADDRESS_TXS_RENDER_END
// SILA_SEARCH_ROUTER_START
function silaSearchEscape(value) {
  return String(value === null || value === undefined ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function silaSearchNormalize(value) {
  return String(value || "").trim();
}

function silaSearchLower(value) {
  return silaSearchNormalize(value).toLowerCase();
}

function silaSearchIsHexHash(value) {
  return /^0x[0-9a-fA-F]{64}$/.test(value);
}

function silaSearchIsAddress(value) {
  return /^0x[0-9a-fA-F]{40}$/.test(value);
}

function silaSearchIsDecimalBlock(value) {
  return /^(0|[1-9][0-9]*)$/.test(value);
}

function silaSearchIsHexBlock(value) {
  return /^0x[0-9a-fA-F]{1,16}$/.test(value);
}

function silaSearchHexBlockToDecimal(value) {
  try {
    return BigInt(value).toString(10);
  } catch (_) {
    return value;
  }
}

function silaSearchView() {
  return document.getElementById("sila-view") || document.getElementById("featureView") || document.querySelector("main");
}

function silaSearchMessage(title, message, query) {
  const view = silaSearchView();
  if (!view) return;

  view.innerHTML = ""
    + "<section class=\"panel sila-detail-card\">"
    + "  <div class=\"sila-page-head\">"
    + "    <div>"
    + "      <p class=\"eyebrow\">Sila Search</p>"
    + "      <h1>" + silaSearchEscape(title) + "</h1>"
    + "      <p class=\"muted\">" + silaSearchEscape(message) + "</p>"
    + "    </div>"
    + "  </div>"
    + "  <div class=\"sila-detail-grid\">"
    + "    <div class=\"sila-detail-row\"><span>Query</span><strong class=\"mono\">" + silaSearchEscape(query || "") + "</strong></div>"
    + "    <div class=\"sila-detail-row\"><span>Supported</span><strong>Transaction hash, address, block number</strong></div>"
    + "  </div>"
    + "</section>";
}

async function silaSearchJson(path) {
  try {
    return await fetch(path, { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

async function silaSearchRoute(rawQuery) {
  const query = silaSearchNormalize(rawQuery);
  const lower = silaSearchLower(query);

  if (!query) {
    silaSearchMessage("Empty Search", "Enter a Sila transaction hash, address, or block number.", query);
    return;
  }

  if (silaSearchIsAddress(lower)) {
    if (typeof window.silaRenderAddressDetails === "function") {
      await window.silaRenderAddressDetails(lower);
      return;
    }
    silaSearchMessage("Address Detected", "Address renderer is not available.", lower);
    return;
  }

  if (silaSearchIsDecimalBlock(query)) {
    const block = await silaSearchJson("/api/sila/block/" + encodeURIComponent(query));
    if (block && block.ok && typeof window.silaRenderBlockDetails === "function") {
      await window.silaRenderBlockDetails(query);
      return;
    }
    silaSearchMessage("Block Not Found", "No Sila block was found for this block number.", query);
    return;
  }

  if (silaSearchIsHexBlock(lower) && !silaSearchIsHexHash(lower) && !silaSearchIsAddress(lower)) {
    const decimalBlock = silaSearchHexBlockToDecimal(lower);
    const block = await silaSearchJson("/api/sila/block/" + encodeURIComponent(decimalBlock));
    if (block && block.ok && typeof window.silaRenderBlockDetails === "function") {
      await window.silaRenderBlockDetails(decimalBlock);
      return;
    }
    silaSearchMessage("Block Not Found", "No Sila block was found for this hex block number.", query);
    return;
  }

  if (silaSearchIsHexHash(lower)) {
    const tx = await silaSearchJson("/api/sila/tx/" + encodeURIComponent(lower));
    if (tx && tx.ok && tx.transaction && tx.transaction.value && typeof window.silaRenderTxDetails === "function") {
      await window.silaRenderTxDetails(lower);
      return;
    }

    const block = await silaSearchJson("/api/sila/block/" + encodeURIComponent(lower));
    if (block && block.ok && typeof window.silaRenderBlockDetails === "function") {
      await window.silaRenderBlockDetails(lower);
      return;
    }

    silaSearchMessage("Hash Not Found", "This 32-byte hash was not found as a Sila transaction or block in the current node data.", lower);
    return;
  }

  silaSearchMessage("Unsupported Search", "Use a Sila transaction hash, address, decimal block number, or hex block number.", query);
}


if (typeof window !== "undefined") {
  window.silaSearchRun = silaSearchRoute;
}
function silaSearchFindInput(root) {
  const scope = root || document;
  return scope.querySelector(
    "[data-sila-search-input], [data-search-input], #sila-search-input, #searchInput, input[type='search'], input[name='q'], input[placeholder*='Search'], input[placeholder*='search']"
  );
}

function silaSearchBindRouter() {
  document.addEventListener("submit", (event) => {
    const form = event.target.closest("form");
    if (!form) return;

    const input = silaSearchFindInput(form);
    if (!input) return;

    event.preventDefault();
    silaSearchRoute(input.value);
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const input = event.target.closest(
      "[data-sila-search-input], [data-search-input], #sila-search-input, #searchInput, input[type='search'], input[name='q'], input[placeholder*='Search'], input[placeholder*='search']"
    );

    if (!input) return;

    event.preventDefault();
    silaSearchRoute(input.value);
  }, true);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-sila-search-submit], [data-search-submit]");
    if (!button) return;

    const container = button.closest("form") || button.closest("section") || document;
    const input = silaSearchFindInput(container);
    if (!input) return;

    event.preventDefault();
    silaSearchRoute(input.value);
  }, true);
}

silaSearchBindRouter();
window.silaSearchRoute = silaSearchRoute;
// SILA_SEARCH_ROUTER_END




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
    + "  <div class=\"sila-runtime-actions\"><button type=\"button\" onclick=\"window.silaRenderHomeDashboard()\">Refresh</button><button type=\"button\" data-page=\"runtime\">Sila Runtime</button></div>"
    + "</div>"
    + "<div class=\"sila-empty-state\"><div><strong>Loading Sila network overview...</strong><span>Reading live Sila RPC data.</span></div></div>";

  let data;
  try {
    data = await fetch("/api/sila/summary", { cache: "no-store" }).then((res) => res.json());
    data.runtime = await fetch("/api/runtime/status", { cache: "no-store" }).then((res) => res.json()).catch(() => null);
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
  const headSlot = data.consensus && data.consensus.syncing ? data.consensus.syncing.headSlot : "—";
  const syncDistance = data.consensus && data.consensus.syncing ? data.consensus.syncing.syncDistance : "—";
  const beaconPeers = data.runtime && data.runtime.consensus && data.runtime.consensus.connectedPeers !== undefined ? data.runtime.consensus.connectedPeers : "—";
  const peerState = data.runtime && data.runtime.consensus && data.runtime.consensus.peerState ? data.runtime.consensus.peerState : "unknown";

  holder.innerHTML = ""
    + "<div class=\"sila-home-dashboard-head\">"
    + "  <div>"
    + "    <h2>Sila Network Overview</h2>"
    + "    <p>Live execution and consensus data from your local Sila devnet.</p>"
    + "  </div>"
    + "  <div class=\"sila-runtime-actions\"><button type=\"button\" onclick=\"window.silaRenderHomeDashboard()\">Refresh</button><button type=\"button\" data-page=\"runtime\">Sila Runtime</button></div>"
    + "</div>"
    + "<div class=\"sila-home-metrics-grid\">"
    + silaHomeDashboardMetric("Latest Block", "#" + latestNumber, latestHash ? "Hash " + silaHomeDashboardEscape(silaHomeDashboardShort(latestHash)) : "Latest execution block", "latest-block")
    + silaHomeDashboardMetric("Total Blocks", latestNumber, "Open the Sila blocks explorer", "blocks")
    + silaHomeDashboardMetric("Recent Txns", txCount, "TPS " + silaHomeDashboardEscape(tps), "transactions")
    + silaHomeDashboardMetric("Gas", gas, "Current Sila gas price", "")
    + silaHomeDashboardMetric("Execution", executionOk ? "Online" : "Offline", silaHomeDashboardStatus(executionOk, "Sila execution RPC connected", "Sila execution RPC unavailable"), "")
    + silaHomeDashboardMetric("Consensus", consensusOk ? "Online" : "Offline", silaHomeDashboardStatus(consensusOk, "Head slot " + headSlot + " / distance " + syncDistance, "Sila consensus REST unavailable"), "")
    + silaHomeDashboardMetric("Beacon Peers", beaconPeers, peerState === "connected" ? "connected" : peerState, "runtime")
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

// SILA_CONSENSUS_PAGE_START
function silaConsensusEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function silaConsensusBool(value) {
  return value ? "Yes" : "No";
}

function silaConsensusStatus(ok) {
  return ok ? "<span class=\"sila-consensus-ok\">Online</span>" : "<span class=\"sila-consensus-warn\">Offline</span>";
}

function silaConsensusEnsureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view page";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaConsensusShowView() {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaConsensusEnsureView();
  view.classList.add("active-view");
  return view;
}

function silaConsensusRow(label, value, mono, copy) {
  const safeValue = silaConsensusEscape(value);
  const copyButton = copy && value && value !== "—"
    ? " <button class=\"sila-copy-btn\" type=\"button\" data-copy=\"" + safeValue + "\">Copy</button>"
    : "";

  return ""
    + "<div class=\"sila-detail-label\">" + silaConsensusEscape(label) + "</div>"
    + "<div class=\"sila-detail-value" + (mono ? " mono" : "") + "\">" + safeValue + copyButton + "</div>";
}

function silaConsensusRowHtml(label, htmlValue) {
  return ""
    + "<div class=\"sila-detail-label\">" + silaConsensusEscape(label) + "</div>"
    + "<div class=\"sila-detail-value\">" + htmlValue + "</div>";
}

function silaConsensusMini(label, value, html) {
  return ""
    + "<article class=\"sila-consensus-mini\">"
    + "  <span>" + silaConsensusEscape(label) + "</span>"
    + "  <strong>" + (html ? value : silaConsensusEscape(value)) + "</strong>"
    + "</article>";
}

async function silaRenderConsensusPage() {
  const view = silaConsensusShowView();

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Consensus</small>"
    + "    <h1>Validators / Consensus</h1>"
    + "    <p class=\"muted\">Loading Sila-Prysm consensus data...</p>"
    + "  </div>"
    + "</section>";

  let data;

  try {
    data = await fetch("/api/sila/consensus", { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    view.innerHTML = "<section class=\"panel\"><h2>Sila Consensus</h2><p class=\"muted\">Consensus API error: " + silaConsensusEscape(error.message) + "</p></section>";
    return;
  }

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Consensus</small>"
    + "    <h1>Validators / Consensus</h1>"
    + "    <p class=\"muted\">Live consensus-layer data from Sila-Prysm.</p>"
    + "  </div>"
    + "  <div class=\"sila-detail-actions\">"
    + "    <button type=\"button\" onclick=\"window.silaRenderConsensusPage()\">Refresh</button>"
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Consensus Overview</h2>"
    + "  <div class=\"sila-consensus-grid\">"
    + silaConsensusMini("Status", silaConsensusStatus(data.ok), true)
    + silaConsensusMini("Head Slot", data.headSlot || "—", false)
    + silaConsensusMini("Sync Distance", data.syncDistance || "—", false)
    + silaConsensusMini("EL Offline", silaConsensusBool(data.elOffline), false)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Sila-Prysm Details</h2>"
    + "  <div class=\"sila-detail-grid\">"
    + silaConsensusRowHtml("Status", silaConsensusStatus(data.ok))
    + silaConsensusRow("Health Status", data.healthStatus || "—", false, false)
    + silaConsensusRow("Version", data.version || "—", false, false)
    + silaConsensusRow("Head Slot", data.headSlot || "—", false, false)
    + silaConsensusRow("Sync Distance", data.syncDistance || "—", false, false)
    + silaConsensusRow("Is Syncing", silaConsensusBool(data.isSyncing), false, false)
    + silaConsensusRow("Is Optimistic", silaConsensusBool(data.isOptimistic), false, false)
    + silaConsensusRow("Execution Optimistic", silaConsensusBool(data.executionOptimistic), false, false)
    + silaConsensusRow("Canonical Head", silaConsensusBool(data.canonical), false, false)
    + silaConsensusRow("Finalized", silaConsensusBool(data.finalized), false, false)
    + silaConsensusRow("Proposer Index", data.proposerIndex || "—", false, false)
    + silaConsensusRow("Head Root", data.headRoot || "—", true, !!data.headRoot)
    + silaConsensusRow("Parent Root", data.parentRoot || "—", true, !!data.parentRoot)
    + silaConsensusRow("State Root", data.stateRoot || "—", true, !!data.stateRoot)
    + silaConsensusRow("Body Root", data.bodyRoot || "—", true, !!data.bodyRoot)
    + silaConsensusRow("Head Block Status", data.headBlockStatus || "—", false, false)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Validator Registry</h2>"
    + "  <div class=\"sila-empty-state\"><div><strong>Validator registry not loaded in this lightweight page yet.</strong><span>Consensus health, head slot, roots, and sync state are live. Validator list can be added as the next indexed endpoint.</span></div></div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Raw Sila Consensus JSON</h2>"
    + "  <pre>" + silaConsensusEscape(JSON.stringify(data.raw || data, null, 2)) + "</pre>"
    + "</section>";
}

document.addEventListener("click", (event) => {
  if (!event.target || typeof event.target.closest !== "function") return;

  const item = event.target.closest("a, button, [data-page], [role=\"button\"], li");
  if (!item) return;

  const page = item.getAttribute("data-page");
  const text = String(item.textContent || "").trim().toLowerCase();

  const wantsConsensus = page === "validators" || page === "consensus" || text === "validators" || text.includes("validators");
  if (!wantsConsensus) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRenderConsensusPage();
}, true);

window.silaRenderConsensusPage = silaRenderConsensusPage;
// SILA_CONSENSUS_PAGE_END

// SILA_VALIDATOR_READINESS_START
function silaValidatorEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function silaValidatorBool(value) {
  return value ? "Yes" : "No";
}

function silaValidatorOk(value) {
  return !!value;
}

function silaValidatorStatusHtml(ok) {
  return ok ? "<span class=\"sila-consensus-ok\">Online</span>" : "<span class=\"sila-consensus-warn\">Offline</span>";
}

function silaValidatorReadinessCard(title, ok, message) {
  const cls = ok ? "ok" : "warn";
  const label = ok ? "Ready" : "Check";

  return ""
    + "<article class=\"sila-readiness-card " + cls + "\">"
    + "  <div class=\"sila-readiness-top\">"
    + "    <div class=\"sila-readiness-title\">" + silaValidatorEscape(title) + "</div>"
    + "    <div class=\"sila-readiness-pill " + cls + "\">" + label + "</div>"
    + "  </div>"
    + "  <p>" + silaValidatorEscape(message) + "</p>"
    + "</article>";
}

function silaValidatorRow(label, value, mono, copy) {
  const safeValue = silaValidatorEscape(value);
  const copyButton = copy && value && value !== "—"
    ? " <button class=\"sila-copy-btn\" type=\"button\" data-copy=\"" + safeValue + "\">Copy</button>"
    : "";

  return ""
    + "<div class=\"sila-detail-label\">" + silaValidatorEscape(label) + "</div>"
    + "<div class=\"sila-detail-value" + (mono ? " mono" : "") + "\">" + safeValue + copyButton + "</div>";
}

function silaValidatorRowHtml(label, htmlValue) {
  return ""
    + "<div class=\"sila-detail-label\">" + silaValidatorEscape(label) + "</div>"
    + "<div class=\"sila-detail-value\">" + htmlValue + "</div>";
}

function silaValidatorMini(label, value, html) {
  return ""
    + "<article class=\"sila-consensus-mini\">"
    + "  <span>" + silaValidatorEscape(label) + "</span>"
    + "  <strong>" + (html ? value : silaValidatorEscape(value)) + "</strong>"
    + "</article>";
}

function silaValidatorEnsureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view page";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaValidatorShowView() {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaValidatorEnsureView();
  view.classList.add("active-view");
  return view;
}

function silaValidatorRoadmapItem(title, detail, status) {
  return ""
    + "<div class=\"sila-validator-roadmap-item\">"
    + "  <div><strong>" + silaValidatorEscape(title) + "</strong><span>" + silaValidatorEscape(detail) + "</span></div>"
    + "  <span>" + silaValidatorEscape(status) + "</span>"
    + "</div>";
}

async function silaRenderConsensusPageEnhanced() {
  const view = silaValidatorShowView();

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Consensus</small>"
    + "    <h1>Validators / Consensus</h1>"
    + "    <p class=\"muted\">Loading Sila-Prysm consensus data...</p>"
    + "  </div>"
    + "</section>";

  let data;

  try {
    data = await fetch("/api/sila/consensus", { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    view.innerHTML = "<section class=\"panel\"><h2>Sila Consensus</h2><p class=\"muted\">Consensus API error: " + silaValidatorEscape(error.message) + "</p></section>";
    return;
  }

  const consensusOnline = silaValidatorOk(data.ok);
  const healthOk = Number(data.healthStatus) === 200;
  const syncOk = !data.isSyncing && String(data.syncDistance || "0") === "0";
  const elOk = !data.elOffline;
  const canonicalOk = !!data.canonical;
  const optimisticOk = !data.executionOptimistic && !data.isOptimistic;
  const headSlot = data.headSlot || "—";
  const syncDistance = data.syncDistance || "—";

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Consensus</small>"
    + "    <h1>Validators / Consensus</h1>"
    + "    <p class=\"muted\">Live consensus-layer data from Sila-Prysm.</p>"
    + "  </div>"
    + "  <div class=\"sila-detail-actions\">"
    + "    <button type=\"button\" onclick=\"window.silaRenderConsensusPage()\">Refresh</button>"
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Consensus Overview</h2>"
    + "  <div class=\"sila-consensus-grid\">"
    + silaValidatorMini("Status", silaValidatorStatusHtml(consensusOnline), true)
    + silaValidatorMini("Head Slot", headSlot, false)
    + silaValidatorMini("Sync Distance", syncDistance, false)
    + silaValidatorMini("EL Offline", silaValidatorBool(data.elOffline), false)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Validator Readiness</h2>"
    + "  <div class=\"sila-readiness-grid\">"
    + silaValidatorReadinessCard("Consensus REST", consensusOnline && healthOk, healthOk ? "Sila-Prysm health endpoint is responding with HTTP 200." : "Sila-Prysm health endpoint is not reporting HTTP 200.")
    + silaValidatorReadinessCard("Execution Link", elOk, elOk ? "Consensus reports execution layer is connected." : "Consensus reports execution layer is offline.")
    + silaValidatorReadinessCard("Sync State", syncOk, syncOk ? "Node is synced with sync distance 0." : "Node is still syncing or sync distance is non-zero.")
    + silaValidatorReadinessCard("Canonical Head", canonicalOk, canonicalOk ? "Head header is canonical." : "Head header is not confirmed canonical.")
    + silaValidatorReadinessCard("Optimistic State", optimisticOk, optimisticOk ? "Head is not optimistic." : "Head is optimistic; execution confirmation is still pending.")
    + silaValidatorReadinessCard("Finality", data.finalized === true, data.finalized ? "Head header is finalized." : "Head header is not finalized yet. This can be normal on a short-lived devnet.")
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Sila-Prysm Details</h2>"
    + "  <div class=\"sila-detail-grid\">"
    + silaValidatorRowHtml("Status", silaValidatorStatusHtml(consensusOnline))
    + silaValidatorRow("Health Status", data.healthStatus || "—", false, false)
    + silaValidatorRow("Version", data.version || "—", false, false)
    + silaValidatorRow("Head Slot", headSlot, false, false)
    + silaValidatorRow("Sync Distance", syncDistance, false, false)
    + silaValidatorRow("Is Syncing", silaValidatorBool(data.isSyncing), false, false)
    + silaValidatorRow("EL Offline", silaValidatorBool(data.elOffline), false, false)
    + silaValidatorRow("Is Optimistic", silaValidatorBool(data.isOptimistic), false, false)
    + silaValidatorRow("Execution Optimistic", silaValidatorBool(data.executionOptimistic), false, false)
    + silaValidatorRow("Canonical Head", silaValidatorBool(data.canonical), false, false)
    + silaValidatorRow("Finalized", silaValidatorBool(data.finalized), false, false)
    + silaValidatorRow("Proposer Index", data.proposerIndex || "—", false, false)
    + silaValidatorRow("Head Root", data.headRoot || "—", true, !!data.headRoot)
    + silaValidatorRow("Parent Root", data.parentRoot || "—", true, !!data.parentRoot)
    + silaValidatorRow("State Root", data.stateRoot || "—", true, !!data.stateRoot)
    + silaValidatorRow("Body Root", data.bodyRoot || "—", true, !!data.bodyRoot)
    + silaValidatorRow("Head Block Status", data.headBlockStatus || "—", false, false)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Validator Registry Roadmap</h2>"
    + "  <div class=\"sila-validator-roadmap\">"
    + silaValidatorRoadmapItem("Validator summary", "Active / pending / exited validator counts from Sila-Prysm.", "Next endpoint")
    + silaValidatorRoadmapItem("Validator list", "Paginated validators with index, balance, status, and pubkey.", "Next endpoint")
    + silaValidatorRoadmapItem("Attestations / duties", "Slot and epoch duties once the validator API layer is wired.", "Future")
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-detail-card\">"
    + "  <h2>Raw Sila Consensus JSON</h2>"
    + "  <pre>" + silaValidatorEscape(JSON.stringify(data.raw || data, null, 2)) + "</pre>"
    + "</section>";
}

window.silaRenderConsensusPage = silaRenderConsensusPageEnhanced;
// SILA_VALIDATOR_READINESS_END

// SILA_CONSENSUS_EXPOSE_FIX_START
(function () {
  function escapeHtml(value) {
    return String(value === null || value === undefined ? "—" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  async function fallbackConsensusPage() {
    const feature = document.getElementById("featureView") || document.querySelector("main");
    if (!feature) return;

    document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
    feature.classList.add("active-view");

    feature.innerHTML = ""
      + "<section class=\"sila-detail-hero\">"
      + "  <div>"
      + "    <small>Sila Consensus</small>"
      + "    <h1>Validators / Consensus</h1>"
      + "    <p class=\"muted\">Loading Sila-Prysm consensus data...</p>"
      + "  </div>"
      + "</section>";

    let data;
    try {
      data = await fetch("/api/sila/consensus", { cache: "no-store" }).then((res) => res.json());
    } catch (error) {
      feature.innerHTML = "<section class=\"panel\"><h2>Sila Consensus</h2><p class=\"muted\">Consensus API error: " + escapeHtml(error.message) + "</p></section>";
      return;
    }

    const status = data.ok ? "<span class=\"sila-consensus-ok\">Online</span>" : "<span class=\"sila-consensus-warn\">Offline</span>";

    feature.innerHTML = ""
      + "<section class=\"sila-detail-hero\">"
      + "  <div>"
      + "    <small>Sila Consensus</small>"
      + "    <h1>Validators / Consensus</h1>"
      + "    <p class=\"muted\">Live consensus-layer data from Sila-Prysm.</p>"
      + "  </div>"
      + "  <div class=\"sila-detail-actions\"><button type=\"button\" onclick=\"window.silaRenderConsensusPage()\">Refresh</button></div>"
      + "</section>"
      + "<section class=\"panel sila-detail-card\">"
      + "  <h2>Consensus Overview</h2>"
      + "  <div class=\"sila-consensus-grid\">"
      + "    <article class=\"sila-consensus-mini\"><span>Status</span><strong>" + status + "</strong></article>"
      + "    <article class=\"sila-consensus-mini\"><span>Head Slot</span><strong>" + escapeHtml(data.headSlot) + "</strong></article>"
      + "    <article class=\"sila-consensus-mini\"><span>Sync Distance</span><strong>" + escapeHtml(data.syncDistance) + "</strong></article>"
      + "    <article class=\"sila-consensus-mini\"><span>EL Offline</span><strong>" + escapeHtml(data.elOffline ? "Yes" : "No") + "</strong></article>"
      + "  </div>"
      + "</section>"
      + "<section class=\"panel sila-detail-card\">"
      + "  <h2>Sila-Prysm Details</h2>"
      + "  <pre>" + escapeHtml(JSON.stringify(data, null, 2)) + "</pre>"
      + "</section>";
  }

  if (typeof window.silaRenderConsensusPage !== "function") {
    window.silaRenderConsensusPage = fallbackConsensusPage;
  }
})();
// SILA_CONSENSUS_EXPOSE_FIX_END

// SILA_BLOCKS_RENDER_RESTORE_START
(function () {
  function escapeHtml(value) {
    return String(value === null || value === undefined ? "—" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function shortHash(value) {
    if (!value || typeof value !== "string") return "—";
    return value.length <= 22 ? value : value.slice(0, 10) + "..." + value.slice(-8);
  }

  function ensureFeatureView() {
    let view = document.getElementById("featureView");
    if (view) return view;

    view = document.createElement("section");
    view.id = "featureView";
    view.className = "view page";
    document.querySelector("main").appendChild(view);
    return view;
  }

  function showFeatureView() {
    document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
    const view = ensureFeatureView();
    view.classList.add("active-view");
    return view;
  }

  function blockNumberOf(block) {
    return block.number || block.height || block.blockNumber || "—";
  }

  function blockHashOf(block) {
    return block.hash || block.blockHash || "—";
  }

  function txCountOf(block) {
    if (block.transactionCount !== undefined && block.transactionCount !== null) return block.transactionCount;
    if (Array.isArray(block.transactions)) return block.transactions.length;
    return 0;
  }

  async function renderBlocksPage() {
    const view = showFeatureView();

    view.innerHTML = ""
      + "<section class=\"sila-detail-hero\">"
      + "  <div>"
      + "    <small>Sila Execution</small>"
      + "    <h1>Blocks</h1>"
      + "    <p class=\"muted\">Loading latest Sila blocks...</p>"
      + "  </div>"
      + "</section>";

    let data;
    try {
      data = await fetch("/api/sila/blocks?limit=25", { cache: "no-store" }).then((res) => res.json());
    } catch (error) {
      view.innerHTML = "<section class=\"panel\"><h2>Sila Blocks</h2><p class=\"muted\">Blocks API error: " + escapeHtml(error.message) + "</p></section>";
      return;
    }

    const blocks = Array.isArray(data) ? data : (data.blocks || data.items || data.recentBlocks || []);

    if (!blocks.length) {
      view.innerHTML = ""
        + "<section class=\"sila-detail-hero\">"
        + "  <div><small>Sila Execution</small><h1>Blocks</h1><p class=\"muted\">No Sila blocks returned by the API.</p></div>"
        + "  <div class=\"sila-detail-actions\"><button type=\"button\" onclick=\"window.silaRenderBlocksPage()\">Refresh</button></div>"
        + "</section>"
        + "<section class=\"panel\"><div class=\"sila-empty-state\"><div><strong>No blocks found.</strong><span>The Sila blocks API returned an empty list.</span></div></div></section>";
      return;
    }

    const rows = blocks.map((block) => {
      const number = blockNumberOf(block);
      const hash = blockHashOf(block);
      const txCount = txCountOf(block);
      const gasUsed = block.gasUsed || "0";
      const gasLimit = block.gasLimit || "—";
      const miner = block.minerShort || block.miner || "—";

      return ""
        + "<tr>"
        + "  <td><button class=\"linklike\" type=\"button\" onclick=\"window.silaRenderBlockDetails('" + escapeHtml(number) + "')\">#" + escapeHtml(number) + "</button></td>"
        + "  <td class=\"mono\" title=\"" + escapeHtml(hash) + "\">" + escapeHtml(shortHash(hash)) + "</td>"
        + "  <td>" + escapeHtml(txCount) + "</td>"
        + "  <td>" + escapeHtml(gasUsed) + " / " + escapeHtml(gasLimit) + "</td>"
        + "  <td class=\"mono\">" + escapeHtml(miner) + "</td>"
        + "</tr>";
    }).join("");

    view.innerHTML = ""
      + "<section class=\"sila-detail-hero\">"
      + "  <div>"
      + "    <small>Sila Execution</small>"
      + "    <h1>Blocks</h1>"
      + "    <p class=\"muted\">Latest live blocks from the local Sila execution RPC.</p>"
      + "  </div>"
      + "  <div class=\"sila-detail-actions\"><button type=\"button\" onclick=\"window.silaRenderBlocksPage()\">Refresh</button></div>"
      + "</section>"
      + "<section class=\"panel sila-detail-card\">"
      + "  <h2>Latest Blocks</h2>"
      + "  <div class=\"table-wrap\">"
      + "    <table>"
      + "      <thead><tr><th>Block</th><th>Hash</th><th>Txns</th><th>Gas</th><th>Fee Recipient</th></tr></thead>"
      + "      <tbody>" + rows + "</tbody>"
      + "    </table>"
      + "  </div>"
      + "</section>";
  }

  window.silaRenderBlocksPage = renderBlocksPage;

  document.addEventListener("click", (event) => {
    if (!event.target || typeof event.target.closest !== "function") return;

    const item = event.target.closest("a, button, [data-page], [role=\"button\"], li");
    if (!item) return;

    const page = item.getAttribute("data-page");
    const text = String(item.textContent || "").trim().toLowerCase();

    const wantsBlocks = page === "blocks" || text === "view blocks" || text.includes("view blocks");
    if (!wantsBlocks) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    renderBlocksPage();
  }, true);
})();
// SILA_BLOCKS_RENDER_RESTORE_END


// SILA_RUNTIME_PAGE_START
function silaRuntimeEscape(value) {
  return String(value === null || value === undefined ? "—" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function silaRuntimeShort(value) {
  if (!value || typeof value !== "string") return "—";
  return value.length <= 18 ? value : value.slice(0, 10) + "..." + value.slice(-8);
}

function silaRuntimeStatus(ok, yes, no) {
  return ok
    ? "<span class=\"sila-runtime-ok\">" + silaRuntimeEscape(yes || "Online") + "</span>"
    : "<span class=\"sila-runtime-warn\">" + silaRuntimeEscape(no || "Needs check") + "</span>";
}

function silaRuntimeEnsureView() {
  let view = document.getElementById("featureView");
  if (view) return view;

  view = document.createElement("section");
  view.id = "featureView";
  view.className = "view";
  document.querySelector("main").appendChild(view);
  return view;
}

function silaRuntimeShowView() {
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active-view"));
  const view = silaRuntimeEnsureView();
  view.classList.add("active-view");
  return view;
}

function silaRuntimeMetric(label, value, note, ok) {
  return ""
    + "<article class=\"sila-runtime-metric\">"
    + "  <span>" + silaRuntimeEscape(label) + "</span>"
    + "  <strong>" + silaRuntimeEscape(value) + "</strong>"
    + "  <small>" + (typeof ok === "boolean" ? silaRuntimeStatus(ok, note, note) : silaRuntimeEscape(note || "—")) + "</small>"
    + "</article>";
}

function silaRuntimeRow(label, value, mono) {
  return ""
    + "<div class=\"sila-detail-label\">" + silaRuntimeEscape(label) + "</div>"
    + "<div class=\"sila-detail-value" + (mono ? " mono" : "") + "\">" + silaRuntimeEscape(value) + "</div>";
}

function silaRuntimePorts(ports) {
  const required = ports && ports.required ? ports.required : {};
  return ""
    + silaRuntimeMetric("EL RPC 8545", required.elRpc8545 ? "Listening" : "Closed", "http://127.0.0.1:8545", !!required.elRpc8545)
    + silaRuntimeMetric("EL Auth 8551", required.elAuth8551 ? "Listening" : "Closed", "silaEngine endpoint", !!required.elAuth8551)
    + silaRuntimeMetric("CL REST 3500", required.clRest3500 ? "Listening" : "Closed", "Sila-Prysm REST", !!required.clRest3500)
    + silaRuntimeMetric("CL gRPC 4000", required.clGrpc4000 ? "Listening" : "Closed", "Validator provider", !!required.clGrpc4000)
    + silaRuntimeMetric("SilaScan 8787", required.dashboard8787 ? "Listening" : "Closed", "Dashboard", !!required.dashboard8787);
}

function silaRuntimeProcessRows(processes) {
  const items = processes && Array.isArray(processes.items) ? processes.items : [];
  if (!items.length) {
    return "<div class=\"sila-empty-state\"><div><strong>No local process data available.</strong><span>The API will still show RPC and REST status.</span></div></div>";
  }

  return ""
    + "<table class=\"sila-blocks-table\">"
    + "  <thead><tr><th>Process</th><th>PID</th><th>Path</th></tr></thead>"
    + "  <tbody>"
    + items.map((item) => ""
    + "    <tr>"
    + "      <td>" + silaRuntimeEscape(item.Name) + "</td>"
    + "      <td>" + silaRuntimeEscape(item.ProcessId) + "</td>"
    + "      <td class=\"mono\">" + silaRuntimeEscape(item.ExecutablePath || "—") + "</td>"
    + "    </tr>").join("")
    + "  </tbody>"
    + "</table>";
}

async function silaRenderRuntimePage() {
  const view = silaRuntimeShowView();

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Runtime</small>"
    + "    <h1>Sila Network Status</h1>"
    + "    <p class=\"muted\">Loading live Sila runtime status from local EL, CL, validator, ports, and processes.</p>"
    + "  </div>"
    + "</section>";

  let data;
  try {
    data = await fetch("/api/sila/runtime", { cache: "no-store" }).then((res) => res.json());
  } catch (error) {
    view.innerHTML = "<section class=\"panel\"><h2>Sila Runtime</h2><p class=\"muted\">Runtime API error: " + silaRuntimeEscape(error.message) + "</p></section>";
    return;
  }

  const execution = data.execution || {};
  const consensus = data.consensus || {};
  const validator = data.validator || {};
  const local = data.local || {};
  const latest = execution.latestBlock || {};
  const recentBlocks = Array.isArray(execution.recentBlocks) ? execution.recentBlocks : [];
  const processItems = local && local.processes && Array.isArray(local.processes.items) ? local.processes.items : [];
  const hasProcess = (name, marker) => processItems.some((item) =>
    String(item.Name || "").toLowerCase() === name.toLowerCase()
    && (!marker || String(item.CommandLine || "").toLowerCase().includes(marker.toLowerCase()))
  );
  const beaconAOk = hasProcess("beacon-chain.exe", "beacon-a");
  const beaconBOk = hasProcess("beacon-chain.exe", "beacon-b");
  const validatorProcessOk = !!(validator && validator.ok);
  const executionLayerOk = !!(execution && execution.ok);
  const beaconPeerCount = Number(consensus.connectedPeers || 0);
  const twoBeaconModeOk = beaconAOk && beaconBOk && validatorProcessOk && executionLayerOk && beaconPeerCount > 0;

  view.innerHTML = ""
    + "<section class=\"sila-detail-hero\">"
    + "  <div>"
    + "    <small>Sila Runtime</small>"
    + "    <h1>Sila Network Status</h1>"
    + "    <p class=\"muted\">Live runtime state from SilaChain, Sila-Prysm, validator, and SilaScan.</p>"
    + "  </div>"
    + "  <div class=\"sila-detail-actions\">"
    + "    <button type=\"button\" onclick=\"window.silaRenderRuntimePage()\">Refresh</button>"
    + "    <button type=\"button\" data-page=\"blocks\">View Blocks</button>"
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-runtime-card\">"
    + "  <h2>Runtime Overview</h2>"
    + "  <div class=\"sila-runtime-grid\">"
    + silaRuntimeMetric("Execution Layer", execution.ok ? "Online" : "Offline", "SilaChain RPC", !!execution.ok)
    + silaRuntimeMetric("Consensus REST", consensus.ok ? "Online" : "Offline", "Sila-Prysm REST", !!consensus.ok)
    + silaRuntimeMetric("Validator", validator.ok ? "Running" : "Not detected", "Local validator process", !!validator.ok)
    + silaRuntimeMetric("Latest Block", execution.latestBlockNumber !== null && execution.latestBlockNumber !== undefined ? "#" + execution.latestBlockNumber : "—", execution.productionMoving ? "Producing blocks" : "Check production", !!execution.productionMoving)
    + silaRuntimeMetric("Head Slot", consensus.headSlot || "—", "Sync distance " + silaRuntimeEscape(consensus.syncDistance), consensus.isSyncing === false)
    + silaRuntimeMetric("Beacon Peers", consensus.connectedPeers !== undefined ? consensus.connectedPeers : "0", Number(consensus.connectedPeers || 0) > 0)
    + silaRuntimeMetric("Devnet Mode", twoBeaconModeOk ? "Two-Beacon" : "Check", "A " + (beaconAOk ? "connected" : "missing") + " / B " + (beaconBOk ? "connected" : "missing"), twoBeaconModeOk)
    + silaRuntimeMetric("CL reports EL offline", consensus.elOffline === true ? "Yes" : "No", "Reported by CL REST", consensus.elOffline !== true)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-runtime-card\">"
    + "  <h2>Execution</h2>"
    + "  <div class=\"sila-detail-grid\">"
    + silaRuntimeRow("Chain ID", execution.chainId || "—", false)
    + silaRuntimeRow("Latest Block", execution.latestBlockNumber !== null && execution.latestBlockNumber !== undefined ? "#" + execution.latestBlockNumber : "—", false)
    + silaRuntimeRow("Latest Hash", latest.hash || "—", true)
    + silaRuntimeRow("Latest Age", execution.latestAgeSeconds !== null && execution.latestAgeSeconds !== undefined ? execution.latestAgeSeconds + " seconds" : "—", false)
    + silaRuntimeRow("Fee Recipient", latest.miner || "—", true)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-runtime-card\">"
    + "  <h2>Consensus</h2>"
    + "  <div class=\"sila-detail-grid\">"
    + silaRuntimeRow("Health Status", consensus.healthStatus || "—", false)
    + silaRuntimeRow("Version", consensus.version || "—", false)
    + silaRuntimeRow("Head Slot", consensus.headSlot || "—", false)
    + silaRuntimeRow("Sync Distance", consensus.syncDistance || "—", false)
    + silaRuntimeRow("Is Syncing", consensus.isSyncing === true ? "Yes" : "No", false)
    + silaRuntimeRow("Is Optimistic", consensus.isOptimistic === true ? "Yes" : "No", false)
    + silaRuntimeRow("Execution Optimistic", consensus.executionOptimistic === true ? "Yes" : "No", false)
    + silaRuntimeRow("EL Offline Flag", consensus.elOffline === true ? "Yes" : "No", false)
    + silaRuntimeRow("Beacon Connected Peers", consensus.connectedPeers)
    + silaRuntimeRow("Peer State", consensus.peerState)
    + silaRuntimeRow("Head Root", consensus.headRoot || "—", true)
    + "</div>"
    + "</section>"
    + "<section class=\"panel sila-runtime-card\">"
    + "  <h2>Two-Beacon Devnet Mode</h2>"
    + "  <div class=\"sila-detail-grid\">"
    + silaRuntimeRow("Mode", twoBeaconModeOk ? "Two-Beacon Devnet" : "Incomplete", false)
    + silaRuntimeRow("Beacon A", beaconAOk ? "connected" : "not detected", false)
    + silaRuntimeRow("Beacon B", beaconBOk ? "connected" : "not detected", false)
    + silaRuntimeRow("Beacon Connected Peers", beaconPeerCount, false)
    + silaRuntimeRow("Validator", validatorProcessOk ? "running" : "not detected", false)
    + silaRuntimeRow("Execution", executionLayerOk ? "online" : "offline", false)
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-runtime-card\">"
    + "  <h2>Ports</h2>"
    + "  <div class=\"sila-runtime-grid\">"
    + silaRuntimePorts(local.ports || {})
    + "  </div>"
    + "</section>"
    + "<section class=\"panel sila-runtime-card\">"
    + "  <h2>Local Processes</h2>"
    + silaRuntimeProcessRows(local.processes || {})
    + "</section>"
    + "<section class=\"panel sila-runtime-card\">"
    + "  <h2>Last Blocks</h2>"
    + (recentBlocks.length ? "<div class=\"sila-blocks-table-wrap\"><table class=\"sila-blocks-table\"><thead><tr><th>Block</th><th>Hash</th><th>Txs</th><th>Gas Used</th></tr></thead><tbody>"
      + recentBlocks.slice(0, 10).map((block) => "<tr><td><button type=\"button\" class=\"linklike\" data-sila-block-detail=\"" + silaRuntimeEscape(block.number) + "\">#" + silaRuntimeEscape(block.number) + "</button></td><td class=\"mono\">" + silaRuntimeEscape(silaRuntimeShort(block.hash)) + "</td><td>" + silaRuntimeEscape(block.transactionCount || 0) + "</td><td>" + silaRuntimeEscape(block.gasUsed || "0") + "</td></tr>").join("")
      + "</tbody></table></div>" : "<div class=\"sila-empty-state\"><div><strong>No recent Sila blocks available.</strong><span>Runtime API is connected but no block list was returned.</span></div></div>")
    + "</section>"
    + "<section class=\"panel sila-runtime-card\">"
    + "  <h2>Developer JSON</h2>"
    + "  <pre>" + silaRuntimeEscape(JSON.stringify(data, null, 2)) + "</pre>"
    + "</section>";
}

document.addEventListener("click", (event) => {
  if (!event.target || typeof event.target.closest !== "function") return;

  const item = event.target.closest("a, button, [data-page], [role=\"button\"], li");
  if (!item) return;

  const page = item.getAttribute("data-page");
  const text = String(item.textContent || "").trim().toLowerCase();

  const wantsRuntime = page === "runtime"
    || page === "status"
    || text === "network status"
    || text === "sila network status"
    || text === "sila runtime"
    || text.includes("network status")
    || text.includes("sila runtime");

  if (!wantsRuntime) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  silaRenderRuntimePage();
}, true);

window.silaRenderRuntimePage = silaRenderRuntimePage;
// SILA_RUNTIME_PAGE_END

// SILA_PRETTY_ROUTE_BOOTSTRAP_START
(function () {
  function setSilaNavActive(viewName) {
    document.querySelectorAll(".nav-btn").forEach((node) => node.classList.remove("active"));
    const button = document.querySelector("[data-view=\"" + viewName + "\"]");
    if (button) button.classList.add("active");
  }

  function callIfAvailable(functionName) {
    if (typeof window[functionName] !== "function") return false;
    window[functionName](null);
    return true;
  }

  function fallbackView(viewName) {
    if (typeof showView !== "function") return false;
    showView(viewName);
    return true;
  }

  function activatePrettyRoute(pathname) {
    const path = String(pathname || window.location.pathname || "/").replace(/\/+$/, "") || "/";

    window.setTimeout(() => {
      if (path === "/blocks") {
        setSilaNavActive("explorer");
        if (!callIfAvailable("silaRenderBlocksPage")) fallbackView("explorer");
        return;
      }

      if (path === "/transactions") {
        setSilaNavActive("explorer");
        if (!callIfAvailable("silaRenderTransactionsPage")) fallbackView("explorer");
        return;
      }

      if (path === "/runtime") {
        setSilaNavActive("more");
        if (!callIfAvailable("silaRenderRuntimePage")) fallbackView("more");
        return;
      }

      if (path === "/consensus") {
        setSilaNavActive("validators");
        if (!callIfAvailable("silaRenderConsensusPage")) fallbackView("validators");
      }
    }, 0);
  }

  window.silaActivatePrettyRoute = activatePrettyRoute;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => activatePrettyRoute(window.location.pathname));
  } else {
    activatePrettyRoute(window.location.pathname);
  }
}());
// SILA_PRETTY_ROUTE_BOOTSTRAP_END


// SILA_REAL_BLOCKS_EXPLORER_START
(function () {
  "use strict";

  const LIMIT = 25;

  function esc(value) {
    return String(value === null || value === undefined ? "—" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function shortHash(value) {
    const s = String(value || "");
    if (!s || s.length <= 18) return s || "—";
    return s.slice(0, 10) + "..." + s.slice(-8);
  }

  function dec(value) {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "number") return String(value);
    const s = String(value);
    if (s.startsWith("0x")) {
      try { return BigInt(s).toString(10); } catch (_) { return s; }
    }
    return s;
  }

  function fmtTime(ts) {
    const n = Number(ts || 0);
    if (!Number.isFinite(n) || n <= 0) return "—";
    const d = new Date(n * 1000);
    const pad = (v) => String(v).padStart(2, "0");
    return d.getUTCFullYear() + "-"
      + pad(d.getUTCMonth() + 1) + "-"
      + pad(d.getUTCDate()) + " "
      + pad(d.getUTCHours()) + ":"
      + pad(d.getUTCMinutes()) + ":"
      + pad(d.getUTCSeconds()) + " UTC";
  }

  function age(ts) {
    const n = Number(ts || 0);
    if (!Number.isFinite(n) || n <= 0) return "—";
    const seconds = Math.max(0, Math.floor(Date.now() / 1000 - n));
    if (seconds < 60) return seconds + "s ago";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + "m ago";
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + "h ago";
    return Math.floor(hours / 24) + "d ago";
  }

  function gasPercent(block) {
    const used = Number(dec(block.gasUsed));
    const limit = Number(dec(block.gasLimit));
    if (!Number.isFinite(used) || !Number.isFinite(limit) || limit <= 0) return 0;
    return Math.max(0, Math.min(100, (used / limit) * 100));
  }

  async function readJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status + " for " + url);
    const data = await response.json();
    if (data && data.ok === false) throw new Error(data.error || "Sila API returned ok=false");
    return data;
  }

  function ensureRouteView() {
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.add("hidden");
      view.style.display = "none";
    });

    let host = document.getElementById("silaRouteView");
    if (!host) {
      host = document.createElement("section");
      host.id = "silaRouteView";
      host.className = "view page sila-route-view";
      const main = document.querySelector("main") || document.body;
      main.appendChild(host);
    }

    host.classList.remove("hidden");
    host.classList.add("active-view");
    host.style.display = "block";
    return host;
  }

  function blocksLayout() {
    return ""
      + "<section class=\"sila-blocks-page\">"
      + "  <section class=\"sila-blocks-hero\">"
      + "    <div>"
      + "      <small>Blockchain</small>"
      + "      <h1>Sila Blocks</h1>"
      + "      <p>Live blocks validated by the local Sila execution and consensus stack.</p>"
      + "    </div>"
      + "    <div class=\"sila-blocks-actions\">"
      + "      <button type=\"button\" id=\"silaBlocksRefresh\">Refresh</button>"
      + "      <button type=\"button\" id=\"silaBlocksOlder\">Load older</button>"
      + "    </div>"
      + "  </section>"
      + "  <section class=\"sila-blocks-summary\" id=\"silaBlocksSummary\">"
      + "    <article><span>Latest Block</span><strong>—</strong><small>Waiting for API</small></article>"
      + "    <article><span>Blocks Loaded</span><strong>—</strong><small>Current page</small></article>"
      + "    <article><span>Chain</span><strong>Sila</strong><small>Local devnet</small></article>"
      + "    <article><span>Status</span><strong>Loading</strong><small id=\"silaBlocksStatus\">Connecting</small></article>"
      + "  </section>"
      + "  <section class=\"sila-blocks-table-card\">"
      + "    <div class=\"sila-blocks-table-head\">"
      + "      <div><h2>Latest Blocks</h2><small id=\"silaBlocksMeta\">Loading real Sila blocks...</small></div>"
      + "      <code>/api/sila/blocks</code>"
      + "    </div>"
      + "    <div class=\"table-wrap sila-blocks-table-wrap\">"
      + "      <table class=\"sila-blocks-table\">"
      + "        <thead>"
      + "          <tr>"
      + "            <th>Block</th>"
      + "            <th>Age</th>"
      + "            <th>Txns</th>"
      + "            <th>Fee Recipient</th>"
      + "            <th>Gas Used</th>"
      + "            <th>Base Fee</th>"
      + "            <th>Hash</th>"
      + "          </tr>"
      + "        </thead>"
      + "        <tbody id=\"silaBlocksRows\"><tr><td colspan=\"7\">Loading...</td></tr></tbody>"
      + "      </table>"
      + "    </div>"
      + "  </section>"
      + "  <section class=\"sila-block-detail-card hidden\" id=\"silaBlockDetail\">"
      + "    <h2>Block Details</h2>"
      + "    <div id=\"silaBlockDetailBody\" class=\"sila-inline-block-detail-grid\"></div>"
      + "  </section>"
      + "</section>";
  }

  function rowHtml(block) {
    const number = dec(block.number || block.numberHex);
    const hash = block.hash || "";
    const pct = gasPercent(block).toFixed(2);
    const gasUsed = dec(block.gasUsed);
    const gasLimit = dec(block.gasLimit);
    const baseFee = dec(block.baseFeePerGas);

    return ""
      + "<tr data-sila-block-number=\"" + esc(number) + "\">"
      + "  <td><button type=\"button\" class=\"sila-block-link\" data-sila-block-open=\"" + esc(number) + "\">#" + esc(number) + "</button></td>"
      + "  <td><span>" + esc(age(block.timestamp)) + "</span><small>" + esc(fmtTime(block.timestamp)) + "</small></td>"
      + "  <td><strong>" + esc(block.transactionCount || 0) + "</strong></td>"
      + "  <td><code title=\"" + esc(block.miner || "") + "\">" + esc(block.minerShort || shortHash(block.miner)) + "</code></td>"
      + "  <td><div class=\"sila-gas-cell\"><span>" + esc(gasUsed) + " / " + esc(gasLimit) + "</span><b><i style=\"width:" + esc(pct) + "%\"></i></b></div></td>"
      + "  <td>" + esc(baseFee) + " wei</td>"
      + "  <td><code title=\"" + esc(hash) + "\">" + esc(block.hashShort || shortHash(hash)) + "</code></td>"
      + "</tr>";
  }

  function detailRow(label, value, mono) {
    return ""
      + "<div class=\"sila-inline-block-detail-row\">"
      + "  <span>" + esc(label) + "</span>"
      + "  <strong" + (mono ? " class=\"mono\"" : "") + ">" + esc(value) + "</strong>"
      + "</div>";
  }

  function detailHtmlRow(label, htmlValue, mono) {
    return ""
      + "<div class=\"sila-inline-block-detail-row\">"
      + "  <span>" + esc(label) + "</span>"
      + "  <strong" + (mono ? " class=\"mono\"" : "") + ">" + htmlValue + "</strong>"
      + "</div>";
  }

  function addressLink(value) {
    if (!value || value === "—") return "—";
    return "<button type=\"button\" class=\"linklike mono\" data-address=\"" + esc(value) + "\">" + esc(value) + "</button>";
  }

  function renderDetail(block) {
    const card = document.getElementById("silaBlockDetail");
    const body = document.getElementById("silaBlockDetailBody");
    if (!card || !body) return;

    const number = dec(block.number || block.numberHex);
    body.innerHTML = ""
      + detailRow("Block", "#" + number, false)
      + detailRow("Hash", block.hash || "—", true)
      + detailRow("Parent Hash", block.parentHash || "—", true)
      + detailHtmlRow("Fee Recipient", addressLink(block.miner || "—"), true)
      + detailRow("Timestamp", fmtTime(block.timestamp), false)
      + detailRow("Transactions", block.transactionCount || 0, false)
      + detailRow("Gas Used", dec(block.gasUsed), false)
      + detailRow("Gas Limit", dec(block.gasLimit), false)
      + detailRow("Base Fee", dec(block.baseFeePerGas) + " wei", false)
      + detailRow("Reward", block.reward || "0 SILA", false);

    card.classList.remove("hidden");
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function loadBlocks(options) {
    options = options || {};
    const append = !!options.append;
    const start = options.start || "";

    const status = document.getElementById("silaBlocksStatus");
    const meta = document.getElementById("silaBlocksMeta");
    const rows = document.getElementById("silaBlocksRows");
    const summary = document.getElementById("silaBlocksSummary");

    if (status) status.textContent = "Loading real Sila blocks...";
    if (meta) meta.textContent = "Fetching from /api/sila/blocks";

    let url = "/api/sila/blocks?limit=" + LIMIT;
    if (start) url += "&startBlock=" + encodeURIComponent(start);

    try {
      const data = await readJson(url);
      const blocks = Array.isArray(data.blocks) ? data.blocks : [];

      if (!append) window.__silaBlocksExplorerBlocks = [];
      const known = new Set((window.__silaBlocksExplorerBlocks || []).map((b) => String(b.number || b.numberHex)));
      const fresh = blocks.filter((b) => !known.has(String(b.number || b.numberHex)));

      window.__silaBlocksExplorerBlocks = (window.__silaBlocksExplorerBlocks || []).concat(fresh);
      window.__silaBlocksExplorerNextStart = data.nextStart || "";

      const all = window.__silaBlocksExplorerBlocks;
      rows.innerHTML = all.length
        ? all.map(rowHtml).join("")
        : "<tr><td colspan=\"7\">No blocks returned by the Sila API.</td></tr>";

      const latest = all[0] || {};
      if (summary) {
        summary.innerHTML = ""
          + "<article><span>Latest Block</span><strong>#" + esc(dec(latest.number || latest.numberHex)) + "</strong><small>" + esc(shortHash(latest.hash)) + "</small></article>"
          + "<article><span>Blocks Loaded</span><strong>" + esc(all.length) + "</strong><small>Current table</small></article>"
          + "<article><span>Chain</span><strong>" + esc(data.chain || "Sila") + "</strong><small>Execution API live</small></article>"
          + "<article><span>Status</span><strong>Online</strong><small>Real blocks endpoint OK</small></article>";
      }

      if (status) status.textContent = "Online";
      if (meta) meta.textContent = "Loaded " + all.length + " blocks. Latest API time: " + esc(data.generatedAt || "—");
    } catch (err) {
      rows.innerHTML = "<tr><td colspan=\"7\">Sila blocks API error: " + esc(err.message || err) + "</td></tr>";
      if (status) status.textContent = "API error";
      if (meta) meta.textContent = "Failed to load real blocks.";
    }
  }

  async function openBlock(number) {
    const card = document.getElementById("silaBlockDetail");
    const body = document.getElementById("silaBlockDetailBody");
    if (card && body) {
      card.classList.remove("hidden");
      body.innerHTML = "<div class=\"sila-inline-block-detail-row\"><span>Loading</span><strong>Block #" + esc(number) + "</strong></div>";
    }

    try {
      const data = await readJson("/api/sila/block/" + encodeURIComponent(number));
      renderDetail(data.block || data);
    } catch (err) {
      if (body) {
        body.innerHTML = "<div class=\"sila-inline-block-detail-row\"><span>Error</span><strong>" + esc(err.message || err) + "</strong></div>";
      }
    }
  }

  window.silaRenderBlocksPage = async function () {
    const host = ensureRouteView();
    host.innerHTML = blocksLayout();
    await loadBlocks({ append: false });
  };

  if (!window.__silaRealBlocksExplorerBound) {
    window.__silaRealBlocksExplorerBound = true;

    document.addEventListener("click", function (event) {
      const refresh = event.target.closest("#silaBlocksRefresh");
      if (refresh) {
        event.preventDefault();
        window.silaRenderBlocksPage();
        return;
      }

      const older = event.target.closest("#silaBlocksOlder");
      if (older) {
        event.preventDefault();
        const nextStart = window.__silaBlocksExplorerNextStart || "";
        loadBlocks({ append: true, start: nextStart });
        return;
      }

      const open = event.target.closest("[data-sila-block-open]");
      if (open) {
        event.preventDefault();
        openBlock(open.getAttribute("data-sila-block-open"));
      }
    });
  }
})();
// SILA_REAL_BLOCKS_EXPLORER_END

// SILA_BLOCK_DETAILS_PAGE_START
(function () {
  "use strict";

  function esc(value) {
    return String(value === null || value === undefined ? "—" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function shortText(value) {
    const text = String(value || "");
    return text.length > 22 ? text.slice(0, 12) + "..." + text.slice(-10) : (text || "—");
  }

  function dec(value) {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "number") return String(value);
    const text = String(value);
    if (text.startsWith("0x")) {
      try { return BigInt(text).toString(10); } catch (_) { return text; }
    }
    return text;
  }

  function age(timestamp) {
    const n = Number(timestamp || 0);
    if (!Number.isFinite(n) || n <= 0) return "—";
    const seconds = Math.max(0, Math.floor(Date.now() / 1000) - n);
    if (seconds < 60) return seconds + " seconds ago";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + " minutes ago";
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + " hours ago";
    return Math.floor(hours / 24) + " days ago";
  }

  function dateText(timestamp) {
    const n = Number(timestamp || 0);
    if (!Number.isFinite(n) || n <= 0) return "—";
    const d = new Date(n * 1000);
    const pad = (v) => String(v).padStart(2, "0");
    return d.getUTCFullYear() + "-"
      + pad(d.getUTCMonth() + 1) + "-"
      + pad(d.getUTCDate()) + " "
      + pad(d.getUTCHours()) + ":"
      + pad(d.getUTCMinutes()) + ":"
      + pad(d.getUTCSeconds()) + " UTC";
  }

  async function json(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status + " for " + url);
    return await res.json();
  }

  function ensureView() {
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.add("hidden");
      view.classList.remove("active-view");
      view.style.display = "none";
    });

    let view = document.getElementById("featureView");
    if (!view) {
      view = document.createElement("section");
      view.id = "featureView";
      view.className = "view page";
      (document.querySelector("main") || document.body).appendChild(view);
    }

    view.classList.remove("hidden");
    view.classList.add("active-view");
    view.style.display = "";
    return view;
  }

  function copyButton(value) {
    if (!value || value === "—") return "";
    return " <button type=\"button\" class=\"sila-copy-btn\" data-copy=\"" + esc(value) + "\">Copy</button>";
  }

  function statCard(label, value, note, mono) {
    return ""
      + "<article>"
      + "  <span>" + esc(label) + "</span>"
      + "  <strong" + (mono ? " class=\"mono\"" : "") + ">" + esc(value) + "</strong>"
      + "  <small>" + esc(note || "") + "</small>"
      + "</article>";
  }

  function detailRow(label, value, mono, copy) {
    const raw = value === null || value === undefined ? "—" : String(value);
    return ""
      + "<div class=\"sila-official-detail-row\">"
      + "  <span>" + esc(label) + "</span>"
      + "  <strong" + (mono ? " class=\"mono\"" : "") + ">" + esc(raw) + (copy ? copyButton(raw) : "") + "</strong>"
      + "</div>";
  }

  function txSection(block) {
    const txs = block && Array.isArray(block.transactions) ? block.transactions : [];

    if (!txs.length) {
      return ""
        + "<section class=\"sila-official-card\">"
        + "  <div class=\"sila-section-head\"><h2>Block Transactions</h2><small>0 transactions</small></div>"
        + "  <div class=\"sila-empty-state\"><div><strong>No transactions in this Sila block.</strong><span>This block was produced without execution transactions.</span></div></div>"
        + "</section>";
    }

    const rows = txs.map((tx) => {
      const hash = tx.hash || tx;
      return ""
        + "<tr>"
        + "  <td><button type=\"button\" class=\"linklike\" data-tx=\"" + esc(hash) + "\">" + esc(shortText(hash)) + "</button></td>"
        + "  <td class=\"mono\">" + esc(shortText(tx.from || "—")) + "</td>"
        + "  <td class=\"mono\">" + esc(shortText(tx.to || "Contract Creation")) + "</td>"
        + "  <td>" + esc(dec(tx.value || "0x0")) + " wei</td>"
        + "  <td>" + esc(dec(tx.gas || "0x0")) + "</td>"
        + "</tr>";
    }).join("");

    return ""
      + "<section class=\"sila-official-card\">"
      + "  <div class=\"sila-section-head\"><h2>Block Transactions</h2><small>" + esc(txs.length) + " transactions</small></div>"
      + "  <div class=\"table-wrap\"><table class=\"sila-blocks-table\">"
      + "    <thead><tr><th>Hash</th><th>From</th><th>To</th><th>Value</th><th>Gas</th></tr></thead>"
      + "    <tbody>" + rows + "</tbody>"
      + "  </table></div>"
      + "</section>";
  }

  function render(blockId, data) {
    const view = ensureView();
    const block = data.block || data;
    const raw = data.raw && data.raw.value ? data.raw.value : data;
    const number = dec(block.number || block.numberHex || blockId);
    const prev = number !== "—" && Number(number) > 0 ? String(Number(number) - 1) : null;
    const next = number !== "—" ? String(Number(number) + 1) : null;

    const hash = block.hash || "—";
    const parentHash = block.parentHash || "—";
    const feeRecipient = block.miner || "—";
    const txCount = block.transactionCount || (Array.isArray(block.transactions) ? block.transactions.length : 0);
    const baseFee = block.baseFeePerGas !== undefined ? dec(block.baseFeePerGas) + " wei" : "—";
    const gasUsed = dec(block.gasUsed || "0");
    const gasLimit = dec(block.gasLimit || "—");

    view.innerHTML = ""
      + "<section class=\"sila-official-detail-page\">"
      + "  <section class=\"sila-official-detail-hero\">"
      + "    <div>"
      + "      <small>Block Details</small>"
      + "      <h1>Sila Block #" + esc(number) + "</h1>"
      + "      <p>Execution-layer block data read directly from the live Sila RPC.</p>"
      + "    </div>"
      + "    <div class=\"sila-detail-actions\">"
      + "      <button type=\"button\" data-page=\"blocks\">All Blocks</button>"
      + (prev ? "      <button type=\"button\" data-sila-block-detail=\"" + esc(prev) + "\">Previous</button>" : "")
      + (next ? "      <button type=\"button\" data-sila-block-detail=\"" + esc(next) + "\">Next</button>" : "")
      + "    </div>"
      + "  </section>"
      + "  <section class=\"sila-official-stats-grid\">"
      + statCard("Block Height", "#" + number, "Canonical status is provided by the node", false)
      + statCard("Transactions", txCount, "Execution transactions", false)
      + statCard("Gas Used", gasUsed, "Limit " + gasLimit, false)
      + statCard("Base Fee", baseFee, "Per gas", false)
      + "  </section>"
      + "  <section class=\"sila-official-card\">"
      + "    <div class=\"sila-section-head\"><h2>Overview</h2><small>Live block fields</small></div>"
      + "    <div class=\"sila-official-detail-grid\">"
      + detailRow("Block Height", "#" + number, false, false)
      + detailRow("Timestamp", block.timestamp ? dateText(block.timestamp) + " / " + age(block.timestamp) : "—", false, false)
      + detailRow("Transactions", txCount, false, false)
      + detailRow("Fee Recipient", silaTxLinkAddress(feeRecipient), false, false)
      + detailRow("Block Reward", block.reward || "0 SILA", false, false)
      + detailRow("Gas Used", gasUsed, false, false)
      + detailRow("Gas Limit", gasLimit, false, false)
      + detailRow("Base Fee Per Gas", baseFee, false, false)
      + detailRow("Hash", hash, true, true)
      + detailRow("Parent Hash", parentHash, true, true)
      + "    </div>"
      + "  </section>"
      + txSection(block)
      + "  <section class=\"sila-official-card\">"
      + "    <details class=\"sila-raw-json\">"
      + "      <summary>Raw Sila Block JSON</summary>"
      + "      <pre>" + esc(JSON.stringify(raw, null, 2)) + "</pre>"
      + "    </details>"
      + "  </section>"
      + "</section>";
  }

  async function silaRenderBlockDetails(blockId) {
    const view = ensureView();

    view.innerHTML = ""
      + "<section class=\"sila-official-detail-page\">"
      + "  <section class=\"sila-official-detail-hero\">"
      + "    <div><small>Block Details</small><h1>Loading Sila Block</h1><p>Reading live data from /api/sila/block.</p></div>"
      + "  </section>"
      + "</section>";

    try {
      const data = await json("/api/sila/block/" + encodeURIComponent(blockId));
      if (!data || !data.ok || !data.block) {
        view.innerHTML = "<section class=\"panel\"><h2>Sila Block</h2><p class=\"muted\">Sila block not found.</p><pre>" + esc(JSON.stringify(data, null, 2)) + "</pre></section>";
        return;
      }
      render(blockId, data);
    } catch (error) {
      view.innerHTML = "<section class=\"panel\"><h2>Sila Block</h2><p class=\"muted\">Block API error: " + esc(error.message || error) + "</p></section>";
    }
  }

  if (!window.__silaOfficialBlockDetailBound) {
    window.__silaOfficialBlockDetailBound = true;

    document.addEventListener("click", function (event) {
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

    document.addEventListener("click", function (event) {
      const copy = event.target.closest("[data-copy]");
      if (!copy) return;

      const value = copy.getAttribute("data-copy") || "";
      navigator.clipboard.writeText(value).then(function () {
        copy.textContent = "Copied";
        setTimeout(function () { copy.textContent = "Copy"; }, 900);
      }).catch(function () {
        copy.textContent = "Copy failed";
        setTimeout(function () { copy.textContent = "Copy"; }, 900);
      });
    });
  }

  window.silaRenderBlockDetails = silaRenderBlockDetails;
})();
// SILA_BLOCK_DETAILS_PAGE_END

// SILA_TRANSACTIONS_PAGE_START
(function () {
  "use strict";

  const DEFAULT_LIMIT = 25;
  const DEFAULT_BLOCK_SCAN = 500;

  function esc(value) {
    return String(value === null || value === undefined ? "—" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function shortText(value) {
    const text = String(value || "");
    return text.length > 22 ? text.slice(0, 12) + "..." + text.slice(-10) : (text || "—");
  }

  function dec(value) {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "number") return String(value);
    const text = String(value);
    if (text.startsWith("0x")) {
      try { return BigInt(text).toString(10); } catch (_) { return text; }
    }
    return text;
  }

  async function readJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status + " for " + url);
    return await response.json();
  }

  function ensureView() {
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.add("hidden");
      view.classList.remove("active-view");
      view.style.display = "none";
    });

    let view = document.getElementById("featureView");
    if (!view) {
      view = document.createElement("section");
      view.id = "featureView";
      view.className = "view page";
      (document.querySelector("main") || document.body).appendChild(view);
    }

    view.classList.remove("hidden");
    view.classList.add("active-view");
    view.style.display = "block";
    return view;
  }

  function statCard(label, value, note) {
    return ""
      + "<article>"
      + "  <span>" + esc(label) + "</span>"
      + "  <strong>" + esc(value) + "</strong>"
      + "  <small>" + esc(note || "") + "</small>"
      + "</article>";
  }

  function emptyState(data) {
    const latest = data.latestBlock || "—";
    const scanned = data.scannedBlockCount || 0;

    return ""
      + "<section class=\"sila-official-card sila-transactions-empty-card\">"
      + "  <div class=\"sila-empty-state\">"
      + "    <div>"
      + "      <strong>No Sila transactions in recent blocks yet.</strong>"
      + "      <span>The explorer scanned " + esc(scanned) + " live block(s) up to block #" + esc(latest) + ". Transactions will appear automatically when execution transactions are included.</span>"
      + "    </div>"
      + "  </div>"
      + "</section>";
  }

  function txRows(transactions) {
    return transactions.map((tx) => {
      const hash = tx.hash || "";
      const block = tx.blockNumber || "—";
      const from = tx.from || "—";
      const to = tx.to || "";
      const value = tx.valueWei || tx.value || "0";

      return ""
        + "<tr>"
        + "  <td><button type=\"button\" class=\"linklike mono\" data-tx=\"" + esc(hash) + "\">" + esc(tx.hashShort || shortText(hash)) + "</button></td>"
        + "  <td><button type=\"button\" class=\"linklike\" data-sila-block-detail=\"" + esc(block) + "\">#" + esc(block) + "</button></td>"
        + "  <td><button type=\"button\" class=\"linklike mono\" data-address=\"" + esc(from) + "\">" + esc(tx.fromShort || shortText(from)) + "</button></td>"
        + "  <td>" + (to ? "<button type=\"button\" class=\"linklike mono\" data-address=\"" + esc(to) + "\">" + esc(tx.toShort || shortText(to)) + "</button>" : "Contract Creation") + "</td>"
        + "  <td>" + esc(dec(value)) + " wei</td>"
        + "</tr>";
    }).join("");
  }

  function transactionsTable(transactions) {
    if (!transactions.length) return "";

    return ""
      + "<section class=\"sila-official-card\">"
      + "  <div class=\"sila-section-head\"><h2>Latest Transactions</h2><small>" + esc(transactions.length) + " transaction(s)</small></div>"
      + "  <div class=\"table-wrap sila-transactions-table-wrap\">"
      + "    <table class=\"sila-transactions-table\">"
      + "      <thead><tr><th>Txn Hash</th><th>Block</th><th>From</th><th>To</th><th>Value</th></tr></thead>"
      + "      <tbody>" + txRows(transactions) + "</tbody>"
      + "    </table>"
      + "  </div>"
      + "</section>";
  }

  function renderPage(data) {
    const view = ensureView();
    const transactions = Array.isArray(data.transactions) ? data.transactions : [];
    const latest = data.latestBlock || "—";
    const scanned = data.scannedBlockCount || 0;
    const count = data.count || transactions.length || 0;
    const chain = data.chain || "Sila";

    view.innerHTML = ""
      + "<section class=\"sila-transactions-page\">"
      + "  <section class=\"sila-official-detail-hero\">"
      + "    <div>"
      + "      <small>Sila Transactions</small>"
      + "      <h1>Transactions</h1>"
      + "      <p>Live execution transactions scanned from recent Sila blocks.</p>"
      + "    </div>"
      + "    <div class=\"sila-detail-actions\">"
      + "      <button type=\"button\" data-page=\"blocks\">View Blocks</button>"
      + "      <button type=\"button\" id=\"silaTransactionsRefresh\">Refresh</button>"
      + "    </div>"
      + "  </section>"
      + "  <section class=\"sila-official-stats-grid\">"
      + statCard("Found", count, "Execution transactions")
      + statCard("Scanned Blocks", scanned, "Recent block window")
      + statCard("Latest Block", "#" + latest, "Current execution head")
      + statCard("Chain", chain, "Live Sila API")
      + "  </section>"
      + (transactions.length ? transactionsTable(transactions) : emptyState(data))
      + "  <section class=\"sila-official-card\">"
      + "    <details class=\"sila-raw-json\">"
      + "      <summary>Developer JSON</summary>"
      + "      <pre>" + esc(JSON.stringify(data, null, 2)) + "</pre>"
      + "    </details>"
      + "  </section>"
      + "</section>";
  }

  async function silaRenderTransactionsPage() {
    const view = ensureView();
    view.innerHTML = ""
      + "<section class=\"sila-transactions-page\">"
      + "  <section class=\"sila-official-detail-hero\">"
      + "    <div><small>Sila Transactions</small><h1>Loading Transactions</h1><p>Scanning live Sila blocks...</p></div>"
      + "  </section>"
      + "</section>";

    try {
      const data = await readJson("/api/sila/transactions?limit=" + DEFAULT_LIMIT + "&blocks=" + DEFAULT_BLOCK_SCAN);
      if (!data || data.ok === false) {
        throw new Error((data && data.error) || "Sila transactions API returned ok=false");
      }
      renderPage(data);
    } catch (error) {
      view.innerHTML = "<section class=\"panel\"><h2>Sila Transactions</h2><p class=\"muted\">Transactions API error: " + esc(error.message || error) + "</p></section>";
    }
  }

  if (!window.__silaOfficialTransactionsPageBound) {
    window.__silaOfficialTransactionsPageBound = true;

    document.addEventListener("click", function (event) {
      const refresh = event.target.closest("#silaTransactionsRefresh");
      if (refresh) {
        event.preventDefault();
        event.stopImmediatePropagation();
        silaRenderTransactionsPage();
        return;
      }

      const target = event.target.closest("[data-page]");
      if (!target) return;

      const page = target.getAttribute("data-page");
      if (page !== "txs" && page !== "transactions" && page !== "pending-txs") return;

      event.preventDefault();
      event.stopImmediatePropagation();
      silaRenderTransactionsPage();
    }, true);
  }

  window.silaRenderTransactionsPage = silaRenderTransactionsPage;
})();
// SILA_TRANSACTIONS_PAGE_END

// SILA_VISIBLE_SEARCH_ROUTER_START
(function () {
  "use strict";

  function findSearchInput(root) {
    const scope = root || document;
    if (typeof silaSearchFindInput === "function") {
      const input = silaSearchFindInput(scope);
      if (input) return input;
    }

    return scope.querySelector(
      "[data-sila-search-input], [data-search-input], #sila-search-input, #searchInput, input[type='search'], input[name='q'], input[placeholder*='Search'], input[placeholder*='search']"
    );
  }

  function runVisibleSearch(input) {
    if (!input || typeof window.silaSearchRun !== "function") return false;

    const query = String(input.value || "").trim();
    if (!query) return false;

    window.silaSearchRun(query);
    return true;
  }

  document.addEventListener("submit", (event) => {
    const input = findSearchInput(event.target);
    if (!input) return;

    if (runVisibleSearch(input)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button, [role='button'], input[type='submit']");
    if (!button) return;

    const text = String(button.textContent || button.value || "").trim().toLowerCase();
    const isSearchButton =
      button.matches("[data-sila-search-button], [data-search-button], #searchButton")
      || text === "search"
      || text === "بحث";

    if (!isSearchButton) return;

    const host = button.closest("form, section, header, main, .hero, .search-wrap, .search-box") || document;
    const input = findSearchInput(host) || findSearchInput(document);

    if (runVisibleSearch(input)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const input = event.target && event.target.matches
      ? event.target.matches("[data-sila-search-input], [data-search-input], #sila-search-input, #searchInput, input[type='search'], input[name='q'], input[placeholder*='Search'], input[placeholder*='search']")
        ? event.target
        : null
      : null;

    if (!input) return;

    if (runVisibleSearch(input)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
})();
// SILA_VISIBLE_SEARCH_ROUTER_END

// SILA_OFFICIAL_NAV_ROUTER_START
(function () {
  "use strict";

  function closeAllMenus() {
    ["settingsDropdown", "languageDropdown", "networkDropdown", "blockchainDropdown"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.classList.add("hidden");
    });

    const blockchainButton = document.getElementById("blockchainMenuButton");
    if (blockchainButton) blockchainButton.setAttribute("aria-expanded", "false");
  }

  function setActive(name) {
    document.querySelectorAll(".nav-btn").forEach((node) => node.classList.remove("active"));

    if (name === "blocks" || name === "transactions" || name === "explorer") {
      const blockchainButton = document.getElementById("blockchainMenuButton");
      if (blockchainButton) blockchainButton.classList.add("active");
      return;
    }

    const button = document.querySelector("[data-view=\"" + name + "\"]");
    if (button) button.classList.add("active");
  }

  function pushPath(path) {
    if (path && window.location.pathname !== path) {
      history.pushState({ silaPath: path }, "", path);
    }
  }

  function routePage(page, push) {
    if (page === "blocks") {
      closeAllMenus();
      setActive("blocks");

      if (typeof window.silaRenderBlocksPage === "function") {
        window.silaRenderBlocksPage(null);
      } else if (typeof window.showView === "function") {
        window.showView("explorer");
      }

      if (push) pushPath("/blocks");
      return true;
    }

    if (page === "transactions" || page === "txs" || page === "pending-txs") {
      closeAllMenus();
      setActive("transactions");

      if (typeof window.silaRenderTransactionsPage === "function") {
        window.silaRenderTransactionsPage();
      } else if (typeof window.showView === "function") {
        window.showView("explorer");
      }

      if (push) pushPath("/transactions");
      return true;
    }

    if (page === "runtime") {
      closeAllMenus();
      setActive("more");

      if (typeof window.silaRenderRuntimePage === "function") {
        window.silaRenderRuntimePage();
      } else if (typeof window.showView === "function") {
        window.showView("more");
      }

      if (push) pushPath("/runtime");
      return true;
    }

    if (page === "consensus") {
      closeAllMenus();
      setActive("validators");

      if (typeof window.silaRenderConsensusPage === "function") {
        window.silaRenderConsensusPage();
      } else if (typeof window.showView === "function") {
        window.showView("validators");
      }

      if (push) pushPath("/consensus");
      return true;
    }

    return false;
  }

  function routeView(view, push) {
    closeAllMenus();

    if (view === "explorer") return routePage("blocks", push);
    if (view === "validators") return routePage("consensus", push);
    if (view === "more") return routePage("runtime", push);

    if (typeof window.showView === "function") {
      window.showView(view);
      setActive(view);
      if (push) pushPath("/");
      return true;
    }

    return false;
  }

  function routeBlock(blockId, push) {
    closeAllMenus();
    setActive("blocks");

    if (typeof window.silaRenderBlockDetails === "function") {
      window.silaRenderBlockDetails(blockId);
      if (push) pushPath("/blocks");
      return true;
    }

    return routePage("blocks", push);
  }

  function routeTx(txHash, push) {
    closeAllMenus();
    setActive("transactions");

    if (typeof window.silaRenderTxDetails === "function") {
      window.silaRenderTxDetails(txHash);
      if (push) pushPath("/transactions");
      return true;
    }

    return routePage("transactions", push);
  }

  function routeAddress(address, push) {
    closeAllMenus();

    if (typeof window.silaRenderAddressDetails === "function") {
      window.silaRenderAddressDetails(address);
      if (push) pushPath("/");
      return true;
    }

    return false;
  }

  function toggleBlockchainMenu() {
    const dropdown = document.getElementById("blockchainDropdown");
    const button = document.getElementById("blockchainMenuButton");
    if (!dropdown || !button) return false;

    const wasHidden = dropdown.classList.contains("hidden");
    closeAllMenus();

    if (wasHidden) {
      dropdown.classList.remove("hidden");
      button.setAttribute("aria-expanded", "true");
    }

    return true;
  }

  document.addEventListener("click", function (event) {
    if (!event.target || typeof event.target.closest !== "function") return;

    const blockchainButton = event.target.closest("#blockchainMenuButton");
    if (blockchainButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleBlockchainMenu();
      return;
    }

    const pageTarget = event.target.closest("[data-page]");
    if (pageTarget) {
      const page = pageTarget.getAttribute("data-page");
      if (routePage(page, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    const blockTarget = event.target.closest("[data-sila-block-detail], [data-block]");
    if (blockTarget) {
      const blockId = blockTarget.getAttribute("data-sila-block-detail") || blockTarget.getAttribute("data-block");
      if (blockId && routeBlock(blockId, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    const txTarget = event.target.closest("[data-tx]");
    if (txTarget) {
      const txHash = txTarget.getAttribute("data-tx");
      if (txHash && routeTx(txHash, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    const addressTarget = event.target.closest("[data-address]");
    if (addressTarget) {
      const address = addressTarget.getAttribute("data-address");
      if (address && routeAddress(address, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    const viewTarget = event.target.closest("[data-view]");
    if (viewTarget) {
      const view = viewTarget.getAttribute("data-view");
      if (view && routeView(view, true)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    }

    if (!event.target.closest(".dropdown, .menu-wrap")) {
      closeAllMenus();
    }
  }, true);

  window.addEventListener("popstate", function () {
    const path = String(window.location.pathname || "/").replace(/\/+$/, "") || "/";

    if (path === "/blocks") routePage("blocks", false);
    else if (path === "/transactions") routePage("transactions", false);
    else if (path === "/runtime") routePage("runtime", false);
    else if (path === "/consensus") routePage("consensus", false);
    else routeView("home", false);
  });

  window.silaRoutePage = routePage;
  window.silaRouteView = routeView;
  window.silaCloseBlockchainDropdown = closeAllMenus;
})();
// SILA_OFFICIAL_NAV_ROUTER_END
