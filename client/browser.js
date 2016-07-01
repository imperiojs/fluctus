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

function changeBodyClass() {
  // console.log(`let's change body`);
  if (bodyElement.classList.contains('class1')) {
    bodyElement.classList.remove('class1');
    bodyElement.classList.add('class2');
  } else {
    bodyElement.classList.remove('class2');
    bodyElement.classList.add('class1');
  }
}

function updateAccelerationData(accelerationDataObject) {
  console.log(`let's change accel`);
  aX.innerHTML = `${accelerationDataObject.x}`;
  aY.innerHTML = `${accelerationDataObject.y}`;
  aZ.innerHTML = `${accelerationDataObject.z}`;
}

function updateGyroscopeData(gyroscopeDataObject) {
  // console.log(`let's change gyro`);
  alpha.innerHTML = `${gyroscopeDataObject.alpha}`;
  beta.innerHTML = `${gyroscopeDataObject.beta}`;
  gamma.innerHTML = `${gyroscopeDataObject.gamma}`;
}

function showSocketConnection(room) {
  h6Element.innerHTML = `Socket connection, in ${room}`;
}

var counter = 0;
var xDataArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var yDataArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var zDataArray = [0];

// Define socket listeners and callback functions


var canvas = document.getElementById('accel-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: xDataArray
          },
          {
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              data: yDataArray
          }
      ]
    },
    latestLabel = startingData.labels[6];

// Reduce the animation steps for demo clarity.
var myLiveChart = new Chart(ctx).Line(startingData, {
  animationSteps: 15
});


function updateAccelerationChart(accelerationDataObject) {
  myLiveChart.addData([accelerationDataObject.alpha, accelerationDataObject.beta], ++latestLabel);
}

// frontEndEcho.desktopTapHandler(frontEndEcho.socket, changeBodyClass);
frontEndEcho.desktopAccelHandler(frontEndEcho.socket, printAccel);
// frontEndEcho.desktopGyroHandler(frontEndEcho.socket, updateGyroscopeData);

function printAccel (accelerationDataObject) {
  if (counter < 20) {
    counter ++;
  } else {
    counter = 0;
    myLiveChart.addData([accelerationDataObject.x, accelerationDataObject.y], ++latestLabel);
    myLiveChart.removeData();
  }
}


// setInterval(function(){
//   // Add two random numbers for each dataset
//   myLiveChart.addData([Math.random() * 100, Math.random() * 100], ++latestLabel);
//   // Remove the first point so we dont just add values forever
//   // myLiveChart.removeData();
// }, 500);