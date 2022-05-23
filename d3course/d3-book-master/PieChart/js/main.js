//Width and height
// var w = 300;
// var h = 300;

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 70},
    w = 500 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;

var dataset = [ 5, 10, 20, 45, 6, 25 ];

var outerRadius = w / 2;
var innerRadius = w/4;

var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var pie = d3.pie();

//Easy colors accessible via a 10-step ordinal scale
var color = d3.scaleOrdinal(d3.schemeSet2);

d3.select("body").append("H1").text("FOOBIZZLE")

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Set up groups
var arcs = svg.selectAll("g.arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

//Draw arc paths
arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc);

//Labels
arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d.value;
    });