var w = 640;
var h = 480;
var padding = 40;

//For converting strings to Dates
var parseTime = d3.timeParse("%m/%d/%y");

//For converting Dates to strings
var formatTime = d3.timeFormat("%b %e");

//Load in the data
d3.csv("data/time_scale_data.csv").then(data => {
    data.forEach(d => {
        d.Date = parseTime(d.Date);
        d.Amount = Number(d.Amount)
    })

    const xMin = d3.min(data, function(d) { return d.Date; })
    const xMax = d3.max(data, function(d) { return d.Date; })
    const yMin = d3.min(data, function(d) { return d.Amount; })
    const yMax = d3.max(data, function(d) { return d.Amount; })

    //Create scale functions
    xScale = d3.scaleTime()
        .domain([xMin, xMax])
        .range([padding, w - padding]);
    xAxis = d3.axisBottom().scale(xScale)

    yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([h - padding, padding]);
    yAxis = d3.axisLeft().scale(yScale)

    rScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([2,5]);

    cScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([0,255]);

    //Define X axis
    xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(8);

    //Define Y axis
    yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5);
    //Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //Generate date labels first, so they are in back
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return formatTime(d.Date);
        })
        .attr("x", function(d) {
            return xScale(d.Date) + 4;
        })
        .attr("y", function(d) {
            return yScale(d.Amount) + 4;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "#bbb");

    //Generate circles last, so they appear in front
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d.Date);
        })
        .attr("cy", function(d) {
            return yScale(d.Amount);
        })
        .attr("r", function(d){
            return rScale(d.Amount)*1.1;
        })
        .attr('fill', function(d){
            return "rgb(10,150, " + cScale(d.Amount) + ")";
        })
        //.attr("r", 2);

    //Create X axis
    // svg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(0," + (h - padding) + ")")
    //     .call(xAxis);

    //Create Y axis
    // svg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(" + padding + ",0)")
    //     .call(yAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h-padding) + ")")
        .call(xAxis)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis)


});
