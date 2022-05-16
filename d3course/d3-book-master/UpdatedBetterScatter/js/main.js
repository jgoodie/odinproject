var w = 640;
var h = 480;
var padding = 40;
var speed = 500;
var easeness = d3.easeBounceOut
//var easeness = d3.easeElasticOut
//var easeness = d3.easeCircleIn
//var easeness = d3.easeLinear

d3.select("body").append("H1").text("Random Scatter plot");

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

const xMin = d3.min(dataset, function(d) { return d[0]; })
const xMax = d3.max(dataset, function(d) { return d[0]; })
const yMin = d3.min(dataset, function(d) { return d[1]; })
const yMax = d3.max(dataset, function(d) { return d[1]; })

//Create scale functions
var xScale = d3.scaleLinear()
    .domain([0,xMax])
    .range([padding,w-padding*2]);
var xAxis = d3.axisBottom().scale(xScale).ticks(8);

var yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([h - padding, padding]);
var yAxis = d3.axisLeft().scale(yScale).ticks(5);

var rScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([2,6]);

var cScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([0,255]);

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
    .attr("font-size", "10px")
    .attr("fill", "#bbb");

//Define clipping path
svg.append("clipPath")
    .attr("id", "chart-area")
    .append("rect")
    .attr("x", padding)
    .attr("y", padding)
    .attr("width", w-padding*3)
    .attr("height", h-padding*2)

//Generate circles last, so they appear in front
svg.append("g")
    .attr("id", "circles")
    .attr("clip-path", "url(#chart-area)")
    .selectAll("circle")
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
        return rScale(d[1])*1.1;
    })
    .attr('fill', function(d){
        //return "rgb(10,150, " + cScale(d[1]) + ")";
        return "rgb(10," + cScale(d[0]) + "," + cScale(d[1]) + ")";
    })

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (h-padding) + ")")
    .call(xAxis)

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)

d3.select("body").on("click", function(){
    dataset = [];
    numDataPoints = 50;
    xRange = Math.random() * 1000;
    yRange = Math.random() * 1000;
    for (var i = 0; i < numDataPoints; i++) {
        newNumber1 = Math.floor(Math.random() * xRange);
        newNumber2 = Math.floor(Math.random() * yRange);
        dataset.push([newNumber1, newNumber2]);
    }

    //Update scale domains
    xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
    yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    svg.selectAll("text")
        .data(dataset)
        .transition()
        .delay(function(d, i) {
            return i / dataset.length * 1000;
        })
        .duration(speed)
        .ease(easeness)
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
        .attr("font-size", "10px")
        .attr("fill", "#bbb");

    svg.selectAll("circle")
        .data(dataset)
        .transition()
        .delay(function(d, i) {
            return i / dataset.length * 1000;
        })
        .duration(speed)
        .ease(easeness)
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", function(d){
            return rScale(d[1])*1.1;
        })
        .attr('fill', function(d){
            //return "rgb(10,150, " + cScale(d[1]) + ")";
            return "rgb(10," + cScale(d[0]) + "," + cScale(d[1]) + ")";
        })

    //Update x-axis
    svg.select(".x.axis")
        .transition()
        .delay(function(d, i) {
            return i / dataset.length * 1000;
        })
        .duration(speed)
        .ease(easeness)
        .call(xAxis);

    //Update y-axis
    svg.select(".y.axis")
        .transition()
        .delay(function(d, i) {
            return i / dataset.length * 1000;
        })
        .duration(speed)
        .ease(easeness)
        .call(yAxis);
})
