// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var padding = 0;

// parse the date / time
//var parseTime = d3.timeParse("%d-%b-%y");

//For converting Dates to strings
var formatTime = d3.timeFormat("%Y");

// set the ranges
var xScale = d3.scaleTime().range([0, width]);
var yScale= d3.scaleLinear().range([height, 0]);


// var line = d3.line()
//     .defined(d => d.average >=0 && d.average <= 350)
//     .x(d => xScale(d.date))
//     .y(d => yScale(d.average));

 var area = d3.area()
     .defined(d => d.average >= 0)
     .x(d => xScale(d.date))
     .y0(yScale.range()[0])
     .y1(d => yScale(d.average));

// var dangerline = d3.line()
//     .defined(d => d.average > 350)
//     .x(d => xScale(d.date))
//     .y(d => yScale(d.average));

dangerArea = d3.area()
    .defined(function(d) { return d.average >= 350; })
    .x(function(d) { return xScale(d.date); })
    .y0(function() { return yScale(350); })
    .y1(function(d) { return yScale(d.average); });


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data/mauna_loa_co2_monthly_averages.csv").then(function(data) {

    // format the data
    data.forEach(function(d) {
        d.date = new Date(+d.year, (+d.month - 1));
        d.average = +Number(d.average);
    });

    // console.table(data, ["date", "average"]);

    // Scale the range of the data
    xScale.domain(d3.extent(data, function(d) { return d.date; }));
    yScale.domain([310, d3.max(data, function(d) { return d.average; })]);

    //Draw 350 ppm line
    svg.append("line")
        .attr("class", "line safeLevel")
        .attr("stroke", "#FF4433")
        .attr("x1", padding)
        .attr("x2", width)
        .attr("y1", yScale(350))
        .attr("y2", yScale(350));

    // Add the valueline path.
    // check CSS for path no fill options
    svg.append("path")
        .datum(data)
        .attr("fill", "#556677")
        .attr("class", "area")
        .attr("d", area);

    svg.append("path")
        .datum(data)
        .attr("fill", "#FF4433")
        .attr("class", "line")
        .attr("d", dangerArea);

    // Add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)
            .ticks(10)
            .tickFormat(formatTime));

    // Add the y Axis
    svg.append("g")
        .call(d3.axisLeft(yScale)
            .ticks(10));
});


