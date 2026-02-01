<!-- Insérer une nouvelle entrée ici -->

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

***

# EXEMPLE DE FORMAT

[MM-DD-YY] # Nom du projet (version)
* Corrigé :
  • Description
+ Added:
  • Description
~ Changed:
  • Description
- Removed:
  • Description

**Impact**: Summary of impact
