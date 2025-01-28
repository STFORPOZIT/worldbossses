// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the public folder
app.use(express.static("public"));

// Default state for the lines
let lines = [
  { id: 1, text: "Witch ch1", username: "", active: false },
  { id: 2, text: "Witch ch2", username: "", active: false },
  { id: 3, text: "Witch ch3", username: "", active: false },
  { id: 4, text: "Witch ch4", username: "", active: false },
  { id: 5, text: "Witch ch5", username: "", active: false },
  { id: 6, text: "Witch ch6", username: "", active: false },
  { id: 7, text: "Red Drake ch1", username: "", active: false },
  { id: 8, text: "Red Drake ch6", username: "", active: false },
  { id: 9, text: "Wobba ch1", username: "", active: false },
  { id: 10, text: "Wobba ch6", username: "", active: false },
];

// On client connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send current lines to the client
  socket.emit("initialize", lines);

  // Update a line when the client changes it
  socket.on("updateLine", (updatedLine) => {
    const index = lines.findIndex((line) => line.id === updatedLine.id);
    if (index !== -1) {
      lines[index] = updatedLine; // Update the line state
      io.emit("updateLine", updatedLine); // Broadcast to all clients
    }
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});