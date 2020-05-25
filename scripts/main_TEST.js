//MAIN TEST AVEC CORRECTIONS PROF - 25/05
//->comprendre corrections + comprendre boutons
//_______________________________________________ 


// Dimensions et marges du graph
const margin = {top: 30, right: 30, bottom: 70, left: 60}; // marge
const width = 460 - margin.left - margin.right; // largeur
const height = 400 - margin.top - margin.bottom; // hauteur
const color = '#9DC209'; // couleur pistache


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
const data = d3.csv("data/DATA_LSTUP09-19_TOP15.csv", function(d){
  return {
    substance: d.substance,
    valeur: parseFloat(d.valeur) 
  }
}).then(function(data){
  console.log(data);
/////////////////////////////////////////////////////////


// ECHELLE X "-" : substances ---------------------------
const x = d3.scaleBand() //échelle ordinnale à bandes
            .domain(data.map(d => d.substance)) // données -> prendre substance en x, array donc [] 
            .range([0, width - margin.right])
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
              .style("text-anchor", "start")


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
      .attr('dx', `${x.bandwidth() / 2}`)
      .attr('x', d => x(d.substance))
      .attr('y', d => y(d.valeur))
      .style('font-size', '12px')
      .text(d => d.valeur)
      .attr('transform', d => `rotate(-45 ${x(d.substance)} ${y(d.valeur)})`) // rotation du texte

////////////////////////////////////////////////////
})




//LOAD ONClick BUTTON FUNCTION : en cours
// A function that create / update the plot for a given variable:

const button = d3.select("body")
                  .append("div")
                  .attr("class", "changeDate")
                  .selectAll("div")
                  .data(date)
                  .enter()
                  .append("div")
                  .text(function(d) {
                    return d;
                  })
buttons.on("click", function(d) { /// effet lors de du click sur le bouton
  d3.select(this)
    .transition()
    .duration(500)
    .style("background", "LightBlue")
    .style("color", "White");


})