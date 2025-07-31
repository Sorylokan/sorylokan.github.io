// scripts.js

let siteStructure;

fetch('site.json')
  .then(r => r.json())
  .then(json => {
    siteStructure = json;
    buildMainNav(Object.keys(json));
    loadInitial();
  });

function buildMainNav(keys) {
  const nav = document.getElementById('main-nav');
  nav.innerHTML = '';
  keys.forEach(key => {
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.onclick = () => buildSecondaryNav(key);
    nav.appendChild(btn);
  });
}

function buildSecondaryNav(section) {
  const menu = document.getElementById('sub-nav');
  menu.innerHTML = '';
  const entries = siteStructure[section];

  if (typeof entries === 'string') {
    loadPage(entries);
    return;
  }

  for (const [label, path] of Object.entries(entries)) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = () => loadPage(path);
    menu.appendChild(btn);
  }
  // Charger la première page par défaut
  const first = Object.values(entries)[0];
  if (first) loadPage(first);
}

function loadPage(path) {
  fetch(path)
    .then(r => r.text())
    .then(md => {
      const html = marked.parse(md);
      document.getElementById('content').innerHTML = html;
    });
}

function loadInitial() {
  // Charger la première section par défaut (Home ou autre)
  const firstKey = Object.keys(siteStructure)[0];
  buildSecondaryNav(firstKey);
}
