import express from "express";
import User from "../models/User.js";
import { authenticateToken, generateToken } from "../middleware/auth.js";
import { isMongoConnected } from "../config/db.js";
import { fallbackStore } from "../utils/fallbackStore.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, favoriteSport } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (isMongoConnected()) {
      const existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { username }],
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message:
            existingUser.email === email.toLowerCase()
              ? "Email already registered"
              : "Username already taken",
        });
      }

      const user = new User({
        username,
        email: email.toLowerCase(),
        password,
        favoriteSport: favoriteSport || "Cricket",
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
      });

      await user.save();
      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        token,
        user: user.toSafeObject(),
      });
    } else {
      // Fallback in-memory / JSON store
      try {
        const newUser = await fallbackStore.createUser({
          username,
          email,
          password,
          favoriteSport: favoriteSport || "Cricket",
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
        });

        const token = generateToken(newUser._id);
        const safeUser = { ...newUser };
        delete safeUser.password;

        return res.status(201).json({
          success: true,
          message: "Account created successfully (local store)",
          token,
          user: safeUser,
        });
      } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Username and password are required",
      });
    }

    if (isMongoConnected()) {
      const user = await User.findOne({
        $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
      });

      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const token = generateToken(user._id);
      return res.json({
        success: true,
        message: "Logged in successfully",
        token,
        user: user.toSafeObject(),
      });
    } else {
      // Fallback
      const matchedUser = await fallbackStore.findUserByIdentifier(identifier);

      if (!matchedUser) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const isMatch = await fallbackStore.comparePassword(password, matchedUser.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const token = generateToken(matchedUser._id);
      const safeUser = { ...matchedUser };
      delete safeUser.password;

      return res.json({
        success: true,
        message: "Logged in successfully",
        token,
        user: safeUser,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET CURRENT USER PROFILE
router.get("/me", authenticateToken, async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// UPDATE PROFILE
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { bio, favoriteSport, avatar } = req.body;
    const updates = {};
    if (bio !== undefined) updates.bio = bio;
    if (favoriteSport !== undefined) updates.favoriteSport = favoriteSport;
    if (avatar !== undefined) updates.avatar = avatar;

    if (isMongoConnected()) {
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-password");

      return res.json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } else {
      const updatedUser = await fallbackStore.updateUser(req.userId, updates);
      const safe = { ...updatedUser };
      delete safe.password;
      return res.json({
        success: true,
        message: "Profile updated successfully",
        user: safe,
      });
    }
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});

export default router;
