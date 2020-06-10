//CODE EN COURS (27/5)
// ERREUR : Uncaught TypeError: Cannot read property 'selectAll' of undefined, pareil avec map

//TEST DIFFERENTES COMBINAISONS DU CODES

// Paramètres des visualisations
const margin = {top: 40, right: 20, bottom: 100, left: 100}; // marge
const width = 760 - margin.left - margin.right; // largeur
const height = 500 - margin.top - margin.bottom; // hauteur
const color = '#9DC209'; // couleur pistache

/////////////////////////////
// VARIABLES qui peuvent être utilisées dans tout le script
//Données 
let lstupData;

// Groupe D3
let barres;
let titres;

// Echelles D3
let echelleX;
let echelleY;

///////////////////////////////////
function setup() { //ordre du setup -> chargement données -> mise en place de la visualisation
	loadData();

	setupLstup();
}


////////////////////////////////////////////////////
///////////////////////////////////////////////////


///////////////////////////////////
//Fonction de chargement des données -> PROMISE ->.then on Data loaded
function loadData() {
	d3.csv('data/DATA_LSTUP09-19_TOP15.csv', function (d) {
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

	lstupData = data;

	graphLstup(2009);
}

//////////////----FONCTION DE SETUP-----////////////////////////////////////////////////
//// Mise en place des éléments stables
function setupLstup() {
	
	// Création CANEVAS SVG + ajout dans le "body" de la page HTML
	const svg = d3.select("#maViz") // nom de ma visualisation sur index.html
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr('style', 'font: 10px sans-serif'); // AJOUT (29/5)

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
}

////////////////---FONCTION D'AFFICHAGE/RAFRAICHISSEMENT---///////////////////////////////////////////
// graphLstup -> permet le "rafraichissement des données lors du input"
function graphLstup(date) {

	// Filtrer les données pour isoler l'année choisie
	const data = lstupData.filter(d => d.date === date);

	// Barres
	barres.selectAll('rect') //selectionne tous les rectangles DOM
		.data(data) // données lstup
		.join('rect') //il faut fixer la taille des rectangles/barres
			.attr('width', echelleX.bandwidth()) // largeur des barres suivant echelle X
			.attr("height", d => echelleY(0) - echelleY(d.valeur) ) // hauteur des barres suivant echelle y
			.attr("x", d => echelleX(d.substance)) // création des barres en fonction de la substance
			.attr("y", d => echelleY(d.valeur))
			.attr("fill", color);


	// Titres
	titres.selectAll('text')
			.data(data)
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
