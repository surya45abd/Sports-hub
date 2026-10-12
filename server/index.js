import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, isMongoConnected } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import sportsRoutes from "./routes/sportsRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().split("T")[1].slice(0, 8);
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Sideline Sports API",
    version: "2.0.0",
    mongodbConnected: isMongoConnected(),
    storageMode: isMongoConnected() ? "MongoDB" : "Local JSON Store (Fallback)",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api", sportsRoutes);

// 404 handler for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Start Server
function startServer() {
  app.listen(PORT, () => {
    console.log(`\n🚀 Sideline Sports Backend running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Auth Endpoints: /api/auth/register, /api/auth/login, /api/auth/me`);
    console.log(`⭐ Bookmark Endpoints: /api/bookmarks\n`);

    // Connect to database asynchronously
    connectDB();
  });
}

startServer();
