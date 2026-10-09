// Moteur générique du catalogue de jeux (chargé en type="module", DOM prêt).
//
// Ce script ne connaît AUCUN jeu individuellement :
//   1. cards.json liste les fiches disponibles (GitHub Pages ne permet pas
//      de lister un dossier, d'où ce fichier technique) ;
//   2. chaque card_*.json fournit le contenu, le style et l'aperçu de sa carte ;
//   3. les cartes sont générées puis injectées dans #catalog.
//
// Pour ajouter un jeu : créer card_MONJEU.json + l'ajouter à cards.json,
// sans toucher à index.html, scripts.js ni styles.css.

const catalog = document.getElementById("catalog");

// --- Injection des styles -----------------------------------------------------

// Objet JS (camelCase) -> déclarations CSS. Les custom properties (--x) restent telles quelles.
const toDeclarations = (style) =>
  Object.entries(style ?? {})
    .map(([k, v]) => `${k.startsWith("--") ? k : k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())}: ${v};`)
    .join(" ");

// Injecte une règle par carte : .tile.card-xxx { <style> <css> }
// Le champ "css" des JSON utilise le nesting CSS natif (&, sélecteurs descendants),
// ce qui permet :hover, ::before, etc. sans rien dédier dans styles.css.
const injectStyles = (entries) => {
  const el = document.createElement("style");
  el.textContent = entries
    .map(([cls, card]) => `.tile.${cls} { ${toDeclarations(card.style)} ${[].concat(card.css ?? []).join("\n")} }`)
    .join("\n");
  document.head.appendChild(el);
};

// card_FTM.json -> "card-ftm" : classe unique dérivée du nom de fichier.
const cardClass = (file) => "card-" + file.replace(/^card_?|\.json$/gi, "").toLowerCase();

// Polices Google Fonts propres à chaque fiche (champ "fonts", valeurs au format
// family=... : ["Fredoka:wght@600", "Nunito:wght@400;700"]). Dédupliquées et
// injectées en un seul <link> : un nouveau jeu n'a jamais à toucher index.html.
const injectFonts = (entries) => {
  const families = [...new Set(entries.flatMap(([, card]) => card.fonts ?? []))];
  if (!families.length) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join("&")}&display=swap`;
  document.head.appendChild(link);
};

// --- Aperçus (registre extensible, aucun n'est lié à un jeu précis) ------------

const PREVIEWS = {
  // Dés affichés sur la carte (animation au survol : voir initDice).
  dice: (p) =>
    `<div class="preview-dice" aria-hidden="true">` +
    p.dice.map((d) => `<div class="die" data-sides="${d.sides}">${d.value}</div>`).join("") +
    (p.label ? `<span class="dice-label">${p.label}</span>` : "") +
    `</div>`,

  // Grille de cartes retournables. colors : la première entrée dont "max" >= valeur
  // l'emporte ; la dernière peut omettre "max" pour servir de couleur par défaut.
  grid: (p) => {
    const colour = (v) => (p.colors.find((c) => c.max === undefined || v <= c.max) ?? {}).color;
    const cells = p.values
      .map(
        (v, i) =>
          `<span class="cell${(p.revealed ?? []).includes(i) ? " up" : ""}" style="--i:${i}">` +
          `<span class="cell-in"><span class="cell-back"></span>` +
          `<span class="cell-face" style="--c:${colour(v)}">${v}</span></span></span>`
      )
      .join("");
    return (
      `<div class="preview-grid" aria-hidden="true" style="grid-template-columns: repeat(${p.columns}, 1fr);` +
      ` grid-template-rows: repeat(${Math.ceil(p.values.length / p.columns)}, 1fr)">${cells}</div>`
    );
  },

  // Démo d'une grille d'interrupteurs (voir initToggle) : la configuration complète est
  // transmise à initToggle via data-config, le HTML ne contient que les cases vides.
  toggle: (p) =>
    `<div class="preview-toggle" aria-hidden="true" data-config="${encodeURIComponent(JSON.stringify(p))}">` +
    `<div class="tg-grid" style="grid-template-columns: repeat(${p.columns}, 1fr)">` +
    Array.from({ length: p.columns * (p.rows ?? p.columns) }, () => `<span class="tg off"></span>`).join("") +
    `</div>${p.themes?.length ? `<span class="tg-label"></span>` : ""}</div>`,
};

// Animation des aperçus "dice" : les dés se brouillent au survol/focus,
// puis s'arrêtent sur un nouveau tirage. Désactivée si prefers-reduced-motion.
const initDice = () => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".preview-dice").forEach((preview) => {
    const tile = preview.closest(".tile");
    const dice = [...preview.querySelectorAll(".die")];
    const roll = () => {
      let n = 0;
      const timer = setInterval(() => {
        dice.forEach((d) => (d.textContent = 1 + Math.floor(Math.random() * Number(d.dataset.sides))));
        if (++n > 8) clearInterval(timer);
      }, 70);
    };
    tile.addEventListener("mouseenter", roll);
    tile.addEventListener("focus", roll);
  });
};

// Démo des aperçus "toggle" : la grille rejoue en boucle une vraie partie (un clic bascule la case
// et ses 4 voisines), se résout, puis passe au thème suivant. Config : columns, rows, presses (les
// clics qui résolvent la grille), themes [{ on, off, onBg, offBg, boardBg, label }].
// Sans animation (prefers-reduced-motion), on affiche juste la grille de départ.
const initToggle = () => {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  document.querySelectorAll(".preview-toggle").forEach((preview) => {
    const cfg = JSON.parse(decodeURIComponent(preview.dataset.config));
    const cols = cfg.columns, rows = cfg.rows ?? cols;
    const cells = [...preview.querySelectorAll(".tg")];
    const label = preview.querySelector(".tg-label");
    const themes = cfg.themes ?? [{}];
    const state = new Array(cells.length).fill(0);
    let ti = 0;

    const press = (i) => {
      const r = Math.floor(i / cols), c = i % cols;
      [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
        const rr = r + dr, cc = c + dc;
        if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) state[rr * cols + cc] ^= 1;
      });
    };
    const paint = () => {
      const th = themes[ti];
      preview.style.setProperty("--tg-on", th.onBg ?? "");
      preview.style.setProperty("--tg-off", th.offBg ?? "");
      preview.style.setProperty("--tg-board", th.boardBg ?? "");
      if (label) label.textContent = th.label ?? "";
      cells.forEach((el, i) => {
        const on = !!state[i], glyph = (on ? th.on : th.off) ?? "";
        if (el.classList.contains("on") !== on || el.textContent !== glyph) {
          el.classList.toggle("on", on);
          el.classList.toggle("off", !on);
          el.textContent = glyph;
          if (!still) el.animate([{ transform: "scale(.8)" }, { transform: "scale(1.1)" }, { transform: "scale(1)" }], { duration: 320 });
        }
      });
    };
    const scramble = () => { state.fill(0); cfg.presses.forEach(press); };

    scramble(); paint();
    if (still) return;
    (async () => {
      for (;;) {
        await wait(1300);
        for (const i of cfg.presses) {
          while (document.hidden) await wait(500);
          press(i); paint();
          await wait(700);
        }
        await wait(1800);                    // grille résolue : tout le monde est content
        ti = (ti + 1) % themes.length;       // thème suivant, nouvelle grille
        scramble(); paint();
      }
    })();
  });
};

// --- Génération des cartes -----------------------------------------------------

// Seuls les champs présents dans le JSON sont rendus (ribbon, tagline, tags, meta...).
const renderCard = ([cls, card]) => {
  const body = [`<h2>${card.title}</h2>`];
  if (card.tagline) body.push(`<p class="tagline">${card.tagline}</p>`);
  if (card.preview && PREVIEWS[card.preview.type]) body.push(PREVIEWS[card.preview.type](card.preview));
  if (card.description) body.push(`<p>${card.description}</p>`);
  if (card.tags?.length) body.push(`<div class="tags">${card.tags.map((t) => `<span>${t}</span>`).join("")}</div>`);
  if (card.warning) body.push(`<p class="warning"><span>⚠ ${card.warning}</span></p>`);
  if (card.meta) body.push(`<p class="meta">${card.meta}</p>`);
  body.push(`<span class="go">${card.button ?? "Jouer →"}</span>`);
  return (
    `<li${card.wide ? ' class="wide"' : ""}><a class="tile ${cls}" href="${card.path}">` +
    (card.badge ? `<span class="badge"><span>${card.badge}</span></span>` : "") +
    (card.ribbon ? `<div class="ribbon">${card.ribbon}</div>` : "") +
    `<div class="body">${body.join("")}</div></a></li>`
  );
};

async function main() {
  const files = await fetch("cards.json").then((r) => r.json());
  const results = await Promise.all(files.map(async (file) => {
    try {
      const r = await fetch(encodeURI(file));
      if (!r.ok) throw new Error(r.status);
      return [cardClass(file), await r.json()];
    } catch (err) {
      console.error(`Fiche ignorée (${file}) :`, err);
      return null;
    }
  }));
  const entries = results.filter(Boolean);
  injectFonts(entries);
  injectStyles(entries);
  catalog.innerHTML = entries.map(renderCard).join("");
  initDice();
  initToggle();
}

main().catch((err) => console.error("Impossible de charger le catalogue des jeux :", err));

