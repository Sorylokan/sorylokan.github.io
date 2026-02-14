<div class="center icon"><img src="https://sorylokan.github.io/content/streamerbot/web-ui/WEBWUI_Icon.svg" alt="WEB•UI Logo" title="Webhook Embed Builder"></div>
<div class="center">

# **WEB•UI**
## Créez des embeds Discord visuellement. Utilisez-les partout dans Streamer.bot.

***

**Arrêtez de vous battre avec le JSON et les arguments.**
**WEB•UI** est un éditeur visuel qui vous permet de **concevoir des embeds de webhook Discord exactement comme ils apparaîtront**, puis de les **stocker une fois** comme variables globales Streamer.bot et de les réutiliser dans n'importe quelle action.

*Ce que vous voyez est ce que Discord obtient.*


> **_Accès rapide :_** {"Web UI"-g}(https://sorylokan.github.io/content/streamerbot/web-ui/) • {"Docs"-s}(?p=content/streamerbot/extensions/webhook-embed-builder-docs)
---
</div>

## ✨ Pourquoi WEB•UI existe

Créer des embeds Discord dans Streamer.bot signifie généralement :

* des dizaines d'arguments
* édition manuelle du JSON
* des configurations fragiles difficiles à réutiliser

**WEB•UI inverse le flux de travail.**
Vous concevez d'abord, automatisez ensuite.

* Éditeur visuel au lieu de données brutes
* Un payload sauvegardé au lieu d'une configuration répétée
* Compatibilité totale avec les variables Streamer.bot

<!-- video youtube here placeholder -->

---

## 🚀 Fonctionnalités principales

* 🎨 **Constructeur d'Embed Visuel** • Créez des embeds Discord visuellement avec un aperçu en direct de style Discord
* 👁️ **Aperçu en Temps Réel** • Voyez exactement ce qui sera envoyé à Discord pendant que vous éditez
* 🔌 **Intégration Native Streamer.bot** • Sauvegardez les payloads directement dans les variables globales via WebSocket
* 🔁 **Support des Variables Dynamiques**
  * Arguments d'action : `%myArgument%`
  * Variables globales : `~myGlobalVar~`
* 💾 **Payloads Réutilisables** • Concevez une fois, réutilisez partout
* 📤 **Import / Export JSON** • Sauvegardez, partagez et versionnez vos embeds facilement
* 🧪 **Test de Webhook en Direct** • Testez les payloads instantanément sans toucher à Streamer.bot

---

## 🎯 Pour qui est-ce ?

<details>
<summary><strong>🎮 Streamers & Créateurs de Contenu</strong></summary>

* Annonces de début / fin de stream
* Notifications de follow, sub, raid, donation
* Changements de jeu ou de catégorie
* Mises à jour de statut automatisées

</details>

<details>
<summary><strong>👥 Communautés & Serveurs Discord</strong></summary>

* Annonces d'événements
* Notifications multi-serveurs
* Messages informatifs enrichis
* Statistiques et classements

</details>

---

## 🧠 Comment fonctionne WEB•UI

### Flux de travail simple

1. Ouvrez l'interface WEB•UI
2. Concevez votre embed visuellement
3. Prévisualisez le message Discord final
4. Sauvegardez-le dans Streamer.bot
5. Réutilisez-le dans n'importe quelle action

> De l'idée à l'automatisation en moins de 5 minutes.

---

## 🖥️ Aperçu de l'Interface Utilisateur

WEB•UI est divisé en deux panneaux principaux :

### 📝 Panneau de Configuration

* Paramètres Webhook & Streamer.bot
* Configuration du contenu et de l'embed
* Gestion des embeds et des champs

### 👁️ Panneau d'Aperçu

* Aperçu du message de style Discord
* Visualiseur JSON généré
* Outils de copie / export / import

---

## ⚙️ Intégration Streamer.bot

### Sauvegarder un payload

Par défaut, WEB•UI sauvegarde votre configuration dans :

* `WEBWUI_WebhookPayload` *(Global Variable)*

You can change the variable name if needed.

### Utiliser le payload

1. Ajoutez **Core → C# → Execute C# Method**
2. Groupe de méthode : `[WEB•UI] > Mode`
3. Méthode :

  * `SendOnly` – envoyer l'embed
  * `EditMode` – éditer un message existant

> Les payloads peuvent être réutilisés dans un nombre illimité d'actions.

---

## 🔧 Variables

### Variables principales

| Variable                | Description               | Type     |
| ----------------------- | ------------------------- | -------- |
| `WEBWUI_WebhookPayload` | Payload JSON complet du webhook | Global   |
| `WEBWUI_WebhookURL`     | URL webhook de secours      | Argument |

### Support du texte dynamique

* `%argument%` → Arguments d'action
* `~globalVar~` → Variables globales Streamer.bot

> Les variables sont résolues lors de l'envoi via Streamer.bot.

---

## 📥 Installation

### Installation rapide

1. Téléchargez le fichier d'import `.sb` *(ou copiez la chaîne [copy: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])*
2. Glissez-déposez-le dans Streamer.bot

C'est tout. Aucune configuration manuelle requise.

### Prérequis

* Streamer.bot en cours d'exécution
* WebSocket activé
* Une URL de webhook Discord
* Un navigateur web moderne

---

## 🧭 Prochainement

* 🖥️ **Application Desktop WEB•UI**

  * Entièrement hors ligne
  * Pas de navigateur requis
  * Pas de serveur local

---

### 🔗 Liens Utiles

* 🌐 **Ouvrir WEB•UI**
  {"Web UI"-s}(https://sorylokan.github.io/content/streamerbot/web-ui/)

* 📦 **Télécharger l'Import Streamer.bot**
  {"Github Repo"-n}(https://github.com/Sorylokan/sorylokan.github.io/blob/main/content/streamerbot/web-ui/Script/WEBWUI-import.sb)

* 🧠 **Voir le Script C#**
  {"voir le script c#"-g}(https://github.com/Sorylokan/sorylokan.github.io/blob/main/content/streamerbot/web-ui/Script/WEBWUI-Sender.cs)

---

## 📜 Changelog

<details>
<summary><strong>WEB•UI v1.4.0</strong></summary>

```changelog
[02-03-26] # WEBUI-Builder (v1.4.0 - Amélioration de la Copie JSON)
+ Ajouté :
  • Support Ctrl+Clic sur le bouton "Copy JSON" pour sortie JSON compacte (une ligne)
  • Clic normal : copie le JSON formaté (indenté, lisible)
  • Ctrl+Clic : copie le JSON minifié (une ligne, compact)
  • La notification s'adapte au mode de copie (affiche "compact" quand Ctrl est utilisé)

**Impact** : Flexibilité accrue pour la copie JSON, supportant à la fois les formats lisibles et compacts pour différents cas d'usage

***

[01-31-26] # WEBUI-Builder (v1.3.2 - Architecture & Corrections de Bugs)
* Corrigé :
  • Miniature ne se mettant pas à jour dans l'aperçu lorsque l'URL est supprimée ou effacée
  • Miniature ne réapparaissant pas lorsque l'URL est rajoutée
  • Payload n'incluant pas les champs vides (empêchait les modifications de messages Discord de supprimer les champs supprimés)
+ Ajouté :
  • Module modals.js dédié pour la gestion modulaire des modales
~ Modifié :
  • Modales : déplacées de 160+ lignes HTML dans index.html vers le modals.js modulaire (6 modales maintenant générées dynamiquement)
  • Rendu de la miniature : amélioration de la création/suppression dynamique basée sur la présence de l'URL
  • Classe ModalsManager : initialisation et gestion centralisées des modales
  • buildJSON() : inclut maintenant toujours tous les champs (content, username, avatar_url, embeds) même vides
  • Structure du payload : les champs vides sont envoyés avec `null` ou chaîne vide pour permettre au backend de détecter les suppressions de champs

**Impact** : Structure HTML plus propre, architecture de composants modulaires, meilleur comportement de l'aperçu des miniatures, support approprié de la suppression de champs pour les modifications de messages

***

[01-30-26] # WEBUI-Builder (v1.3.0 - Raffinement UI "Less is More" & Système de Thèmes)
* Corrigé :
  • Rendu du markdown Discord dans l'aperçu
  • Image rebondissant/clignotant à chaque saisie de lettre
  • Champs Embed ne s'affichant pas correctement
  • Problèmes d'alignement de la miniature
  • Problèmes d'alignement du footer
  • Problèmes de rendu de la fenêtre d'aperçu
  • Champs Author apparaissant avant les champs Body (ordre des champs)
  • Lisibilité du texte du menu déroulant Timestamp (était blanc sur gris clair)
  • Adaptation des couleurs des notifications aux thèmes clair/sombre
  • Adaptation de l'arrière-plan de l'aperçu embed aux thèmes
  • Fonctionnalité du sélecteur de couleur
+ Ajouté :
  • Sélecteur de thème Sombre/Clair avec icône lune/soleil dans l'en-tête
  • Persistance du thème via localStorage
  • Module theme.js dédié pour la gestion des thèmes
  • Chevron SVG personnalisé pour les menus déroulants
~ Modifié :
  • Interface Timestamp : remplacement des 2 cases à cocher par un menu déroulant unique (Aucun/Auto/Personnalisé)
  • Sélecteur de couleur : redessiné dans le style Pickr Nano (carré de couleur + saisie hexa côte à côte)
  • Case à cocher inline du champ : déplacée sur la même ligne que la saisie Nom pour un layout compact
  • Couleurs des thèmes : alignées avec les tokens du site principal (thèmes sombre et clair)
  • Tokens CSS : ajout du système de sélecteur :root[data-theme="light"]
  • Éléments select : style personnalisé avec appearance:none et flèche SVG
  • Footer Web-UI mis à jour avec lien vers le site web Streamer.bot

**Impact** : Interface épurée "less is more", support complet des thèmes correspondant au design du site principal, amélioration de la clarté UX et de la cohérence visuelle

***

[01-28-26] # WEBUI-Builder (v1.1.0 - Support Markdown Discord)
* Corrigé :
  • Alignement de la miniature
  • Alignement du footer
  • Problème de la fenêtre d'aperçu
  • Champs Author apparaissant avant les champs Body (ordre des champs)
+ Ajouté :
  • Support du markdown Discord pour les titres (h1, h2, h3, -h) dans l'aperçu et l'embed
~ Modifié :
  • Ajustements CSS pour le rendu de l'aperçu

**Impact** : Support du markdown pour le formatage Discord, amélioration de la cohérence visuelle

***

[01-28-26] # WEBUI-Builder (v1.0.1 - Corrections de Layout & Affichage)
* Corrigé :
  • Alignement de la miniature
  • Alignement du footer
  • Problème de la fenêtre d'aperçu
  • Champs Author apparaissant avant les champs Body
~ Modifié :
  • Ajustements CSS pour le rendu de l'aperçu

**Impact** : Amélioration de la cohérence visuelle et de la stabilité du layout

***

[01-27-26] # WEBUI-Builder (v1.0.0 - Version Initiale)
+ Ajouté :
  • Interface web visuelle pour le constructeur d'embed Discord
  • Aperçu Discord en temps réel
  • Intégration WebSocket Streamer.bot
  • Fonctionnalité d'import / export JSON
  • Support de plusieurs embeds et champs
  • Variables dynamiques Streamer.bot
  • Script d'envoi C# optimisé
- Supprimé :
  • Herobrine (Mais... Il était là !?)

**Impact** : Constructeur d'embed Discord complet avec aperçu en temps réel et intégration Streamer.bot
```

</details>

<details>
<summary><strong>WEB•UI SCRIPT v1.1.2</strong></summary>

```changelog
[02-14-26] # WEBWUI-Sender (v1.1.2 - Flux de Retry & Nettoyage des Logs)
+ Ajouté :
  • `GetRetryDelayMilliseconds()` pour calculer le délai de retry depuis l'en-tête ou le JSON
  • `Truncate()` pour tronquer les logs de manière cohérente
  • `EnsureWaitTrue()` pour ajouter `wait=true` aux URLs webhook afin de récupérer l'ID du message
  • Import `System.Linq` pour l'analyse des en-têtes
~ Modifié :
  • Remplacement des POST HTTP directs dupliqués par `PostWithRetryAsync()` gérant les 429 via `Retry-After` ou `retry_after` JSON
  • Simplification de `SendWebhookAsync()` et `SendWebhookWithIdStorageAsync()` avec le nouveau flux et stockage de l'ID/timestamp quand présent
  • Logs améliorés avec tronquage des corps longs

**Impact** : Logique de retry unifiée avec gestion correcte des rate limits, capture cohérente des IDs de message, et logs plus propres

***

[01-31-26] # WEBWUI-Sender (v1.1.1 - Corrections Critiques & Mode Édition Remplacement Complet)
* Corrigé :
  • Timestamp non remplacé en EditMode lorsque le placeholder `__AUTO_TIMESTAMP__` est présent (critique)
  • Vulnérabilité d'injection JSON : caractères spéciaux dans les variables/arguments maintenant correctement échappés via `JsonConvert.ToString()`
* Ajouté :
  • `NormalizeEditPayload()` garantit que EditMode se comporte comme un vrai remplacement complet : `content`, `embeds`, ou `fields` manquants sont explicitement effacés au lieu que Discord garde les anciennes valeurs
* Modifié :
  • `ReplaceAutoTimestampsWithValue()` maintenant appelé après `RestoreTimestampInPayload()` dans le pipeline EditMode
  • EditMode PATCH envoie maintenant un payload complet avec des valeurs vides explicites pour les champs supprimés

**Impact** : EditMode maintenant intuitif et prévisible - ce que vous voyez dans l'UI correspond parfaitement à Discord, payloads JSON sécurisés contre les attaques par injection

***

[01-31-26] # WEBWUI-Sender (v1.1.0 - Refonte HttpClient & Surcharge URL)
* Corrigé :
  • Résolu le problème de fuite de ressources causé par la création d'une nouvelle instance HttpClient à chaque envoi de webhook
  • Corrigé l'épuisement du pool de sockets pouvant causer des erreurs "Adresse déjà utilisée" lors d'une fréquence élevée de webhooks
  • Corrigé l'erreur "Cette instance a déjà démarré une ou plusieurs requêtes" en déplaçant l'initialisation des propriétés vers le constructeur statique
+ Ajouté :
  • Implémentation d'un champ HttpClient statique en lecture seule pour la réutilisation de connexion dans toutes les méthodes webhook
  • Ajout d'un constructeur statique pour initialiser les propriétés HttpClient une fois au démarrage
  • L'argument URL webhook prend maintenant la priorité sur le `WebHookUrl` du payload pour le flux de travail dev/test/prod
~ Modifié :
  • Refonte de `SendWebhookAsync()`, `SendWebhookWithIdStorageAsync()`, et `EditExistingMessageAsync()` pour utiliser l'instance HttpClient partagée
  • Suppression des instructions `using` autour de HttpClient (plus nécessaire avec l'instance statique)
  • Déplacement de l'initialisation `Timeout` et `DefaultRequestHeaders` des méthodes individuelles vers le constructeur statique
  • Logique de priorité inversée : l'argument `WEBWUI_WebhookURL` surcharge maintenant la valeur du payload pour la cohérence
- Supprimé :
  • Élimination des blocs redondants `using (HttpClient client = new HttpClient())` dans les trois méthodes HTTP
  • Suppression des modifications d'en-tête et de délai d'attente par requête

**Impact** : Correction complète pour l'exécution concurrente de webhooks, fonctionnalité EditMode stable, flux de travail dev/test/prod plus propre, amélioration significative des performances sous charge
```

</details>
---

<div class="center">

**Développé avec passion par Sorylokan**
*WEB•UI — Parce que de superbes embeds Discord devraient être faciles.*

</div>
