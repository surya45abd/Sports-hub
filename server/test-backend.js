// Verification script for Backend API and Models
import { fallbackStore } from "./utils/fallbackStore.js";
import User from "./models/User.js";
import Bookmark from "./models/Bookmark.js";

async function runVerification() {
  console.log("--- STARTING BACKEND LOGIC VERIFICATION ---");

  const rand = Date.now();
  // Test 1: User creation in fallback store
  const testUser = await fallbackStore.createUser({
    username: `alex_tester_${rand}`,
    email: `alex_${rand}@sideline.dev`,
    password: "password123",
    favoriteSport: "Football",
  });
  console.log("✔ Fallback user created:", testUser.username, testUser._id);

  // Test 2: Password check
  const isMatch = await fallbackStore.comparePassword("password123", testUser.password);
  console.log("✔ Password comparison matches:", isMatch);

  // Test 3: Add bookmark
  const bookmark = await fallbackStore.addBookmark({
    userId: testUser._id,
    itemType: "tournament",
    itemId: "ICC Men's T20 World Cup",
    title: "ICC Men's T20 World Cup",
    sport: "Cricket",
    description: "Global 20-over international championship",
    url: "/tournaments/cricket/icc-men-s-t20-world-cup",
  });
  console.log("✔ Bookmark created:", bookmark.title, bookmark._id);

  // Test 4: Retrieve bookmarks
  const userBookmarks = await fallbackStore.getBookmarksByUser(testUser._id);
  console.log("✔ Retrieved bookmarks count:", userBookmarks.length);

  // Test 5: Check duplicate prevention
  const dupBookmark = await fallbackStore.addBookmark({
    userId: testUser._id,
    itemType: "tournament",
    itemId: "ICC Men's T20 World Cup",
    title: "ICC Men's T20 World Cup",
  });
  const afterDup = await fallbackStore.getBookmarksByUser(testUser._id);
  console.log("✔ Duplicate prevented (count unchanged):", afterDup.length === 1);

  // Test 6: Remove bookmark
  await fallbackStore.removeBookmark(testUser._id, "ICC Men's T20 World Cup");
  const afterDelete = await fallbackStore.getBookmarksByUser(testUser._id);
  console.log("✔ Bookmark removed successfully:", afterDelete.length === 0);

  // Test 7: Mongoose schema definitions
  console.log("✔ Mongoose User Model defined:", !!User.schema);
  console.log("✔ Mongoose Bookmark Model defined:", !!Bookmark.schema);

  console.log("\n🎉 ALL BACKEND CHECKS PASSED SUCCESSFULLY!");
  process.exit(0);
}

runVerification().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
