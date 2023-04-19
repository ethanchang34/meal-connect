import { Server } from "socket.io";
// import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("input-change", (msg) => {
      console.log("in server:", msg);
      socket.broadcast.emit("update-input", msg);
    });
  });

  console.log("Setting up socket");
  res.end();
}
