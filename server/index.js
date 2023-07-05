const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");

const DB_NAME = "duydb";
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection; 

db.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB:", DB_NAME);
});

const messageSchema = new mongoose.Schema({
  message: String,
  timestamp: Date,
});

const Message = mongoose.model("Message", messageSchema);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log("a user connected");

  try {
    const messages = await Message.find();
    socket.emit("message", messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }

  socket.on("message", async (msg) => {
    console.log("Received message:", msg);

    const message = new Message({ message: msg, timestamp: new Date() });
    try {
      const result = await message.save();
      console.log("Message saved to database:", result);
      // back
      const messages = await Message.find();
      socket.emit("message", messages);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(1234, () => {
  console.log("listening on port 1234");
});
