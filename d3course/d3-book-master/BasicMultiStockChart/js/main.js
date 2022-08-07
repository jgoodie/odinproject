// set the dimensions and margins of the graph
let margin = {top: 10, right: 30, bottom: 40, left: 70},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("data/MANGA.csv").then(
    // clean/fix the data
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

        // group the data: I want to draw one line per group
        let sumstat = d3.group(data, d => d.symbol); // nest function allows to group the calculation per level of a factor
        let keys = Array.from(sumstat.keys())

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
            .text("Date");

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
            .text("Stock Price")

        // let c = [];
        // for (let i = 0; i < 10; i++) {
        //     c.push(d3.interpolateSpectral(i/10));
        // }
        // const color = d3.scaleOrdinal().range(c.reverse())

        //let color = d3.scaleOrdinal(d3.schemeCategory10);
        //let color = d3.scaleOrdinal(d3.schemeDark2);
        //let color = d3.scaleOrdinal(d3.schemeSet1);
        let color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet1)

        // Draw the lines
        svg.selectAll(".line")
            .data(sumstat)
            .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d[0]) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
                return d3.line()
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y(+d.close); })
                    (d[1])
            })

        svg.selectAll("mydots")
            .data(keys)
            .enter()
            .append("circle")
            .attr("cx", 30)
            .attr("cy", function(d,i){ return 30 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 3)
            .style("fill", function(d){ return color(d)})

        svg.selectAll("mylabels")
            .data(keys)
            .enter()
            .append("text")
            .attr("x", 45)
            .attr("y", function(d,i){ return 30 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "14px")
    })


//d3.schemeSet2
////Easy colors accessible via a 10-step ordinal scale
// var colors = d3.scaleOrdinal(d3.schemeCategory10);
// https://github.com/d3/d3-scale-chromatic
// let colors = [];
// for (let i = 0; i < 10; i++) {
//     colors.push(d3.interpolateSpectral(i/10));
// }
// colors = colors.reverse()