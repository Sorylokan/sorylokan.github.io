# Ligne directrice – Organisation du site GitHub Pages

## Objectif

Ce document définit une structure claire et durable pour le site GitHub Pages.
L’objectif est de :

* séparer les publics (visiteurs techniques, visiteurs créatifs, cercle personnel),
* éviter le mélange des projets,
* garder un seul dépôt GitHub simple à maintenir,
* ne pas nécessiter de connaissances avancées de GitHub.

---

## Principe général

On applique les règles suivantes :

1. La racine du dépôt sert uniquement au fonctionnement du site (SPA, navigation, assets).
2. Le contenu est organisé par **intention de visite**, pas par type de fichier.
3. Chaque grand dossier correspond à un **hub thématique**.
4. Le contenu personnel est séparé du contenu public.
5. La racine ne contient pas de contenu détaillé, seulement une orientation.

> La racine du dépôt joue le rôle d’un portail principal.
> Elle ne contient pas de contenu thématique détaillé, mais sert de point d’entrée unique vers plusieurs espaces distincts, chacun correspondant à un univers ou un projet.

---

## Arborescence de référence

```
/
├─ index.html
├─ nav.json
├─ assets/
│   ├─ css/
│   ├─ js/
│   └─ images/
│
├─ content/
│   ├─ streamerbot/
│   ├─ streaming/
│   ├─ minecraft/
│   └─ projects/
│
├─ personal/
│   └─ family/
│
└─ _shared/
```

---

## Détail des dossiers

### Racine `/`

Contient uniquement ce qui est nécessaire au fonctionnement du site :

* `index.html` : point d’entrée du SPA
* `nav.json` (ou équivalent) : structure de navigation
* aucun contenu Markdown de fond

La racine joue le rôle de **hub principal**.
Elle oriente vers les grands univers sans entrer dans les détails.

---

### `assets/`

Contient toutes les ressources techniques utilisées par le site :

* feuilles de style
* scripts JavaScript
* images globales

Aucun contenu éditorial ne doit se trouver ici.

---

### `content/` – Hubs publics

Ce dossier regroupe tout le contenu destiné au public.
Chaque sous-dossier correspond à un **univers cohérent**, avec son propre public.

#### `content/streamerbot/`

Contenu destiné aux utilisateurs StreamerBot :

* extensions
* documentation
* guides

Langue recommandée : anglais.

#### `content/streaming/`

Contenu lié au streaming en général :

* overlays OBS
* outils
* configurations

Public technique ou créatif lié au stream.

#### `content/minecraft/`

Contenu créatif ou personnel autour de Minecraft :

* builds
* mondes
* expérimentations

Langue libre (français accepté).

#### `content/projects/`

Projets divers ne justifiant pas un hub dédié :

* projets expérimentaux
* outils ponctuels
* contenus utiles mais secondaires

Ce dossier sert de zone tampon pour éviter la surcharge de la racine.

---

### `personal/` – Contenu non public

Contenu personnel ou familial.
Ce contenu n’est pas mis en avant dans la navigation principale.

Il peut être :

* accessible uniquement par lien direct,
* exclu de la navigation,
* destiné à un cercle restreint.

---

### `_shared/`

Éléments mutualisés non destinés à être affichés directement :

* composants réutilisables
* snippets
* ressources internes

Ce dossier sert au support technique du site.

---

## Règles de maintenance

* Un dossier = un public identifié.
* Un hub = une thématique claire.
* En cas de doute sur l’emplacement d’un contenu, utiliser `content/projects/`.
* Éviter d’ajouter du contenu éditorial à la racine.
* Ne pas mélanger contenu public et personnel.

---

## Conclusion

Cette structure permet :

* une meilleure lisibilité pour les visiteurs,
* une réduction de la charge mentale,
* une évolution progressive sans refonte brutale,
* une utilisation simple de GitHub Pages sans outillage avancé.

Ce document sert de référence pour toute évolution future du site.
