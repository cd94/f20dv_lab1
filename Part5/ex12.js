let svgscene = 'https://raw.githubusercontent.com/cd94/f20dv_lab1/main/shape.csv';
/*
shape,dim1,dim2,pos1,pos2,color
rect,200,100,0,0,pink
circle,50,0,250,50,green
ellipse,150,50,250,150,blue
line,100,200,50,150,yellow
*/

d3.csv(svgscene, function(data) {
 return data;
}).then(function(d){

//Append an SVG to the body

  var svg = d3.select("body")
   .append("svg")
   .attr("width", 400)
   .attr("height", 400)
   .style("border", '1px solid green');

//Loop over the data

 for(let i = 0; i<d.length; i++){

//Switch case to check the type of shape defined and append it to the SVG

	switch(d[i].shape){
  	case "rect":
      svg.append("rect")
       .attr("x", d[i].pos1)
       .attr("y", d[i].pos2)
       .attr("width", d[i].dim1)
       .attr("height", d[i].dim2)
       .attr("fill", d[i].color);
       break;

    case "circle":
      svg.append("circle")
         .attr("cx", d[i].pos1)
         .attr("cy", d[i].pos2)
         .attr("r", d[i].dim1)
         .attr("fill", d[i].color);
         break;

    case "ellipse":
      svg.append("ellipse")
         .attr("cx", d[i].pos1)
         .attr("cy", d[i].pos2)
         .attr("rx", d[i].dim1)
         .attr("ry", d[i].dim2)
         .attr("fill", d[i].color);
         break;

     case "line":
      svg.append("line")
       .attr("x1", d[i].pos1)
       .attr("x2", d[i].pos2)
       .attr("y1", d[i].dim1)
       .attr("y2", d[i].dim2)
       .attr("stroke", d[i].color)
       .attr("stroke-width",3);
			break;

		}
  }
});
