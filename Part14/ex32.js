var data = [3, 4, 8, 12, 6, 9, 2, 7, 1, 5, 10, 3];
data.sort(function(a, b) {
  return a - b;
});

var imgLink = "https://raw.githubusercontent.com/cd94/f20dv_lab1/main/26399.svg";

const xSize = 400;
const ySize = 400;
const margin = 40;
const xMax = xSize - margin * 2;
const yMax = ySize - margin * 2;
// Append SVG Object to the Page
const svg = d3.select("body")
  .append("svg")
  .attr('width', xSize)
  .attr('height', ySize)
  .append("g")
  .attr("transform", "translate(" + xSize / 2 + "," + ySize / 2 + ")");

  d3.select("svg")
      .append("svg:image")
      .attr("xlink:href", imgLink)
      .attr("width", xSize)
      .attr("height", ySize)
      .attr("x", 0)
      .attr("y", 0)
      .attr("id","image")
      .lower();

  d3.selectAll("image").on("mouseover", function(){
     d3.select(this).raise();
  });

  d3.selectAll("image").on("mouseleave", function(){
     d3.select(this).lower();
  });

const radius = Math.min(xSize, ySize) / 2;
var color = d3.scaleLinear().domain([d3.min(data), d3.max(data)]).range(["blue", "red"]);
// Generate the pie
var pie = d3.pie().sort(null);
// Generate the arcs
const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);
//Generate groups
var arcs = svg.selectAll("arc")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("class", "arc")


//Draw arc paths
arcs.append("path")
  .attr("fill", function(d, i) {
    return color(i);
  })
  .attr("id", "arc")
  .attr("d", arc)


svg.selectAll('arcs')
  .data(pie(data))
  .enter()
  .append('text')
  .text(function(d) {
    return d.data
  })
  .attr("transform", function(d) {
    return "translate(" + arc.centroid(d) + ")";
  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
  .attr("stroke", "white")
