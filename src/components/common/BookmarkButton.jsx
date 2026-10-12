import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function BookmarkButton({
  itemType = "tournament",
  itemId,
  title,
  sport = "",
  description = "",
  url = "",
  className = "",
  showLabel = false,
  size = "md",
}) {
  const { isBookmarked, toggleBookmark, token, openAuthModal } = useAuth();
  const bookmarked = isBookmarked(itemType, itemId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      openAuthModal("login");
      return;
    }

    toggleBookmark({
      itemType,
      itemId,
      title,
      sport,
      description,
      url,
    });
  };

  const sizeClasses =
    size === "sm"
      ? "p-1.5 text-xs"
      : size === "lg"
      ? "px-3.5 py-2 text-sm font-bold"
      : "p-2 text-sm";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={bookmarked ? `Remove ${title} from bookmarks` : `Bookmark ${title}`}
      title={
        !token
          ? "Sign in to save to bookmarks"
          : bookmarked
          ? "Remove from bookmarks"
          : "Save to bookmarks"
      }
      className={`inline-flex items-center gap-1.5 rounded-xl transition-all duration-200 border ${
        bookmarked
          ? "bg-amber-400/15 border-amber-400 text-amber-600 dark:text-amber-400 shadow-xs"
          : "bg-paper/80 backdrop-blur-xs border-line text-muted hover:text-ink hover:border-ink hover:bg-surface"
      } ${sizeClasses} ${className}`}
    >
      <svg
        className={`transition-transform duration-200 ${bookmarked ? "scale-110" : ""} ${
          size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"
        }`}
        fill={bookmarked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={bookmarked ? "0" : "2"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      {showLabel && (
        <span className="font-display font-semibold text-xs tracking-wide">
          {bookmarked ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
