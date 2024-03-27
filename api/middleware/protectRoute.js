import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res,next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password"); //remove password
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error In Register", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute
