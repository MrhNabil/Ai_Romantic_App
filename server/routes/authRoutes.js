const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("../config/firebase");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await auth.createUser({
      email,
      password,
    });

    res.status(201).json({ message: "User registered successfully", userId: user.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await auth.getUserByEmail(email);
    const token = jwt.sign({ userId: user.uid }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Signup Route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
      const userRecord = await auth.createUser({
          email,
          password,
      });
      res.status(201).json({ message: "User created successfully", user: userRecord });
  } catch (error) {
      res.status(400).json({ message: "Error creating user", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await auth.getUserByEmail(email);
      if (user) {
          res.status(200).json({ message: "Login successful", user });
      } else {
          res.status(404).json({ message: "User not found" });
      }
  } catch (error) {
      res.status(400).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;
