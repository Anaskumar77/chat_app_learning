const io = require("socket.io")(3000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});
let users = {};
io.on("connection", (socket) => {
  //   socket.emit("chat-message", "data - hello world");
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", message);
  });

  socket.on("user-joined", (message) => {
    users[socket.id] = message;
    socket.broadcast.emit("user-connected", message);
  });
});

console.log(`server run in http://localhost:3000`);
