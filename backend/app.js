const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
dotenv.config();

//Connecting Database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

//Routes import
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 4100;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Require the socket.io library and pass it the `server` object to create a new Socket.IO server.
const io = require("socket.io")(server, {
  // Set the amount of time that the server should wait before considering a client as disconnected.
  pingTimeout: 60000,
  // Set up Cross-Origin Resource Sharing (CORS) to allow the specified origin to access the server.
  cors: {
    origin: "http://localhost:3000",
  },
});

// Listen for new connections to the server.
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // Listen for the `setup` event, which is emitted by the client after it has logged in.
  socket.on("setup", (userData) => {
    // Join the socket to a room named after the user's ID.
    socket.join(userData._id);
    socket.emit("connected");
  });

  // Listen for the `join chat` event, which is emitted by the client when it joins a new chat room.
  socket.on("join chat", (room) => {
    // Join the socket to the specified chat room.
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // Listen for the `typing` event,
  socket.on("typing", (room) => socket.in(room).emit("typing"));

  // Listen for the `stop typing` event
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Listen for the `new message` event, which is emitted by the client when it sends a new message.
  socket.on("new message", (newMessageRecieved) => {
    // Get the chat object from the `newMessageRecieved` object.
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      // If the current user is the sender of the message, skip to the next iteration.
      if (user._id == newMessageRecieved.sender._id) return;

      // Emit the `message recieved` event to the current user's socket room to notify them of the new message.
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  // Listen for the `disconnect` event
  // socket.on("disconnect", () => {
  //   // Leave the socket room that was joined by the user during the `setup` event.
  //   socket.leave(userData._id);
  //   console.log("USER DISCONNECTED");
  // });
});
