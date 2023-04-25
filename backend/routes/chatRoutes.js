const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeUserFromGroup,
  addUserToGroup,
} = require("../controllers/chatControllers");

router.post("/", isAuthenticated, accessChat);
router.get("/", isAuthenticated, fetchChats);
router.post("/group", isAuthenticated, createGroupChat);
router.put("/rename", isAuthenticated, renameGroup);
router.put("/groupremove", isAuthenticated, removeUserFromGroup);
router.put("/groupadd", isAuthenticated, addUserToGroup);

module.exports = router;
