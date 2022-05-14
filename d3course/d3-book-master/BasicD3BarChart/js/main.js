//var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

// d3.select("body").selectAll("div")
//     .data(dataset)
//     .enter()
//     .append("div")
//     .attr("class", "bar")
//     .style("height", function(d){
//         var barHeight = d*5;
//         return barHeight + "px";
//     })

var dataset = [];
for (var i=0; i<25; i++){
    var newNumber = Math.floor(Math.random() * 30 + 5);
    dataset.push(newNumber);
}

var w = 500;
var h = 150;
var barPadding = 1;
const len = dataset.length;

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
        return i * (w / len);
    })
    .attr("y", function(d){
        return h - d*4;
    })
    .attr("width", w/len - barPadding)
    .attr("height", function(d){
        return d*4;
    })
    .attr('fill', function(d){
        return "rgb(10,100, " + Math.round(d*10) + ")";
    })

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return d;
    })
    .attr("x", function(d, i){
        return i * (w / len) + (w / len - barPadding) / 2;
    })
    .attr("y", function(d){
        return h - (d * 4) + 14; //15 is now 14
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");
