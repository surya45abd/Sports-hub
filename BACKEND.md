# Sideline Sports Desk — Backend Documentation

This document describes the backend architecture, API endpoints, database setup, and instructions to run the fullstack application.

---

## 🏗️ Architecture Overview

The backend is built with **Node.js + Express** and **MongoDB (Mongoose)**, structured into modular routes, models, and middleware.

```
server/
├── config/
│   └── db.js               # Mongoose connection with automatic fallback detection
├── models/
│   ├── User.js             # Mongoose User model (hashed passwords, profile, favorite sport)
│   └── Bookmark.js         # Mongoose Bookmark model (unique compound indexes)
├── middleware/
│   └── auth.js             # JWT verification & Bearer token decoding
├── routes/
│   ├── authRoutes.js       # /api/auth/register, /api/auth/login, /api/auth/me, /api/auth/profile
│   ├── bookmarkRoutes.js   # /api/bookmarks (CRUD, type filtering, duplicate prevention)
│   └── sportsRoutes.js     # /api/sports, /api/tournaments (search & filters)
├── utils/
│   └── fallbackStore.js    # Resilient local JSON storage for development resilience
├── index.js                # Express app entry & Vite API proxy target
├── .env.example            # Environment template
└── .env                    # Active configuration
```

---

## ⚡ How to Run

### 1. Run Fullstack (Frontend + Backend concurrently)
```bash
npm run dev:all
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:3000` (auto-proxies `/api` requests to port 5000)

### 2. Run Backend Standalone
```bash
npm run server
```
Or with automatic restart on file changes:
```bash
npm run server:dev
```

### 3. Run Backend Verification Tests
```bash
npm run test:backend
```

---

## 🍃 MongoDB Configuration

By default, the server connects to:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/sideline_sports
```

### Options:
1. **Local MongoDB**:
   Start your local MongoDB service:
   ```powershell
   net start MongoDB
   ```
2. **MongoDB Atlas (Cloud)**:
   Add your Atlas cluster URI into `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sideline_sports?retryWrites=true&w=majority
   ```
3. **Automatic Fallback Mode**:
   If MongoDB is not running locally, the server continues working seamlessly using the built-in local JSON data store (`server/data/fallback-db.json`) so your application never crashes during development.

---

## 📡 REST API Reference

### Health & Status
- `GET /api/health`: Health status, storage mode (`MongoDB` or `Local JSON Store`), and timestamp.

### Authentication
- `POST /api/auth/register`: Create user (`username`, `email`, `password`, `favoriteSport`). Returns JWT token.
- `POST /api/auth/login`: Authenticate with email/username + password. Returns JWT token.
- `GET /api/auth/me`: Get authenticated user profile (`Authorization: Bearer <token>`).
- `PUT /api/auth/profile`: Update bio, favorite sport, avatar.

### Bookmarks (Saved Items)
- `GET /api/bookmarks`: Get all saved items for authenticated user. Optional query: `?itemType=tournament|sport|player`.
- `POST /api/bookmarks`: Save an item (`itemType`, `itemId`, `title`, `sport`, `description`, `url`).
- `DELETE /api/bookmarks/:id`: Remove bookmark by bookmark ID or item ID.
- `GET /api/bookmarks/check/:itemType/:itemId`: Check if item is bookmarked.

### Sports & Tournaments Data API
- `GET /api/sports`: List all 20 sports with metadata, category, and tournament counts.
- `GET /api/sports/:slug`: Get details and official rules for a specific sport.
- `GET /api/tournaments?q=query&sport=cricket&category=world`: Search and filter 193 global tournaments.
