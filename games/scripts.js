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

// --- Génération des cartes -----------------------------------------------------

// Seuls les champs présents dans le JSON sont rendus (ribbon, tagline, tags, meta...).
const renderCard = ([cls, card]) => {
  const body = [`<h2>${card.title}</h2>`];
  if (card.tagline) body.push(`<p class="tagline">${card.tagline}</p>`);
  if (card.preview && PREVIEWS[card.preview.type]) body.push(PREVIEWS[card.preview.type](card.preview));
  if (card.description) body.push(`<p>${card.description}</p>`);
  if (card.tags?.length) body.push(`<div class="tags">${card.tags.map((t) => `<span>${t}</span>`).join("")}</div>`);
  if (card.meta) body.push(`<p class="meta">${card.meta}</p>`);
  body.push(`<span class="go">${card.button ?? "Jouer →"}</span>`);
  return (
    `<li><a class="tile ${cls}" href="${card.path}">` +
    (card.ribbon ? `<div class="ribbon">${card.ribbon}</div>` : "") +
    `<div class="body">${body.join("")}</div></a></li>`
  );
};

async function main() {
  const files = await fetch("cards.json").then((r) => r.json());
  const entries = await Promise.all(
    files.map(async (file) => [cardClass(file), await fetch(encodeURI(file)).then((r) => r.json())])
  );
  injectStyles(entries);
  catalog.innerHTML = entries.map(renderCard).join("");
  initDice();
}

main().catch((err) => console.error("Impossible de charger le catalogue des jeux :", err));
