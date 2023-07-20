
function setServerData(data){
    setChart(data,["Server Idle", "Server Utilization"],"myChart");
}

function setChart(data,labels,identifier){
    var ctx = document.getElementById(identifier);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data:{
        labels: labels,
            datasets: [{
                label: 'Percentage',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.8)',
                    'rgba(0, 128, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(255,0,0,1)',
                    'rgba(0, 128,0, 1)'
                ],
                borderWidth: 1
            }]
    },
        options: {
            scales: {
                
                // yAxes: [{
                // ticks: {
                
                //         min: 0,
                //         max: 100,
                //         callback: function(value){return value+ "%"}
                //     },  
                //                     scaleLabel: {
                //         display: true,
                //         labelString: "Percentage"
                //     }
                // }]
            }
        }
    });   
}

function setChartListAndWait(data){
    var ctx = document.getElementById("listAndWaitCart");
    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data:{
        labels: ["List In Queue", "List In System", "Wait In Queue", "Wait In System"],
            datasets: [{
                label: '',
                data: data,
                backgroundColor: [
                    'rgba(225, 0, 0, 0.8)',
                    'rgba(0, 128, 0, 0.8)',
                    'rgba(255, 0, 255, 0.8)',
                    'rgba(255, 255,0, 0.8)'
                    
                ],
                borderColor: [
                    'rgba(255,0,0,1)',
                    'rgba(0, 128,0, 1)',
                    'rgba(255, 0, 255, 1)',
                    'rgba(255, 255,0, 1)'
                ],
                borderWidth: 1
            }]
    },
        options: {
            scales: {
                
                // yAxes: [{
                // ticks: {
                
                //         min: 0,
                //         max: 100,
                //         callback: function(value){return value+ "%"}
                //     },  
                //                     scaleLabel: {
                //         display: true,
                //         labelString: "Percentage"
                //     }
                // }]
            }
        }
    });   
}

function setChartInterArrivalServiceTime(data,labels){
    var ctx = document.getElementById("interArrivalServiceTimeChart");
    var backgroundColor = [];
    var borderColor = [];
    for(i=0;i<data.length;i++){
        backgroundColor.push('rgba(225, 0, 0, 0.5)')
        borderColor.push('rgba(255,0,0,1)')
    }
    var myChart = new Chart(ctx, {
        type: 'bar',
        data:{
        labels: labels,
            datasets: [{
                label: 'Service Time',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
    },
        options: {
            scales: {
                
                yAxes: [{
                ticks: {
                
                        min: 0
                       // max: 100,
                        // callback: function(value){return value+ "%"}
                    }
                }]
            }
        }
    });   
}

function setServerUtilizationGraph(serverData,identifier,color,bColor){
    var ctx = document.getElementById(identifier);
    var backgroundColor = [];
    var borderColor = [];
    var data = [];
    var labels = [];
    for(i=0;i<serverData.length;i++){
        data.push(serverData[i][1]);
        labels.push(serverData[i][0]);
        backgroundColor.push(color)
        borderColor.push(bColor)
    }
    var myChart = new Chart(ctx, {
        type: 'bar',
        data:{
        labels: labels,
            datasets: [{
                label: 'End Time',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
    },
        options: {
            scales: {
                
                yAxes: [{
                ticks: {
                
                        min: 0
                       // max: 100,
                        // callback: function(value){return value+ "%"}
                    }
                }]
            }
        }
    });   
}