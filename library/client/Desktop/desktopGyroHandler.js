const gyroHandle = (socket, callback) => {
  socket.on('gyroscope', gyroObj => {
    callback(gyroObj);
  });
};

module.exports = gyroHandle;
