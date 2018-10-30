const chartJs = require('chart.js');

function drawChart(){            
    let ctx = document.getElementById('lineChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            xLabels: ["6 JUN", "7 JUN", "8 JUN", "9 JUN", "10 JUN", "11 JUN", "12 JUN", "13 JUN"],                                        
            datasets: [{                                             
                label: "My First dataset",                        
                data: [1000, 4000, 5000, 2000, 2030, 3000, 7800, 4000],
                fill: false,   
                backgroundColor: 'rgba(208,2,27,1)',
                borderColor:'rgba(208,2,27,1)'                     
            },{                                             
                label: "My Second dataset",                        
                data: [8000, 3000, 5000, 4000, 1030, 7000, 7800, 2000],
                fill: false,           
                backgroundColor: 'rgba(74,144,226,1)',
                borderColor:'rgba(74,144,226,1)'               
            },{                                             
                label: "My thrid dataset",                        
                data: [5000, 3300, 6000, 2000, 4030, 6700, 4200, 1000],
                fill: false,           
                backgroundColor: 'rgba(126,211,33,1)',
                borderColor:'rgba(126,211,33,1)'                   
            }]                    
        },

        // Configuration options go here
        options: {
            legend:{
                display: false
            },
            elements:{
                line:{
                    tension:0,
                    borderWidth:0,                            
                }
            },
            // layout: {
            //     padding:{
            //         left:60,
            //     }    
            // },
            scales:{
                xAxes:[{
                    // type: 'category',
                    // labels: ["6 JUN", "7 JUN", "8 JUN", "9 JUN", "10 JUN", "11 JUN", "15 JUN", "18 JUN"],
                    ticks: {
                        display: true,
                        fontSize: 16,                                
                    },
                    gridLines: {
                        display:false,      
                                                  
                    }  
                }],
                yAxes:[{
                    // type: 'category',
                    // labels: ['January', 'February', 'March', 'April', 'May', 'June'],                            
                    gridLines:{                                                                
                        drawTicks:false,                                                                                                
                    },
                    ticks: {                                                                
                        fontSize: 16,             
                        // maxTicksLimit: 5,
                        max: 8000,
                        min: 0,
                        stepSize: 2000,                                 
                        callback: function(value, index, values) {
                            let newValue
                            if (value > 1000){
                                let valueArrStr = ('' + value).split('');  
                                valueArrStr.splice(1,0,',');
                                newValue = valueArrStr.join('');
                                // console.log(valueArrStr,newValue)
                            }                                    
                            return newValue;
                        }                                
                    }
                }]                        
            }
        }
    });
}

module.exports = {
    drawChart: drawChart
}