const express = require("express");
const socket = require("socket.io");
const moment = require("moment");

var app = express();

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

var server = app.listen(port, () => {
  console.log("Listening to requests on port", port);
});

// Static files.
app.use(express.static("public"));

// Socket setup
var io = socket(server);

io.on("connection", socket => {
  console.log("Connection has been established: ", socket.id);

  // Handle chat event
  socket.on("chat", data => {
    data.time = moment().format("HH:MM:SS");
    io.sockets.emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });

  //Handle Video changed event
  socket.on("videoChange", data => {
    console.log("Video Changed event emitted");
    io.sockets.emit("videoChange", data);
  });
});