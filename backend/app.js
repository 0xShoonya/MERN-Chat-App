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
app.use("/api/chats", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
