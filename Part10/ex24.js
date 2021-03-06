// Set Dimensions

const xSize = 600; const ySize = 600;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;

// Create Random Points

const numPoints = 100;
const sineData = [];
const cosData = [];
for (let i = 0; i < numPoints; i++) { sineData.push( {x: i/100, y: Math.sin( 6.2 * i/100 ) } ); }
for (let i = 0; i < numPoints; i++) { cosData.push( {x: i/100, y: Math.cos( 6.2 * i/100 ) } ); }

//Create the SVG

const svg = d3.select("body")
 .append("svg")
 .attr('width', xSize )
 .attr('height', ySize )
 .append("g")
 .attr("transform","translate(" + margin + "," + margin + ")");

//Define the plotGraph function, this time including an extra color parameter so that the color of each line can be defined when calling the function

function plotGraph(data,color){

/* Get the 'limits' of the data - the full extent (mins and max)
   so the plotted data fits perfectly */

  const xExtent = d3.extent( data, d=>{ return d.x } );
  const yExtent = d3.extent( data, d=>{ return d.y } );

//X Axis

  const x = d3.scaleLinear()
   .domain([ xExtent[0], xExtent[1] ])
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
   .domain([ yExtent[0], yExtent[1] ])
   .range([ yMax, 0]);

//left y axis

  svg.append("g")
   .call(d3.axisLeft(y));

//right y axis

  svg.append("g")
   .attr("transform", `translate(${yMax},0)`)
   .call(d3.axisRight(y));

//Add the line - set it's color using the parameter passed to the function

  svg.append("path")
   .datum(data)
   .attr("fill", "none")
   .attr("stroke", color)
   .attr("stroke-width", 1.5)
   .attr("d", d3.line()
   .x(function(d) { return x(d.x) })
   .y(function(d) { return y(d.y) })
   );
	}

//Call the function, giving it a data set and a color

plotGraph(sineData, "steelBlue");
plotGraph(cosData, "green");
