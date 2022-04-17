// import {db} from './process';
// console.log(db);
const {
    ipcRenderer
} = require('electron');
import { db,baselineDb } from './process.js';
import {
    process
} from './process.js';
var currBaseline=0;

baselineDb.find({$not: {"baseline":0}}, function(err, docs){
  console.log(docs);
  currBaseline=docs[docs.length-1].baseline;
  console.log(currBaseline);
  document.getElementById("baseline").innerHTML="Your ideal baseline ratio should be "+currBaseline;
})


console.log("graph.js is working");

var xyValues = [
    {x:50.1, y:7},
    {x:60.2, y:8},
    {x:70.8, y:8.4},
    {x:80.4, y:9},
    {x:90.4, y:9},
    {x:100.4, y:9.4},
    {x:110, y:10},
    {x:120.6, y:11},
    {x:130, y:14},
    {x:140, y:14},
    {x:150, y:15}
  ];
  

db.find({$not: { "x": 1 } }, function (err, docs) {
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
    var graphData = [];

    docs.map((data) => {
        graphData.push({x:data.x, y:data.y}); //remove 1000000
    })
    console.log(docs);

    new Chart("myChart", {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "#F27474",
            data:graphData,
            bgColors: [
              { color: 'red', upTo: 20 },
              { color: 'green', upTo: 40 }, 
              { color: 'red', upTo: 100 }
            ] //graphdata
          }]
        },

        
        options: {
          legend: {display: false},
          // responsive:true,
          // 
          scales: {
            xAxes: [{ 
                ticks: {min: 0, max:24,stepSize: 1},
                // maxTicksLimit: 48
                scaleLabel: {
                  display: true,
                  labelString: 'Time'
                }
                // type:'time'
                    // time:
                    // {
                    //     displayFormats: {
                    //         second:'h:mm:ss'
                    //     }
                    // },
                    // ticks: {min: '00:00:00', max:'23:59:59'}
                }],
            yAxes: [{ticks: {min: 0, max:100},
              scaleLabel: {
                display: true,
                labelString: 'Ratio'
              }
            }],
          }
        }
      });

    
});

    
  