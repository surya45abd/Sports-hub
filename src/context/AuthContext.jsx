import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("sideline_token") || null);
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // 'login' | 'register'
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);

  // Headers helper with auth token
  const getAuthHeaders = useCallback(() => {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }, [token]);

  // Load Bookmarks for authenticated user
  const fetchBookmarks = useCallback(async () => {
    if (!token) {
      setBookmarks([]);
      return;
    }
    try {
      const res = await fetch("/api/bookmarks", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.bookmarks)) {
        setBookmarks(data.bookmarks);
      }
    } catch (err) {
      console.warn("Failed to fetch bookmarks:", err);
    }
  }, [token, getAuthHeaders]);

  // Load User profile on initial mount or token change
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setUser(null);
        setBookmarks([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          await fetchBookmarks();
        } else {
          // Token invalid or expired
          logout();
        }
      } catch (err) {
        console.warn("Error verifying session:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  // REGISTER
  const register = async (username, email, password, favoriteSport) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, favoriteSport }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.token) {
        localStorage.setItem("sideline_token", data.token);
        setToken(data.token);
        setUser(data.user);
        setAuthModalOpen(false);
      }

      return data;
    } catch (err) {
      throw err;
    }
  };

  // LOGIN
  const login = async (identifier, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      if (data.token) {
        localStorage.setItem("sideline_token", data.token);
        setToken(data.token);
        setUser(data.user);
        setAuthModalOpen(false);
      }

      return data;
    } catch (err) {
      throw err;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("sideline_token");
    setToken(null);
    setUser(null);
    setBookmarks([]);
  };

  // UPDATE PROFILE
  const updateProfile = async (updates) => {
    if (!token) return;
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      console.error("Profile update error:", err);
      throw err;
    }
  };

  // ADD BOOKMARK
  const addBookmark = async (item) => {
    if (!token) {
      openAuthModal("login");
      return false;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (data.success && data.bookmark) {
        setBookmarks((prev) => [data.bookmark, ...prev.filter((b) => b.itemId !== item.itemId)]);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Add bookmark error:", err);
      return false;
    }
  };

  // REMOVE BOOKMARK
  const removeBookmark = async (bookmarkIdOrItemId) => {
    if (!token) return false;

    try {
      const res = await fetch(`/api/bookmarks/${bookmarkIdOrItemId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setBookmarks((prev) =>
          prev.filter((b) => b._id !== bookmarkIdOrItemId && b.itemId !== bookmarkIdOrItemId)
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Remove bookmark error:", err);
      return false;
    }
  };

  // TOGGLE BOOKMARK
  const toggleBookmark = async (item) => {
    if (!token) {
      openAuthModal("login");
      return false;
    }

    const exists = bookmarks.find(
      (b) => b.itemType === item.itemType && b.itemId === item.itemId
    );

    if (exists) {
      return removeBookmark(exists._id || exists.itemId);
    } else {
      return addBookmark(item);
    }
  };

  // CHECK IF ITEM IS BOOKMARKED
  const isBookmarked = (itemType, itemId) => {
    return bookmarks.some((b) => b.itemType === itemType && b.itemId === itemId);
  };

  // MODAL CONTROLS
  const openAuthModal = (mode = "login") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const openBookmarksModal = () => {
    if (!token) {
      openAuthModal("login");
    } else {
      setBookmarksModalOpen(true);
    }
  };

  const closeBookmarksModal = () => {
    setBookmarksModalOpen(false);
  };

  const value = {
    user,
    token,
    loading,
    bookmarks,
    authModalOpen,
    authModalMode,
    bookmarksModalOpen,
    login,
    register,
    logout,
    updateProfile,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    openAuthModal,
    closeAuthModal,
    openBookmarksModal,
    closeBookmarksModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export default AuthContext;
