let barData = 'https://raw.githubusercontent.com/cd94/f20dv_lab1/main/barData2.csv';

const data = [];
const leftLabels = [];

d3.csv(barData, function(i) {
  return i;
}).then(function(d){

/*Adds data to the data arry and then adds the number of elements of the data array to the leftLabels array
i.e. if data has 5 elements, leftLabels will contain [1,2,3,4,5] */

for(let i = 0; i<d.length; i++){
  data.push(parseInt(d[i].data));
}

for(let i = 0; i<data.length; i++){
  leftLabels.push(i+1);
}

//Create the bar chart as before

  const width = 600;
  const barHeight = 20;
  const scaleFactor = 0.5;
  const margin = 1;

  var scale = d3.scaleLinear()
  .domain([d3.min(data), d3.max(data)])
  .range([d3.min(data), d3.max(data)]);

  var svg = d3.select("body")
  .append("svg")
  .attr("width", width + 40)
  .attr("height", (barHeight * data.length)+30);

  var g = svg.selectAll("g")
  .data(data)
  .enter()
  .append("g")

  .attr("transform", function (d, i) {
    return "translate(40," + (i * barHeight) + ")";
  });

  g.append("rect")
  .attr("width", function (d) {
    return d*scaleFactor;
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
  .attr("x", function (d) { return (scaleFactor * d); })
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .style('text-anchor', 'end')
  .style('font-family','monospace')
  .text(function (d) { return d; });

//Creates two scales for the two axes

var scale1 = d3.scaleLinear()
   .domain([0, d3.max(data)])
   .range([0,d3.max(data)*scaleFactor]);

var scale2 = d3.scaleLinear()
  .domain([0, d3.max(leftLabels) - 1])
  .range([0,(d3.max(leftLabels)-1)*barHeight]);

//Scale the axes and define the number of ticks

var x_axis = d3.axisBottom()
 .scale(scale1)
 .ticks(20);

var y_axis = d3.axisLeft()
  .scale(scale2)
  .ticks(5);

//Append the two axes to the SVG and set their position

svg.append("g")
  .call(x_axis).attr("transform", "translate(" + 40 + "," + (data.length*barHeight+10) +")");

svg.append("g")
    .call(y_axis).attr("transform", "translate(30,10)");

});
