// 'use strict';
const bodyElement = document.querySelector('body');
const h6Element = document.querySelector('h6');
const accelDiv = document.getElementById('accel');
const gyroDiv = document.getElementById('gyro');
const aX = document.getElementById('acceleration-x');
const aY = document.getElementById('acceleration-y');
const aZ = document.getElementById('acceleration-z');
const alpha = document.getElementById('alpha');
const beta = document.getElementById('beta');
const gamma = document.getElementById('gamma');
const room = frontEndEcho.room;
const nonce = frontEndEcho.nonce;

// Add nonce code to screen for mobile users to enter
document.getElementById('nonceContainer').innerHTML = `Mobile code: ${nonce}`;

// Use roomId from cookies to create a room
frontEndEcho.desktopRoomSetup(frontEndEcho.socket, frontEndEcho.room);

let canvas = document.getElementById('accel-chart'),
  ctx = canvas.getContext('2d'),
  startingData = {
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
      }
    ]
  },
  latestLabel = startingData.labels[9];

// Reduce the animation steps for demo clarity.
let myLiveChart = new Chart(ctx).Line(startingData, {
  animationSteps: 1,
  scaleGridLineColor: 'rgba(255, 230, 161, 1)',
  scaleOverride : true,
  scaleSteps : 8,
  scaleStepWidth : 5,
  scaleStartValue : -20,
  datasetStrokeWidth : 10,
  scalefontSize: 50,
});

let xAvg = 0;
let yAvg = 0;
let zAvg = 0;
let xDataArray = [0, 1, 2, 3, 4];
let yDataArray = [0, 1, 2, 3, 4];
let zDataArray = [0, 1, 2, 3, 4];

function calculateRunningAverage(accelerationDataObject) {
  xDataArray.shift();
  xDataArray.push(accelerationDataObject.x);
  xAvg = xDataArray.reduce((a, b) => {return a + b}) / 5;
  yDataArray.shift();
  yDataArray.push(accelerationDataObject.y);
  yAvg = yDataArray.reduce((a, b) => {return a + b}) / 5;
  zDataArray.shift();
  zDataArray.push(accelerationDataObject.z);
  zAvg = zDataArray.reduce((a, b) => {return a + b}) / 5;
}

// frontEndEcho.desktopTapHandler(frontEndEcho.socket, changeBodyClass);
frontEndEcho.desktopAccelHandler(frontEndEcho.socket, calculateRunningAverage);
// frontEndEcho.desktopGyroHandler(frontEndEcho.socket, updateGyroscopeData);

function addData() {
  myLiveChart.removeData();
  myLiveChart.addData([xAvg, yAvg, zAvg], ++latestLabel);
}

setInterval(addData, 75);
