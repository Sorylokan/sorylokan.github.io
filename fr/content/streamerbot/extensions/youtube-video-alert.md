# Bienvenue sur YVA !
YouTube Video Alert (YVA), vous permet d'envoyer un webhook Discord de votre dernière vidéo

## Comment configurer :
* YVA est facile à configurer. Tout ce que vous devez faire est de fournir 4 éléments :
> * l'URL de votre webhook Discord,
> * l'ID du rôle à mentionner,
> * l'ID de votre chaîne YouTube,
> * une clé API Google. *(C'est gratuit !)*
> *► Vous pouvez trouver un lien sous chaque argument sur comment les obtenir !*
* Activez le timer dans la zone de déclenchement (*ou vérifiez s'il l'est*)
Et voilà ! L'action est déclenchée automatiquement toutes les 12 heures !

## Comment ça fonctionne
**Après avoir correctement défini tous les arguments, assurez-vous que le timer est activé.**
> Il est défini sur 12h par défaut, donc toutes les 12h il vérifiera si une nouvelle vidéo est publiée, et si c'est le cas, un nouveau message est envoyé à votre Discord via webhook !
**Pourquoi un timer de 12h ?**
> Eh bien, c'est un choix purement arbitraire de ma part, ne connaissant pas votre rythme de publication, j'ai choisi de couvrir une large plage horaire avec 2 vérifications par jour. Mais vous êtes complètement libre de modifier ce timer pour l'adapter à vos besoins.
> Cependant, si utiliser un timer ne vous convient pas, vous pouvez déclencher cette action en utilisant le [Date Time trigger](https://tawmae.github.io/date_time_trigger.html) de tawmae

:::info
Note : J'ai oublié de dire ; lorsque votre projet API est ouvert et que vous avez créé une clé, n'oubliez pas d'ajouter la bibliothèque [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com?authuser=1&project=polished-leaf-436613-t3&supportedpurview=project) !
Plus d'informations ici ! https://developers.google.com/youtube/v3/getting-started
:::