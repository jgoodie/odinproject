/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 400)
  .attr("height", 400)

  const x = d3.scaleTime().domain([new Date(2000, 0, 1),
          new Date(2001, 0, 1)]).range([0,400])

  const x1 = new Date(2000, 7, 1)
  const x2 = new Date(2000, 2, 1)
  const x3 = new Date(2000, 10, 25)

  console.log(x(x1)) // 232.7413479052823
  console.log(x(x2)) // 65.57377049180327
  console.log(x(x3)) // 359.56284153005464

  console.log(x.invert(x(x1))) // Aug 01 2000
  console.log(x.invert(x(x2))) // Mar 01 2000
  console.log(x.invert(x(x3))) // Nov 25 2000
