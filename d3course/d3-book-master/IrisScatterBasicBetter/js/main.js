// set the dimensions and margins of the graph
const margin = {top: 40, right: 30, bottom: 60, left: 70},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Add a chart title
svg.append("text")
    .attr("id", "title")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "bold")
    .text("Iris Scatter Plots");

d3.csv("data/iris.csv").then( function(data) {
    // clean/fix the data
    data.forEach(function(d) {
        d.sepal_width = +Number(d.sepal_width);
        d.sepal_length = +Number(d.sepal_length);
        d.petal_width = +Number(d.petal_width);
        d.petal_length = +Number(d.petal_length);
    });

    // Add X axis
    const x = d3.scaleLinear()
        .domain([1.5, 5])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add X axis label:
    svg.append("text")
        .attr("id", "xlabel")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 2)
        .text("Sepal Width");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([3, 8.5])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y axis label:
    svg.append("text")
        .attr("id", "ylabel")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 30)
        .attr("x", -margin.top + 40)
        .text("Sepal Length")

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.sepal_width); } )
        .attr("cy", function (d) { return y(d.sepal_length); } )
        .attr("r", 3.0)
        .style("fill", "#69b3a2")

})
