var xAccelBox = document.getElementById('x-accel');
var yAccelBox = document.getElementById('y-accel');
var zAccelBox = document.getElementById('z-accel');

imperio.mobileRoomSetup(imperio.socket, imperio.room);

// handle accel data using our library
imperio.mobileAccelShare(imperio.socket, imperio.room, printAccelerationData);

function printAccelerationData(accObj) {
  xAccelBox.innerHTML = `${accObj.x}`;
  yAccelBox.innerHTML = `${accObj.y}`;
  zAccelBox.innerHTML = `${accObj.z}`;
}
