import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Password wrong" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
