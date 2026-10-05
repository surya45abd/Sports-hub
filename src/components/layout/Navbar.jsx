import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sports, sportSlug, SPORT_ICONS } from "../../data/sports";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdownOpen, setSportsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => {
    if (path === "/" && (location.pathname === "/" || location.pathname === "")) return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSportsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSportsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-line shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-ink group"
          aria-label="Sideline sports desk home"
        >
          <span className="w-8 h-8 rounded-lg bg-ink text-paper flex items-center justify-center font-display text-lg font-bold group-hover:bg-brand-red transition-colors shadow-xs">
            S
          </span>
          <span className="tracking-tight">SIDELINE</span>
          <span className="w-2 h-2 rounded-full bg-brand-red animate-live-pulse ml-0.5" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 border border-line bg-surface-tint/60 rounded-full p-1 text-xs font-display uppercase tracking-wider font-bold">
          {/* Sports Dropdown Item */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setSportsDropdownOpen(!sportsDropdownOpen)}
              onMouseEnter={() => setSportsDropdownOpen(true)}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-150 flex items-center gap-1.5 ${
                isActive("/tournaments") && location.pathname !== "/tournaments"
                  ? "bg-ink text-paper shadow-sm"
                  : "text-muted hover:text-ink hover:bg-surface"
              }`}
            >
              <span>Sports Hubs</span>
              <span className="text-[10px] opacity-75">▾</span>
            </button>

            {/* Mega Dropdown Menu */}
            {sportsDropdownOpen && (
              <div
                onMouseLeave={() => setSportsDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-[420px] bg-paper border border-line rounded-2xl shadow-modal p-4 grid grid-cols-2 gap-1.5 animate-in fade-in zoom-in-95 duration-150 z-50"
              >
                <div className="col-span-2 pb-2 mb-1 border-b border-line flex items-center justify-between">
                  <span className="text-[10px] uppercase font-display tracking-widest text-muted font-bold">
                    ALL 20 SPORTS DIRECTORY
                  </span>
                  <Link
                    to="/"
                    onClick={() => setSportsDropdownOpen(false)}
                    className="text-[11px] font-display uppercase tracking-wider text-brand-blue hover:underline font-bold"
                  >
                    View All →
                  </Link>
                </div>

                {sports.map((sport) => {
                  const slug = sportSlug(sport);
                  const icon = SPORT_ICONS[sport.name] || "🏅";
                  return (
                    <Link
                      key={sport.name}
                      to={`/tournaments/${slug}`}
                      onClick={() => setSportsDropdownOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-tint hover:border-line transition-all group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">
                        {icon}
                      </span>
                      <div className="truncate">
                        <span className="block text-xs font-display font-bold text-ink group-hover:text-brand-red transition-colors">
                          {sport.name}
                        </span>
                        <span className="block text-[10px] text-muted font-mono">
                          {sport.tournaments?.length || 4} events
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            to="/tournaments"
            className={`px-3.5 py-1.5 rounded-full transition-all duration-150 ${
              location.pathname === "/tournaments"
                ? "bg-ink text-paper shadow-sm"
                : "text-muted hover:text-ink hover:bg-surface"
            }`}
          >
            All Tournaments
          </Link>

          <Link
            to="/olympics"
            className={`px-3.5 py-1.5 rounded-full transition-all duration-150 ${
              isActive("/olympics")
                ? "bg-ink text-paper shadow-sm"
                : "text-muted hover:text-ink hover:bg-surface"
            }`}
          >
            Olympic Games
          </Link>
        </nav>

        {/* Header Right Action & Search Trigger */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const input = document.querySelector('input[type="search"]');
                input?.focus();
              }, 100);
            }}
            className="text-xs uppercase tracking-wider font-semibold font-display text-muted hover:text-ink px-3 py-1.5 border border-line bg-surface-tint rounded-lg transition-colors flex items-center gap-2 hover:border-ink"
            title="Search archive (press /)"
          >
            <span>🔍 Search</span>
            <kbd className="px-1.5 py-0.2 rounded bg-paper border border-line text-[10px] font-mono font-bold text-muted">
              /
            </kbd>
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink hover:text-brand-red focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-paper px-4 pt-2 pb-5 space-y-3">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-display uppercase tracking-wider font-bold ${
                isActive("/") && location.pathname === "/" ? "bg-ink text-paper" : "text-ink hover:bg-surface-tint"
              }`}
            >
              All 20 Sports
            </Link>
            <Link
              to="/tournaments"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-display uppercase tracking-wider font-bold ${
                location.pathname === "/tournaments" ? "bg-ink text-paper" : "text-ink hover:bg-surface-tint"
              }`}
            >
              193 Tournaments
            </Link>
            <Link
              to="/olympics"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-display uppercase tracking-wider font-bold ${
                isActive("/olympics") ? "bg-ink text-paper" : "text-ink hover:bg-surface-tint"
              }`}
            >
              Olympic Games Archive
            </Link>
          </div>

          <div className="pt-2 border-t border-line">
            <p className="px-3 text-[10px] uppercase font-display tracking-widest text-muted font-bold mb-2">
              QUICK SPORT ACCESS
            </p>
            <div className="grid grid-cols-2 gap-1 px-1 max-h-48 overflow-y-auto">
              {sports.map((s) => (
                <Link
                  key={s.name}
                  to={`/tournaments/${sportSlug(s)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 p-1.5 rounded text-xs text-ink hover:bg-surface-tint font-display"
                >
                  <span>{SPORT_ICONS[s.name] || "🏅"}</span>
                  <span className="truncate">{s.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
