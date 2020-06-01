//CODE EN COURS (27/5)

//30/5 TEST DIFFERENTES COMBINAISONS DU CODES ( inspiration prof etc)
//1/6 : Essai resoudre  ERREUR : Uncaught TypeError: Cannot read property 'selectAll' of undefined, pareil avec map 
//			-> lstupData et barres is undefined -> PK ?!

// Paramètres des visualisations
const margin = {top: 40, right: 20, bottom: 100, left: 100}; // marge
const width = 760 - margin.left - margin.right; // largeur
const height = 500 - margin.top - margin.bottom; // hauteur
const color = '#9DC209'; // couleur pistache

/////////////////////////////
// VARIABLES qui peuvent être utilisées dans tout le script
//Données 
let lstupData;

let currentDate = 2019;

// Groupe D3
let barres;
let titres;

// Echelles D3
let echelleX;
let echelleY;
let echelleCouleur; // pannel de couleurs
let trans; // transition

///////////////////////////////////
function setup() { //fonction qui va demarrer le script ->ordre : chargement données -> mise en place de la visualisation
	loadData();

	setupLstup();
}


////////////////////////////////////////////////////
///////////////////////////////////////////////////


///////////////////////////////////
//Fonction de chargement des données -> PROMISE ->.then on Data loaded
function loadData() {
	d3.dsv(',', 'data/DATA_LSTUP09-19_TOP15.csv', function (d) {
		return {
			date: d.date,
			substance: d.substance,
			valeur: parseFloat(d.valeur)
		}
	}).then(onDataLoaded);
}

/////////////////////////////////////
//Données chargées lorsque la PROMISE est remplie
function onDataLoaded(data) {

	lstupData = data; // données reçues sont injectées dans la variable lstupData

	graphLstup(2019); // données injectées dans la visualisation, 1 parametre
}

//////////////----FONCTION DE SETUP-----////////////////////////////////////////////////
//// Mise en place des éléments stables executé qu'une seule fois (svg, echelles,groupes svg, axes, )
function setupLstup() {
	
	// Création CANEVAS SVG + ajout dans le "body" de la page HTML
	const svg = d3.select(".maViz") // nom de ma visualisation sur index.html
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr('style', 'font: 10px sans-serif') // AJOUT (29/5)


	// Création de l'échelle horizontale X
	echelleX = d3.scaleBand() //échelle ordinnale à bandes 
				.domain(lstupData.map(d => d.substance))  // PK ERREUR ?! (29/5)
				.range([0, width - margin.right]) // cela permet d'arranger les substances dans la largeur (-marge à droite)
				.padding(0.1) //marge entre les barres
				.round(true);

	// Création de l'échelle verticale Y
	echelleY = d3.scaleLinear()
				.domain([0, d3.max(lstupData, d => d.valeur)]) // max valeur selon doc csv
				.range([ height, 0 ]) // intervale de sortie de l'échelle. Le min c'est la hauteur, le max c'est 0, car vertical
				.interpolate(d3.interpolateRound); // AJOUT (29/5)

	// Création échelle de couleur
	echelleCouleur = d3.scaleQuantile()
                     .range(['#ffc388','#ffb269','#ffa15e','#fd8f5b','#f97d5a','#f26c58','#e95b56','#e04b51','#d53a4b','#c92c42','#bb1d36','#ac0f29','#9c0418','#8b0000']);


	// Création de groupes SVG pour les barres et titres du graphique
	barres = svg.append('g');
	titres = svg.append('g')
				.style('fill', 'black')
				.style("text-anchor", "start");

	// Création de l'axe horizontal + placement du texte
	svg.append('g')
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(echelleX)) //placement axe X ici avec methode "call"

		.selectAll('text')
		.attr("y", 9)
		.attr("x", 9)
		.attr("dy", ".35em")
		.attr("transform", "rotate(45)")
		.style("text-anchor", "start")

		.call(g => g.select('.domain').remove()); 

	// Création de l'axe vertical
	svg.append('g')
		.attr('tranform', `translate(0, ${margin.left}, 0)`)
		.call(d3.axisLeft(echelleY))
		
		.call(g => g.select('.domain').remove());

	//slider
	d3.select('#date').on('input', function() {
		const date = d3.event.target.value;
		currentDate = parseInt(date)
		d3.select('.current_date').text(currentDate)
		graphLstup();
	})
}

////////////////---FONCTION D'AFFICHAGE/RAFRAICHISSEMENT---///////////////////////////////////////////
// graphLstup -> permet le "rafraichissement des données lors du input"
function graphLstup(date) {

	// Filtrer les données pour isoler l'année choisie
	const dataFiltres = lstupData.filter(d => d.date === currentDate);

	// Barres
	barres.selectAll('rect') //selectionne tous les rectangles DOM
		.data(dataFiltres) // données lstup
		.join('rect') // fait enter, update, remove en 1 fois
			.attr('width', echelleX.bandwidth()) // largeur des barres suivant echelle X
			.attr("height", d => echelleY(0) - echelleY(d.valeur)) // hauteur des barres suivant echelle y
			.attr("x", d => echelleX(d.substance)) // création des barres en fonction de la substance
			.attr("y", d => echelleY(d.valeur))
			.attr("fill", d => echelleCouleur(d.valeur));

	trans = d3.transition()
			.duration(1500);

	// Titres
	titres.selectAll('text')
			.data(dataFiltres)
			.join('text')
				.attr('dy', '0.35em')
				.attr('dx', `${echelleX.bandwidth() / 2}`)
				.attr('x', d => echelleX(d.substance)) // affiche les valeurs au dessus des barres
				.attr('y', d => echelleY(d.valeur)) // affiche les valeurs au dessus des barres
				.style('font-size', '12px')
				.text(d => d.valeur)
				.attr('transform', d => `rotate(-45 ${echelleX(d.substance)} ${echelleY(d.valeur)})`); // rotation du texte ici


}


// Lancement du script
setup();
