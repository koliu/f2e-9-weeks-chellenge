import moment from "../js/moment-with-locales.min.js";

("use strict");

const ChartColors = {
  red: "rgb(208, 2, 27)",
  green: "rgb(126, 211, 33)",
  blue: "rgb(74, 144, 226)"
};

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var timeFormat = "MMM/DD/YYYY";

function newDate(days) {
  return moment()
    .add(days, "d")
    .toDate();
}

function newDateString(days) {
  return moment()
    .add(days, "d")
    .format(timeFormat);
}

var color = Chart.helpers.color;

var config = {
  type: "line",
  data: {
    labels: [
      // Date Objects
      newDateString(0),
      newDateString(1),
      newDateString(2),
      newDateString(3),
      newDateString(4),
      newDateString(5),
      newDateString(6)
    ],
    datasets: [
      {
        label: "REVENUE",
        backgroundColor: color(ChartColors.green)
          .alpha(0.5)
          .rgbString(),
        borderColor: ChartColors.green,
        fill: false,
        data: [
          {
            x: newDateString(0),
            y: 0
          },
          {
            x: newDateString(5),
            y: 0
          },
          {
            x: newDateString(7),
            y: 0
          },
          {
            x: newDateString(15),
            y: 1
          }
        ]
      },
      {
        label: "Cost",
        backgroundColor: color(ChartColors.red)
          .alpha(0.5)
          .rgbString(),
        borderColor: ChartColors.red,
        fill: false,
        data: []
      },
      {
        label: "NET INCOME",
        backgroundColor: color(ChartColors.blue)
          .alpha(0.5)
          .rgbString(),
        borderColor: ChartColors.blue,
        fill: false,
        data: []
      }
    ]
  },
  options: {
    elements: {
      line: {
        tension: 0 // disables bezier curves
      }
    },
    maintainAspectRatio: false,
    title: {
      text: "Chart.js Time Scale"
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: timeFormat,
            // round: 'day'
            tooltipFormat: "ll"
          },
          scaleLabel: {
            display: true,
            labelString: "Date"
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "value"
          }
        }
      ]
    }
  }
};

const chartData = {
  type: "line",
  data: {
    labels: [
      "6 JUN",
      "7 JUN",
      "8 JUN",
      "9 JUN",
      "10 JUN",
      "11 JUN",
      "12 JUN",
      "13 JUN"
    ],
    datasets: [
      {
        label: "REVENUE",
        fill: false,
        data: [7300, 7000, 6500, 7700, 6300, 7200, 7800, 6800],
        borderColor: ChartColors.green,
        borderWidth: 2
      },
      {
        label: "COST",
        fill: false,
        data: [1300, 4200, 1500, 2600, 3600, 4200, 2200, 1800],
        borderColor: ChartColors.red,
        borderWidth: 2
      },
      {
        label: "NET INCOME",
        fill: false,
        data: [6300, 2800, 5500, 4100, 2700, 3000, 5600, 5000],
        borderColor: ChartColors.blue,
        borderWidth: 2
      }
    ]
  },
  options: {
    legend: {
      display: false // 是否顯示圖例說明
    },
    elements: {
      line: {
        tension: 0 // disables bezier curves
      }
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true
            // labelString: "Date"
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true
            // labelString: "Acitvity"
          }
        }
      ]
    }
  }
};

export default chartData;
