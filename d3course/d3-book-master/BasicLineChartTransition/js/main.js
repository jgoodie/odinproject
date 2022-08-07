// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 40, left: 70},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("data/AAPL.csv").then(
    function(data) {
        data.forEach(function(d) {
            d.date = d3.timeParse("%Y-%m-%d")(d.date);
            d.open = +Number(d.open);
            d.high = +Number(d.high);
            d.low = +Number(d.low);
            d.close = +Number(d.close);
            d.volume = +Number(d.volume);
            d.adjusted = +Number(d.adjusted);
        });

        // Add X axis --> it is a date format
        const x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + margin.top + 30)
            .text("AAPL Stock Price");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.close; })])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left+20)
            .attr("x", -margin.top)
            .text("Close Price")

        // Add the line
        let line = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.close) })
            )

        let totalLength = line.node().getTotalLength();

        line.attr("stroke-dasharray", totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .ease(d3.easeSin)
            .duration(10000)
            .attr("stroke-dashoffset", 0);

    })



// //Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv").then(
//     function(data) {
//         data.forEach(function(d) {
//             d.date = d3.timeParse("%Y-%m-%d")(d.date);
//             d.value = +Number(d.value);
//         });
//         // Add X axis --> it is a date format
//         const x = d3.scaleTime()
//             .domain(d3.extent(data, function(d) { return d.date; }))
//             .range([ 0, width ]);
//         svg.append("g")
//             .attr("transform", `translate(0, ${height})`)
//             .call(d3.axisBottom(x));
//
//         // Add X axis label:
//         svg.append("text")
//             .attr("text-anchor", "end")
//             .attr("x", width)
//             .attr("y", height + margin.top + 30)
//             .text("X axis title");
//
//         // Add Y axis
//         const y = d3.scaleLinear()
//             .domain([0, d3.max(data, function(d) { return +d.value; })])
//             .range([ height, 0 ]);
//         svg.append("g")
//             .call(d3.axisLeft(y));
//
//         // Y axis label:
//         svg.append("text")
//             .attr("text-anchor", "end")
//             .attr("transform", "rotate(-90)")
//             .attr("y", -margin.left+20)
//             .attr("x", -margin.top)
//             .text("Y axis title")
//
//         // Add the line
//         svg.append("path")
//             .datum(data)
//             .attr("fill", "none")
//             .attr("stroke", "steelblue")
//             .attr("stroke-width", 1.5)
//             .attr("d", d3.line()
//                 .x(function(d) { return x(d.date) })
//                 .y(function(d) { return y(d.value) })
//             )
//     })