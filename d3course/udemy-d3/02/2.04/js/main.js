/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.4 - Adding SVGs with D3
*/

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 1024)
  .attr("height", 1024)

svg.append("rect")
    .attr("x", 1)
    .attr("y", 1)
    .attr("width", 640)
    .attr("height", 640)
    .attr("fill","grey")
    .attr("stroke", "orange")
    .attr("stroke-width","5px")

svg.append("circle")
  .attr("cx", 500)
  .attr("cy", 500)
  .attr("r", 100)
  .attr("fill", "red")

svg.append("ellipse")
    .attr("cx", 300)
    .attr("cy", 300)
    .attr("rx", 35)
    .attr("ry", 55)
    .attr("fill", "blue")

svg.append("line")
    .attr("x1", 200)
    .attr("y1", 200)
    .attr("x2", 400)
    .attr("y2", 400)
    .attr("stroke", "green")
    .attr("stroke-width", "5")

svg.append("path")
    .attr("d", "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80")
    .attr("stroke", "black")
    .attr("stroke-width", "5")