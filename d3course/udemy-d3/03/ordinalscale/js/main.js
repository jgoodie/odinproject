/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 400)
  .attr("height", 400)

const color = d3.scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f"])
    .range(d3.schemeCategory10)

console.log(color("a"))
console.log(color("b"))
console.log(color("c"))
console.log(color("d"))
console.log(color("e"))
console.log(color("f"))

