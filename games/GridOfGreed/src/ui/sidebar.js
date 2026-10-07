// Colonne de droite : scores, historique, joueurs (ordre du tour), infos de partie.
// Lecture seule : tout vient de la vue masquée, aucune règle ici.
export const PLAYER_COLORS = ["#e0556b", "#e8963f", "#e9d24c", "#5fcf80", "#4fb7d9", "#4a8cff", "#a97bf0", "#e077c7"];

const make = (tag, cls = "", text = null) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== null) n.textContent = text;
  return n;
};

// Pastille de couleur d'un joueur. Pour l'hôte, la pastille devient un ◆ de la même couleur.
export function playerDot(i, hostTip = null) {
  const d = make("span", hostTip ? "pdot host" : "pdot");
  d.style.setProperty("--pc", PLAYER_COLORS[i % PLAYER_COLORS.length]);
  if (hostTip) {
    d.textContent = "◆";
    d.title = hostTip;
  }
  return d;
}

// L'hôte est toujours le siège 0.
export const dotFor = (i, t) => playerDot(i, i === 0 ? t("lobby.hostTip") : null);

const visibleSum = (p) =>
  p.grid.reduce((t, col) => t + (col ? col.reduce((x, c) => x + (c.up && c.v !== null ? c.v : 0), 0) : 0), 0);

export function renderSidebar(view, myId, t) {
  const $ = (id) => document.getElementById(id);

  // Scores : somme visible de la manche + total.
  const scores = make("table", "stbl");
  const head = make("tr");
  head.append(make("th"), make("th", "", t("table.scoreRaw")), make("th", "", t("table.scoreTotal")));
  scores.append(head);
  view.players.forEach((p, i) => {
    const tr = make("tr");
    const name = make("td");
    name.append(dotFor(i, t), " ", p.name);
    tr.append(name, make("td", "", visibleSum(p)), make("td", "", p.total));
    scores.append(tr);
  });
  $("side-scores").replaceChildren(scores);

  // Historique : une ligne par manche terminée (score compté, doublé en rouge).
  const hist = make("table", "stbl");
  const hh = make("tr");
  hh.append(make("th"));
  view.players.forEach((p, i) => {
    const th = make("th");
    th.append(dotFor(i, t));
    th.title = p.name;
    hh.append(th);
  });
  hist.append(hh);
  for (const h of view.history ?? []) {
    const tr = make("tr");
    tr.append(make("td", "", t("side.roundShort", { n: h.round })));
    h.final.forEach((v, i) => {
      const doubled = h.doubled && h.finisher === i;
      const td = make("td", doubled ? "dbl" : "", v);
      tr.append(td);
    });
    hist.append(tr);
  }
  $("side-history").replaceChildren(hist);

  // Joueurs dans l'ordre du tour, pastille de couleur, ▸ devant le joueur actif.
  $("side-players").replaceChildren(...view.players.map((p, i) => {
    const li = make("li", [view.current === i ? "active" : "", p.id === myId ? "me" : ""].join(" ").trim());
    li.append(make("span", "arrow", view.current === i ? "▸" : ""), dotFor(i, t), make("span", "pn", p.name));
    if (p.id === myId) li.append(make("span", "tag", t("lobby.you")));
    return li;
  }));

  // Infos de partie.
  let info = t("side.info", { round: view.round, score: view.targetScore });
  if (view.phase === "playing" && view.finisher !== null) {
    info += " " + t("side.lastRound", { name: view.players[view.finisher].name });
  }
  $("side-info").textContent = info;
}
