import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // other wise, verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findOne(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (error) {}
};

export default verifyJWT;
