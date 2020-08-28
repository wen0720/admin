const chartJs = require('chart.js');
import moment from 'moment';
export default class chartStyle{
    constructor(){                
        
        this.drawChart('2019-01-12');         

        this.revenueArr = []
        this.costArr = []   
        this.incomeArr = []         
        this.totalRevenue
        this.totalCost
        this.totalIncome
    }

    getTime(date){        
        let day = moment(date).format('D');
        let month = moment(date).format('MMM');        
        return {
            day,
            month
        }        
    }

    getdata(url){
        return fetch(url)        
    }

    drawChart(time){
        if(!document.getElementById('lineChart')){
            return;
        }

        let ctx = document.getElementById('lineChart').getContext('2d');    

        this.getdata('http://localhost:3000/Daily').then(res => {            
            return res.json()
        }).then(res => {
            this.revenueArr = []
            this.costArr = []   
            this.incomeArr = []         
            this.dateArr = []            
            this.nowDate = this.getTime(time)

            // 找目前日期在資料中的位置，無法在陣列中比對物件，先把day map出一個新陣列，再用indexOf去查位置
            let nowDateIndex = res.map((item, idx) =>{
                return item.day
            }).indexOf(Number(this.nowDate.day))                        

            let periodRes = res.slice(nowDateIndex-3, nowDateIndex+3+1) // slice 不會包含end的物件，但我要抓前後3個，故最後在+1

            periodRes.forEach(item => {
                this.costArr.push(item.cost)
                this.revenueArr.push(item.revenue)
                this.incomeArr.push(item.netIncome)
                this.dateArr.push(`${item.day} ${item.month}`)
            })            

            this.totalRevenue = this.revenueArr.reduce((total, item) =>  total += item )
            this.totalCost = this.costArr.reduce((total, item) => total += item )
            this.totalIncome = this.incomeArr.reduce((total, item) => total += item )            

            let chart = this.newChart(ctx);
            document.getElementById('js-revenueNum').textContent = this.totalRevenue
            document.getElementById('js-costNum').textContent = this.totalCost
            document.getElementById('js-incomeNum').textContent = this.totalIncome
        })                
    }

    newChart(ctx){
        return new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
    
            // The data for our dataset
            data: {
                xLabels: this.dateArr,
                datasets: [{                                             
                    label: "revenue",                        
                    data: this.revenueArr,
                    fill: false,   
                    backgroundColor: 'rgba(126,211,33,1)',
                    borderColor:'rgba(126,211,33,1)'                                       
                },{                                             
                    label: "cost",                        
                    data: this.costArr,
                    fill: false,           
                    backgroundColor: 'rgba(74,144,226,1)',
                    borderColor:'rgba(74,144,226,1)'               
                },{                                             
                    label: "income",                        
                    data: this.incomeArr,
                    fill: false,           
                    backgroundColor: 'rgba(208,2,27,1)',
                    borderColor:'rgba(208,2,27,1)'                                         
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
}
