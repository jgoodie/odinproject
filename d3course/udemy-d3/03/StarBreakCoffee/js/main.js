const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

// revenue group
const rvng = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
rvng.append("text")
    .attr("class", "x axis-label")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month")

// Y label
rvng.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (HEIGHT / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue ($)")

d3.csv("data/revenues.csv").then(data => {
    data.forEach(d => {
        d.revenue = Number(d.revenue)
        d.profit = Number(d.profit)
    })

    const xr = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([0, WIDTH])
        .paddingInner(0.3)
        .paddingOuter(0.2)

    const yr = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)])
        .range([HEIGHT, 0])

    const xAxisCall = d3.axisBottom(xr)
    rvng.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

    const yAxisCall = d3.axisLeft(yr)
        .ticks(3)
        .tickFormat(d => d + "m")
    rvng.append("g")
        .attr("class", "y axis")
        .call(yAxisCall)

    const rects = rvng.selectAll("rect")
        .data(data)

    rects.enter().append("rect")
        .attr("y", d => yr(d.revenue))
        .attr("x", (d) => xr(d.month))
        .attr("width", xr.bandwidth)
        .attr("height", d => HEIGHT - yr(d.revenue))
        .attr("fill", "#00704A")
})
