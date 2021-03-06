const data = [50, 400, 300, 900, 250, 1000]
const width = 500;
const barHeight = 20;
const margin = 1;

//Creates a linear scale which is used in place of the scaleFactor from the previous exercises to proportion the bar chart

var scale = d3.scaleLinear()
 .domain([d3.min(data), d3.max(data)])
 .range([50, 500]);

var svg = d3.select("body")
 .append("svg")
 .attr("width", width)
 .attr("height", barHeight * data.length);

var g = svg.selectAll("g")
 .data(data)
 .enter()
 .append("g")
 .attr("transform", function (d, i) {
 return "translate(0," + i * barHeight + ")";
 });

//Appends rect objects and checks the value, if <100 they are green, >500 they are red and they are blue otherwise

g.append("rect")
 .attr("width", function (d) {
 return scale(d);
 })
 .attr('fill', function(d){
 	if(d < 100){
  	return "green";
  } else if(d > 500){
  	return "red";
  } else{
  	return "blue";
  };
 })
 .attr("height", barHeight - margin)


g.append("text")
 .attr("x", function (d) { return (scale(d)); })
 .attr("y", barHeight / 2)
 .attr("dy", ".35em")
 .style('text-anchor', 'end')
 .text(function (d) { return d; });
