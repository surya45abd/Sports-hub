import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Bookmark from "../models/Bookmark.js";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sideline_sports";

async function viewDatabase() {
  console.log(`Connecting to MongoDB: ${uri}\n`);
  await mongoose.connect(uri);

  const users = await User.find({}).select("-password");
  const bookmarks = await Bookmark.find({});

  console.log("========================================");
  console.log(`🍃 MONGODB DATABASE: sideline_sports`);
  console.log("========================================\n");

  console.log(`👥 USERS COLLECTION (${users.length} documents):`);
  console.log("----------------------------------------");
  if (users.length === 0) {
    console.log("  (No users found)");
  } else {
    users.forEach((u, i) => {
      console.log(`  [${i + 1}] ID: ${u._id}`);
      console.log(`      Username: ${u.username}`);
      console.log(`      Email:    ${u.email}`);
      console.log(`      Favorite: ${u.favoriteSport}`);
      console.log(`      Created:  ${u.createdAt}`);
      console.log("");
    });
  }

  console.log(`⭐ BOOKMARKS COLLECTION (${bookmarks.length} documents):`);
  console.log("----------------------------------------");
  if (bookmarks.length === 0) {
    console.log("  (No bookmarks found yet)");
  } else {
    bookmarks.forEach((b, i) => {
      console.log(`  [${i + 1}] ID: ${b._id}`);
      console.log(`      Type:     ${b.itemType}`);
      console.log(`      Title:    ${b.title}`);
      console.log(`      Sport:    ${b.sport || "N/A"}`);
      console.log(`      User ID:  ${b.user}`);
      console.log(`      Created:  ${b.createdAt}`);
      console.log("");
    });
  }

  console.log("========================================\n");
  process.exit(0);
}

viewDatabase().catch((err) => {
  console.error("Error inspecting MongoDB:", err.message);
  process.exit(1);
});
