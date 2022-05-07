/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 400)
  .attr("height", 400)

  const x = d3.scaleLog()
      .domain([300, 150000])
      .range([0, 400])
      .base(10)

  console.log(x(500)) // 48.3
  console.log(x(5000)) // 200
  console.log(x(50000)) // 338.2

  console.log(x.invert(32.9))
  console.log(x.invert(181.1))
  console.log(x.invert(329.3))
