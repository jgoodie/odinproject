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

//x label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", WIDTH/2)
    .attr("y", HEIGHT+110)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Worlds Tallest Buildings")

//y label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (HEIGHT/2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)")

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

    const y = d3.scaleLinear().domain([0,max]).range([HEIGHT, 0])

    const xAxisCall = d3.axisBottom(x)
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

    const yAxisCall = d3.axisLeft(y)
        .ticks(3).tickFormat(d => d + "m")
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall)

    const rects = g.selectAll("rect").data(data)
    rects.enter().append("rect")
        .attr("y",d => y(d.height))
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth)
        .attr("height", d => HEIGHT - y(d.height))
        .attr("fill", "grey")
})



