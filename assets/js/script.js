//declaration of variables.
let inputAmount= document.querySelector("#inputAmount");
let selectTypeMoney= document.querySelector ("#selectTypeMoney");
let btn= document.querySelector ("#btn");
let dataArray = [];
let myChart = null;
let lastchange = 0;

// ------------------------------------------------------------------------------------------
//function to connect to the server.
async function ConectionServer() {
    try {
      
      currency = selectTypeMoney.value;
  
      const res = await fetch(`https://mindicador.cl/api/${currency}`)
      const data = await res.json();
      console.log(res.status);
  
      lastchange = (data.serie[0].valor);
      
      calculation();
      
      dataArray = data.serie.slice(0,10); //function that allows displaying 10 records of the total array.
      const datChange = dataArray.map((x) => x.valor);
      const datLabel = dataArray.map((x) =>`${x.fecha.substring(8, 10)}-${x.fecha.substring(5,7)}-${x.fecha.substring(0, 4)}`)
  
  
      chartRender(datLabel, datChange);
      document.querySelector("#error").innerHTML = 'Mensaje del Servidor: conexión realizada';
    } catch (e) {
       document.querySelector("#error").innerHTML = 'Mensaje del Servidor: No se pudo establecer la conexión';
       document.querySelector("#result").innerHTML= "....";
    }
  }
  // -------------------------------------------------------------------------------------------------

//function to configure the graph
function chartRender(datLabel, datChange) {
  
    const ctx = document.getElementById('myChart').getContext('2d');
    if (myChart != null) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: 'bar',
  
      data: {
        labels: datLabel.reverse(),
        datasets: [
          {
            label: `Valor: ${currency.toUpperCase()}`,
            data: datChange.reverse(),
            backgroundColor: ['rgba(31, 147, 62, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            beginAtZero: true,
          },
        },
      },
    })
  };
  
  