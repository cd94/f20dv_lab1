//Create SVG element
var svg = d3.select("body")
.append("svg")
.attr("width", 400)
.attr("height", 400)
.style("border", '1px solid green');
//Create line element inside SVG
svg.append("line")
.attr("x1", 100)
.attr("x2", 200)
.attr("y1", 50)
.attr("y2", 50)
.attr("stroke", "blue");

svg.append("line")
.attr("x1", 100)
.attr("x2", 200)
.attr("y1", 150)
.attr("y2", 150)
.attr("stroke", "green");

 svg.append("line")
.attr("x1", 100)
.attr("x2", 100)
.attr("y1", 50)
.attr("y2", 150)
.attr("stroke", "red");

 svg.append("line")
.attr("x1", 200)
.attr("x2", 200)
.attr("y1", 50)
.attr("y2", 150)
.attr("stroke", "yellow");
