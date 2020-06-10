//-------LOG:
//Script graphique SIMPLE
// 06/5 : pas encore trouvé comment afficher graph avec mes données -> bug avec la partie données,
// 07/5 :  ABANDON TRUC CIRCULAIRE POUR LE MOMENT : 
//          ESSAI DE FAIRE UN BARPLOT SIMPLE ET QUE CA UTILISE MES DONNEES 
//          -> TJ PAS REUSSI !! CA NE VEUT PAS UTILISER MON CSV... PK ?!
// 08/5 :----> Ajouter [data].map a aidé pour utiliser les données, mais mnt faut les presenter juste
// 12/05 : données ajoutées, mais elles se superposent -> reregarder  vidéo prof sur CSV 
// -------------------------
//17/05 : Trouver si vaut mieux utiliser script avec csv par csv (2009 ,2010 etc)ou un fichier avec tout (2009-2019) 
//        et consequence du onclick des buttons: lancer chaque fois un nouvel script avec le click ( ex: onclick 2009 -> script affiche graphique 2009) ou un script qui prevoit tout??
//19/05 : PROBLEME : Données se placent du côté gauche et slm une barre est affichée -> peut être plus joli si affiché horizontalement ?
//23/05 : comprendre fonctionnement bouton
//24/05 : comprendre fonctionnement bouton
//25/05 : Regarder correction prof ( -> script main ) + comprendre 
// -> Mon erreur: pas separation en barre, tout se superposait
//_____________________________________________________________________________ 
//_____________________________________________________________________________

/////////////////////////////
// CORRECTIONS PROF//////////
///////////////////////////////

// Dimensions et marges du graph
const margin = {top: 40, right: 20, bottom: 100, left: 100}; // marge
const width = 760 - margin.left - margin.right; // largeur
const height = 500 - margin.top - margin.bottom; // hauteur
const color = '#9DC209'; // couleur pistache

  //permet d'acceder aux valeurs plus facilement:
const xSubst = d => d.substance 
const yValeur = d => d.valeur



///////////////////////////////////////////////////////////////
// CANEVAS SVG + ajout dans le "body" de la page HTML
const svg = d3.select("#maViz") // nom de ma visualisation sur index.html
              .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


///////////////////////////////////////////////////////////////
// DONNEES
const data = d3.csv("data/DATA_LSTUP09V2.csv", function(d){ // PROMISE de données -> .then
  return {
    substance: d.substance,
    valeur: parseFloat(d.valeur) // "valeur" passée de string à float (nombre)
  }
}).then(function(data){
  console.log(data);



///////////////////////////////////////////////////////////////
// ECHELLE X "-" : substances ---------------------------
const x = d3.scaleBand() //échelle ordinnale à bandes 
            .domain(data.map(xSubst))  
            .range([0, width - margin.right]) // cela permet d'arranger les substances dans la largeur (-marge à droite)
            .padding(0.1) //marge entre les barres
            .round(true)

  // Placement texte sur axe x
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)) //placement axe X ici avec methode "call"

      .selectAll("text")
      .attr("y", 9)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start")


///////////////////////////////////////////////////////////////
// ECHELLE verticale Y ("|") : valeurs ---------------------------
const y = d3.scaleLinear()
            .domain([0, d3.max(data, yValeur)]) // max valeur selon doc csv
            .range([ height, 0 ]) // intervale de sortie de l'échelle. Le min c'est la hauteur, le max c'est 0, car vertical

  // placement valeurs sur axe y

  //placement axe Y
  svg.append('g')  
      .attr('tranform', `translate(0, ${margin.left}, 0)`)
      .call(d3.axisLeft(y))


///////////////////////////////////////////////////////////////
// Création de groupes SVG pour les barres et titres du graphique
Barres = svg.append('g');
Titres = svg.append('g')
              .style('fill', 'black')
              .style("text-anchor", "start")


///////////////////////////////////////////////////////////////
// Création des rectangles DOM, séparation en barres en fonction des données--------------------------
Barres.selectAll('rect') //selectionne tous les rectangles DOM
      .data(data) // ajout des données
      .join('rect') //il faut fixer la taille des rectangles/barres
        .attr('width', x.bandwidth()) // largeur des barres suivant echelle X
        .attr("height", d => y(0) - y(yValeur(d)) ) // hauteur des barres suivant echelle y
        .attr("x", d => x(xSubst(d))) // création des barres en fonction de la substance
        .attr("y", d => y(yValeur(d)))
        .attr("fill", color)


///////////////////////////////////////////////////////////////
// Titres
Titres.selectAll('text')
	    .data(data)
      .join('text')

      .attr('dy', '0.35em')
      .attr('dx', `${x.bandwidth() / 2}`)
      .attr('x', d => x(xSubst(d))) // affiche les valeurs au dessus des barres
      .attr('y', d => y(yValeur(d))) // affiche les valeurs au dessus des barres
      .style('font-size', '12px')
      .text(yValeur)
      .attr('transform', d => `rotate(-45 ${x(d.substance)} ${y(d.valeur)})`) // rotation du texte ici

})



//////////////////////////////////WIP/////////////////////////////////////////////////////////////
//LOAD ONClick BUTTON FUNCTION : en cours -> pas encore opérationnel
