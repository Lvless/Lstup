//SCRIPT QUI NE FONCTIONNE PAS COMME IL FAUT
//25/05 : Regarder correction prof ( -> script main ) + comprendre fonctionnement bouton

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
const data = d3.csv("data/DATA_LSTUP09V2.csv", function(d){ // promesse de données
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
              .style("text-anchor", "end") // 


// Création des rectangles DOM -> séparation en barres en fonction des données--------------------------
Barres.selectAll('rect') //selectionne tous les rectangles DOM
      .data(data) // ajout des données
      .join('rect') //il faut fixer la taille des rectangles/barres
        .attr('width', x.bandwidth()) // largeur des barres
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
