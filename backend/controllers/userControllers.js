const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, pic } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      data: newUser,
      message: "Signed up successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validations
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide an email and a password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    console.log(payload);

    // Set token as HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    // Return token to the client
    return res.json({ token, user, message: "Login successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
