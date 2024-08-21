import express from "express";
const router = express.Router();
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // check existing user

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user ::
    // await User.create({username, password: hashedPassword})

    //  or this way ::

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate a token
    // this id is from mongodb user id: _id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "success",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
  }
});

router.get("/verify", verifyJWT, async (req, res, next) => {
  try {
    res.status(200).json({ message: "success", user: req.user });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
