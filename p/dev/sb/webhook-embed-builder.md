<div class="center icon"><img src="https://via.placeholder.com/100x100/FF7755/ffffff?text=WEBUI" alt="WEBWUI Logo" title="Webhook Embed Builder"></div>
<div class="center">

# **🌐 Webhook Embed Builder with User Interface • [WEB•UI]**
## Visual Discord Webhook Creator for StreamerBot
</div>

***

**Webhook Embed Builder with User Interface • [WEB•UI]** est un outil puissant pour automatiser l'envoi de **messages enrichis** sur **Discord** via des **webhooks** personnalisés, conçu pour s'intégrer facilement avec **StreamerBot**. Il vous permet de créer des **embeds dynamiques** et de modifier chaque détail à la volée !

---

## **✨ What makes WEBWUI unique?**

**Webhook Embed Builder** va bien au-delà des simples messages Discord. Avec **WEBWUI**, vous obtenez un accès à une **personnalisation avancée** des embeds via **StreamerBot**. Vous pouvez mettre à jour les informations en temps réel, rendant les annonces et interactions plus fluides.

> WEBWUI simplifie l'automatisation de vos notifications Discord, vous donnant un contrôle complet et une flexibilité totale pour adapter vos communications à votre communauté, sans gestion manuelle fastidieuse.

### **🎯 Key Features:**
* **🎨 Interface Web Intuitive** : Interface visuelle similaire à Discohook avec aperçu en temps réel
* **⚡ Intégration StreamerBot** : Connexion WebSocket directe avec support des variables dynamiques  
* **🛠️ Customisation Avancée** : Support des embeds multiples, images, champs personnalisés
* **📤 Export/Import** : Sauvegarde et partage de vos configurations JSON
* **🧪 Test en Direct** : Validation immédiate de vos webhooks

## **🚀 How it works:**

### **Setup**:
> *Configuration en quelques étapes simples*
* Ouvrez l'interface web `index.html`  
* Configurez votre **URL webhook Discord**
* Connectez-vous à **StreamerBot** via WebSocket  
* ||Créez des embeds magnifiques sans effort||

:::info
**📋 Ce dont vous avez besoin :**
- Une URL webhook Discord
- StreamerBot en cours d'exécution  
- Un navigateur web moderne
- *(Optionnel)* Connaissances en variables StreamerBot
:::

### **🎨 Création d'un embed:**
1. **Ajoutez votre contenu principal** dans l'onglet Content
2. **Configurez les embeds** (titre, description, couleur, images)
3. **Ajoutez des champs personnalisés** pour plus d'informations  
4. **Prévisualisez en temps réel** le résultat final
5. **Sauvegardez** dans StreamerBot ou exportez en JSON

### **⚙️ Intégration StreamerBot:**
1. **Sauvegardez** la configuration (variable `WEBWUI_WebhookPayload`)
2. **Importez le script C#** fourni dans vos actions  
3. **Déclenchez** via vos événements préférés (follows, subs, raids, etc.)

---

## **📦 What's included:**

:::success
**✅ Package complet :**

- **🌐 Interface Web** responsive (HTML/CSS/JS)
- **💻 Script C# StreamerBot** optimisé et documenté
- **📚 Documentation** complète avec exemples
- **🔧 Variables** techniques prêtes à l'emploi  
- **🎯 Support** des variables dynamiques StreamerBot
:::

---

## **🔧 Variables & Configuration:**

### **Variables principales:**
| Variable | Description | Type |
|----------|-------------|------|
| `WEBWUI_WebhookPayload` | Configuration JSON complète | Global |
| `WEBWUI_WebhookURL` | URL webhook de fallback | Argument |

### **Variables dynamiques supportées:**
- `%user%` : Nom de l'utilisateur actuel
- `%game%` : Jeu actuellement en cours  
- `%uptime%` : Durée du stream en cours
- `~GlobalVar~` : Vos variables globales personnalisées

[copy:WEBWUI_WebhookPayload] ← *Variable principale à retenir*

---

## **💡 Cas d'usage & Exemples:**

<details>
<summary>💜 **Streamers & Créateurs**</summary>

- **🎉 Notifications de followers** avec embeds personnalisés et images
- **📺 Annonces début/fin de stream** automatisées  
- **💎 Alertes donations/bits** avec informations détaillées
- **🎮 Changements de jeu** avec mise à jour automatique
- **🔴 Statut live/offline** pour vos serveurs Discord

</details>

<details>
<summary>👥 **Communautés & Serveurs**</summary>

- **📅 Événements communautaires** avec embeds riches
- **🤖 Intégration bots Discord** existants  
- **📢 Annonces multi-serveurs** coordonnées
- **📊 Statistiques** en temps réel avec variables
- **🏆 Classements** et leaderboards automatisés

</details>

---

## **🎮 Interface Utilisateur:**

L'interface WEBWUI est divisée en **deux panneaux principaux** :

### **📝 Panneau Configuration (Gauche):**
> - **⚙️ Onglet Informations** : URL webhook, paramètres StreamerBot, connexion WebSocket
> - **🎨 Onglet Contenu** : Message principal, création et gestion des embeds

### **👁️ Panneau Prévisualisation (Droite):**  
> - **🖼️ Aperçu Discord** : Visualisation en temps réel de votre message
> - **📄 JSON Viewer** : Code généré avec options export/import/copie

:::warning
**⚠️ Note importante :**
Les variables StreamerBot (`%user%`, `~globals~`) ne fonctionnent qu'avec l'envoi via StreamerBot, pas avec le bouton "Test Webhook" de l'interface.
:::

---

## **🌟 Avantages & Points Forts:**

:::danger
**🔥 Pourquoi choisir WEBWUI ?**

- **🎯 Interface intuitive** : Aucun code requis, tout visuel
- **⚡ Intégration native** : Conçu spécifiquement pour StreamerBot  
- **👀 Préview temps réel** : Voyez le résultat instantanément
- **🔄 Variables dynamiques** : Contenu adaptatif automatique
- **💾 Sauvegarde flexible** : Export JSON + variables StreamerBot
- **🛠️ Script optimisé** : Code C# professionnel fourni
- **📱 Interface moderne** : Design responsive et accessible
:::

---

## **📥 Installation & Téléchargement:**

{"📦 Télécharger WEBWUI v1.0"-s}(https://github.com/sorylokan/webhook-embed-builder) {"📚 Documentation Complète"-n}(?p=dev/sb/webhook-embed-builder-docs) {"💬 Support Discord"-n}(https://discord.gg/communaute)

---

## **📋 What's New? *(Changelog)*:**

<details>
<summary>**📅 Changelog détaillé**</summary>

```changelog
[XX.01.26] # WEBWUI v1.0.0 - Initial Release!
✨ Added: Interface web complète avec prévisualisation temps réel
✨ Added: Intégration WebSocket StreamerBot native  
✨ Added: Support embeds multiples avec champs personnalisés
✨ Added: Variables dynamiques StreamerBot (%user%, ~globals~)
✨ Added: Export/Import JSON pour sauvegarde/partage
✨ Added: Script C# optimisé avec gestion d'erreurs avancée
🎨 Added: Interface responsive moderne
🛠️ Added: Nomenclature technique WEBWUI_* standardisée
📚 Added: Documentation complète avec exemples
🔧 Added: Test webhooks en direct depuis l'interface
- Removed: Herobrine (il perturbait les embeds)
```

</details>

---

▼ ***Découvrez mes autres créations StreamerBot !*** ▼
> {"**🎬 YouTube Video Alert**"-s}(?p=dev/sb/youtube-video-alert) - Notifications automatiques de nouvelles vidéos
>
> {"**🎵 MPVar - Media Variables**"-g}(?p=dev/sb/mpvar) - Récupération infos lecteurs média
>
> {"**⏱️ OBS Timer**"-p}(?p=dev/sb/obs-timer) - Minuteur flexible pour vos scènes
>
> {"**🎁 Essential Starter Kit**"-n}(?p=dev/sb/essential-starter-kit) - Pack de démarrage complet

---

**💖 Développé avec passion par Sorylokan pour la communauté StreamerBot**

*Webhook Embed Builder with User Interface • [WEB•UI] - Créez des embeds Discord professionnels sans effort*