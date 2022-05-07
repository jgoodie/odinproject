/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

const MARGIN = {LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130}
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const g = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP} )`)

d3.json("data/buildings.json").then(data => {
    data.forEach(d => {
        d.height = Number(d.height)
    })

    const min = d3.min(data, d => d.height)
    const max = d3.max(data, d => d.height)
    const extent = d3.extent(data, d => d.height)
    const names = data.map(d => d.name)

    const x = d3.scaleBand().domain(names).range([0, WIDTH])
        .paddingInner(0.1)
        .paddingOuter(0.2)

    const y = d3.scaleLinear().domain([0,max]).range([0, HEIGHT])

    const rects = g.selectAll("rect").data(data)
    rects.enter().append("rect")
        .attr("y",0)
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth)
        .attr("height", d => y(d.height))
        .attr("fill", "grey")
})



