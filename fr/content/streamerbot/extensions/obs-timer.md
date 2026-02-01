# **⌛ Minuteur OBS pour Streamer.bot**
### **Un Compte à Rebours Flexible pour les Scènes Starting Soon et BRB**

Après des semaines de bricolage, d'apprentissage et de peaufinage, je suis ravi de partager ce script de minuteur ! :tada:  
Je ne suis pas développeur—j'apprends au fur et à mesure—mais j'ai construit quelque chose de fonctionnel et flexible, parfait pour améliorer votre stream. Ce n'est pas parfait, mais avec vos retours et impressions, je peux le rendre encore meilleur. Faites-moi savoir ce que vous en pensez !

## **Ce Que Fait Ce Minuteur**
- **Parfait pour les Scènes Starting Soon ou Pause** : Affichez automatiquement un compte à rebours sur OBS pour informer vos viewers.  
- **Hautement Personnalisable** : 
  - Définissez la durée du minuteur et les actions directement dans Streamer.bot.  
  - Personnalisez l'apparence et le style du minuteur dans OBS.  
- **Déclenchement Flexible** : Activez le minuteur depuis n'importe quel déclencheur Streamer.bot—commandes chat, points de chaîne, abonnements ou actions personnalisées.  
- **Actions de Fin Dynamiques** : Affichez automatiquement un message, changez de scène ou redémarrez le minuteur quand il se termine.  

## **Comment L'Utiliser**
### Arguments Requis :
1. **`textSourceName`** : La source de texte GDI OBS pour afficher le compte à rebours du minuteur.  
2. **`timerStart`** : La durée de départ du compte à rebours, soit au format `hh:mm:ss` ou `mm:ss`.  
3. **`timerOutcome`** : Ce qui se passe quand le minuteur se termine :  
> - **Défini sur `"message"`** : Affiche la valeur de `actionDetail` comme texte dans OBS.  
> - **Défini sur `"scene"`** : Bascule vers la scène OBS spécifiée dans `actionDetail`.  
> - **Défini sur `"restart"`** : Redémarre le minuteur avec la durée originale de `timerStart`.  

4. **`actionDetail`** : Spécifie le message ou le nom de la scène OBS pour l'action de fin.  
> - *Exemple* : `"La pause est terminée !"` (pour les messages) ou `"LiveScene"` (pour les changements de scène).

## **Exemples**
### 1. **Compte à Rebours avec un Message**
- **Arguments** :
  - `textSourceName` : `"CountdownTimer"`  
  - `timerStart` : `"02:30"`  
  - `timerOutcome` : `"message"`  
  - `actionDetail` : `"C'est parti !"`  
- **Résultat** : Le minuteur démarre à 2:30 et affiche `"C'est parti !"` quand il se termine.
### 2. **Changer de Scène Automatiquement**
- **Arguments** :
  - `textSourceName` : `"Timer"`  
  - `timerStart` : `"05:00"`  
  - `timerOutcome` : `"scene"`  
  - `actionDetail` : `"LiveScene"`  
- **Résultat** : Le minuteur démarre à 5:00 et bascule vers la scène OBS `"LiveScene"` quand il se termine.
### 3. **Redémarrer le Minuteur en Boucle**
- **Arguments** :
  - `textSourceName` : `"CountdownTimer"`  
  - `timerStart` : `"01:00"`  
  - `timerOutcome` : `"restart"`  
- **Résultat** : Le minuteur démarre à 1:00 et redémarre à 1:00 quand il atteint 0.
### 4. **Laisser le Minuteur Continuer en Temps Négatif**
* **Arguments** :
  * `textSourceName` : `"CountdownTimer"`
  * `timerStart` : `"00:30"`
  * `timerOutcome` : `"continue"`
* **Résultat** : Le minuteur démarre à 30 secondes, atteint 0, puis continue en temps négatif (par ex., `-00:01`, `-00:02`, ...).
:::warning
Le minuteur s'arrête automatiquement après avoir atteint **-2:00** pour éviter de tourner indéfiniment. Modifiable dans le script, ligne 8.
:::

## **Pourquoi Vous Allez L'Adorer**
- **Rationalisé pour les Streamers** : Simplifie les transitions de scène et la gestion des pauses avec des comptes à rebours automatisés.  
- **Facile à Utiliser** : Entièrement configurable dans Streamer.bot sans modifier le script.  
- **Collaboratif et Évolutif** : J'ai construit ceci en apprenant et suis ouvert aux retours pour le rendre encore meilleur !  

J'attends avec impatience d'entendre ce que vous pensez de ce minuteur !  
Faites-moi connaître vos impressions, partagez des idées d'améliorations, ou faites-moi simplement savoir comment ça fonctionne pour votre stream. :blush:  

**🎉 Commencez maintenant et ajoutez une touche soignée à votre stream !**