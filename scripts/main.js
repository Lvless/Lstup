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
// ->ex :
//  ___________   _____________
// |ANNEE 2009|   |Année 2010 |     etc
//  ----------    -------------
//
//  subs1 |-------------
//  subs2 |-----
//  subs3 |----------------
//  subs4 |------------
//   ...  |_____________________

//_____________________________________________________________________________ 


// Dimensions et marges du graph
const margin = {top: 30, right: 30, bottom: 70, left: 60}; // marge
const width = 460 - margin.left - margin.right; // largeur
const height = 400 - margin.top - margin.bottom; // hauteur
const color = '#a269b3'; // couleur violet


/////////////////////////////////////////////////////////

// Canevas SVG + ajout dans le "body" de la page HTML
const svg = d3.select("#maViz") // nom de ma visualisation sur index.html
              .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/////////////////////////////////////////////////////////

// Données
const data = d3.csv("data/DATA_LSTUP09V2.csv", function(d){
  return {
    substance: d.substance,
    valeur: parseFloat(d.valeur)
  }
}).then(function(data){
  console.log(data);
/////////////////////////////////////////////////////////


// ECHELLE X "-" : substances ---------------------------
const x = d3.scaleBand() //échelle ordinnale à bandes
            .domain([data].map(d => d.substance)) // données -> prendre substance en x, array donc [] 
            .range([ 0, width ])
            .padding(0.1) //marge entre les barres
            .round(true)

  // Placement texte sur axe x
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)) //placement axe X ici avec methode "call"

  



///////////////////////////////////////////////////////

// ECHELLE Y "|" : valeurs ---------------------------
const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.valeur)]) // max valeur selon doc csv
            .range([ height, 0 ]) // intervale de sortie de l'échelle

  // placement valeurs sur axe y


  //placement axe Y
svg.append('g')  
    .attr('tranform', `translate(0, ${margin.left}, 0)`)
    .call(d3.axisLeft(y))


/////////////////////////////////////////////////////

	// Création de groupes SVG pour les barres et titres du graphique
	Barres = svg.append('g');
	Titres = svg.append('g')
              .style('fill', 'black')
              .attr("transform", "translate(-10,0)", "rotate(-45)") // rotation du texte, fonctionne pas..
              .style("text-anchor", "end")


// Barres--------------------------
Barres.selectAll('rect')
      .data(data)
      .join('rect')
        .attr('width', x.bandwidth())
        .attr("height", d => y(0) - y(d.valeur) ) // hauteur des barres
        .attr("x", d => x(d.substance))
        .attr("y", d => y(d.valeur))
        .attr("fill", color)

	// Titres
Titres.selectAll('text')
	    .data(data)
      .join('text')

			.attr('dy', '0.35em')
			.attr('x', d => x(d.substance))
			.attr('y', d => y(d.valeur))
			.text(d => d.substance);

////////////////////////////////////////////////////

})




//LOAD ONClick BUTTON FUNCTION : en cours
