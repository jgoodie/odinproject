const w = 800;
const h = 300;
const padding = 40;

var dataset, xScale, yScale, line, xMin, xMax, svg;  //Empty, for now

d3.csv("data/mauna_loa_co2_monthly_averages.csv").then(data => {
    data.forEach(d => {
        // d.year = Number(d.year)
        // d.month = Number(d.month)
        d.date = new Date(+d.year, (+d.month - 1))
        d.average = Number(d.average)
    })
    //console.table(data, ["date", "average"]);
    xMin = d3.min(data, function(d){return d.date});
    xMax = d3.max(data, function(d){return d.date});
    yMin = d3.min(data, function(d){return d.average});
    yMax = d3.max(data, function(d){return d.average});

    //const I = d3.range(data.length)
    const I = d3.range(707)

    xScale = d3.scaleTime()
        .domain([xMin, xMax])
        .range([0, w]);

    yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range(h, 0);

    line = d3.line()
        .x(function(d){return xScale(d.date)})
        .y(function(d){return yScale(d.average)});
    // line = d3.line()
    //     .x(d => xScale(d.date))
    //     .y(d => yScale(d.average));

    svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)

    // svg.append("path")
    //     .attr("class", "line")
    //     .attr("d", line(I))

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line(I))
})


