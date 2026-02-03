# Webhook Embed Builder • Documentation
***

## 📦 Variables Globales

L'extension utilise deux variables globales principales pour la communication entre l'interface Web et Streamer.bot :

| Nom de Variable | Description | Requis |
|--------------|-------------|----------|
| `WEBWUI_WebhookPayload` | Stocke le payload JSON complet pour le message webhook | ✅ Oui |
| `WEBWUI_WebhookURL` | URL du webhook Discord (peut être définie dans l'interface Web ou comme argument) | ⚠️ Optionnel* |

> **Note :** Si `WEBWUI_WebhookURL` n'est pas spécifiée dans l'interface Web, vous devez la définir comme argument dans Streamer.bot avant d'exécuter l'action d'envoi.

---

## 🔧 Utilisation de Variables Globales Personnalisées

Pour charger un payload webhook depuis une **variable globale personnalisée** dans l'interface Web :

1. Dans Streamer.bot, ajoutez une sous-action **Global Variable Get**
2. Définissez **Variable Name** sur votre variable personnalisée (par ex., `MyCustomPayload`)
3. Définissez **Destination Variable** sur `WEBWUI_WebhookPayload`
4. L'interface Web détectera et chargera automatiquement ce payload

**Exemple de flux de travail :**
```
Déclencheur → Global Variable Get (MyCustomPayload vers WEBWUI_WebhookPayload) → Exécuter Action
```

---

## 🎨 Support des Variables Streamer.bot

Vous pouvez utiliser **n'importe quelle variable Streamer.bot** dans vos payloads de webhook :

### Types de Variables
- **Arguments :** `%nomVariable%` - Passés depuis les déclencheurs ou sous-actions
- **Variables Globales :** `~nomVariableGlobale~` - Persistantes entre les sessions

### Règles Importantes
1. **Définir les variables AVANT l'exécution** - Toutes les variables doivent exister avant l'envoi du webhook
2. **Définir les déclencheurs appropriés** - Assurez-vous que votre action a le bon déclencheur pour peupler les variables
3. **Tester minutieusement** - Le bouton "Test Webhook" dans l'interface Web ne traite **PAS** les variables Streamer.bot

### Exemples de Cas d'Utilisation
```
/-[Embed]--
| Title:       "%user% vient de s'abonner !" 
| Description: "Bienvenue dans la communauté de ~streamerName~ !"
| Image URL:   "%userProfileImage%"
\----------
```

### 📚 En Savoir Plus sur les Variables Streamer.bot
* {"Guide des Variables"-s}(https://docs.streamer.bot/guide/variables) - {"Variables de Déclencheur"-g}(https://docs.streamer.bot/api/triggers) - {"Variables de Sous-action"-n}(https://docs.streamer.bot/api/sub-actions)

---

## 🖼️ Informations sur l'Aperçu de l'Interface Web

### Valeurs Placeholder
La fenêtre d'aperçu affiche des **données placeholder** à titre de référence visuelle uniquement :

| Élément | Valeur Placeholder | Source de Valeur Réelle |
|---------|------------------|---------------------|
| Nom d'utilisateur | `WEB•UI - Announcement` | Paramètres du webhook Discord ou saisie dans l'interface Web |
| Avatar | `WEBWUI_Icon.svg` | Paramètres du webhook Discord ou saisie dans l'interface Web |

> **Important :** Ce ne sont **PAS** les valeurs envoyées à Discord. Par défaut, les webhooks Discord utilisent le nom d'utilisateur et l'avatar configurés lors de la création du webhook dans les paramètres du serveur Discord.

### Précision de l'Aperçu
L'aperçu de l'interface Web imite fidèlement l'apparence de Discord mais **peut ne pas être précis à 100%**. Testez toujours vos embeds dans un vrai canal Discord avant de les déployer en production.

**Différences à noter :**
- Le rendu des couleurs peut varier légèrement
- Les tailles de police peuvent différer marginalement
- L'analyse du markdown pourrait avoir des différences mineures
- Le comportement de mise à l'échelle des images peut ne pas correspondre exactement

---

## 📥 Bouton Charger Configuration

**Objectif :** Importer un payload webhook précédemment sauvegardé depuis Streamer.bot dans l'interface Web.

### ⚠️ Avertissement
Cette action va **complètement écraser** votre travail actuel dans l'interface Web :
- Tout le contenu du message
- Tous les paramètres du webhook (URL, nom d'utilisateur, avatar)
- Tous les embeds et leurs champs
- Toutes les images et configurations

### Comment Utiliser
1. Assurez-vous que le payload est sauvegardé dans Streamer.bot comme variable globale (par défaut : `WEBWUI_WebhookPayload`)
2. Connectez l'interface Web à Streamer.bot via WebSocket
3. Entrez le nom de la variable globale s'il diffère du défaut
4. Cliquez sur le bouton **Load Config**
5. Confirmez l'action d'écrasement

> **Astuce :** Sauvegardez votre travail actuel en utilisant "Export JSON" avant de charger une nouvelle configuration pour éviter de perdre des modifications non sauvegardées.

---

## 💡 Bonnes Pratiques

### Cas d'Utilisation Typiques
- Notifications de début de stream
- Annonces programmées
- Événements de jeu
- Jalons de la communauté
- Embeds dynamiques avec mise en page statique
- Alertes d'abonnement / Follow
- Messages multilingues

### Flux de Travail de Test
1. **Concevoir** votre webhook dans l'interface Web
2. **Sauvegarder** la configuration dans Streamer.bot
3. **Tester** avec les variables Streamer.bot dans un canal Discord de test
4. **Affiner** selon les résultats
5. **Déployer** en production

### Gestion des Variables
- Utilisez des noms de variables descriptifs (`%subscriberName%` et non `%var1%`)
- Documentez quels déclencheurs fournissent quelles variables
- Testez le peuplement des variables avant de passer en direct
- Utilisez des valeurs de secours quand possible : `%userName% or "Anonyme"`

### Conseils de Performance
- Réutilisez les payloads via des variables globales pour la cohérence
- Gardez les descriptions des embeds sous 4096 caractères
- Limitez à 10 embeds par message maximum (limite Discord)
- Optimisez les URLs d'image pour un chargement rapide

---

## 🆘 Dépannage

| Problème | Solution |
|-------|----------|
| Les variables s'affichent comme texte littéral | Assurez-vous que les variables sont définies avant l'exécution de l'action |
| Le webhook ne s'envoie pas | Vérifiez la connexion WebSocket et la valeur de `WEBWUI_WebhookURL`, ou si une variable dans le payload est invalide |
| L'aperçu semble différent dans Discord | Comportement attendu - testez dans un vrai canal Discord |
| Charger Config ne fonctionne pas | Vérifiez que le nom de variable correspond exactement (Sensible à la casse) dans Streamer.bot |
| Les images ne s'affichent pas dans l'Aperçu | L'image peut être trop grande ou dans un format incompatible avec l'aperçu. Essayez de l'envoyer sur Discord |
| Les images ne s'affichent pas dans Discord | Vérifiez l'accessibilité de l'URL et les exigences CDN de Discord |


**Version Web UI :** 1.4.0 • **Version Extension :** 1.1.0 • **Dernière Mise à Jour :** Janvier 2026

[WEB•UI] • Webhook Embed Builder with User Interface
