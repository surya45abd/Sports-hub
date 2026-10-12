import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function BookmarksModal() {
  const { bookmarksModalOpen, closeBookmarksModal, bookmarks, removeBookmark, user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((b) => {
      const matchesTab = activeTab === "all" || b.itemType === activeTab;
      const matchesSearch =
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        (b.sport && b.sport.toLowerCase().includes(search.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [bookmarks, activeTab, search]);

  if (!bookmarksModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={closeBookmarksModal} />

      <div className="relative w-full max-w-2xl bg-paper border border-line rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-ink text-paper px-6 py-5 flex items-center justify-between border-b border-line shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-acid text-ink flex items-center justify-center text-base">
              ⭐
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-black tracking-tight leading-none text-paper">
                  Your Bookmarked Sports & Tournaments
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-paper/20 text-paper text-xs font-mono font-bold">
                  {bookmarks.length}
                </span>
              </div>
              <p className="text-[11px] font-mono text-paper/70 mt-0.5">
                Saved to user: <strong className="text-acid">{user?.username || "Account"}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={closeBookmarksModal}
            className="w-8 h-8 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center text-paper transition-colors"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-line bg-surface-tint flex flex-wrap gap-3 items-center justify-between shrink-0">
          <div className="flex gap-1 bg-paper border border-line rounded-xl p-1 text-xs font-display font-bold">
            {["all", "tournament", "sport", "player"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-ink text-paper shadow-xs"
                    : "text-muted hover:text-ink hover:bg-surface-tint"
                }`}
              >
                {tab === "tournament"
                  ? "Tournaments"
                  : tab === "player"
                  ? "Athletes"
                  : tab === "sport"
                  ? "Sports"
                  : "All"}
              </button>
            ))}
          </div>

          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Filter your saved items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 pl-8 rounded-xl border border-line bg-paper text-xs text-ink placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-ink"
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted">🔍</span>
          </div>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <span className="text-4xl block">🔖</span>
              <h4 className="font-display font-bold text-base text-ink">No bookmarks found</h4>
              <p className="text-xs text-muted max-w-sm mx-auto">
                {bookmarks.length === 0
                  ? "You haven't bookmarked any sports, tournaments, or athletes yet. Click the star icon on any tournament or sport to save it here!"
                  : "No bookmarks match your search or filter criteria."}
              </p>
            </div>
          ) : (
            filteredBookmarks.map((bm) => (
              <div
                key={bm._id || bm.itemId}
                className="p-3 rounded-2xl border border-line bg-surface hover:bg-surface-tint transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-xl bg-paper border border-line flex items-center justify-center text-lg shrink-0 shadow-xs">
                    {bm.itemType === "sport"
                      ? "🏅"
                      : bm.itemType === "player"
                      ? "👤"
                      : bm.itemType === "olympics"
                      ? "🏛️"
                      : "🏆"}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-ink/5 border border-line text-muted">
                        {bm.itemType}
                      </span>
                      {bm.sport && (
                        <span className="text-[10px] font-mono font-semibold text-brand-red">
                          {bm.sport}
                        </span>
                      )}
                    </div>
                    <h5 className="font-display font-bold text-sm text-ink truncate mt-0.5">
                      {bm.title}
                    </h5>
                    {bm.description && (
                      <p className="text-[11px] text-muted line-clamp-1">{bm.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {bm.url ? (
                    <Link
                      to={bm.url}
                      onClick={closeBookmarksModal}
                      className="px-3 py-1.5 rounded-lg bg-ink text-paper text-xs font-display font-bold hover:bg-brand-blue transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>Explore</span>
                      <span>→</span>
                    </Link>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => removeBookmark(bm._id || bm.itemId)}
                    className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:border-red-300 transition-colors"
                    title="Remove from bookmarks"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-tint border-t border-line flex items-center justify-between text-[11px] font-mono text-muted shrink-0">
          <span>Persisted via backend MongoDB/Mongoose</span>
          <button
            onClick={closeBookmarksModal}
            className="font-display uppercase tracking-wider font-bold text-ink hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
