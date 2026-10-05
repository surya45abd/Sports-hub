import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line bg-paper mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-ink"
          >
            <span className="w-6 h-6 rounded bg-ink text-paper flex items-center justify-center font-display text-sm font-bold">
              S
            </span>
            <span>SIDELINE</span>
            <span className="text-brand-red text-2xl leading-none">.</span>
          </Link>
          <span className="hidden sm:inline text-muted text-sm border-l border-line pl-3 ml-1">
            Follow the moments that move the game.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted">
          <Link to="/" className="hover:text-ink transition-colors">
            All Sports
          </Link>
          <Link to="/tournaments" className="hover:text-ink transition-colors">
            Tournaments
          </Link>
          <Link to="/olympics" className="hover:text-ink transition-colors">
            Olympics
          </Link>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-xs uppercase font-display font-bold tracking-wider text-ink hover:text-brand-red border border-line hover:border-ink px-3 py-1 rounded transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
