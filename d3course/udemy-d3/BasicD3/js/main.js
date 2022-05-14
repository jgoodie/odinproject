// var jsonFruits = [
//     {
//         kind: "grape",
//         color: "red",
//         quantity: 12,
//         tasty: true
//     },
//     {
//         kind: "kiwi",
//         color: "brown",
//         quantity: 98,
//         tasty: true
//     },
//     {
//         kind: "banana",
//         color: "yellow",
//         quantity: 0,
//         tasty: true
//     }
// ]
//
// const fruits = jsonFruits.map(f => f.kind)
// console.log(fruits)
// const colors = jsonFruits.map(c => c.color)
// console.log(colors)
// const counts = jsonFruits.map(c => c.quantity)
// console.log(counts)
//
// var numbers = [ 8, 100, 22, 98, 99, 45 ];
//
// for (var i=0; i< numbers.length; i++) {
//    console.log(numbers[i])
// }
//
// var doubleArr = function(arr) {
//     var doubled = numbers.map(n => n*2)
//     return doubled
// }
// console.log(doubleArr(numbers))

d3.select("body").append("h1").text("Hello World!");
d3.select("body").append("p").text("New paragraph!");

// d3.csv("data/food.csv", function(data) {
//     console.log(data);
// });

// d3.csv("data/food.csv").then(data => {
//     data.forEach(d => {
//         //d.Deliciousness = Number(d.Deliciousness)
//         d.Deliciousness = parseFloat(d.Deliciousness)
//     })
//     console.log(data)
// })

// var dataset; //Declare global variable, initially empty (undefined)
// d3.csv("food.csv", function(data) {
//     dataset = data; //Once loaded, copy to dataset.
//     generateVis(); //Then call other functions that
//     hideLoadingMsg(); //depend on data being present.
// });
//var dataset = [25,7,5,26,11,8,25,14,23,19, 14, 11, 22, 29, 11, 13, 12, 17, 18, 10, 24,18,25,9,3];

// var dataset = [];
// for (var i=0; i<25; i++){
//     var newNumber = Math.floor(Math.random() *30);
//     dataset.push(newNumber);
// }

// d3.select("body").selectAll("p")
//     .data(dataset)
//     .enter()
//     .append("p")
//     .text("New Paragraph!")

// d3.select("body").selectAll("p")
//     .data(dataset)
//     .enter()
//     .append("p")
//     .text(function(d) { return d + "mod5 = " + d%5; })
//     .style("color", "#1199bb")

// d3.select("body").selectAll("p")
//     .data(dataset)
//     .enter()
//     .append("p")
//     .text(function(d) { return d + "mod5 = " + d%5; })
//     .style("color", function(d) {
//         if (d%5 == 0) {
//             return "black";
//         } else {
//             return "#FF0022";
//         }
//     })

// d3.select("body").selectAll("div")
//     .data(dataset)
//     .enter()
//     .append("div")
//     .attr("class", "bar")
//     .style("height", function(d){
//         var barHeight = d *5;
//         return barHeight + "px";
//     })

var w = 800
var h = 600

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

d3.interval(() => {
    var dataset = [];
    for (var i=0; i<15; i++){
        var newNumber = Math.floor(Math.random() * 30);
        dataset.push(newNumber);
    }
    update(dataset)
}, 1000)

function update(dataset){
    const t = d3.transition().duration(750)
    const circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")

    circles.attr("cx", function (d,i){
        return (i*50) + 25;
    })
        .attr("cy", h/2)
        .attr("r", function(d){
            return d;
        })
        .attr("fill", '#1188AA')
        .attr("stroke", 'black')
        .attr("stroke-width", function(d){
            return d/6;
        })
    circles.exit().transition(t).remove()
    var dataset = [];
    for (var i=0; i<15; i++){
        var newNumber = Math.floor(Math.random() * 30);
        dataset.push(newNumber);
    }
    circles.append()
        .attr("cx", function (d,i){
        return (i*50) + 25;
        })
        .attr("cy", h/2)
        .attr("r", function(d){
            return d;
        })
        .attr("fill", '#1188AA')
        .attr("stroke", 'black')
        .attr("stroke-width", function(d){
            return d/6;
        })
    console.log("update func")
}



