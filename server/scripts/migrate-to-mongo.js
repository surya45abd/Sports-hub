import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Bookmark from "../models/Bookmark.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, "..", "data", "fallback-db.json");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sideline_sports";

async function migrate() {
  console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB!");

  if (!fs.existsSync(DB_FILE)) {
    console.log("No fallback-db.json found to migrate.");
    process.exit(0);
  }

  const raw = fs.readFileSync(DB_FILE, "utf8");
  const data = JSON.parse(raw);

  const userIdMap = {}; // map fallback ID to MongoDB ObjectId

  // 1. Migrate Users
  let usersImported = 0;
  for (const u of data.users || []) {
    let existing = await User.findOne({
      $or: [{ email: u.email.toLowerCase() }, { username: u.username }],
    });

    if (!existing) {
      // Create user directly keeping password hash without re-hashing
      const newUser = new User({
        username: u.username,
        email: u.email.toLowerCase(),
        password: u.password, // already hashed with bcrypt
        avatar: u.avatar || "",
        bio: u.bio || "",
        favoriteSport: u.favoriteSport || "Cricket",
        createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
      });

      // Bypass mongoose pre-save hash because it's already a bcrypt hash
      await User.collection.insertOne({
        username: newUser.username,
        email: newUser.email,
        password: u.password,
        avatar: newUser.avatar,
        bio: newUser.bio,
        favoriteSport: newUser.favoriteSport,
        createdAt: newUser.createdAt,
        updatedAt: new Date(),
      });

      existing = await User.findOne({ email: u.email.toLowerCase() });
      usersImported++;
    }

    if (existing) {
      userIdMap[u._id] = existing._id;
    }
  }

  console.log(`✅ Users in MongoDB: imported ${usersImported} (total ${await User.countDocuments()})`);

  // 2. Migrate Bookmarks
  let bookmarksImported = 0;
  for (const b of data.bookmarks || []) {
    const mongoUserId = userIdMap[b.user];
    if (!mongoUserId) continue;

    const existingBookmark = await Bookmark.findOne({
      user: mongoUserId,
      itemType: b.itemType,
      itemId: b.itemId,
    });

    if (!existingBookmark) {
      await Bookmark.create({
        user: mongoUserId,
        itemType: b.itemType,
        itemId: b.itemId,
        title: b.title,
        sport: b.sport || "",
        description: b.description || "",
        image: b.image || "",
        url: b.url || "",
        metadata: b.metadata || {},
        createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
      });
      bookmarksImported++;
    }
  }

  console.log(`✅ Bookmarks in MongoDB: imported ${bookmarksImported} (total ${await Bookmark.countDocuments()})`);
  console.log("\n🎉 Data successfully synced to MongoDB!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
