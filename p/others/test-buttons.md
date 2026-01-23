# Test des Boutons

Cette page teste les différents types de boutons disponibles dans le système.

## Boutons avec liens

Voici les différents types de boutons :

{"Bouton Normal"-n}(https://example.com)

## Test des liens externes

Voici quelques liens externes pour tester la modal :

- [Site externe - Google](https://google.com)
- [GitHub](https://github.com)  
- [Site de documentation](https://developer.mozilla.org)

Ces liens déclencheront une modal de confirmation avant ouverture.

{"Bouton Succès"-s}(https://example.com)

{"Bouton Principal"-p}(https://example.com)

{"Bouton Gris"-g}(https://example.com)

## Boutons de copie

Voici quelques exemples de boutons de copie :

[copy:Hello World] copie : Hello World

[copy:npm install markdown-it] copie : npm install markdown-it

[copy:git clone https://github.com/user/repo.git] copie : quelque chose c'est une surprise

## Texte avec code

```javascript
function example() {
    console.log("Hello World");
}
```

Et voici du `code inline` pour tester.

J'ai envie de refaire les thèmes de mon site. actuellement j'ai un thème clair (plutot ocre et gris) et un thème sombre (nuances de bleu)
- Orange ( #F9B872 , #FAE7A5 ), bleu poudre ( #B6E1E7 )
- Rouge profond ( #8E0D3C ), cassis ( #1D1842 ), orange ( #EF3B33 ), rose ( #FDA1A2 )
- #CFDBD5 #E8EDDF #F5CB5C #242423 #333533
- #77021D #F6B339 #DA7B27 #D7572B #C23028
- #27C7D4 #f5f6f8 #FDF0E7 #FE9063 #EA5863
- #124660 #1B9476 #8BD59E #C7DBC2 #F4EBD6
- #0E3843 #357269 #A3BBAE #65542F #312509
- #11151D #222D41 #374158 #7F5056 #D76C58
Clair : #CFDBD5 #E8EDDF #F5CB5C #242423 #333533
Foncé : #11151D #222D41 #374158 #7F5056 #D76C58

1. Palette "Ocean Sunset" :
Clair : #E8F4F8, #D1E7DD, #FFF3CD, #1D3557, #457B9D
Sombre : #0A1828, #1E3A5F, #4A90A4, #FFB4A2, #FFCAB0
2. Palette "Modern Workspace" :
Clair : #F8F9FA, #E9ECEF, #FFE066, #212529, #495057
Sombre : #121212, #1E1E1E, #2D2D30, #BB86FC, #03DAC6
3. Palette "Warm Earth" :
Clair : #F5E6D3, #E7D7C1, #D4A574, #2F1B14, #8B4513
Sombre : #1A1612, #2D2520, #4A3728, #CD853F, #DEB887

Palette Claire Alternative :
/* Variation plus contrastée */
#B8C5A8, #D4E2D4, #F9E79F, #1C1C1C, #2D2D2D
- Plus de contraste pour l'accessibilité
- Garde l'esprit naturel
Palette Sombre Alternative :
/* Variation plus vibrante */
#0D1117, #1A2332, #2D4259, #8B4A6B, #E74C3C
- Rouge plus vif pour les accents
- Meilleur contraste pour le texte

/* Claire optimisée */
--bg-main: #E8EDDF;     /* Ton vert le plus clair */
--bg-header: #CFDBD5;   /* Ton vert moyen */
--bg-content: #F5F5F5;  /* Blanc cassé pour le contenu */
--primary: #F5CB5C;     /* Ton jaune pour les accents */
--text-dark: #242423;   /* Ton noir principal */

/* Sombre optimisée */
--bg-main: #11151D;     /* Ton le plus sombre */
--bg-header: #222D41;   /* Bleu sombre */
--bg-content: #374158;  /* Bleu moyen */
--primary: #D76C58;     /* Corail pour les accents */
--text-light: #E8EDDF;  /* Reprise du clair pour le texte */

**palettes de couleurs** pensées pour un **design minimaliste**, en **clair et sombre**, tout en gardant un côté **passe-partout mais élégant** — idéal pour du contenu créatif (overlays, logos, stream, etc.).

---

## 🎨 1. **Palette "Graphite + Ivoire"** — pro, neutre, sobre

### Thème clair

* Fond : #f9f9f9 (ivoire très pâle)
* Texte : #1c1c1c (noir adouci)
* Accent : #007aff (bleu Apple)
* Lien hover : #0056d2
* Contour / border : #e0e0e0

### Thème sombre

* Fond : #1e1e1e
* Texte : #f0f0f0
* Accent : #5ea5ff
* Lien hover : #91caff
* Contour : #333333

---

## 🎨 2. **Palette "Stellar"** — douce, moderne, techno

### Thème clair

* Fond : #ffffff
* Texte : #0f172a (gris bleu nuit)
* Accent : #6366f1 (indigo clair)
* Hover : #4f46e5
* Border : #d1d5db

### Thème sombre

* Fond : #0f172a (même que le texte clair)
* Texte : #f8fafc
* Accent : #818cf8
* Hover : #a5b4fc
* Border : #334155

> Cette palette est proche de celle utilisée par **Tailwind UI** et **Vercel**.

---

## 🎨 3. **Palette "Solarized Adaptée"** — rétro, typée dev/design

### Thème clair

* Fond : #fdf6e3 (écru léger)
* Texte : #657b83 (gris bleuté)
* Accent : #268bd2 (bleu ciel solaire)
* Hover : #006BA1
* Border : #eee8d5

### Thème sombre

* Fond : #002b36 (bleu pétrole profond)
* Texte : #93a1a1
* Accent : #268bd2
* Hover : #5dade2
* Border : #073642

---

## 🎨 4. **Palette "Glassmorphism noir & blanc"** — minimalisme moderne

### Thème clair

* Fond : rgba(255,255,255,0.85)
* Texte : #111111
* Accent : #00bcd4 (cyan vibrant)
* Border : rgba(0,0,0,0.1)

### Thème sombre

* Fond : rgba(18,18,18,0.85)
* Texte : #eeeeee
* Accent : #00bcd4
* Border : rgba(255,255,255,0.1)

> Idéal si tu veux un rendu flouté, vitré, très épuré.

--primary:
--primary-hover:
--secondary:
--secondary-hover:
--bg-main:
--bg-header:
--bg-content:
--text-main:
--text-muted:
--text-bright:
--text-heading:
--shadow:

<details>
<summary>
Liste episode OPM
</summary>

ordre supposé avec OAV :

|1|2|
|-|-|
| > OAV 0.5 | > S-1 ep-11 |
| > S-1 ep-1 | > S-1 ep-12 |
| > S-1 ep-2 | > OAV 6 |
| > OAV 1 | > S-2 ep-1 |
| > S-1 ep-3 | > S-2 ep-2 |
| > OAV 2 | > S-2 ep-3 |
| > S-1 ep-4 | > S-2 ep-4 |
| > OAV 3 | > S-2 ep-5 |
| > S-1 ep-5 | > S-2 ep-6 |
| > S-1 ep-6 | > S-2 ep-7 |
| > S-1 ep-7 | > S-2 ep-8 |
| > OAV 4 | > S-2 ep-9 |
| > S-1 ep-8 | > S-2 ep-10 |
| > S-1 ep-9 | > S-2 ep-11 |
| > OAV 5 | > S-2 ep-12 |
| > S-1 ep-10||

</details>
