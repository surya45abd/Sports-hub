import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { sports, sportSlug, getSportBySlug, SPORT_ICONS, SPORT_CATEGORIES } from "../data/sports";
import { SIDELINE_SPORTS_RULES, SIDELINE_TOURNAMENT_METADATA } from "../data/sportsRules";
import { SIDELINE_FAMOUS_PLAYERS } from "../data/famousPlayers";
import { getTournamentImage } from "../data/tournamentImages";
import SafeImage from "../components/common/SafeImage";
import ResultsModal from "../components/modals/ResultsModal";
import PlayerModal from "../components/modals/PlayerModal";

export default function SportHubPage() {
  const { sportSlug: paramSlug } = useParams();
  const navigate = useNavigate();

  // Active sport fallback to Cricket if none specified
  const currentSport = useMemo(() => {
    if (!paramSlug) return sports[0];
    return getSportBySlug(paramSlug) || sports[0];
  }, [paramSlug]);

  const activeSlug = sportSlug(currentSport);
  const activeIndex = sports.indexOf(currentSport);
  const sportIcon = SPORT_ICONS[currentSport.name] || "🏅";
  const sportCategory = SPORT_CATEGORIES[currentSport.name] || "Sport";

  // Active tab: 'tournaments' | 'rules' | 'legends'
  const [activeTab, setActiveTab] = useState("tournaments");

  // Tournament tab filters
  const [tournamentSearch, setTournamentSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  // Modals state
  const [activeResultModal, setActiveResultModal] = useState(null);
  const [activePlayerModal, setActivePlayerModal] = useState(null);

  // Rules and Legends data for this sport
  const sportRules = SIDELINE_SPORTS_RULES?.[currentSport.name] || {};
  const sportLegends = SIDELINE_FAMOUS_PLAYERS?.[currentSport.name] || [];

  // Tournament list for current sport
  const tournamentsList = useMemo(() => {
    return (currentSport.tournaments || []).map((item) => {
      const [name, url, archiveUrl] = Array.isArray(item)
        ? item
        : [item.name || item, item.url || "", item.archiveUrl || ""];
      const meta = SIDELINE_TOURNAMENT_METADATA?.[name] || {};
      return {
        name,
        url,
        archiveUrl: archiveUrl || url,
        slug: sportSlug(name),
        ...meta,
      };
    });
  }, [currentSport]);

  // Extract all categories available for this sport
  const availableCategories = useMemo(() => {
    const cats = new Set();
    tournamentsList.forEach((t) => {
      if (Array.isArray(t.categories)) {
        t.categories.forEach((c) => cats.add(c));
      }
    });
    return Array.from(cats);
  }, [tournamentsList]);

  // Filter tournaments by search and category
  const filteredTournaments = useMemo(() => {
    return tournamentsList.filter((t) => {
      const matchesSearch =
        tournamentSearch.trim() === "" ||
        t.name.toLowerCase().includes(tournamentSearch.toLowerCase()) ||
        (t.venue && t.venue.toLowerCase().includes(tournamentSearch.toLowerCase())) ||
        (t.format && t.format.toLowerCase().includes(tournamentSearch.toLowerCase())) ||
        (t.recordHolder && t.recordHolder.toLowerCase().includes(tournamentSearch.toLowerCase()));

      const matchesCat =
        selectedCategory === "all" ||
        (Array.isArray(t.categories) && t.categories.includes(selectedCategory));

      return matchesSearch && matchesCat;
    });
  }, [tournamentsList, tournamentSearch, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Live indicator */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest text-muted font-bold">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-live-pulse" />
          <span>SPORT PORTAL & TOURNAMENT DESK</span>
        </p>
        <Link
          to="/"
          className="text-xs uppercase font-display tracking-wider font-bold text-muted hover:text-ink transition-colors flex items-center gap-1"
        >
          ← All 20 Sports
        </Link>
      </div>

      {/* Horizontal Quick-Switcher Bar */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max border border-line bg-surface p-1.5 rounded-xl shadow-card">
          {sports.map((sport) => {
            const slug = sportSlug(sport);
            const isActive = slug === activeSlug;
            const icon = SPORT_ICONS[sport.name] || "🏅";

            return (
              <button
                key={sport.name}
                type="button"
                onClick={() => {
                  navigate(`/tournaments/${slug}`);
                  setTournamentSearch("");
                  setSelectedCategory("all");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-ink text-paper shadow-sm"
                    : "text-muted hover:text-ink hover:bg-surface-tint"
                }`}
              >
                <span>{icon}</span>
                <span>{sport.name}</span>
                <span
                  className={`text-[10px] px-1 rounded ${
                    isActive ? "bg-paper/20 text-paper" : "bg-line/70 text-muted"
                  }`}
                >
                  {sport.tournaments?.length || 4}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Sport Split Hero Banner */}
      <article className="border border-line bg-surface rounded-2xl overflow-hidden shadow-card grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Sport Details & Quick Specs */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-ink text-paper text-xs font-mono font-bold flex items-center gap-1">
                <span>{sportIcon}</span>
                <span>SPORT {String(activeIndex + 1).padStart(2, "0")} / 20</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-brand-red/10 border border-brand-red/20 text-xs font-display uppercase tracking-wider text-brand-red font-bold">
                {sportCategory}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-surface-tint border border-line text-xs font-display uppercase tracking-wider text-muted font-bold">
                {sportRules.governingBody || currentSport.source}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink uppercase tracking-tight leading-[0.9]">
              {currentSport.name}
            </h1>

            <p className="text-muted text-base max-w-xl leading-relaxed">
              {currentSport.summary}
            </p>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-line/70">
            <div className="bg-paper p-3 rounded-xl border border-line/60">
              <span className="text-[10px] uppercase font-display font-bold tracking-wider text-muted block">
                Tournaments
              </span>
              <strong className="text-2xl font-display font-bold text-ink">
                {tournamentsList.length}
              </strong>
            </div>
            <div className="bg-paper p-3 rounded-xl border border-line/60">
              <span className="text-[10px] uppercase font-display font-bold tracking-wider text-muted block">
                Hall of Fame
              </span>
              <strong className="text-2xl font-display font-bold text-ink">
                {sportLegends.length}
              </strong>
            </div>
            <div className="bg-paper p-3 rounded-xl border border-line/60 col-span-2">
              <span className="text-[10px] uppercase font-display font-bold tracking-wider text-muted block">
                Federation Portal
              </span>
              <a
                href={currentSport.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-display font-bold text-brand-blue hover:underline truncate block mt-0.5"
              >
                {currentSport.source} ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Sport Photograph */}
        <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] bg-ink overflow-hidden group">
          <SafeImage
            src={currentSport.image}
            alt={currentSport.name}
            containerClassName="absolute inset-0"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            credit="Editorial Sport Photography"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-paper text-xs uppercase font-display tracking-widest font-semibold">
            <span className="bg-paper/20 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold">
              OFFICIAL HUB
            </span>
            <span className="text-paper/80 font-mono text-[11px]">
              {tournamentsList.length} Events Cataloged
            </span>
          </div>
        </div>
      </article>

      {/* Navigation Tabs (Tournaments | Rules | Legends) */}
      <div className="flex border-b border-line gap-2 sm:gap-6 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("tournaments")}
          className={`py-3 px-4 font-display text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "tournaments"
              ? "border-ink text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          <span>🏆</span> Tournaments & Competitions ({tournamentsList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rules")}
          className={`py-3 px-4 font-display text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "rules"
              ? "border-ink text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          <span>📜</span> Official Sport Rules & Field Specs
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("legends")}
          className={`py-3 px-4 font-display text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "legends"
              ? "border-ink text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          <span>⭐</span> Famous Legends & Hall of Fame ({sportLegends.length})
        </button>
      </div>

      {/* TAB 1: TOURNAMENTS & COMPETITIONS */}
      {activeTab === "tournaments" && (
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-line shadow-card">
            {/* Left: Search & Category Chips */}
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative min-w-[240px]">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted text-xs">
                  🔍
                </span>
                <input
                  type="search"
                  value={tournamentSearch}
                  onChange={(e) => setTournamentSearch(e.target.value)}
                  placeholder="Search tournaments, venues, format…"
                  className="w-full pl-8 pr-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink placeholder-muted focus:outline-none focus:ring-1 focus:ring-ink"
                />
              </div>

              {availableCategories.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`px-2.5 py-1 rounded text-[11px] font-display uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${
                      selectedCategory === "all"
                        ? "bg-ink text-paper"
                        : "bg-surface-tint border border-line text-muted hover:text-ink"
                    }`}
                  >
                    All ({tournamentsList.length})
                  </button>
                  {availableCategories.slice(0, 6).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded text-[11px] font-display uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? "bg-ink text-paper"
                          : "bg-surface-tint border border-line text-muted hover:text-ink"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Grid / List view toggle */}
            <div className="flex items-center gap-1 border border-line rounded-lg p-0.5 bg-surface-tint/60 self-end md:self-auto">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  viewMode === "grid" ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
                }`}
                title="Grid view"
              >
                ⊞ Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  viewMode === "list" ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
                }`}
                title="List view"
              >
                ☰ List
              </button>
            </div>
          </div>

          {/* Tournaments Grid View */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((t) => {
                const tourImg = getTournamentImage(currentSport.name, t.name);

                return (
                  <div
                    key={t.name}
                    className="bg-surface border border-line rounded-xl overflow-hidden shadow-card hover:shadow-lift transition-all flex flex-col justify-between group"
                  >
                    {/* Visual header for tournament */}
                    <div className="relative h-36 bg-ink overflow-hidden">
                      <SafeImage
                        src={tourImg?.url}
                        alt={t.name}
                        containerClassName="absolute inset-0"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        showCredit={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                      
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-ink/75 backdrop-blur-md border border-paper/10 text-paper">
                          {t.founded ? `Est. ${t.founded}` : "Sanctioned"}
                        </span>
                        {Array.isArray(t.categories) && t.categories[0] && (
                          <span className="text-[10px] font-display uppercase tracking-wider font-bold text-paper bg-brand-red/90 px-2 py-0.5 rounded">
                            {t.categories[0]}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3">
                        <h3 className="text-xl font-display font-bold text-paper leading-tight group-hover:text-acid transition-colors">
                          {t.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {t.format && (
                          <p className="text-xs text-muted leading-relaxed line-clamp-2">
                            {t.format}
                          </p>
                        )}

                        <div className="space-y-1.5 pt-2 text-xs border-t border-line/60">
                          {t.venue && (
                            <div className="flex items-start justify-between gap-2 text-muted">
                              <span>Venue:</span>
                              <span className="text-ink font-medium text-right line-clamp-1">{t.venue}</span>
                            </div>
                          )}
                          {t.trophy && (
                            <div className="flex items-start justify-between gap-2 text-muted">
                              <span>Trophy:</span>
                              <span className="text-ink font-medium text-right line-clamp-1">{t.trophy}</span>
                            </div>
                          )}
                          {t.recordHolder && (
                            <div className="flex items-start justify-between gap-2 text-muted">
                              <span>Record:</span>
                              <span className="text-ink font-medium text-right line-clamp-1">{t.recordHolder}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-line/60">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveResultModal({
                              sportName: currentSport.name,
                              tournamentName: t.name,
                              archiveUrl: t.archiveUrl,
                            })
                          }
                          className="px-3 py-1.5 bg-ink text-paper rounded text-xs uppercase font-display font-bold tracking-wider hover:bg-brand-red transition-colors flex items-center gap-1"
                        >
                          <span>Past Results</span>
                          <span className="text-[10px]">↗</span>
                        </button>

                        <Link
                          to={`/tournaments/${activeSlug}/${t.slug}`}
                          className="px-3 py-1.5 border border-line bg-surface-tint hover:bg-line text-ink rounded text-xs uppercase font-display font-bold tracking-wider transition-colors"
                        >
                          Regulations →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Tournaments List View */
            <div className="bg-surface border border-line rounded-xl overflow-hidden shadow-card">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-tint font-display uppercase tracking-wider text-muted font-bold text-[11px]">
                    <th className="py-3 px-4">Tournament</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Format</th>
                    <th className="py-3 px-4 hidden md:table-cell">Venue</th>
                    <th className="py-3 px-4 hidden lg:table-cell">Record Holder</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {filteredTournaments.map((t) => (
                    <tr key={t.name} className="hover:bg-surface-tint/30 transition-colors">
                      <td className="py-3 px-4">
                        <Link
                          to={`/tournaments/${activeSlug}/${t.slug}`}
                          className="font-display font-bold text-sm text-ink hover:text-brand-red transition-colors"
                        >
                          {t.name}
                        </Link>
                        {t.founded && (
                          <span className="block text-[11px] text-muted font-mono">
                            Est. {t.founded}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell text-muted">
                        {t.format || "Standard"}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-muted">
                        {t.venue || "Rotating"}
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell text-muted">
                        {t.recordHolder || "—"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveResultModal({
                                sportName: currentSport.name,
                                tournamentName: t.name,
                                archiveUrl: t.archiveUrl,
                              })
                            }
                            className="px-2.5 py-1 bg-ink text-paper rounded text-[11px] font-display font-bold uppercase tracking-wider hover:bg-brand-red transition-colors"
                          >
                            Results
                          </button>
                          <Link
                            to={`/tournaments/${activeSlug}/${t.slug}`}
                            className="px-2.5 py-1 border border-line bg-surface-tint text-ink rounded text-[11px] font-display font-bold uppercase tracking-wider hover:bg-line transition-colors"
                          >
                            Profile
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredTournaments.length === 0 && (
            <div className="py-16 text-center text-muted bg-surface rounded-xl border border-line">
              <p className="text-base font-semibold text-ink">No tournaments match your search</p>
              <button
                type="button"
                onClick={() => {
                  setTournamentSearch("");
                  setSelectedCategory("all");
                }}
                className="mt-3 text-xs uppercase font-display font-bold tracking-wider text-brand-blue hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: OFFICIAL SPORT RULES */}
      {activeTab === "rules" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Playing Area */}
            <div className="bg-surface p-6 rounded-xl border border-line shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase font-display tracking-widest text-brand-red font-bold">
                  COURT & PITCH SPECIFICATIONS
                </p>
                <span className="text-lg">📐</span>
              </div>
              <h3 className="text-xl font-display font-bold text-ink">Playing Area</h3>
              <p className="text-sm text-ink/90 leading-relaxed bg-paper p-4 rounded-lg border border-line/60">
                {sportRules.playingArea || "Official playing area specifications governed by federation guidelines."}
              </p>
              {sportRules.players && (
                <p className="text-xs text-muted">
                  <strong className="text-ink font-semibold">Competitors:</strong> {sportRules.players}
                </p>
              )}
              {sportRules.duration && (
                <p className="text-xs text-muted">
                  <strong className="text-ink font-semibold">Match Duration:</strong> {sportRules.duration}
                </p>
              )}
            </div>

            {/* Scoring System */}
            <div className="bg-surface p-6 rounded-xl border border-line shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase font-display tracking-widest text-brand-blue font-bold">
                  SCORING MECHANISM
                </p>
                <span className="text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-display font-bold text-ink">Scoring System</h3>
              <p className="text-sm text-ink/90 leading-relaxed bg-paper p-4 rounded-lg border border-line/60">
                {sportRules.scoring || "Official scoring points and match decision criteria."}
              </p>
              {sportRules.objective && (
                <p className="text-xs text-muted">
                  <strong className="text-ink font-semibold">Match Objective:</strong> {sportRules.objective}
                </p>
              )}
            </div>
          </div>

          {/* Key Rules & Violations */}
          {Array.isArray(sportRules.keyRules) && sportRules.keyRules.length > 0 && (
            <div className="bg-surface p-6 rounded-xl border border-line shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase font-display tracking-widest text-muted font-bold">
                  OFFICIAL REGULATIONS & FOULS
                </p>
                <span className="text-lg">⚖️</span>
              </div>
              <h3 className="text-xl font-display font-bold text-ink">Major Rules & Match Violations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sportRules.keyRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-paper p-3.5 rounded-lg border border-line/60 text-xs text-ink/90"
                  >
                    <span className="w-5 h-5 rounded-full bg-ink text-paper text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FAMOUS LEGENDS & HALL OF FAME */}
      {activeTab === "legends" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <div>
              <p className="text-xs uppercase font-display tracking-widest text-muted font-bold">
                HALL OF FAME & ALL-TIME GREATS
              </p>
              <h2 className="text-2xl font-display font-bold text-ink uppercase">
                {currentSport.name} Legends
              </h2>
            </div>
            <span className="text-xs text-muted font-mono">
              {sportLegends.length} Profiled Athletes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportLegends.map((player) => (
              <div
                key={player.name}
                className="bg-surface border border-line rounded-xl p-5 shadow-card hover:shadow-lift transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-display uppercase tracking-wider font-bold bg-surface-tint border border-line px-2 py-0.5 rounded text-muted">
                      {player.country}
                    </span>
                    <span className="text-xs font-medium text-muted font-mono">
                      {player.era}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-ink">
                    {player.name}
                  </h3>

                  <p className="text-xs font-semibold text-brand-red">
                    {player.role}
                  </p>

                  <p className="text-xs text-muted leading-relaxed line-clamp-3">
                    {player.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-line/60">
                  <button
                    type="button"
                    onClick={() => setActivePlayerModal(player)}
                    className="w-full py-2 bg-paper hover:bg-ink text-ink hover:text-paper border border-line rounded text-xs uppercase font-display font-bold tracking-wider transition-all"
                  >
                    View Full Profile & Honors →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sportLegends.length === 0 && (
            <div className="py-16 text-center text-muted bg-surface rounded-xl border border-line">
              <p className="text-base font-semibold text-ink">No legendary players cataloged for this sport yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Results Modal */}
      <ResultsModal
        isOpen={Boolean(activeResultModal)}
        onClose={() => setActiveResultModal(null)}
        sportName={activeResultModal?.sportName || ""}
        tournamentName={activeResultModal?.tournamentName || ""}
        archiveUrl={activeResultModal?.archiveUrl || ""}
      />

      {/* Player Modal */}
      <PlayerModal
        isOpen={Boolean(activePlayerModal)}
        onClose={() => setActivePlayerModal(null)}
        player={activePlayerModal}
      />
    </div>
  );
}
