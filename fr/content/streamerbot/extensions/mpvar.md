# \# :MPVarIco:﻿ - MPVar: Automate Your Music Flow
**MPVar *(MediaPlayerVariables)*** is a powerful extension designed to automate the retrieval of media information from local media players like VLC and Foobar. Built to integrate with Streamer.bot, MPVar captures key data, such as song titles, artists, and album covers, and stores them as variables for further automation. Whether you want to display song information during a stream or trigger custom actions based on the current media, MPVar makes it all possible.
### \# What makes MPVar unique?
Originally a continuation of the ***VLC-TV*** project (which only worked with VLC), MPVar expands the scope by supporting multiple media players, including Foobar. It is more versatile, more flexible, and opens up new possibilities for streamers, creators, and developers using Streamer.bot.
> MPVar simplifies the complex task of media automation, giving you control and flexibility over your media players. It enhances the streaming experience by automating tasks that you would otherwise need to handle manually. Plus, it’s scalable: whether you’re using VLC or Foobar, MPVar lets you focus on creation, not configuration.
> The retrieved data is stored as global variables in Streamer.bot, allowing you to create custom triggers, overlays or notifications.
> MPVar is more than just a tool for streamers; it’s an extension that, when integrated with Streamer.bot, will unlock a world of possibilities for improving the interactivity of your stream and keeping your viewers engaged with dynamic, real-time media updates.

### Fonctionnalités Clés :
* Support multi-lecteur multimédia : Fonctionne avec les lecteurs multimédia VLC et Foobar. *Et plus de lecteurs peuvent être ajoutés au fil du temps !*
* Automatisation personnalisable : Stockez les données multimédia dans des variables globales, permettant d'innombrables possibilités d'automatisation dans Streamer.bot.
* Intégration simple : Facile à configurer et à utiliser avec Streamer.bot, rendant votre automatisation de streaming plus fluide et plus interactive.

## \# Comment ça fonctionne :
**Configuration :**
> *`(Captures d'écran et dernière version ici :` https://discord.com/channels/834650675224248362/1283489841836720128/1296993405087514645 `)`*
* Importez le plugin dans Streamer.bot
* Au __sommet__ des sous-actions, vous trouverez un dossier "Settings" avec les variables nécessaires.
> Définissez les arguments en fonction de vos besoins
### Pour VLC : `Définir l'argument %MPVar_Player% sur 'VLC'`
> Avec l'adresse IP, le port et le mot de passe, et c'est fait :EkValide:﻿ 
### Pour Foobar2000 : `Définir l'argument %MPVar_Player% sur 'Foobar'`
> Vous devez également installer le plugin HTTP Control et télécharger le modèle MPVar.
> *(Tutoriel et liens ici : https://discord.com/channels/834650675224248362/1283489841836720128/1297019143056396319 )*
> - Le mot de passe n'est pas requis.

### \# Quoi de neuf ? *(changelog)*
```changelog
[19.10.24] # Refonte de MPVar | (v1.3)
* Modifié : Renommé VLC-TV > MPVar
+ Ajouté : Arguments de paramètres
+ Ajouté : Compatibilité Foobar2000
+ Ajouté : Intégrations simplifiées pour les futurs lecteurs multimédia
+ Ajouté : Logs personnalisés
- Supprimé : Logs ennuyeux
- Supprimé : Herobrine

[12.02.24] # VLC-TV (v3) - VERSION PRÉCÉDENTE
* Modifié : Légère refonte du code
* Modifié : Standardisation des noms de variables (Préfixe "VLC-TV_")
+ Ajouté : Tout a été condensé en une seule action au lieu de (3)
- Supprimé : Herobrine
```

Vidéo de démonstration : https://youtu.be/uNSTX2XXsms (ancienne version mais toujours valide)

> # \# Configuration de VLC :
* Ouvrez VLC, faites CTRL+P *(ou menu > outils > préférences)*
* Dans le coin inférieur gauche, sélectionnez "tout" dans le carré "afficher les paramètres".
* Allez dans la section interface et sélectionnez "Interfaces principales > Lua"
* Définissez le mot de passe et le port (et souvenez-vous en pour plus tard !) (voir écran 1)
> > Enregistrez et redémarrez VLC.
*Plus d'informations ici : https://github.com/azrafe7/vlc4youtube/blob/master/instructions/how-to-enable-vlc-web-interface.md *

> # \# Configuration de Foobar2000 :
* Téléchargez et installez le plugin foo_httpcontrol sur https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/
> *`foo_httpcontrol_0_97_28.fb2k-component` pour l'installer
> Vous pouvez trouver des conseils très utiles dans le fichier readme sur le site web bitbucket
Téléchargez le modèle MPvar ci-dessous et ouvrez le fichier readme dans votre navigateur
> allez sur `http://<votre_adresse_IP>:<votre_port>/MPVar/`. Vous devriez voir quelque chose comme l'écran ci-dessous !
> Si c'est le cas, GG vous avez terminé <a:EkValide:525235566678376448>