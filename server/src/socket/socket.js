import { Server } from "socket.io";

import http from "http";
import express from "express";

const app = express();

// create a http server

const server = http.createServer(app);

const onlineUsers = {};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return onlineUsers[receiverId];
};

io.on("connection", (socket) => {
  // 'socket' is a user who is connected to the server
  console.log("user connected", socket.id);

  socket.on("join", (receiverId) => {
    onlineUsers[receiverId] = socket.id;
    console.log("receiverId", receiverId, "socketId", socket.id);
  });
});

export { server, app, io };
