var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

//Dynamic Bar Chart
// var dataset = [];
// for (var i=0; i<25; i++){
//     var newNumber = Math.floor(Math.random() * 30 + 5);
//     dataset.push(newNumber);
// }

var w = 600;
var h = 250;

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05)

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
        return xScale(i);
    })
    .attr("y", function(d){
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d){
        return yScale(d);
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
    .attr("text-anchor", "middle")
    .attr("x", function(d, i){
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d){
        return h - yScale(d) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

d3.select("body").on("click", function(){
    // console.log("on click")
    // alert("Hey, don't click that!");
    //New values for dataset
    var dataset = [];
    for (var i=0; i<25; i++){
        var newNumber = Math.floor(Math.random() * 25 + 5);
        dataset.push(newNumber);
    }

    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

    //Update all rects
    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(1000)
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", function(d) {
            return "rgb(10,100, " + Math.round(d*10) + ")";
        });

    //Update all labels
    svg.selectAll("text")
        .data(dataset)
        .transition()
        .duration(1000)
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14;
        });

})
