import express from "express";
import Bookmark from "../models/Bookmark.js";
import { authenticateToken } from "../middleware/auth.js";
import { isMongoConnected } from "../config/db.js";
import { fallbackStore } from "../utils/fallbackStore.js";

const router = express.Router();

// All bookmark routes require authentication
router.use(authenticateToken);

// GET ALL BOOKMARKS FOR CURRENT USER
router.get("/", async (req, res) => {
  try {
    const { itemType } = req.query;

    if (isMongoConnected()) {
      const query = { user: req.userId };
      if (itemType) query.itemType = itemType;

      const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: bookmarks.length, bookmarks });
    } else {
      const bookmarks = await fallbackStore.getBookmarksByUser(req.userId, itemType);
      return res.json({ success: true, count: bookmarks.length, bookmarks });
    }
  } catch (error) {
    console.error("Fetch bookmarks error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch bookmarks" });
  }
});

// CHECK IF AN ITEM IS BOOKMARKED
router.get("/check/:itemType/:itemId", async (req, res) => {
  try {
    const { itemType, itemId } = req.params;

    if (isMongoConnected()) {
      const existing = await Bookmark.findOne({
        user: req.userId,
        itemType,
        itemId,
      });
      return res.json({ success: true, isBookmarked: !!existing, bookmark: existing });
    } else {
      const existing = await fallbackStore.findBookmark(req.userId, itemType, itemId);
      return res.json({ success: true, isBookmarked: !!existing, bookmark: existing });
    }
  } catch (error) {
    console.error("Check bookmark error:", error);
    res.status(500).json({ success: false, message: "Error checking bookmark" });
  }
});

// ADD A BOOKMARK
router.post("/", async (req, res) => {
  try {
    const { itemType, itemId, title, sport, description, image, url, metadata } = req.body;

    if (!itemType || !itemId || !title) {
      return res.status(400).json({
        success: false,
        message: "itemType, itemId, and title are required",
      });
    }

    if (isMongoConnected()) {
      // Find or create
      let bookmark = await Bookmark.findOne({
        user: req.userId,
        itemType,
        itemId,
      });

      if (bookmark) {
        return res.status(200).json({
          success: true,
          message: "Item already bookmarked",
          bookmark,
        });
      }

      bookmark = new Bookmark({
        user: req.userId,
        itemType,
        itemId,
        title,
        sport: sport || "",
        description: description || "",
        image: image || "",
        url: url || "",
        metadata: metadata || {},
      });

      await bookmark.save();

      return res.status(201).json({
        success: true,
        message: "Bookmark saved",
        bookmark,
      });
    } else {
      const bookmark = await fallbackStore.addBookmark({
        userId: req.userId,
        itemType,
        itemId,
        title,
        sport,
        description,
        image,
        url,
        metadata,
      });

      return res.status(201).json({
        success: true,
        message: "Bookmark saved",
        bookmark,
      });
    }
  } catch (error) {
    console.error("Create bookmark error:", error);
    res.status(500).json({ success: false, message: "Failed to create bookmark" });
  }
});

// REMOVE A BOOKMARK
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      // Allow deletion by either Mongoose _id or itemId
      const deleted = await Bookmark.findOneAndDelete({
        user: req.userId,
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { itemId: id }],
      });

      if (!deleted) {
        return res.status(404).json({ success: false, message: "Bookmark not found" });
      }

      return res.json({ success: true, message: "Bookmark removed" });
    } else {
      const removed = await fallbackStore.removeBookmark(req.userId, id);
      if (!removed) {
        return res.status(404).json({ success: false, message: "Bookmark not found" });
      }
      return res.json({ success: true, message: "Bookmark removed" });
    }
  } catch (error) {
    console.error("Delete bookmark error:", error);
    res.status(500).json({ success: false, message: "Failed to delete bookmark" });
  }
});

export default router;
