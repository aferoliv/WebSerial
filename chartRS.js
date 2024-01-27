let ctx = document.getElementById("kinetics");

var cinGrafico = new Chart(ctx, {
  type: "scatter",
  data: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "α0",
        showLine: false,
        data: [2, 3, 5, 8, 10, 9],
        lineTension: 0,
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 2,
        pointHoverRadius: 0,
        borderWidth: 0,
      },
    ],
  },
  options: {
    tooltips: { mode: "index", intersect: false },
    scales: {
      xAxes: [
        {
          display: true,
          align: "end",
          type: "category",
          scaleLabel: { display: true, labelString: "pH" },
          ticks: {
            maxTicksLimit: 15,
            maxRotation: 0,
            minRotation: 0,
            padding: -5,
          },
        },
      ],
    },
  },
});
//
//
//
let ctx2 = document.getElementById("titration");
var titGrafico = new Chart(ctx2, {
  type: "scatter",
  data: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "pH",
        showLine: false,
        data: [0,0,0,0,0,0],
        lineTension: 0,
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 2,
        pointHoverRadius: 0,
        borderWidth: 0,
      },
    ],
  },
  options: {
    tooltips: { mode: "index", intersect: false },
    scales: {
      xAxes: [
        {
          display: true,
          align: "end",
          type: "category",
          scaleLabel: { display: true, labelString: "pH" },
          ticks: {
            maxTicksLimit: 15,
            maxRotation: 0,
            minRotation: 0,
            padding: -5,
          },
        },
      ],
    },
  },
});
