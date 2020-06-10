//CODE GRAPH HORIZONTAL

// Paramètres des visualisations
const margin = {top: 50, right: 0, bottom: 0, left: 135}; // marge
const width = 800 - margin.left - margin.right; // largeur
const height = 500 - margin.top - margin.bottom; // hauteur

/////////////////////////////
// VARIABLES qui peuvent être utilisées dans tout le script
//Données 
let lstupData;

let currentDate = 2019;

// Groupe D3
let barres;
let titres1;
let titres2;

// Echelles D3
let echelleX;
let echelleY;
let echelleCouleur; // pannel de couleurs
let trans; // transition

//Données TOTAL
let totalData = [
{date:2009, Total:43272},
{date:2010, Total:44071},
{date:2011, Total:43711},
{date:2012, Total:44789},
{date:2013, Total:45905},
{date:2014, Total:37602},
{date:2015, Total:37799},
{date:2016, Total:38519},
{date:2017, Total:37488},
{date:2018, Total:35728},
{date:2019, Total:34518}
];
///////////////////////////////////
function setup() { //fonction qui va demarrer le script ->ordre : chargement données -> mise en place de la visualisation
	loadData();


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

	lstupData = data; // données reçues sont injectées dans la variable lstupData
	setupLstup()
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


	// Création de l'échelle horizontale X (valeurs) [---]
	echelleX = d3.scaleLinear()
				.domain([0, d3.max(lstupData, d => d.valeur)]) // max valeur selon doc csv
				.range([margin.left, width - margin.right]) 



	// Création de l'échelle verticale Y ( titres) [ | ]
	echelleY = d3.scaleBand() //échelle ordinnale à bandes 
				.domain(lstupData.map(d => d.substance))
				.range([height - margin.bottom, margin.top]) // cela permet d'arranger les substances dans la hauteur, commençant par le bas
				.padding(0.05) //marge entre les barres
				.round(true);


	// Création échelle de couleur 
	echelleCouleur = d3.scaleQuantile()
					.domain([0, d3.max(lstupData, d => d.valeur)])
                    .range(['#ffc388','#ffb269','#ffa15e','#fd8f5b','#f97d5a','#f26c58','#e95b56','#e04b51','#d53a4b','#c92c42','#bb1d36','#ac0f29','#9c0418','#8b0000']);


	// Création de groupes SVG pour les barres et titres du graphique
	barres = svg.append('g');
	titres = svg.append('g')
				.style('fill', 'black')
				.style("text-anchor", "start") // ancrage du text-valeur 
				.attr('transform', `translate(6, ${echelleY.bandwidth() / 2})`) //placement text-valeur



	//Création de l'axe horizontal + placement valeurs de l'échelle
	svg.append('g')
		.attr("transform", `translate(0,${height - margin.bottom})`) //axe en bas
		.call(d3.axisBottom(echelleX)//placement axe X ici avec methode "call" + valeurs
			.tickSize(-400)) //prolongement des ticks
			.attr("opacity",".10") //transparence des ticks
		.call(g => g.select('.domain').remove)
	

	// // Création de l'axe vertical + placement du texte de l'échelle
	svg.append('g')
		.attr('tranform', `translate(${width - margin.left}, 0)`)
		.call(d3.axisLeft(echelleY))
		.call(g => g.select('.domain').remove()) // enlève ligne
		.selectAll('text')
			.attr("y", 45) // alignement avec les barres
			.attr("x", 120) // placement axe x, pas trop collé aux barres
			.attr("dy", ".30em")
			.attr("transform", "rotate(-20)")
			.style("text-anchor", "end")
			.style("font-weight","700")
		

	//slider
	d3.select('#date').on('input', function() {
		const date = d3.event.target.value;
		currentDate = parseInt(date)
		d3.select('.current_date').text(currentDate)
		totalData = parseInt(totalData)
		d3.select('totalYear').text(totalData)
		graphLstup();
	})
//// ICI -> ESSAI AFFICHER TOTAL


}

////////////////---FONCTION D'AFFICHAGE/RAFRAICHISSEMENT---///////////////////////////////////////////
// graphLstup -> permet le "rafraichissement des données lors du input"
function graphLstup(date) {

	// Filtrer les données pour isoler l'année choisie
	const dataFiltres = lstupData.filter(d => d.date === currentDate.toString());

	// Barres
	barres.selectAll('rect') //selectionne tous les rectangles DOM
		.data(dataFiltres) // données lstup
		.join('rect') // fait enter, update, remove en 1 fois
			.attr('width', d => echelleX(d.valeur) - echelleX(0)) // largeur des barres suivant echelle X
			.attr("height", echelleY.bandwidth()) // hauteur des barres suivant echelle y
			.attr("x", echelleX(0))
			.attr("y", d => echelleY(d.substance)) // création des barres en fonction de la substance
			.attr("fill", d => echelleCouleur(d.valeur))
			.style("opacity", 0.6) // transparence

	trans = d3.transition()
			.duration(1500);

	// Titres
	titres.selectAll('text')
		.data(dataFiltres)
		.join('text')
			.attr('x', d => echelleX(d.valeur)) 
			.attr('y', d => echelleY(d.substance))
			.text(d => d.valeur)
			.attr('dy', '0.35em') // placement texte
			.attr('dx', `${echelleX.bandwidth() / 2}`)
			.style('font-size', '9px')
			.attr('transform', d => `rotate(-30 ${echelleY(d.substance)} ${echelleX(d.valeur)})`); // rotation du texte ici
			


	

}


// Lancement du script
setup();
