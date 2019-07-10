// Get data
var data = d3.csvParse(iris, d3.autoType)

//measuremets
var width = 440, height = 440, margin = 30
var w = width-margin
var h = height-margin
// var min = 0
// var max = 15

const min = d3.min(data.map(d=>d3.min([d.SepWid,d.SepLen,d.PetLen,d.PetWid])))
const max = d3.max(data.map(d=>d3.max([d.SepWid,d.SepLen,d.PetLen,d.PetWid])))

//scaling as per chart size
var xSepWid = d3.scaleLinear()
  //.domain([0, d3.max(data,d=>d.SepWid)])
  .domain([min, max])
  .range([margin,w])

var ySepLen = d3.scaleLinear()
  //.domain([0, d3.max(data,d=>d.SepLen)])
  .domain([min, max])
  .range([h,margin])

var xPetWid = d3.scaleLinear()
  //.domain([0, d3.max(data,d=>d.PetWid)])
  .domain([min,max])
  .range([w,margin])

var yPetLen = d3.scaleLinear()
  //.domain([0, d3.max(data,d=>d.PetLen)])
  .domain([min, max])
  .range([margin,h])

var cScale = d3.scaleOrdinal(d3.schemeCategory10)
  .domain(data.map(d=>d.Species))

//Select the div in which you want to create charset
var chart = d3.select("#vis")
              .data(data)
              .append("svg")
              .attr("width",width)
              .attr("height",height)

//Draw the data mark 1
            var vis = chart.selectAll("circle")
              .data(data)
              .enter()

              vis.append("circle")
                    .attr("cx",d=>xSepWid(d.SepWid))
                    .attr("cy",d=>ySepLen(d.SepLen))
                    .attr("r","2px")
                    .style("fill",d=>cScale(d.Species))
                    .style("opacity","0.3")

              vis.append("circle")
                    .attr("cx",d=>xPetWid(d.PetWid))
                    .attr("cy",d=>yPetLen(d.PetLen))
                    .attr("r","2px")
                    .style("fill","none")
                    .style("stroke-width","2px")
                    .style("stroke",d=>cScale(d.Species))

              vis.append("line")
                    .attr("x1",d=>xSepWid(d.SepWid))
                    .attr("y1",d=>ySepLen(d.SepLen))
                    .attr("x2",d=>xPetWid(d.PetWid))
                    .attr("y2",d=>yPetLen(d.PetLen))
                    .style("stroke-width","1px")
                    .style("stroke",d=>cScale(d.Species))
                    .style("opacity","0.3")


x1Axis = chart.append("g")
  .call(d3.axisBottom(xSepWid))
  .attr("transform", `translate(0,${height - margin})`)
  .style("opacity","0.3")
  .append("text")
  .attr("transform", `translate(${(width - margin)/2},25)`)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Sepal Width")

y1Axis = chart.append("g")
  .call(d3.axisLeft(ySepLen))
  .attr("transform", `translate(${margin},0)`)
  .style("opacity","0.3")
  .append("text")
  .attr("dx", ((margin-height)/2)+"px")
  .attr("dy", -20+"px")
  .attr("transform", `rotate(-90)`)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Sepal Length")

x2Axis = chart.append("g")
  .call(d3.axisTop(xPetWid))
  .attr("transform", `translate(0,${margin})`)
  .style("opacity","0.3")
  .append("text")
  .attr("transform", `translate(${(width - margin)/2},-20)`)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Petal Width")

y2Axis = chart.append("g")
  .call(d3.axisRight(yPetLen))
  .attr("transform", `translate(${width-margin},0)`)
  .style("opacity","0.3")
  .append("text")
  .attr("dx", ((margin-height)/2)+"px")
  .attr("dy", 30+"px")
  .attr("transform", `rotate(-90)`)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Petal Length")
