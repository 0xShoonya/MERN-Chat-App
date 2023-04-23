const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  allUsers,
} = require("../controllers/userControllers");
const isAuthenticated = require("../middlewares/auth");

router.post("/", registerUser);
router.get("/", isAuthenticated, allUsers);
router.post("/login", loginUser);

module.exports = router;
