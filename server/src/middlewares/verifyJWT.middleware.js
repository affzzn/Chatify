import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized, missing or invalid token" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Fetch the user from the decoded token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Set the user to the request object

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying JWT:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default verifyJWT;

// import jwt from "jsonwebtoken";
// import User from "../models/User.model.js";

// const verifyJWT = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     // Fetch the user from the decoded token
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user; // Set the user to request object

//     next();
//   } catch (error) {
//     console.error("Error verifying JWT:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export default verifyJWT;
