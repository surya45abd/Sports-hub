import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { sports, sportSlug, SPORT_ICONS, SPORT_CATEGORIES } from "../data/sports";
import SafeImage from "../components/common/SafeImage";

// Ticker news items
const TICKER_ITEMS = [
  { icon: "🏆", tag: "PARIS 2024", text: "Olympic Games tally complete: USA & China tie with 40 Golds each across 329 events" },
  { icon: "🏏", tag: "T20 WORLD CUP", text: "India crowned World Champions after dramatic 7-run victory over South Africa" },
  { icon: "⚽", tag: "UEFA EURO 2024", text: "Spain lifts 4th European Championship with historic 2-1 final victory in Berlin" },
  { icon: "🎾", tag: "WIMBLEDON", text: "Carlos Alcaraz defends crown in straight sets; Barbora Krejcikova captures women's singles" },
  { icon: "🏎️", tag: "FORMULA 1", text: "24-round World Championship season spanning 5 continents and premier street circuits" },
  { icon: "🏀", tag: "NBA FINALS", text: "Boston Celtics secure historic 18th NBA Championship banner" },
  { icon: "🏑", tag: "HOCKEY WORLD CUP", text: "Germany men and Netherlands women reign supreme on global field hockey stage" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "/" &&
        document.activeElement !== searchInputRef.current &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute unique categories
  const categories = useMemo(() => {
    const cats = new Set(Object.values(SPORT_CATEGORIES));
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter sports by search query and category
  const filteredSports = useMemo(() => {
    return sports.filter((sport) => {
      const matchesSearch =
        search.trim() === "" ||
        sport.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        (sport.summary && sport.summary.toLowerCase().includes(search.trim().toLowerCase())) ||
        (sport.tournaments && sport.tournaments.some(([name]) => name.toLowerCase().includes(search.trim().toLowerCase())));

      const sportCat = SPORT_CATEGORIES[sport.name] || "Sport";
      const matchesCategory = selectedCategory === "all" || sportCat === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* 1. Live Editorial Sports Ticker */}
      <section className="bg-ink text-paper rounded-xl overflow-hidden border border-line shadow-sm flex items-center">
        <div className="bg-brand-red text-paper px-3 py-2 text-[11px] font-display uppercase tracking-widest font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0">
          <span className="w-2 h-2 rounded-full bg-paper animate-live-pulse" />
          <span>LATEST DESK ARCHIVE</span>
        </div>
        <div className="overflow-x-auto py-2 px-3 flex items-center gap-6 text-xs text-paper/85 whitespace-nowrap scrollbar-none font-medium">
          {TICKER_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <span className="px-1.5 py-0.5 rounded bg-paper/15 text-[10px] font-mono font-bold uppercase tracking-wider text-paper">
                {item.tag}
              </span>
              <span>{item.text}</span>
              <span className="text-paper/40 ml-3">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-line bg-surface rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-card">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-[11px] uppercase font-display tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-live-pulse" />
                GLOBAL SPORTS ENCYCLOPEDIA & ARCHIVE
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-tint border border-line text-[11px] font-mono font-medium text-muted">
                193 Tournaments · 20 Sports
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-ink uppercase leading-[0.88]">
              Find your<br />
              <span className="text-brand-red">game.</span>
            </h1>

            <p className="text-muted text-base sm:text-lg max-w-xl leading-relaxed pt-1">
              Twenty global disciplines. Official competition regulations, verified championship results,
              and all-time medal counts — engineered into an ultra-fast sports desk archive.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-line/70">
            <div>
              <span className="block text-2xl sm:text-3xl font-display font-bold text-ink">20</span>
              <span className="text-[11px] uppercase font-display tracking-wider text-muted font-bold">Sports Hubs</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-display font-bold text-ink">193</span>
              <span className="text-[11px] uppercase font-display tracking-wider text-muted font-bold">Tournaments</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-display font-bold text-ink">100%</span>
              <span className="text-[11px] uppercase font-display tracking-wider text-muted font-bold">Verified History</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-display font-bold text-ink">1896-2024</span>
              <span className="text-[11px] uppercase font-display tracking-wider text-muted font-bold">Olympic Medals</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/tournaments"
              className="px-6 py-3 bg-ink text-paper rounded-lg font-display text-sm uppercase tracking-wider font-bold hover:bg-brand-red transition-all shadow-sm flex items-center gap-2"
            >
              Browse 193 Tournaments <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/olympics"
              className="px-6 py-3 border border-line bg-surface-tint hover:bg-line text-ink rounded-lg font-display text-sm uppercase tracking-wider font-bold transition-all flex items-center gap-2"
            >
              Olympic Games Archive <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Stadium Photo Showcase with SafeImage */}
        <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden group border border-line shadow-card flex flex-col justify-end">
          <SafeImage
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80"
            alt="Colosseum of sport stadium under bright night floodlights"
            containerClassName="absolute inset-0"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            showCredit={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />
          
          <div className="relative z-10 p-5 space-y-2 text-paper">
            <div className="flex items-center justify-between text-xs uppercase font-display tracking-widest font-semibold">
              <span className="px-2 py-0.5 rounded bg-brand-red text-paper text-[10px] font-bold">EDITORIAL SHOWCASE</span>
              <span className="bg-paper/20 backdrop-blur-sm px-2.5 py-0.5 rounded text-[11px]">ALL 20 DISCIPLINES</span>
            </div>
            <h3 className="text-2xl font-display font-bold leading-tight">
              From Grassroots Pitches to Olympic Podiums
            </h3>
            <p className="text-paper/80 text-xs line-clamp-2">
              Explore regulations, match formats, trophy records, and chronological championship tables.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pick a Sport Section */}
      <section id="sports" className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="text-xs uppercase font-display tracking-widest text-muted font-bold">
              PORTAL DIRECTORY
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink uppercase">
              What are we exploring?
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted text-sm">
              ⌕
            </span>
            <input
              ref={searchInputRef}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find sport, tournament, venue…"
              className="w-full pl-9 pr-14 py-2 bg-surface border border-line rounded-lg text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent transition-all shadow-sm"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-ink font-bold text-sm"
                title="Clear search"
              >
                ×
              </button>
            ) : (
              <kbd className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-muted font-mono font-bold">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const label = cat === "all" ? "All 20 Sports" : cat;
            const count =
              cat === "all"
                ? sports.length
                : sports.filter((s) => (SPORT_CATEGORIES[s.name] || "") === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-display uppercase tracking-wider font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-ink text-paper shadow-sm"
                    : "bg-surface border border-line text-muted hover:text-ink hover:bg-surface-tint"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-paper/20 text-paper" : "bg-line text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 20 Sports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredSports.map((sport) => {
            const index = sports.indexOf(sport);
            const slug = sportSlug(sport);
            const icon = SPORT_ICONS[sport.name] || "🏅";
            const category = SPORT_CATEGORIES[sport.name] || "Sport";

            return (
              <Link
                key={sport.name}
                to={`/tournaments/${slug}`}
                className="group relative h-56 rounded-2xl overflow-hidden border border-line bg-surface shadow-card hover:shadow-lift hover:border-ink/40 transition-all duration-300 flex flex-col justify-between p-4"
              >
                {/* Visual SafeImage Background with smooth zoom */}
                <SafeImage
                  src={sport.image}
                  alt={sport.name}
                  containerClassName="absolute inset-0"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  showCredit={false}
                />
                
                {/* Gradient darkening layer for crystal-clear readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/25 group-hover:via-ink/60 transition-colors" />

                {/* Card Top: Number pill, Icon & Category */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface/30 backdrop-blur-md text-paper text-xs font-mono font-bold border border-paper/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base" role="img" aria-label={sport.name}>
                      {icon}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-paper/20 backdrop-blur-md text-paper text-[10px] uppercase font-display tracking-wider font-semibold border border-paper/10">
                    {category}
                  </span>
                </div>

                {/* Card Bottom: Sport Name, Tournaments Count & Summary */}
                <div className="relative z-10 space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-display font-bold text-paper group-hover:text-acid transition-colors">
                      {sport.name}
                    </h3>
                    <span className="text-paper/85 text-[11px] font-display uppercase tracking-wider font-bold group-hover:text-acid transition-colors whitespace-nowrap">
                      {sport.tournaments?.length || 4} Tournaments ↗
                    </span>
                  </div>

                  <p className="text-paper/75 text-xs line-clamp-2 leading-relaxed">
                    {sport.summary}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredSports.length === 0 && (
          <div className="py-16 text-center text-muted bg-surface rounded-2xl border border-line p-8 space-y-3">
            <span className="text-3xl">🔍</span>
            <p className="text-lg font-bold text-ink">No sports match &quot;{search}&quot;</p>
            <p className="text-sm">Try searching for Cricket, Football, Tennis, or Olympic events.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 bg-ink text-paper rounded-lg text-xs uppercase font-display font-bold tracking-wider hover:bg-brand-red transition-colors inline-block mt-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Photo credit attribution */}
        <p className="text-[11px] text-muted pt-2 text-center sm:text-left font-mono">
          Photos: Curated via Unsplash high-resolution editorial collections. Licensed under free editorial terms.
        </p>
      </section>

      {/* 4. Featured Hub Spotlight Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Spotlight 1: Tennis Grand Slams */}
        <Link
          to="/tournaments/tennis"
          className="border border-line bg-surface p-6 rounded-2xl shadow-card hover:shadow-lift transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🎾</span>
            <span className="text-xs uppercase font-display tracking-widest text-brand-red font-bold">
              THE 4 GRAND SLAMS
            </span>
          </div>
          <h3 className="text-xl font-display font-bold text-ink group-hover:text-brand-red transition-colors">
            Tennis Majors Archive
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            Wimbledon, Roland-Garros, Australian Open, and US Open — surface dynamics, sets format, and historic title-holders.
          </p>
          <span className="inline-flex items-center gap-1 text-xs uppercase font-display tracking-wider font-bold text-ink group-hover:translate-x-1 transition-transform">
            Explore Tennis Hub →
          </span>
        </Link>

        {/* Spotlight 2: Football World Cup & Champions League */}
        <Link
          to="/tournaments/football"
          className="border border-line bg-surface p-6 rounded-2xl shadow-card hover:shadow-lift transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">⚽</span>
            <span className="text-xs uppercase font-display tracking-widest text-brand-blue font-bold">
              CLUB & COUNTRY
            </span>
          </div>
          <h3 className="text-xl font-display font-bold text-ink group-hover:text-brand-blue transition-colors">
            World Football Calender
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            FIFA World Cup, UEFA Champions League, Premier League, and Copa America — knockouts, group stages, and final scorelines.
          </p>
          <span className="inline-flex items-center gap-1 text-xs uppercase font-display tracking-wider font-bold text-ink group-hover:translate-x-1 transition-transform">
            Explore Football Hub →
          </span>
        </Link>

        {/* Spotlight 3: Olympic Games Archive */}
        <Link
          to="/olympics"
          className="border border-line bg-surface p-6 rounded-2xl shadow-card hover:shadow-lift transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🥇</span>
            <span className="text-xs uppercase font-display tracking-widest text-gold font-bold">
              OLYMPIC HERITAGE
            </span>
          </div>
          <h3 className="text-xl font-display font-bold text-ink group-hover:text-gold transition-colors">
            Summer Games 1896–2024
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            Full medal standings, gold/silver/bronze leaderboards, podium highlights, and legacy facts across 30 editions.
          </p>
          <span className="inline-flex items-center gap-1 text-xs uppercase font-display tracking-wider font-bold text-ink group-hover:translate-x-1 transition-transform">
            View Olympic Tally →
          </span>
        </Link>
      </section>
    </div>
  );
}
