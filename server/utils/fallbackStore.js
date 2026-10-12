import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "data");
const DB_FILE = path.join(DATA_DIR, "fallback-db.json");

// Ensure data folder and file exist
function initStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initial = {
      users: [],
      bookmarks: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
}

function readData() {
  initStore();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return { users: [], bookmarks: [] };
  }
}

function writeData(data) {
  initStore();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

export const fallbackStore = {
  // --- USERS ---
  async findUserByEmail(email) {
    const data = readData();
    return data.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserByIdentifier(identifier) {
    const data = readData();
    const idLower = (identifier || "").toLowerCase();
    return (
      data.users.find(
        (u) => u.email.toLowerCase() === idLower || u.username.toLowerCase() === idLower
      ) || null
    );
  },

  async findUserById(id) {
    const data = readData();
    return data.users.find((u) => u._id === id) || null;
  },

  async createUser({ username, email, password, avatar, bio, favoriteSport }) {
    const data = readData();
    const existing = data.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase()
    );
    if (existing) {
      throw new Error("User with that email or username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: "fb_user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      avatar: avatar || "",
      bio: bio || "Sports enthusiast & statistics explorer.",
      favoriteSport: favoriteSport || "Cricket",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.users.push(newUser);
    writeData(data);
    return newUser;
  },

  async updateUser(id, updates) {
    const data = readData();
    const idx = data.users.findIndex((u) => u._id === id);
    if (idx === -1) return null;

    data.users[idx] = {
      ...data.users[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    writeData(data);
    return data.users[idx];
  },

  async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  },

  // --- BOOKMARKS ---
  async getBookmarksByUser(userId, itemType = null) {
    const data = readData();
    let bookmarks = data.bookmarks.filter((b) => b.user === userId);
    if (itemType) {
      bookmarks = bookmarks.filter((b) => b.itemType === itemType);
    }
    // Return newest first
    return bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async findBookmark(userId, itemType, itemId) {
    const data = readData();
    return data.bookmarks.find(
      (b) => b.user === userId && b.itemType === itemType && b.itemId === itemId
    ) || null;
  },

  async addBookmark({ userId, itemType, itemId, title, sport, description, image, url, metadata }) {
    const data = readData();
    const existing = data.bookmarks.find(
      (b) => b.user === userId && b.itemType === itemType && b.itemId === itemId
    );
    if (existing) {
      return existing;
    }

    const newBookmark = {
      _id: "fb_bm_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      user: userId,
      itemType,
      itemId,
      title,
      sport: sport || "",
      description: description || "",
      image: image || "",
      url: url || "",
      metadata: metadata || {},
      createdAt: new Date().toISOString(),
    };

    data.bookmarks.push(newBookmark);
    writeData(data);
    return newBookmark;
  },

  async removeBookmark(userId, bookmarkIdOrItemId) {
    const data = readData();
    const initialLen = data.bookmarks.length;
    data.bookmarks = data.bookmarks.filter(
      (b) => !(b.user === userId && (b._id === bookmarkIdOrItemId || b.itemId === bookmarkIdOrItemId))
    );
    const removed = data.bookmarks.length < initialLen;
    if (removed) {
      writeData(data);
    }
    return removed;
  },
};
