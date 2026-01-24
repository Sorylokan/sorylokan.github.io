# Test complet du parser Markdown

## Titres de tous niveaux

# Titre H1
## Titre H2  
### Titre H3
#### Titre H4
##### Titre H5
###### Titre H6

## Formatage du texte

Texte normal avec *italique* et **gras** et ***gras italique***.

Texte avec _italique souligné_ et __gras souligné__ et ___gras italique souligné___.

~~Texte barré~~ et texte normal.

||test texte caché||

## Listes

### Liste à puces
- Premier élément
- Deuxième élément
  - Sous-élément 1
  - Sous-élément 2
    - Sous-sous-élément
- Troisième élément

* Liste avec astérisques
* Autre élément
  * Sous-élément

+ Liste avec plus
+ Autre élément

### Liste numérotée
1. Premier élément
2. Deuxième élément
   1. Sous-élément numéroté
   2. Autre sous-élément
3. Troisième élément

### Liste de tâches
- [x] Tâche terminée
- [ ] Tâche en cours
- [x] Autre tâche terminée
- [ ] Tâche à faire

## Liens et images

Lien simple : https://example.com

[Lien avec texte](https://example.com)

[Lien avec titre](https://example.com "Titre du lien")

[Lien de référence][ref1]

[ref1]: https://example.com "Définition du lien"

![Image](https://via.placeholder.com/150 "Titre de l'image")

[![Image cliquable](https://via.placeholder.com/100)](https://example.com)

## Code

Code inline avec `console.log('Hello')` dans la phrase.

Bloc de code simple :
```
Code sans coloration
Deuxième ligne
```

Code JavaScript :
```javascript
function hello(name) {
    console.log(`Hello, ${name}!`);
    return true;
}

hello('World');
```

Code Python :
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

Code HTML :
```html
<div class="container">
    <h1>Titre</h1>
    <p>Paragraphe avec <strong>gras</strong></p>
</div>
```

## Citations

> Ceci est une citation simple.

> Citation sur plusieurs lignes.
> Deuxième ligne de la citation.
> Troisième ligne.

> Citation avec paragraphes multiples.
>
> Deuxième paragraphe de la citation.

> Citation imbriquée :
> > Citation dans une citation.
> > Autre ligne imbriquée.
>
> Retour à la citation principale.

## Tableaux

| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Ligne 1   | Données   | Plus      |
| Ligne 2   | Autres    | Données   |
| Ligne 3   | Test      | Final     |

Tableau avec alignement :

| Gauche | Centré | Droite |
|:-------|:------:|-------:|
| A      | B      | C      |
| Test   | Long   | 123    |
| X      | Y      | Z      |

## Séparateurs

Séparateur 1 :
---

Séparateur 2 :
***

Séparateur 3 :
___

## Échappement

\*Ce texte n'est pas en italique\*

\# Ce n'est pas un titre

\[Ce n'est pas un lien\]

\`Ce n'est pas du code\`

## HTML intégré

<div style="color: red; background: #ffe6e6; padding: 10px;">
Texte en rouge avec HTML
</div>

input :

[copy:Hello! 👋] <input type="text" id="webhookAvatarUrl" placeholder="Try to paste 👀">

<details>
<summary>Cliquez pour développer</summary>
<p>Contenu masqué qui apparaît au clic.</p>
</details>

<mark>Texte surligné</mark> avec HTML.

## Éléments combinés

Voici un **paragraphe** avec *plusieurs* `éléments` de [formatage](https://example.com).

> Citation avec **gras** et *italique* et `code`.
> 
> > Citation imbriquée avec [lien](https://example.com).

Liste avec formatage :
- **Premier** élément avec `code`
- *Deuxième* élément avec [lien](https://example.com)
- Troisième élément avec ~~barré~~

1. Élément avec **code** : `npm install`
2. Élément avec *lien* : [Documentation](https://docs.example.com)
3. Élément avec citation :
   > Citation dans une liste

---

# MODULES PERSONNALISÉS

## Blocs d'alerte

:::info
Bloc d'information avec du contenu normal.
:::

:::warning
Bloc d'avertissement avec **formatage gras**.
:::

:::success
Bloc de succès avec *formatage italique* et `code inline`.
:::

:::danger
Bloc de danger avec [lien](https://example.com) et liste :
- Premier élément
- Deuxième élément
:::

:::info
Bloc info avec code :
```javascript
console.log('Test dans un bloc');
```
:::

:::warning
Bloc warn avec citation :
> Citation importante dans l'avertissement
:::

:::success
Bloc success avec tableau :

| Test | Valeur |
|------|--------|
| A    | 1      |
| B    | 2      |
:::

:::danger
Bloc danger avec **tous** les *éléments* `possibles` :

1. Liste numérotée
2. Avec [lien](https://example.com)

- Liste à puces
- Autre élément

> Citation dans le bloc

```bash
echo "Code dans le bloc"
```
:::

## Boutons personnalisés

Bouton normal : {"Cliquer ici"-n}(https://example.com)

Bouton spécial : {"Bouton Premium"-s}(https://example.com)

Plusieurs boutons : {"Normal"-n}(https://test1.com) {"Spécial"-s}(https://test2.com) {"Autre"-n}(https://test3.com)

Boutons dans du texte : Pour commencer, {"cliquez ici"-n}(https://start.com) ou directement {"Commencer"-s}(https://go.com) maintenant.

Boutons avec formatage : {"GitHub *Repo*"-n}(https://github.com) {"Télécharger **maintenant**"-s}(https://download.com)

## Combinaisons complexes

:::info
**Information importante**

Voici un bloc avec :
- Liste à puces
- Code : `npm start`
- [Lien externe](https://example.com)
- {"Bouton d\'action"-s}(https://action.com)

```javascript
// Code dans le bloc
function test() {
    return "OK";
}
```

> Citation dans le bloc info

| Colonne | Valeur |
|---------|--------|
| Test    | OK     |
:::

Texte normal avec **gras** et {"bouton intégré"-n}(https://inline.com) et *italique*.

> Citation avec {"bouton dans citation"-s}(https://quote.com) et **formatage**.

Liste avec boutons :
1. Premier élément {"Action 1"-n}(https://action1.com)
2. Deuxième élément {"Action 2"-s}(https://action2.com)
3. Troisième élément normal

## Test final

Ceci est un **test complet** avec *tous* les `éléments` du [parser](https://parser.com).

:::success
✅ **Test réussi !**

Si vous voyez ce message correctement formaté avec le {"bouton de fin"-s}(https://end.com), 
votre parser fonctionne parfaitement !
:::

[copy:oui !]

# Test des Boutons

Cette page teste les différents types de boutons disponibles dans le système.

## Boutons avec liens

Voici les différents types de boutons :

{"Bouton Normal"-n}(https://example.com)

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

## Tableaux

### Tableau simple

| Nom | Âge | Ville |
|-----|-----|--------|
| Alice | 25 | Paris |
| Bob | 30 | Lyon |
| Charlie | 28 | Marseille |

### Tableau avec alignement

| Produit | Prix | Stock | Statut |
|:--------|:----:|------:|:------:|
| MacBook Pro | 2,499€ | 15 | ✅ Disponible |
| iPhone 15 | 999€ | 8 | ⚠️ Stock faible |
| iPad Air | 649€ | 25 | ✅ Disponible |
| AirPods Pro | 279€ | 0 | ❌ Épuisé |

### Tableau complexe avec code

| Commande | Description | Exemple |
|----------|-------------|---------|
| `git init` | Initialise un nouveau repo | `git init mon-projet` |
| `git add` | Ajoute des fichiers au staging | `git add .` |
| `git commit` | Crée un commit | `git commit -m "Initial commit"` |
| `git push` | Pousse vers le remote | `git push origin main` |

### Grand tableau (pour tester le responsive)

| ID | Nom | Email | Téléphone | Adresse | Ville | Code Postal | Pays | Date d'inscription | Statut |
|----|-----|-------|-----------|---------|-------|-------------|------|-------------------|--------|
| 1 | Jean Dupont | jean.dupont@email.com | 01 23 45 67 89 | 123 Rue de la Paix | Paris | 75001 | France | 2024-01-15 | Actif |
| 2 | Marie Martin | marie.martin@email.com | 02 34 56 78 90 | 456 Avenue des Champs | Lyon | 69000 | France | 2024-02-20 | Actif |
| 3 | Pierre Durand | pierre.durand@email.com | 03 45 67 89 01 | 789 Boulevard Saint-Michel | Marseille | 13000 | France | 2024-03-10 | Inactif |

---

*Fin du fichier de test - Tous les éléments Markdown + modules personnalisés*