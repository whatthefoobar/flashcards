import asyncHandler from "../middleware/asyncHandler.js";
import { Router } from "express";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const router = Router();

// Register works
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login works
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      generateToken(res, user._id);

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  })
);

// Logout works
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.send({ message: "Logged out successfully" });
});

export default router;
