// Add nonce code to screen for mobile users to enter
document.getElementById('nonceContainer').innerHTML = `Mobile code: <span>${imperio.nonce}</span>`;

// Use roomId from cookies to create a room
imperio.desktopRoomSetup(imperio.socket, imperio.room);

// Grab canvas element and create starting data and line styles
const canvas = document.getElementById('accel-chart');
const ctx = canvas.getContext('2d');
const startingData = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  datasets: [
    {
      fillColor: 'rgba(220,220,220,0)',
      strokeColor: 'rgba(88, 36, 169, 1)',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      fillColor: "rgba(151,187,205,0)",
      strokeColor: "rgba(44, 53, 172, 1)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      fillColor: "rgba(151,187,205,0)",
      strokeColor: "rgba(249, 226, 34, 1)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};
let latestLabel = startingData.labels[9];

// Create line chart and set options
const myLiveChart = new Chart(ctx).Line(startingData, {
  animationSteps: 1,
  scaleGridLineColor: 'rgba(255, 230, 161, 1)',
  scaleOverride: true,
  scaleSteps: 8,
  scaleStepWidth: 5,
  scaleStartValue: -20,
  datasetStrokeWidth: 8,
  scalefontSize: 50,
});

// Initialize running x, y, and z average accelerations and arrays
let xAvg = 0;
let yAvg = 0;
let zAvg = 0;
let xDataArray = [0, 1, 2, 3, 4];
let yDataArray = [0, 1, 2, 3, 4];
let zDataArray = [0, 1, 2, 3, 4];

// Running average function stacks most recent acceleration points and calcs avg
function calculateRunningAverage(accelerationDataObject) {
  xDataArray.shift();
  xDataArray.push(accelerationDataObject.x);
  xAvg = xDataArray.reduce((a, b) => {return a + b; }) / 5;
  yDataArray.shift();
  yDataArray.push(accelerationDataObject.y);
  yAvg = yDataArray.reduce((a, b) => {return a + b; }) / 5;
  zDataArray.shift();
  zDataArray.push(accelerationDataObject.z);
  zAvg = zDataArray.reduce((a, b) => {return a + b; }) / 5;
}

// Instantiate acceleration handler
imperio.desktopAccelHandler(imperio.socket, calculateRunningAverage);

// Removes and adds one data point to each dataset in the chart
function addData() {
  myLiveChart.removeData();
  myLiveChart.addData([xAvg, yAvg, zAvg], ++latestLabel);
}

// Set interval to re-render chart
setInterval(addData, 60);
