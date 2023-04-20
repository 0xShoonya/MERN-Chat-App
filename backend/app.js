const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
