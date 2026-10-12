import jwt from "jsonwebtoken";
import { isMongoConnected } from "../config/db.js";
import User from "../models/User.js";
import { fallbackStore } from "../utils/fallbackStore.js";

const JWT_SECRET = process.env.JWT_SECRET || "sideline_super_secret_jwt_key_2026";

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;

    if (isMongoConnected()) {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }
      req.user = user;
    } else {
      const user = await fallbackStore.findUserById(decoded.id);
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }
      const safe = { ...user };
      delete safe.password;
      req.user = safe;
    }

    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
}

export function generateToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}
