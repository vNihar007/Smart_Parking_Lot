const { Server } = require('socket.io');

let io;

function init(server) {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });
}

function getIo() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}

module.exports = { init, getIo };
