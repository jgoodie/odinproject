// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 50, left: 80},
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
d3.csv("data/2_TwoNum.csv").then( function(data) {

    data.forEach(function(d) {
        d.SalePrice = +Number(d.SalePrice);
        d.GrLivArea = +Number(d.GrLivArea);
    });

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 6000])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 30)
        .text("Living Area");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 800000])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+20)
        .attr("x", -margin.top)
        .text("Sale Price")

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
    // Its opacity is set to 0: we don't see it by default.
    var tooltip = d3.select("body")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var mouseover = function(d) {
        tooltip
            .style("opacity", 1)
    }

    var mousemove = function(d) {
        //console.log(d['srcElement']['__data__']['GrLivArea'])
        tooltip.html("The exact value is: " + d['srcElement']['__data__']['GrLivArea'])
            .style("left", (d3.pointer(event)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (d3.pointer(event)[1]) + "px")
    }

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    let mouseleave = function(d) {
        tooltip.transition()
            .duration(300)
            .style("opacity", 0)
    }

    let maxGLA = d3.max(data, function(d) { return d.GrLivArea; })
    //console.log(d3.max(data, function(d) { return d.GrLivArea; }))

    let radius = d3.scaleLinear()
        .domain([0, maxGLA])
        .range([1, 10]);
    //console.log(radius(5000))

    // Add dots
    svg.append('g')
        .selectAll("dot")
        //.data(data.filter(function(d,i){return i<50})) // the .filter part is just to keep a few dots on the chart, not all of them
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.GrLivArea); } )
        .attr("cy", function (d) { return y(d.SalePrice); } )
        .attr("r", 7)
        .attr("r", function(d){
            return radius(d.GrLivArea)
        })
        .style("fill", "#6987b3")
        .style("opacity", 0.3)
        .style("stroke", "white")
        .on("mouseover", mouseover )
        .on("mousemove", mousemove )
        .on("mouseleave", mouseleave )

})
