const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");

// router.post("/", isAuthenticated, sendMessage)
// router.get("/:chatId", isAuthenticated, allMessages)

module.exports = router;
