const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");

router.post("/", isAuthenticated, sendMessage);
router.get("/:chatId", isAuthenticated, allMessages);

module.exports = router;
