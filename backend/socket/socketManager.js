const socketIo = require('socket.io');

let io;

exports.initSocket = (server) => {
  io = socketIo(server, { cors: { origin: process.env.FRONTEND_URL } });
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('join_conversation', (conversationId) => {
      socket.join(`conversation_${conversationId}`);
    });
  });
  return io;
};

exports.getIo = () => {
  if (!io) throw new Error('Socket not initialized');
  return io;
};
