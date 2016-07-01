// const socket = io();

const accelHandle = (socket, callback) => {
  socket.on('acceleration', accelObj => {
    callback(accelObj);
  });
};

module.exports = accelHandle;
