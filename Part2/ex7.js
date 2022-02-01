let num = [10, 50, 100, 200];
let paragraph = d3.select("body")
 .selectAll("div")
 .data(num)
 .text(function (d, i) {
 return 'cont:' + d; // return value is used to set the 'text'
 })
 .style("color", function(d, i) {
 if ( 50<= d && 100 >= d ) {
 return "red";
 } else {
 return "yellow";
 }
 return 'blue';
 });
