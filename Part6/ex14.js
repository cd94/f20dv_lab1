let heartfailurecsv = 'https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv';
/*
age,anaemia,creatinine_phosphokinase,diabetes,ejection_fraction,high_blood_pressure,platelets,serum_creatini
ne,serum_sodium,sex,smoking,time,DEATH_EVENT
75,0,582,0,20,1,265000,1.9,130,1,0,4,1
55,0,7861,0,38,0,263358.03,1.1,136,1,0,6,1
65,0,146,0,20,0,162000,1.3,129,1,1,7,1
50,1,111,0,20,0,210000,1.9,137,1,0,7,1
*/

/*Loads the heart faliure CSV as done in the previous example*/

d3.csv(heartfailurecsv, function(data) {
 return data
}).then(function(d){
  let oneThirty = 0;
  let thirtyFourty = 0;
  let fourtySixty = 0;
  let sixtyOneHundered= 0;

  var counts = [];

  for(let i = 0; i<d.length; i++){
    if(d[i].age >= 1 && d[i].age <= 30 ){
      oneThirty++;
    };
    if(d[i].age >= 31 && d[i].age <= 40 ){
      thirtyFourty++;
    };
    if(d[i].age >= 41 && d[i].age <= 60 ){
      fourtySixty++;
    };
    if(d[i].age >= 61 && d[i].age <= 100 ){
      sixtyOneHundered++;
    };
  };
  counts.push(oneThirty);
  counts.push(thirtyFourty);
  counts.push(fourtySixty);
  counts.push(sixtyOneHundered);

	var width = 400;
  var scaleFactor = 2;
  var barHeight = 30;

//Creates an SVG within the body

  var graph = d3.select("body")
   .append("svg")
   .attr("width", width)
   .attr("height", barHeight * counts.length);

//Enters the required number of g elements

  var bar = graph.selectAll("g")
   .data(counts)
   .enter()
   .append("g")
   .attr("transform", function(d, i) {
   return "translate(0," + i * barHeight + ")";
   });

//Appends rect SVG elements to the g elements and sets their width the width denoted from the heart failure data csv

  bar.append("rect")
   .attr("width", function(d) {
   return d * scaleFactor;
   })
   .attr("height", barHeight - 1);

//Appends the data value to the end of the bar

  bar.append("text")
   .attr("x", function(d) { return (d*scaleFactor); })
   .attr("y", barHeight / 2)
   .attr("dy", ".35em")
   .text(function(d) { return d; });
 	});
