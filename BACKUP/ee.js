
//30/5 -> SCRIPT TEST D'AUTRES SOLUTIONS


// Paramètres des visualisations
const margin = {top: 40, right: 20, bottom: 100, left: 100}; // marge
const width = 760 - margin.left - margin.right; // largeur
const height = 500 - margin.top - margin.bottom; // hauteur
const color = '#9DC209'; // couleur pistache


const svg = d3.select("#maViz") // nom de ma visualisation sur index.html
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr('style', 'font: 10px sans-serif') // AJOUT (29/5)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



	// Création de l'échelle horizontale X
const echelleX = d3.scaleBand() //échelle ordinnale à bandes 
				.domain(lstupData.map(d => d.substance))  // PK ERREUR ?! (29/5)
				.range([0, width - margin.right]) // cela permet d'arranger les substances dans la largeur (-marge à droite)
				.padding(0.1) //marge entre les barres
				.round(true);

	// Création de l'échelle verticale Y
const echelleY = d3.scaleLinear()
				.domain([0, d3.max(lstupData, d => d.valeur)]) // max valeur selon doc csv
				.range([ height, 0 ]) // intervale de sortie de l'échelle. Le min c'est la hauteur, le max c'est 0, car vertical
				.interpolate(d3.interpolateRound); // AJOUT (29/5)

const colour_scale = d3.scaleQuantile()
                        .range(['#ffc388','#ffb269','#ffa15e','#fd8f5b','#f97d5a','#f26c58','#e95b56','#e04b51','#d53a4b','#c92c42','#bb1d36','#ac0f29','#9c0418','#8b0000']);

svg.append('g') // ajout axe x
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');

svg.append('g') // ajout axe y
    .attr('class', 'y axis');

const axeY = d3.axisLeft(echelleY);
const axeX = d3.axisBottom(echelleX);


function update(date) {
    d3.csv('data/DATA_LSTUP09-19_TOP15.csv', function(error, data) {
        if (error) { // inclure indication si data pas chargée -> erreur
            throw error; }
        
        
        const trans = d3.transition()
        .duration(1500);
        

        const substance = lstup_data.map(function(d) {
            return d.subtance;
        });

        echelleX.domain(substance);
        

        const max_valeur = d3.max(lstup_data, function(d) {
            return d.valeur;
        });

        echelleY.domain([0, max_valeur]);

        colour_scale.domain([0, max_valeur]);
        
        
        const barres = svg.selectAll('.bar')
        .data(lstup_data);
        
        //exit
        barres
        .exit()
        .remove();
        
        //enter
        const new_barres = barres
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('height', 0)
        .attr('y', height)
        .attr('width', echelleX.bandwidth());
        
        //update
        new_barres.merge(barres)
        .transition(trans)
        .attr('x', function(d) {
            return x_scale(d.month);
        })
        .attr('y', function(d) {
            return echelleY(d.valeur);
        })
        .attr('height', function(d) {
            return height - echelleY(d.valeur);
        })
        .attr('fill', function(d) {
            return colour_scale(d.valeur);
        });
        
        svg.select('.x.axis')
        .transition(trans)
        .call(axeX);
        
        svg.select('.y.axis')
        .transition(trans)
        .call(axeY);
        
    })
}

const select = d3.select('#date');
select.on('change', function() {
    console.log(this.value);
    update(this.value);
})

update('2014');
