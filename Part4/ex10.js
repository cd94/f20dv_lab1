let heartfailurecsv = 'https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv';
/*
age,anaemia,creatinine_phosphokinase,diabetes,ejection_fraction,high_blood_pressure,platelets,serum_creatini
ne,serum_sodium,sex,smoking,time,DEATH_EVENT
75,0,582,0,20,1,265000,1.9,130,1,0,4,1
55,0,7861,0,38,0,263358.03,1.1,136,1,0,6,1
65,0,146,0,20,0,162000,1.3,129,1,1,7,1
50,1,111,0,20,0,210000,1.9,137,1,0,7,1
*/

//Import CSV data as described previously

d3.csv(heartfailurecsv, function(data) {
 return data
}).then(function(d){
  let oneThirty = 0;
  let thirtyFourty = 0;
  let fourtySixty = 0;
  let sixtyOneHundered= 0;

  let counts = [];

//Count instances and push to an array

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

//Select all p elements and enter the results

  var p = d3.select("body")
     .selectAll("p")
     .data(counts)
     .enter()
     .append('p')
     .text(function (d, i) {
         return d;
     	});
 });
