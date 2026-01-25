# Instructions techniques – Mise en place et validation des hubs

## Objectif du document

Ce document sert de guide opérationnel après la mise en place de la structure du site.
Il décrit :

* les actions à réaliser pour chaque hub,
* les bonnes pratiques d’architecture,
* les règles de séparation,
* une check-list de validation permettant de considérer un hub comme "terminé".

Le site est considéré comme :

> un moteur unique (SPA) hébergeant plusieurs sites logiques indépendants.

---

## Modèle général

* 1 moteur SPA commun
* 1 dépôt GitHub Pages
* N hubs thématiques

Chaque hub fonctionne comme un micro-site conceptuel, partageant l’infrastructure mais pas l’intention.

---

## Étape 1 – Définition d’un hub

Avant toute implémentation, un hub doit être défini clairement.

### Questions à se poser

* À qui s’adresse ce hub ?
* Quel est son objectif principal ?
* Quelle langue est prioritaire ?
* Quel type de contenu y est attendu ?

Un hub mal défini entraîne :

* une navigation floue,
* des pages hors sujet,
* un sentiment de surcharge.

---

## Étape 2 – Structure minimale d’un hub

Chaque hub doit respecter la structure suivante :

```
content/<hub-name>/
├─ index.md
├─ sections/
│   ├─ page-1.md
│   └─ page-2.md
└─ assets/ (optionnel)
```

### `index.md`

Rôle : page d’entrée du hub.

Elle doit :

* présenter clairement le périmètre du hub,
* indiquer à qui il s’adresse,
* proposer une navigation locale.

---

## Étape 3 – Navigation

### Navigation globale

* Visible sur l’ensemble du site
* Contient uniquement :

  * lien vers le hub principal
  * accès aux hubs majeurs

Objectif : changer de hub.

---

### Navigation locale (par hub)

* Propre à chaque hub
* Chargée dynamiquement
* Ne référence que les pages du hub

Objectif : explorer un hub sans pollution externe.

---

## Étape 4 – Séparation des responsabilités

### Ce qui doit être séparé par hub

* navigation locale
* structure des pages
* ton éditorial
* langue principale
* page d’entrée

### Ce qui doit rester mutualisé

* moteur SPA
* rendu Markdown
* routing de base
* composants génériques
* styles globaux

---

## Étape 5 – CSS et JS

### CSS

Recommandation :

```
assets/css/
├─ base.css
├─ hub-streamerbot.css
├─ hub-minecraft.css
```

* `base.css` : layout, reset, règles communes
* fichiers hub : identité visuelle spécifique

---

### JavaScript

Recommandation :

```
assets/js/
├─ core/
│   ├─ router.js
│   ├─ renderer.js
│   └─ navigation.js
└─ hubs/
    ├─ streamerbot.js
    └─ minecraft.js
```

Un hub n’a un JS dédié que s’il possède une logique spécifique.

---

## Étape 6 – Contenu

Pour chaque page Markdown :

* un objectif clair
* un public identifiable
* aucun mélange de thématiques

Question de validation :

> À quel visiteur cette page est-elle destinée ?

Si la réponse est floue, la page n’est pas à sa place.

---

## Check-list de qualité – Hub terminé

Un hub peut être considéré comme terminé si toutes les conditions suivantes sont remplies :

### Définition

* [ ] Le public cible est clairement identifié
* [ ] L’objectif du hub est explicite
* [ ] La langue principale est cohérente

### Structure

* [ ] Un `index.md` sert de point d’entrée
* [ ] Toutes les pages appartiennent au même univers
* [ ] Aucun lien vers des pages hors hub (hors navigation globale)

### Navigation

* [ ] Navigation globale minimale fonctionnelle
* [ ] Navigation locale claire et complète
* [ ] Aucun mélange de menus entre hubs

### Technique

* [ ] CSS du hub isolé ou clairement identifié
* [ ] Aucun JS inutile chargé
* [ ] Le hub fonctionne sans dépendre d’un autre hub

### Lisibilité

* [ ] Le visiteur comprend où il se trouve
* [ ] Le visiteur comprend ce qu’il peut faire ici
* [ ] Le visiteur n’est pas exposé à du contenu non pertinent

---

## Règle finale

Si un hub :

* peut être compris sans connaître les autres,
* ne pollue pas les autres,
* ne dépend pas des autres,

alors l’architecture est correcte.

---

## Conclusion

L’objectif n’est pas de multiplier les fonctionnalités, mais de garantir :

* la clarté,
* la séparation,
* l’évolutivité.

Chaque hub validé allège la charge mentale globale et stabilise le site sur le long terme.
