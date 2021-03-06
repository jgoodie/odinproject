//Width and height
var w = 500;
var h = 300;

//Original data
var dataset = {
    nodes: [
        { name: "Adam" },
        { name: "Bob" },
        { name: "Carrie" },
        { name: "Donovan" },
        { name: "Edward" },
        { name: "Felicity" },
        { name: "George" },
        { name: "Hannah" },
        { name: "Iris" },
        { name: "Jerry" },
        { name: "John" },
        { name: "Noah" },
        { name: "Jacob" },
        { name: "Linda" },

    ],
    edges: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 0, target: 4 },
        { source: 1, target: 5 },
        { source: 2, target: 5 },
        { source: 2, target: 5 },
        { source: 3, target: 4 },
        { source: 5, target: 8 },
        { source: 5, target: 9 },
        { source: 6, target: 7 },
        { source: 7, target: 8 },
        { source: 8, target: 9 },
        { source: 9, target: 10 },
        { source: 9, target: 11 },
        { source: 9, target: 12 },
        { source: 9, target: 13 },
        { source: 1, target: 10 },
        { source: 6, target: 13 },
    ]
};

//Initialize a simple force layout, using the nodes and edges in dataset
var force = d3.forceSimulation(dataset.nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(dataset.edges))
    .force("center", d3.forceCenter().x(w/2).y(h/2));

var colors = d3.scaleOrdinal(d3.schemeCategory10);

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Create edges as lines
var edges = svg.selectAll("line")
    .data(dataset.edges)
    .enter()
    .append("line")
    .style("stroke", "#ccc")
    .style("stroke-width", 1);

//Create nodes as circles
var nodes = svg.selectAll("circle")
    .data(dataset.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .style("fill", function(d, i) {
        return colors(i);
    }).call(d3.drag()  //Define what to do on drag events
        .on("start", dragStarted)
        .on("drag", dragging)
        .on("end", dragEnded));

//Add a simple tooltip
nodes.append("title")
    .text(function(d) {
        return d.name;
    });

//Every time the simulation "ticks", this will be called
force.on("tick", function() {

    edges.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodes.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

});

//Define drag event functions
function dragStarted(event, d) {
    d.fx = event.x;
    d.fy = event.y;
    force.alphaTarget(0.3).restart();
}

function dragging(event, d) {
    //console.log(event)
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(event,d) {
    d.fx = null;
    d.fy = null;
    force.alphaTarget(0)
}