//Width and height
var w = 600;
var h = 250;
var sortOrder = false;
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

d3.select("body")
    .append("H1")
    .text("Sort the bar chart");

d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("class", "hidden")
    .append("p")
    .append("strong")
    .text("Label:")

d3.select("body")
    .select("div")
    .append("p")
    .append("span")
    .attr("id", "value")
    .text(100)

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//.on("click", function(d){console.log(d)})
//Create bars
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return yScale(d);
    })
    .attr("fill", function(d) {
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
    })
    .on("mouseover", function(d){
        d3.select(this)
            .attr("fill", '#ff9900') //#666699 #ff9900
        //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
        //Update the tooltip position and value
        d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(d['srcElement']['__data__']);
        //console.log(d['srcElement']['__data__'])
        //Show the tooltip
        d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", function(d){
        d3.select(this)
            .transition("highLiteMouseOut")
            .duration(500)
            .attr("fill", function(d) {
                return "rgb(0, 0, " + Math.round(d * 10) + ")";
            }); //Naming transitions helps avoid transition interruptions
        //Hide the tooltip
        d3.select("#tooltip").classed("hidden", true);
    })
// Use the browser default tool tip
    // .append("title")
    // .text(function(d) {
    //     return "The value is: " + d;
    // });
// Alternate method is to edit css and add in a hidden div see pg 212 and 213 of
// interactive data visualization for the web
// See style.css

//Create labels
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
        return h - yScale(d) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

d3.select("body")
    .on("click", function() {
    sortBars();
    });

//Define sort function
//Naming transitions helps avoid transition interruptions
var sortBars = function() {
    //Flip value of sortOrder
    sortOrder = !sortOrder;
    svg.selectAll("rect")
        .sort(function (a, b) {
            if (sortOrder){
                return d3.ascending(a, b);
            } else {
                return d3.descending(a, b);
            }
        })
        .transition("sortBars")
        .delay(function(d, i) {
            return i / dataset.length * 1000; })
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr("x", function (d, i) {
            return xScale(i);
        });

    svg.selectAll("text")
        .sort(function (a, b) {
            if (sortOrder){
                return d3.ascending(a, b);
            } else {
                return d3.descending(a, b);
            }
        })
        .transition("sortLabels")
        .delay(function(d, i) {
            return i / dataset.length * 1000; })
        .duration(1000)
        .ease(d3.easeBounceOut)
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14;
        });
};
