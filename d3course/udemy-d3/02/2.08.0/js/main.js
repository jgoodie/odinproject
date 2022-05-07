/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("/data/buildings.json").then(data => {
    data.forEach(d => {
        d.age = Number(d.age) // convert age str to number
    })
    const svg = d3.select("#chart-area").append("svg").attr("width", 800).attr("height", 600)
    const rects = svg.selectAll("rect").data(data)
    rects.enter().append("rect")
        .attr("x", (d, i) => (i * 55))
        .attr("y", 1)
        .attr("width", 50)
        .attr("height", (d) => d.height)
        .attr("fill","green")
        .attr("stroke", "orange")
        .attr("stroke-width","1px")
}).catch(error => {
    console.log(error)
})