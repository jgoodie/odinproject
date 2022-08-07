// var dataset = [
//     [ 5, 20],
//     [480, 90],
//     [250, 50],
//     [100, 33],
//     [330, 95],
//     [410, 12],
//     [475, 44],
//     [25, 67],
//     [ 85, 21],
//     [220, 88],
//     [600, 150]
// ];

//Dynamic, random dataset
var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.floor(Math.random() * xRange);
    var newNumber2 = Math.floor(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
}


var w = 640;
var h = 480;
var padding = 40;

//For converting strings to Dates
var parseTime = d3.timeParse("%m/%d/%y");

//For converting Dates to strings
var formatTime = d3.timeFormat("%b %e");


const xMin = d3.min(dataset, function(d) { return d[0]; })
const xMax = d3.max(dataset, function(d) { return d[0]; })
const yMin = d3.min(dataset, function(d) { return d[1]; })
const yMax = d3.max(dataset, function(d) { return d[1]; })

//Create scale functions
xScale = d3.scaleLinear()
    .domain([0,xMax])
    .range([padding,w-padding*2]);
xAxis = d3.axisBottom().scale(xScale)

yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([h - padding, padding]);
yAxis = d3.axisLeft().scale(yScale)

rScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([2,5]);

cScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([0,255]);

//Define X axis
xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(8);

//Define Y axis
yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Generate date labels first, so they are in back
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return  "("+ d[0] + "," + d[1] + ")";
    })
    .attr("x", function(d) {
        return xScale(d[0]);
    })
    .attr("y", function(d) {
        return yScale(d[1]);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "#bbb");

//Generate circles last, so they appear in front
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d[0]);
    })
    .attr("cy", function(d) {
        return yScale(d[1]);
    })
    .attr("r", function(d){
        return rScale(d[1])*2;
    })
    .attr('fill', function(d){
        return "rgb(10,150, " + cScale(d[1]) + ")";
    })

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h-padding) + ")")
    .call(xAxis)

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)

