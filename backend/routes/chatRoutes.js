const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const { accessChat, fetchChats } = require("../controllers/chatControllers");

router.post("/", isAuthenticated, accessChat);
router.get("/", isAuthenticated, fetchChats);
router.post("/group", isAuthenticated, createGroupChat);
router.put("/rename", isAuthenticated, renameGroup);
router.put("/groupremove", isAuthenticated, removeFromGroup);
router.put("/groupadd", isAuthenticated, addToGroup);

module.exports = router;
