/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.6 - Selections and data joins
*/

const data = [25, 20, 10, 12, 15, 30, 40, 30]

const svg = d3.select("#chart-area").append("svg")
	.attr("width", 1024)
	.attr("height", 1024)

const circles = svg.selectAll("circle")
	.data(data)

circles.enter().append("circle")
	.attr("cx", (d, i) => (i * 50) + 50)
	.attr("cy", (d, i) => (i * 50) + 50)
	.attr("r", (d) => d)
	.attr("fill", "red")