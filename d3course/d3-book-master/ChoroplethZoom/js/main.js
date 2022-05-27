//Width and height
let w = 1000;
let h = 800;

//Define map projection
let projection = d3.geoAlbersUsa().translate([0, 0]);

//Define path generator
let path = d3.geoPath().projection(projection);

//Define quantize scale to sort data values into buckets of color
let color = d3.scaleQuantize()
    .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
//Colors taken from colorbrewer.js, included in the D3 download

//Number formatting for population values
let formatAsThousands = d3.format(",");  //e.g. converts 123456 to "123,456"

//Create SVG element
let svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Define what to do when panning or zooming
let zooming = function(event, d) {
    //Log out d3.event.transform, so you can see all the goodies inside
    //console.log(d3.event.transform);

    //New offset array
    let offset = [event.transform.x, event.transform.y];

    //Calculate new scale
    let newScale = event.transform.k * 2000;

    //Update projection with new offset and scale
    projection.translate(offset).scale(newScale);

    //Update all paths and circles
    svg.selectAll("path")
        .attr("d", path);

    svg.selectAll("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
        });
}

//Then define the zoom behavior
let zoom = d3.zoom().on("zoom", zooming);

//The center of the country, roughly
let center = projection([-97.0, 39.0]);

//Create a container in which all zoom-able elements will live
let map = svg.append("g")
    .attr("id", "map")
    .call(zoom)  //Bind the zoom behavior
    .call(zoom.transform, d3.zoomIdentity  //Then apply the initial transform
        .translate(w/2, h/2)
        .scale(0.25)
        .translate(-center[0], -center[1]));

//Create a new, invisible background rect to catch zoom events
map.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h)
    .attr("opacity", 0);

//Load in agriculture data
d3.csv("data/us-ag-productivity.csv").then(function(data) {

    //Set input domain for color scale
    color.domain([
        d3.min(data, function(d) { return d.value; }),
        d3.max(data, function(d) { return d.value; })
    ]);

    //Load in GeoJSON data
    d3.json("data/us-states.json").then(function(json) {

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        for (let i = 0; i < data.length; i++) {

            let dataState = data[i].state;				//Grab state name
            let dataValue = parseFloat(data[i].value);	//Grab data value, and convert from string to float

            //Find the corresponding state inside the GeoJSON
            for (let j = 0; j < json.features.length; j++) {

                let jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;

                    //Stop looking through the JSON
                    break;
                }
            }
        }

        //Bind data and create one path per GeoJSON feature
        map.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                //Get data value
                let value = d.properties.value;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "#ccc";
                }
            });

        //Load in cities data
        d3.csv("data/us-cities.csv").then(function(data) {
            map.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
                })
                .attr("r", function(d) {
                    return Math.sqrt(parseInt(d.population) * 0.00004);
                })
                .style("fill", "yellow")
                .style("stroke", "gray")
                .style("stroke-width", 0.25)
                .style("opacity", 0.75)
                .append("title")			//Simple tooltip
                .text(function(d) {
                    return d.place + ": Pop. " + formatAsThousands(d.population);
                });

            createPanButtons();
        });
    });
});

//Create panning buttons
var createPanButtons = function() {

    //Create the clickable groups

    //North
    let north = svg.append("g")
        .attr("class", "pan")	//All share the 'pan' class
        .attr("id", "north");	//The ID will tell us which direction to head

    north.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", 30);

    north.append("text")
        .attr("x", w/2)
        .attr("y", 20)
        .html("&uarr;");

    //South
    let south = svg.append("g")
        .attr("class", "pan")
        .attr("id", "south");

    south.append("rect")
        .attr("x", 0)
        .attr("y", h - 30)
        .attr("width", w)
        .attr("height", 30);

    south.append("text")
        .attr("x", w/2)
        .attr("y", h - 10)
        .html("&darr;");

    //West
    let west = svg.append("g")
        .attr("class", "pan")
        .attr("id", "west");

    west.append("rect")
        .attr("x", 0)
        .attr("y", 30)
        .attr("width", 30)
        .attr("height", h - 60);

    west.append("text")
        .attr("x", 15)
        .attr("y", h/2)
        .html("&larr;");

    //East
    let east = svg.append("g")
        .attr("class", "pan")
        .attr("id", "east");

    east.append("rect")
        .attr("x", w - 30)
        .attr("y", 30)
        .attr("width", 30)
        .attr("height", h - 60);

    east.append("text")
        .attr("x", w - 15)
        .attr("y", h/2)
        .html("&rarr;");

    //Panning interaction

    d3.selectAll(".pan")
        .on("click", function() {

            //Get current translation offset
            let offset = projection.translate();

            //Set how much to move on each click
            let moveAmount = 50;

            //Which way are we headed?
            let direction = d3.select(this).attr("id");

            //Modify the offset, depending on the direction
            switch (direction) {
                case "north":
                    offset[1] += moveAmount;  //Increase y offset
                    break;
                case "south":
                    offset[1] -= moveAmount;  //Decrease y offset
                    break;
                case "west":
                    offset[0] += moveAmount;  //Increase x offset
                    break;
                case "east":
                    offset[0] -= moveAmount;  //Decrease x offset
                    break;
                default:
                    break;
            }

            //Update projection with new offset
            projection.translate(offset);

            //Update all paths and circles
            svg.selectAll("path")
                .transition()
                .attr("d", path);

            svg.selectAll("circle")
                .transition()
                .attr("cx", function(d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
                });

        });

};
