/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const MARGIN = {LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130}
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const g = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP} )`)

//x label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", WIDTH/2)
    .attr("y", HEIGHT+110)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("StarBreak Monthly Revenue")

g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (HEIGHT/2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue ($)")

d3.csv("data/revenues.csv").then(data => {
    data.forEach(d => {
        d.height = Number(d.height)
    })