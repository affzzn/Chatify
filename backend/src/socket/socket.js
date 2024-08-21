import { Server } from "socket.io";

import http from "http";
import express from "express";

const app = express();

// create a http server

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // 'socket' is a user who is connected to the server
  console.log("user connected", socket.id);
});

export { server, app };
