const ctx = document.getElementById('myChart');

fetch('data.json')
.then(function(response) {
    if (response.ok == true){
        return response.json()
    }

})

.then(function(data){
    createChart(data);

});

function createChart(data) {

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: data.map(row => row.day),
    datasets: [{
      label: "",
      data: data.map(row => row.amount),
      borderWidth: 1,
      backgroundColor: ['hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%)', 'hsl(186, 34%, 60%)', 'hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%)'],
      hoverBackgroundColor: ['hsl(10, 79%, 75%)', 'hsl(10, 79%, 75%)', 'hsl(186, 34%, 70%)', 'hsl(10, 79%, 75%)', 'hsl(10, 79%, 75%)'],
      borderRadius: '5',
      borderSkipped: false,
      
    }]
  },
  options: {
    onHover: (evt, activeEls) => {
        activeEls.length > 0 ? evt.chart.canvas.style.cursor = 'pointer' : evt.chart.canvas.style.cursor = 'default';
      },

      layout: {
        padding: {
          top: 15,
        },
      },

    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            displayColors: false,
            caretSize: 0,
            caretPadding: 5,
            callbacks: {
                title : () => null,

                label: function(context) {
                    let label = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    }
                    return label;
                }
             },
                    
             
             yAlign: 'bottom',
             xAlign: 'center',
        }
    },

    scales: {
        x: {

            border: {
                display: false,
            },

            grid: {
              display: false,
              
            },


            ticks: {
                padding: 10
              },
          },

      y: {
        display: false,
        beginAtZero: true,
        grid: {
            display:false,
        
        },
      }
    }
  }
})

}