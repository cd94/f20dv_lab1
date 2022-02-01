var myData = ['a', 4, 1, 'b', 6, 2, 8, 9, 'z' ];

var span = d3.select("body")
 .selectAll("p")
 .data(myData)
 .enter()
 .append('span')
 .text(function (d, i) {
 return d;
 }).style('color',function(d,i){
 if(typeof d === 'number'){
 	i = 'green'
 }else{
  i = 'blue'
 }
 return i
 });
