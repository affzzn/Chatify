import express from "express";
const router = express.Router();
import User from "../models/User.model.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

router.get("/", verifyJWT, async (req, res) => {
  try {
    // we've access to the user object from the middleware (except password here)

    const loggedInUser = req.user._id;

    // get all users except the current user
    const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    return res.status(200).json({ message: "success", users: allUsers });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
