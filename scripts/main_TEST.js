
//Script test avec tutos

// variables config pour la visualisation

const height = 200;
const width = 600;
const margin = {top : 20, right: 0, bottom: 0, left: 20};
const color = 'steelblue';


// Données CVS

const lstup = d3.csv("data/DATA_LSTUP09-19_TOP15.csv", function(d) {
    return {
        date: d.data,
        substance: d.substance,
        nombre_infr: parsefloat(d.valeur)
    };
  })


// Canevas SVG
const svg = d3.select('#maViz')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('style', 'font: 10x sans-serif')

const x = d3.scaleLinear()
            .domain([0, d3.max(lstup, d=> d.count)])

const y = d3.scaleBand()
            .domain(lstup.map(d=> d.name))
            .range([margin.top, height - margin.bottom])
            
svg.append('g')
    .style('fill', color)
    .selectAll('rect')
    .data(lstup)
    .enter()
    .append('rect')
    .attr('width', width)
    .attr('height', 20)
    .attr('x', 0)
    .attr('y', 0)
