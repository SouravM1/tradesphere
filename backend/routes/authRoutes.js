const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");
const { authenticate, JWT_SECRET } = require("../middleware/authMiddleware");

const router = express.Router();

// Token expiry (e.g. 7 days)
const TOKEN_EXPIRY = process.env.JWT_EXPIRY || "7d";

// POST /auth/register - Create new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Email, password and name are required." });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      role: role || "user",
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: userResponse,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed." });
  }
});

// POST /auth/login - Login and get JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      message: "Login successful.",
      token,
      user: userResponse,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed." });
  }
});

// GET /auth/me - Get current user (protected)
router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
