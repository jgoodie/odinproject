var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var padding = 0;
var formatTime = d3.timeFormat("%Y");

var xScale = d3.scaleTime().range([0, width]);
var yScale= d3.scaleLinear().range([height, 0]);

var line = d3.line()
    .defined(d => d.average >=0 && d.average <= 350)
    .x(d => xScale(d.date))
    .y(d => yScale(d.average));

var dangerline = d3.line()
    .defined(d => d.average > 350)
    .x(d => xScale(d.date))
    .y(d => yScale(d.average));

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
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("class", "line")
        .attr("d", line);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#FF4433")
        .attr("stroke-width", 1.5)
        .attr("class", "line")
        .attr("d", dangerline);

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


// d3.csv("data/data.csv").then(function(data) {
//
//     // format the data
//     data.forEach(function(d) {
//         d.date = parseTime(d.date);
//         d.close = +d.close;
//     });
//
//     console.table(data, ["date", "close"]);
// })


// d3.csv("data/mauna_loa_co2_monthly_averages.csv").then(data => {
//     data.forEach(d => {
//         // d.year = Number(d.year)
//         // d.month = Number(d.month)
//         d.date = new Date(+d.year, (+d.month - 1))
//         d.average = Number(d.average)
//     })
//     //console.table(data, ["date", "average"]);
//     xMin = d3.min(data, function(d){return d.date});
//     xMax = d3.max(data, function(d){return d.date});
//     yMin = d3.min(data, function(d){return d.average});
//     yMax = d3.max(data, function(d){return d.average});
//
//     //const I = d3.range(data.length)
//     const I = d3.range(707)
//
//     xScale = d3.scaleTime()
//         .domain([xMin, xMax])
//         .range([0, w]);
//
//     yScale = d3.scaleLinear()
//         .domain([0, yMax])
//         .range(h, 0);
//
//     line = d3.line()
//         .x(function(d){return xScale(d.date)})
//         .y(function(d){return yScale(d.average)});
//     // line = d3.line()
//     //     .x(d => xScale(d.date))
//     //     .y(d => yScale(d.average));
//
//     svg = d3.select("body")
//         .append("svg")
//         .attr("width", w)
//         .attr("height", h)
//
//     // svg.append("path")
//     //     .attr("class", "line")
//     //     .attr("d", line(I))
//
//     svg.append("path")
//         .datum(data)
//         .attr("class", "line")
//         .attr("d", line(I))
// })


//
//
//
//
//
//

// set the dimensions and margins of the graph
// var margin = {top: 20, right: 20, bottom: 50, left: 70},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
//
// // parse the date / time
// var parseTime = d3.timeParse("%d-%b-%y");
//
// // set the ranges
// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);
//
// // define the line
// var line = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.close); });
//
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");
//
// // Get the data
// d3.csv("data/data.csv").then(function(data) {
//
//     // format the data
//     data.forEach(function(d) {
//         d.date = parseTime(d.date);
//         d.close = +d.close;
//     });
//
//     console.table(data, ["date", "close"]);
//
//     // Scale the range of the data
//     x.domain(d3.extent(data, function(d) { return d.date; }));
//     y.domain([0, d3.max(data, function(d) { return d.close; })]);
//
//     // Add the valueline path.
//     // check CSS for path no fill options
//     svg.append("path")
//         .datum(data)
//         .attr("class", "line")
//         .attr("d", line);
//
//     // Add the x Axis
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));
//
//     // Add the y Axis
//     svg.append("g")
//         .call(d3.axisLeft(y));
//
// });


// d3.csv("data/data.csv").then(function(data) {
//
//     // format the data
//     data.forEach(function(d) {
//         d.date = parseTime(d.date);
//         d.close = +d.close;
//     });
//
//     console.table(data, ["date", "close"]);
// })