// Set Dimensions

const xSize = 600;
const ySize = 600;
const margin = 40;
const xMax = xSize - margin * 2;
const yMax = ySize - margin * 2;

// Create Random Points

const numPoints = 100;
const sineData = [];
const cosData = [];

for (let i = 0; i < numPoints; i++) {
  sineData.push({
    x: i / 100,
    y: Math.sin(6.2 * i / 100)
  });
}

for (let i = 0; i < numPoints; i++) {
  cosData.push({
    x: i / 100,
    y: Math.cos(6.2 * i / 100)
  });
}

//Append the CSV to the body

const svg = d3.select("body")
  .append("svg")
  .attr('width', xSize)
  .attr('height', ySize)
  .append("g")
  .attr("transform", "translate(" + margin + "," + margin + ")");

function plotGraph(data, color, shape) {
//Get the 'limits' of the data - the full extent (mins and max)
//so the plotted data fits perfectly
  const xExtent = d3.extent(data, d => {
    return d.x
  });
  const yExtent = d3.extent(data, d => {
    return d.y
  });

//X Axis

  const x = d3.scaleLinear()
    .domain([xExtent[0], xExtent[1]])
    .range([0, xMax]);

//bottom

  svg.append("g")
    .attr("transform", "translate(0," + yMax + ")")
    .call(d3.axisBottom(x))

//top

  svg.append("g")
    .call(d3.axisTop(x));

//Y Axis

  const y = d3.scaleLinear()
    .domain([yExtent[0], yExtent[1]])
    .range([yMax, 0]);

//left y axis

  svg.append("g")
    .call(d3.axisLeft(y));

//right y axis

  svg.append("g")
    .attr("transform", `translate(${yMax},0)`)
    .call(d3.axisRight(y));

//Create color scales, color1 scales with the y axis and color2 with the x axis

 var color1 = d3.scaleLinear().domain([d3.min(data, d=>d.y), d3.max(data, d=>d.y)]).range(["green", "blue"]);
 var color2 = d3.scaleLinear().domain([d3.min(data, d=>d.x), d3.max(data, d=>d.x)]).range(["red", "yellow"]);

//Add the line

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) {
        return x(d.x)
      })
      .y(function(d) {
        return y(d.y)
      })
    );

//Add the circles as before, and call color1 so the circles are colored based on their y-coordinate

  if (shape === "circle") {
    svg.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return x(d.x)
      })
      .attr("cy", function(d) {
        return y(d.y)
      })
      .attr("r", 5)
      .attr("fill", d=>color1(d.y))
  }

//Add the triangles as before, and call color2 so the circles are colored based on their x-coordinate

  if (shape === "triangle") {
    var triangleSym = d3.symbol().type(d3.symbolTriangle).size(50);
      svg.selectAll("dot")
        .data(data)
        .enter()
        .append("path")
        .attr("d", triangleSym)
        .attr("transform", (d) => "translate(" + x(d.x) + "," + y(d.y) + ")")
        .attr("fill", d => color2(d.x));


  }

  //Add the text values as before

  let count = 0;

  svg.selectAll("dot")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => x(d.x))
    .attr("y", (d) => y(d.y))
    .text((d) => {
      if(count++%20 == 0){
      return ("(" + Math.round(d.x * 100)/100 + "," + Math.round(d.y * 100)/100 + ")");
      }
    });

}

//Call the plotGraph() function

plotGraph(cosData, "green", "triangle");
plotGraph(sineData, "steelBlue", "circle");
