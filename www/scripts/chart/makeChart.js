//Inicializo el chart que estara en el menú inicio
function makeChart() {
  var config = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  loadChartData(config);
}
