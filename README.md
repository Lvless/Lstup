# Lstup : Loi sur les stupéfiants (LStup): Infractions de consommation pour 15 substances

Projet pour le cours de visualisation des données 2020:

---
Loi sur les stupéfiants (LStup): Infractions de consommation pour 15 substances (entre 2009 et 2019):

Données trouvées sur le site de l'OFS (https://www.bfs.admin.ch/bfs/fr/home.assetdetail.11147626.html )


-----------------------------------------------
ETAPES REALISATION (LOG)

Avril : Recherche idées
5.05 : début conception, difficultés ajout boutons sur page HTML 

6.05 : Ajout boutons. Recherche bon modèle pour graphique

7.05 : Difficulté ajout données

8.05 : Réussite ajout données

11.05 : recherche bonne forme pour le graph

12.05 : Difficulté bonne présentation données-> choix de selection certaines substances et leur évolution  de 2009 -2019

15.05 : Essai avec vidéos du prof

17.05 : pas encore résolu

19.05 : regarder new tutos prof + essayer de comprendre comment utiliser données

23.05 : comprendre fonctionnement bouton + voir si possible d'afficher le "total" en haut ( pas dans graphique)

24.05 : Pas fini, continuer + regarder exemple fini prof

25.05 : Regardé correction prof, essai de rendre la page + esthétique -> dm : comprendre boutons

29 + 30.5 + 1.6 : Essai refactoring script ( inspiration tuto prof) -> ERREUR : Uncaught TypeError: Cannot read property 'selectAll' of undefined, pareil avec map

4/6 -> essai deplacer setupLstup dans onDataLoaded -> axe affiché mais pas les barres
- Problème encore avec l'axe des valeurs -> solution: d.date === currentDate.toString()

4.6 - 7.6 : paufiner:
- afficher total chaque année cliquée 
- faire des transitions lors du changement de date ( la collone/barre redescend etc)
- voir esthétisme page (changer charactères/police etc)
- faire GitHub pages (vidéo s10)


TO DO (70% FINI):
26.05 - 07.06 : 
- comprendre comment rafraichir les données (avec les fonctions ) -> ok
- Comprendre fonctionnement bouton/SLIDER -> vidéo -> ok
- rendre SLIDER fonctionnel -> ok
