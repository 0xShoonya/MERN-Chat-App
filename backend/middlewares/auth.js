const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  try {
    // Get the authorization token from the request headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      // Token not found
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach the user object to the request object for further use
    req.user = user;
    // console.log("req.User", req.user);
    // console.log(req.user._id);

    next();
  } catch (error) {
    // Invalid token
    return res.status(401).json({ message: "Access denied. Invalid token." });
  }
};

module.exports = isAuthenticated;
