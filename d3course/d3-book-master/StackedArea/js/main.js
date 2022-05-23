let w = 800;
let h = 500;
let padding = 20;

let dataset, xScale, yScale, xAxis, yAxis, area;  //Empty, for now

//For converting strings to Dates
let parseTime = d3.timeParse("%Y-%m");

//For converting Dates to strings
let formatTime = d3.timeFormat("%b %Y");

// https://github.com/d3/d3-scale-chromatic
let colors = [];
for (let i = 0; i < 10; i++) {
    colors.push(d3.interpolateSpectral(i/10));
}
colors = colors.reverse()


//Function for converting CSV values from strings to Dates and numbers
//We assume one column named 'Date' plus several others that will be converted to ints
let rowConverter = function(d, i, cols) {
    //Initial 'row' object includes only date
    let row = {
        date: parseTime(d.Date),  //Make a new Date object for each year + month
    };
    //Loop once for each vehicle type
    for (let i = 1; i < cols.length; i++) {
        let col = cols[i];
        //If the value exists…
        if (d[cols[i]]) {
            row[cols[i]] = +d[cols[i]];  //Convert from string to int
        } else {  //Otherwise…
            row[cols[i]] = 0;  //Set to zero
        }
    }
    return row;
}

//Set up stack method
let stack = d3.stack()
    .order(d3.stackOrderDescending);  // <-- Flipped stacking order
// Also try:
// d3.stackOrderNone (the default, uses the order in which keys are specified)
// d3.stackOrderReverse
// d3.stackOrderAscending
// d3.stackOrderDescending

d3.csv("data/ev_sales_data.csv", rowConverter).then(function(data){

    let dataset = data;
    //Now that we know the column names in the data…
    let keys = dataset.columns;
    keys.shift();  //Remove first column name ('Date')
    stack.keys(keys);  //Stack using what's left (the car names)

    //Data, stacked
    let series = stack(dataset);
    //console.log(series);

    //Create scale functions
    xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, function(d) { return d.date; }),
            d3.max(dataset, function(d) { return d.date; })
        ])
        .range([padding, w - padding * 2]);

    yScale = d3.scaleLinear()
        .domain([
            0,
            d3.max(dataset, function(d) {
                let sum = 0;

                //Loops once for each row, to calculate
                //the total (sum) of sales of all vehicles
                for (let i = 0; i < keys.length; i++) {
                    sum += d[keys[i]];
                };
                return sum;
            })
        ])
        .range([h - padding, padding / 2])
        .nice();

    //Define axes
    xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10)
        .tickFormat(formatTime);

    //Define Y axis
    yAxis = d3.axisRight()
        .scale(yScale)
        .ticks(5);

    //Define area generator
    area = d3.area()
        .x(function(d) { return xScale(d.data.date); })
        .y0(function(d) { return yScale(d[0]); })
        .y1(function(d) { return yScale(d[1]); });

    //Create SVG element
    let svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //Create areas
    svg.selectAll("path")
        .data(series)
        .enter()
        .append("path")
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", function(d, i) {
            return colors[i]
        })
        .append("title")  //Make tooltip
        .text(function(d) {
            return d.key;
        });

    //Create axes
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("fill", "#000000");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (w-padding*2)  + ",0)")
        .call(yAxis)
        .selectAll("text")
        .style("fill", "#000000");

})
