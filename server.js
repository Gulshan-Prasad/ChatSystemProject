const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public")); // serve frontend files

io.on("connection", (socket) => {
  console.log("✅ User connected");

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
