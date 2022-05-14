// Basic Scatter Plot

var dataset = [
    [ 5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [ 85, 21],
    [220, 88],
    [600, 150]
];

var w = 640;
var h = 480;
var padding = 20;

const xMax = d3.max(dataset, function(d){
    return d[0]; //reference first value in ech subarray
})

const yMax = d3.max(dataset, function(d){
    return d[1]; //reference first value in ech subarray
})

var xScale = d3.scaleLinear()
    .domain([0,xMax])
    .range([padding,w-padding*2]);

var yScale = d3.scaleLinear()
    .domain([0,yMax])
    .range([h - padding, padding]);

var rScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([2,5])

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d){
        return xScale(d[0]);
    })
    .attr("cy", function(d){
        return yScale(d[1]);
    })
    .attr("r", function(d){
        //return Math.sqrt(h-d[1]); //Math.PI);
        return rScale(d[1])*4;
    }).attr('fill', function(d){
        return "rgb(10,50, " + Math.round(d[0]) + ")";
    })
//.attr('fill', '#AABBCC')

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return d[0] + "," + d[1];
    })
    .attr("x", function(d){
        return xScale(d[0]);
    })
    .attr("y", function(d){
        return yScale(d[1]);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");
