# Lstup : Loi sur les stupéfiants (LStup): Infractions de consommation pour 15 substances

Projet pour le cours de visualisation des données 2020:  https://Lvless.github.io/Lstup/

---
Loi sur les stupéfiants (LStup): Infractions de consommation pour 15 substances (entre 2009 et 2019):

Données trouvées sur le site de l'OFS (https://www.bfs.admin.ch/bfs/fr/home.assetdetail.11147626.html )

Ce graphique affiche le nombre de cas de consommation rapportées à l'OFSP par année et par substance.
J'ai reduit le nombre total à 15 substances qui ressortaient des fichiers de l'OFSP pour bien illustrer le "top 15" des substances "les plus consommées de 2009 à 2019" ( du moins celles qui ont fait l'objet d'une poursuite judiciaire)

Cela permet de visualiser que des substances comme le marijuana sont largement au dessus des autres et également l'apparition, dès 2018, de substances de synthèse.

________________________________________________________________________________________________
Je joins ici mon journal (LOG) recensant les étapes de la réalisation et les difficultés rencontrés:

Avril : Recherche idées
5.05 : début conception, difficultés ajout boutons sur page HTML 
6.05 : Ajout boutons. Recherche bon modèle pour graphique
7.05 : Difficulté ajout données
8.05 : Réussite ajout données
11.05 : recherche bonne forme pour le graph
12.05 : Difficulté bonne présentation données-> choix de selection certaines substances et leur évolution  de 2009 -2019
15.05 + 17.05 : pas encore résolu
10.05 - 23.05 : comprendre fonctionnement bouton + voir si possible d'afficher le "total" en haut ( pas dans graphique)
24.05 - 25.05 : Regardé correction du professeur, essai de rendre la page + esthétique 
29.05 + 30.5 + 1.6 : Essai refactoring script ( inspiration tuto prof) -> ERREUR : Uncaught TypeError: Cannot read property 'selectAll' of undefined, pareil avec map
4.06 - 7.06 -> essai deplacer setupLstup dans onDataLoaded -> axe affiché mais pas les barres
        - Problème encore avec l'axe des valeurs -> solution: d.date === currentDate.toString()
        - comprendre comment rafraichir les données (avec les fonctions ) -> ok
        - Comprendre fonctionnement bouton/SLIDER -> vidéo -> ok
        - rendre SLIDER fonctionnel -> ok
        - faire des transitions lors du changement de date ( la collone/barre redescend etc)-> ok
8.06 - 9.06 : changement format graphique car données trop rognées si graphique vertical

10.06 : 
- couleur selon intensité -> ok
- bon placement du texte -> ok
- voir esthétisme page (changer charactères/police etc) - Ok
- afficher total chaque année cliquée (?)
- faire GitHub pages (vidéo s10) -> pour le moment ça bug


---75% FINI---
