/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*/

d3.json("/data/ages.json").then(data => {
	//console.log(data)
	data.forEach(d => {
		d.age = Number(d.age) // convert age str to number
	})
	
	const svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", 400)

	const circles = svg.selectAll("circle")
		.data(data)

	circles.enter().append("circle")
		.attr("cx", (d, i) => (i * 50) + 50)
		.attr("cy", 250)
		.attr("r", (d) => 2 * d.age)
		.attr("fill", d => {
			console.log(d)
			if (d.age <= 10) {
				return "red"
			}
			else {
				return "green"
			}
		})
}).catch(error => {
	console.log(error)
})