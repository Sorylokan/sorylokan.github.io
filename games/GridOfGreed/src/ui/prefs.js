// Préférences globales (langue, thème, sons) gardées dans le navigateur.
export const LANGS = ["fr", "en"];
export const THEMES = ["night", "casino", "ruby"];

export const getPref = (key, fallback) => {
  try { return localStorage.getItem(`gog-${key}`) ?? fallback; } catch { return fallback; }
};
export const setPref = (key, value) => {
  try { localStorage.setItem(`gog-${key}`, value); } catch { /* stockage indisponible */ }
};
export const soundEnabled = () => getPref("sound", "on") === "on";