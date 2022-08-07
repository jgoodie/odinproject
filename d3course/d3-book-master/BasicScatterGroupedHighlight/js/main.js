// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 60, left: 70},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then(function(data) {
    // Fix the data
    data.forEach(function(d) {
        d.Sepal_Length = +Number(d.Sepal_Length);
        d.Sepal_Width = +Number(d.Sepal_Width);
        d.Petal_Length = +Number(d.Petal_Length);
        d.Petal_Width = +Number(d.Petal_Width);
    });

    // Add X axis
    const x = d3.scaleLinear()
        .domain([4, 8])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 30)
        .text("Sepal Length");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 9])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+30)
        .attr("x", -margin.top)
        .text("Petal Length")

    // Color scale: give me a specie name, I return a color
    const color = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica" ])
        .range([ "#440154ff", "#21908dff", "#fde725ff"])

    // Highlight the specie that is hovered
    const highlight = function(event,d){

        selected_specie = d.Species

        d3.selectAll(".dot")
            .transition()
            .duration(200)
            .style("fill", "lightgrey")
            .attr("r", 2)

        d3.selectAll("." + selected_specie)
            .transition()
            .duration(200)
            .style("fill", color(selected_specie))
            .attr("r", 7)
    }

    // Highlight the specie that is hovered
    const doNotHighlight = function(event,d){
        d3.selectAll(".dot")
            .transition()
            .duration(200)
            .style("fill", d => color(d.Species))
            .attr("r", 5 )
    }

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function (d) { return "dot " + d.Species } )
        .attr("cx", function (d) { return x(d.Sepal_Length); } )
        .attr("cy", function (d) { return y(d.Petal_Length); } )
        .attr("r", 5)
        .style("fill", function (d) { return color(d.Species) } )
        .on("mouseover", highlight)
        .on("mouseleave", doNotHighlight )
})