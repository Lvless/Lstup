// Paramètres de la visualisation
const width = 600;
const height = 200;
const margin = { top: 20, right: 0, bottom: 0, left: 20 };
const color = 'steelBlue';

// Données
const fruits = [
  { name: "🍊", count: 21 },
  { name: "🍇", count: 13 },
  { name: "🍏", count: 8 },
  { name: "🍌", count: 5 },
  { name: "🍐", count: 3 },
  { name: "🍋", count: 2 },
  { name: "🍎", count: 1 },
  { name: "🍉", count: 1 }
];

// Créer l'élément SVG et le configurer
const svg = d3.select('body')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .attr('style', 'font: 10px sans-serif')

// Créer l'échelle horizontale (fonctions D3)
const x = d3.scaleLinear()
            .domain([0, d3.max(fruits, d => d.count)])
            .range([margin.left + 5, width - margin.right])
            .interpolate(d3.interpolateRound)

// Créer l'échelle verticale (fonctions D3)
const y = d3.scaleBand()
            .domain(fruits.map(d => d.name))
            .range([margin.top, height - margin.bottom])
            .padding(0.1)
            .round(true)

const teinte = d3.scaleSequential()
                 .domain([0, d3.max(fruits, d => d.count)])
                 .interpolator(d3.interpolateBlues)

// Ajouter les barres
svg.selectAll('rect')
     .data(fruits)
     .enter()
     .append('rect')
     .attr('width', 0) // sera animé
     .attr('height', y.bandwidth())
     .attr('x', x(0))
     .attr('y', d => y(d.name))
     .style('fill', d => teinte(d.count))
     .transition()
       .duration(1000)
       .attr('width', d => x(d.count) - x(0))

// Ajouter les titres
svg.append('g')
   .attr('text-anchor', 'end')
   .attr('transform', `translate(-6, ${y.bandwidth() / 2})`)
   .selectAll('text')
     .data(fruits)
     .enter()
     .append('text')
     .attr('dy', '0.35em')
     .attr('x', 0)
     .attr('y', d => y(d.name))
     .style('fill', d => d3.lab(teinte(d.count)).l < 60 ? "white" : "black")
     .text(d => d.count)
     .transition()
       .duration(1000)
       .attr('x', d => x(d.count))

// Ajouter l'échelle horizontale
svg.append('g')
   .attr('transform', `translate(0, ${margin.top})`)
   .call(d3.axisTop(x))
   .call(g => g.select('.domain').remove())

// Ajouter l'échelle verticale
svg.append('g')
   .attr('transform', `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(y))
   .call(g => g.select('.domain').remove())

// Source: https://observablehq.com/@d3/learn-d3-scales