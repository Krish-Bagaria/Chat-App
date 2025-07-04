import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.Jwt_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return resizeBy.json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Controller to check if user is authenticated
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

export default ProtectRoute;
