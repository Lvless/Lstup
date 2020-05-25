// Fonction en cliquant sur les boutons -----------------////////
function changeDate(date_2009){
    d3.selectAll("rect")
      .transition()
      .duration(2000)
      .style("fill", color)
  }
  
  function changeDate(date_2010){
  
  }
  
  function changeDate(date_2011){
  
  }
  function changeDate(date_2012){}
  function changeDate(date_2013){}
  function changeDate(date_2014){}
  function changeDate(date_2015){}
  function changeDate(date_2016){}
  function changeDate(date_2017){}
  function changeDate(date_2018){}
  function changeDate(date_2019){}
  
  

  


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