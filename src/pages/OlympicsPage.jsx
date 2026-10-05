import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  SIDELINE_ALL_TIME_OLYMPIC_MEDALS,
  SIDELINE_OLYMPICS_EDITIONS,
  SIDELINE_OLYMPICS_HERITAGE,
} from "../data/olympicsData";
import SafeImage from "../components/common/SafeImage";

export default function OlympicsPage() {
  const editionKeys = useMemo(() => Object.keys(SIDELINE_OLYMPICS_EDITIONS || {}), []);
  const [currentEditionId, setCurrentEditionId] = useState("paris-2024");
  const [activeTab, setActiveTab] = useState("medals"); // 'medals' | 'events' | 'heritage'

  // Medal tab state
  const [showingAllTime, setShowingAllTime] = useState(false);
  const [medalSearch, setMedalSearch] = useState("");
  const [sortField, setSortField] = useState("rank"); // 'rank' | 'gold' | 'silver' | 'bronze' | 'total' | 'nation'
  const [sortAsc, setSortAsc] = useState(true);

  // Events tab state
  const [eventSportFilter, setEventSportFilter] = useState("all");
  const [eventSearch, setEventSearch] = useState("");

  const edition = SIDELINE_OLYMPICS_EDITIONS[currentEditionId] || SIDELINE_OLYMPICS_EDITIONS["paris-2024"];

  // Resolves the medal tally reliably (handles medalTally and medalsTable)
  const rawMedalsList = useMemo(() => {
    if (showingAllTime) {
      return SIDELINE_ALL_TIME_OLYMPIC_MEDALS || [];
    }
    return edition.medalTally || edition.medalsTable || [];
  }, [showingAllTime, edition]);

  // Aggregate stats
  const totals = useMemo(() => {
    let gold = 0;
    let silver = 0;
    let bronze = 0;
    rawMedalsList.forEach((m) => {
      gold += Number(m.gold || 0);
      silver += Number(m.silver || 0);
      bronze += Number(m.bronze || 0);
    });
    return { gold, silver, bronze, total: gold + silver + bronze, nations: rawMedalsList.length };
  }, [rawMedalsList]);

  // Filter and sort medals
  const filteredAndSortedMedals = useMemo(() => {
    const q = medalSearch.trim().toLowerCase();
    const filtered = rawMedalsList.filter((m) => {
      if (!q) return true;
      return (
        m.nation.toLowerCase().includes(q) ||
        (m.code && m.code.toLowerCase().includes(q))
      );
    });

    return [...filtered].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") {
        const comp = valA.localeCompare(valB);
        return sortAsc ? comp : -comp;
      }

      valA = Number(valA || 0);
      valB = Number(valB || 0);

      // Default rank order is ascending (1, 2, 3), but medals default is descending (most first)
      if (sortField === "rank") {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [rawMedalsList, medalSearch, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      // For medals/total default descending, for nation/rank default ascending
      setSortAsc(field === "rank" || field === "nation");
    }
  };

  // Available sports for this edition's events
  const editionSports = useMemo(() => {
    const set = new Set();
    (edition.events || []).forEach((e) => {
      if (e.sport) set.add(e.sport);
    });
    return Array.from(set);
  }, [edition]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return (edition.events || []).filter((e) => {
      const matchesSport = eventSportFilter === "all" || e.sport === eventSportFilter;
      const matchesSearch =
        !eventSearch.trim() ||
        e.name.toLowerCase().includes(eventSearch.toLowerCase()) ||
        (e.sport && e.sport.toLowerCase().includes(eventSearch.toLowerCase())) ||
        (e.gold && e.gold.toLowerCase().includes(eventSearch.toLowerCase())) ||
        (e.silver && e.silver.toLowerCase().includes(eventSearch.toLowerCase())) ||
        (e.bronze && e.bronze.toLowerCase().includes(eventSearch.toLowerCase()));
      return matchesSport && matchesSearch;
    });
  }, [edition, eventSportFilter, eventSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest text-muted font-bold">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-live-pulse" />
          THE GREATEST SHOW ON EARTH · 1896 TO PRESENT
        </p>
        <Link
          to="/tournaments"
          className="text-xs uppercase font-display tracking-wider font-bold text-muted hover:text-ink transition-colors"
        >
          ← All Tournaments
        </Link>
      </div>

      {/* Hero Showcase with Olympic Visual Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch border border-line bg-surface rounded-2xl overflow-hidden shadow-card">
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-brand-red/10 border border-brand-red/20 text-xs font-display uppercase tracking-widest text-brand-red font-bold">
                SUMMER GAMES HERITAGE
              </span>
              <span className="px-2.5 py-0.5 rounded bg-surface-tint border border-line text-xs font-mono font-bold text-muted">
                1896 – 2024
              </span>
            </div>

            <div className="flex items-center gap-4">
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink uppercase tracking-tight leading-[0.9]">
                The Olympic Games
              </h1>
              {/* Olympic 5 rings stylized badge */}
              <div className="hidden sm:flex items-center -space-x-1 shrink-0" aria-hidden="true">
                <span className="w-5 h-5 rounded-full border-2 border-brand-blue" />
                <span className="w-5 h-5 rounded-full border-2 border-yellow-500 translate-y-1.5" />
                <span className="w-5 h-5 rounded-full border-2 border-ink" />
                <span className="w-5 h-5 rounded-full border-2 border-emerald-600 translate-y-1.5" />
                <span className="w-5 h-5 rounded-full border-2 border-brand-red" />
              </div>
            </div>

            <p className="text-muted text-sm leading-relaxed max-w-xl">
              Complete Olympic records from Athens 1896 to Paris 2024. Official medal standings, event podiums, and Olympic movement milestones across 30 modern olympiads.
            </p>
          </div>

          {/* Global Olympic Stat Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-line/70">
            <div className="bg-paper p-3 rounded-xl border border-line text-center">
              <strong className="block text-2xl font-display font-bold text-ink">33</strong>
              <span className="text-[10px] uppercase font-display tracking-wider text-muted font-bold">Summer Editions</span>
            </div>
            <div className="bg-paper p-3 rounded-xl border border-line text-center">
              <strong className="block text-2xl font-display font-bold text-ink">206</strong>
              <span className="text-[10px] uppercase font-display tracking-wider text-muted font-bold">Nations / NOCs</span>
            </div>
            <div className="bg-paper p-3 rounded-xl border border-line text-center">
              <strong className="block text-2xl font-display font-bold text-ink">130y</strong>
              <span className="text-[10px] uppercase font-display tracking-wider text-muted font-bold">Modern History</span>
            </div>
            <div className="bg-paper p-3 rounded-xl border border-line text-center">
              <strong className="block text-2xl font-display font-bold text-ink">329+</strong>
              <span className="text-[10px] uppercase font-display tracking-wider text-muted font-bold">Gold Events</span>
            </div>
          </div>
        </div>

        {/* Right: Olympic Stadium Action Photo */}
        <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[300px] bg-ink overflow-hidden group">
          <SafeImage
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80"
            alt="Olympic athletes racing on running track in packed stadium"
            containerClassName="absolute inset-0"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            credit="Olympic Stadium Track · Unsplash Archive"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-paper text-xs uppercase font-display tracking-widest font-semibold pointer-events-none">
            <span className="bg-paper/20 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold">
              CITIUS · ALTIUS · FORTIUS
            </span>
            <span className="text-paper/80 font-mono text-[11px]">
              OLYMPIAD ARCHIVE
            </span>
          </div>
        </div>
      </section>

      {/* Horizontal Edition Selector Carousel Bar */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max border border-line bg-surface p-1.5 rounded-xl shadow-card">
          {editionKeys.map((key) => {
            const ed = SIDELINE_OLYMPICS_EDITIONS[key];
            const isActive = key === currentEditionId;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setCurrentEditionId(key);
                  setShowingAllTime(false);
                  setEventSportFilter("all");
                  setMedalSearch("");
                  setEventSearch("");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-wider font-bold transition-all flex flex-col items-center leading-tight ${
                  isActive
                    ? "bg-ink text-paper shadow-sm"
                    : "text-muted hover:text-ink hover:bg-surface-tint"
                }`}
              >
                <span className="text-sm font-extrabold">{ed.year}</span>
                <span className="text-[10px] font-normal opacity-90">{ed.hostCity.split(",")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Edition Hero Banner */}
      <article className="border border-line bg-surface rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded bg-surface-tint border border-line text-xs font-mono text-muted uppercase">
              {edition.officialTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink uppercase">
              {edition.name} · <span className="text-muted font-normal">{edition.hostCity}</span>
            </h2>
            {edition.motto && (
              <p className="text-xs uppercase font-display font-bold tracking-widest text-brand-red">
                &ldquo;{edition.motto}&rdquo;
              </p>
            )}
          </div>

          <p className="text-xs text-muted max-w-md leading-relaxed">
            {edition.summary}
          </p>
        </div>

        {/* Fact Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-line/60 pt-4">
          <div className="bg-paper p-3 rounded-lg border border-line/60">
            <span className="text-[10px] uppercase font-display tracking-wider text-muted font-bold">Dates</span>
            <p className="text-xs font-semibold text-ink mt-0.5">{edition.dates}</p>
          </div>
          <div className="bg-paper p-3 rounded-lg border border-line/60">
            <span className="text-[10px] uppercase font-display tracking-wider text-muted font-bold">Nations</span>
            <p className="text-xs font-semibold text-ink mt-0.5">{edition.nations} NOCs</p>
          </div>
          <div className="bg-paper p-3 rounded-lg border border-line/60">
            <span className="text-[10px] uppercase font-display tracking-wider text-muted font-bold">Athletes</span>
            <p className="text-xs font-semibold text-ink mt-0.5">{edition.athletes.toLocaleString()}</p>
          </div>
          <div className="bg-paper p-3 rounded-lg border border-line/60">
            <span className="text-[10px] uppercase font-display tracking-wider text-muted font-bold">Events & Sports</span>
            <p className="text-xs font-semibold text-ink mt-0.5">{edition.eventsCount} in {edition.sportsCount} Sports</p>
          </div>
        </div>
      </article>

      {/* 3 Unified View Tabs */}
      <div className="border-b border-line flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("medals")}
          className={`py-3 px-4 font-display text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "medals"
              ? "border-ink text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          <span>🥇</span> Medal Table ({rawMedalsList.length} Nations)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("events")}
          className={`py-3 px-4 font-display text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "events"
              ? "border-ink text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          <span>🏅</span> Events & Podium Results ({edition.events?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("heritage")}
          className={`py-3 px-4 font-display text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "heritage"
              ? "border-ink text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          <span>🏛️</span> Olympic Heritage & Timeline
        </button>
      </div>

      {/* TAB 1: MEDAL TABLE */}
      {activeTab === "medals" && (
        <div className="space-y-6">
          {/* Medal Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface p-4 rounded-xl border border-line shadow-card">
              <span className="text-[11px] font-display uppercase tracking-wider text-muted font-bold">
                Medal-Winning Nations
              </span>
              <p className="text-2xl font-display font-extrabold text-ink mt-1">
                {totals.nations} <span className="text-xs text-muted font-normal">NOCs</span>
              </p>
            </div>
            <div className="bg-surface p-4 rounded-xl border border-line shadow-card bg-gold/5">
              <span className="text-[11px] font-display uppercase tracking-wider text-gold font-bold flex items-center gap-1">
                <span>🥇</span> Total Gold Medals
              </span>
              <p className="text-2xl font-display font-extrabold text-ink mt-1">
                {totals.gold}
              </p>
            </div>
            <div className="bg-surface p-4 rounded-xl border border-line shadow-card bg-silver/5">
              <span className="text-[11px] font-display uppercase tracking-wider text-silver font-bold flex items-center gap-1">
                <span>🥈</span> Total Silver Medals
              </span>
              <p className="text-2xl font-display font-extrabold text-ink mt-1">
                {totals.silver}
              </p>
            </div>
            <div className="bg-surface p-4 rounded-xl border border-line shadow-card bg-bronze/5">
              <span className="text-[11px] font-display uppercase tracking-wider text-bronze font-bold flex items-center gap-1">
                <span>🥉</span> Total Bronze Medals
              </span>
              <p className="text-2xl font-display font-extrabold text-ink mt-1">
                {totals.bronze}
              </p>
            </div>
          </div>

          {/* Medal Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-line shadow-card">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowingAllTime(false);
                  setSortField("rank");
                  setSortAsc(true);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase font-display font-bold tracking-wider transition-colors ${
                  !showingAllTime
                    ? "bg-ink text-paper shadow-sm"
                    : "bg-surface-tint border border-line text-muted hover:text-ink"
                }`}
              >
                {edition.year} {edition.hostCity.split(",")[0]} Table
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowingAllTime(true);
                  setSortField("rank");
                  setSortAsc(true);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase font-display font-bold tracking-wider transition-colors ${
                  showingAllTime
                    ? "bg-ink text-paper shadow-sm"
                    : "bg-surface-tint border border-line text-muted hover:text-ink"
                }`}
              >
                All-Time Summer Games Table (1896–2024)
              </button>
            </div>

            {/* Search Box with Clear */}
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted text-xs">
                🔍
              </span>
              <input
                type="search"
                value={medalSearch}
                onChange={(e) => setMedalSearch(e.target.value)}
                placeholder="Search nation or NOC code…"
                className="w-full pl-8 pr-8 py-1.5 bg-paper border border-line rounded-lg text-xs text-ink placeholder-muted focus:outline-none focus:ring-1 focus:ring-ink"
              />
              {medalSearch && (
                <button
                  type="button"
                  onClick={() => setMedalSearch("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-ink text-sm font-bold"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="border border-line rounded-xl overflow-x-auto bg-surface shadow-card">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-tint/80 border-b border-line text-muted uppercase font-display tracking-wider text-[11px]">
                  <th
                    className="py-3 px-4 font-bold w-16 cursor-pointer hover:text-ink select-none"
                    onClick={() => handleSort("rank")}
                    title="Sort by rank"
                  >
                    Rank {sortField === "rank" ? (sortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th
                    className="py-3 px-4 font-bold cursor-pointer hover:text-ink select-none"
                    onClick={() => handleSort("nation")}
                    title="Sort alphabetically by nation"
                  >
                    Nation / National Olympic Committee {sortField === "nation" ? (sortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th
                    className="py-3 px-4 font-bold text-center w-24 text-gold cursor-pointer hover:underline select-none bg-gold/5"
                    onClick={() => handleSort("gold")}
                    title="Sort by gold medals"
                  >
                    🥇 Gold {sortField === "gold" ? (sortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th
                    className="py-3 px-4 font-bold text-center w-24 text-silver cursor-pointer hover:underline select-none bg-silver/5"
                    onClick={() => handleSort("silver")}
                    title="Sort by silver medals"
                  >
                    🥈 Silver {sortField === "silver" ? (sortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th
                    className="py-3 px-4 font-bold text-center w-24 text-bronze cursor-pointer hover:underline select-none bg-bronze/5"
                    onClick={() => handleSort("bronze")}
                    title="Sort by bronze medals"
                  >
                    🥉 Bronze {sortField === "bronze" ? (sortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th
                    className="py-3 px-4 font-bold text-center w-28 cursor-pointer hover:underline select-none bg-surface-tint/60"
                    onClick={() => handleSort("total")}
                    title="Sort by total medals"
                  >
                    Total {sortField === "total" ? (sortAsc ? "▲" : "▼") : ""}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {filteredAndSortedMedals.map((m) => (
                  <tr key={m.nation} className="hover:bg-surface-tint/40 transition-colors">
                    <td className="py-2.5 px-4 font-display font-bold text-sm text-ink">
                      {m.rank <= 3 ? (
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-paper ${
                            m.rank === 1 ? "bg-gold" : m.rank === 2 ? "bg-silver" : "bg-bronze"
                          }`}
                        >
                          {m.rank}
                        </span>
                      ) : (
                        `#${m.rank}`
                      )}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-ink">
                      <span>{m.nation}</span>
                      {m.code && (
                        <span className="ml-2 font-mono text-[11px] text-muted bg-surface-tint px-1.5 py-0.5 rounded border border-line/60">
                          {m.code}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-center font-bold font-mono text-ink text-sm bg-gold/5">
                      {m.gold}
                    </td>
                    <td className="py-2.5 px-4 text-center font-bold font-mono text-ink text-sm bg-silver/5">
                      {m.silver}
                    </td>
                    <td className="py-2.5 px-4 text-center font-bold font-mono text-ink text-sm bg-bronze/5">
                      {m.bronze}
                    </td>
                    <td className="py-2.5 px-4 text-center font-extrabold font-mono text-ink text-sm bg-surface-tint/40">
                      {m.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedMedals.length === 0 && (
            <div className="py-12 text-center text-muted bg-surface rounded-xl border border-line">
              <p className="text-base font-semibold text-ink">No nations match &ldquo;{medalSearch}&rdquo;</p>
              <button
                type="button"
                onClick={() => setMedalSearch("")}
                className="mt-3 text-xs uppercase font-display font-bold tracking-wider text-brand-blue hover:underline"
              >
                Clear search filter
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EVENTS & RESULTS */}
      {activeTab === "events" && (
        <div className="space-y-6">
          {/* Events Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-line shadow-card">
            {/* Sport Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setEventSportFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase font-display font-bold tracking-wider whitespace-nowrap transition-colors ${
                  eventSportFilter === "all"
                    ? "bg-ink text-paper"
                    : "bg-surface-tint border border-line text-muted hover:text-ink"
                }`}
              >
                All Sports ({edition.events?.length || 0})
              </button>
              {editionSports.map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setEventSportFilter(sp)}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase font-display font-bold tracking-wider whitespace-nowrap transition-colors ${
                    eventSportFilter === sp
                      ? "bg-ink text-paper"
                      : "bg-surface-tint border border-line text-muted hover:text-ink"
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted text-xs">
                🔍
              </span>
              <input
                type="search"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Search event, athlete, country…"
                className="w-full pl-8 pr-3 py-1.5 bg-paper border border-line rounded-lg text-xs text-ink placeholder-muted focus:outline-none focus:ring-1 focus:ring-ink"
              />
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev, idx) => (
              <div
                key={idx}
                className="bg-surface border border-line rounded-xl p-5 shadow-card hover:shadow-lift transition-all space-y-4"
              >
                <div className="flex items-center justify-between border-b border-line/60 pb-2">
                  <span className="text-[11px] font-display uppercase tracking-wider font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded">
                    {ev.sport}
                  </span>
                  {ev.mark && (
                    <span className="text-xs font-mono text-muted">{ev.mark}</span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-ink leading-tight">
                  {ev.name}
                </h3>

                {/* Podium Rows */}
                <div className="space-y-2 pt-1 text-xs">
                  {ev.gold && (
                    <div className="flex items-center gap-2 p-2 rounded bg-gold/10 border border-gold/20">
                      <span className="text-sm font-bold text-gold">🥇</span>
                      <div className="leading-tight flex-1">
                        <strong className="block text-ink font-semibold">{ev.gold}</strong>
                        {ev.goldCountry && <span className="text-[11px] text-muted">{ev.goldCountry}</span>}
                      </div>
                    </div>
                  )}

                  {ev.silver && (
                    <div className="flex items-center gap-2 p-2 rounded bg-silver/10 border border-silver/20">
                      <span className="text-sm font-bold text-silver">🥈</span>
                      <div className="leading-tight flex-1">
                        <strong className="block text-ink font-semibold">{ev.silver}</strong>
                        {ev.silverCountry && <span className="text-[11px] text-muted">{ev.silverCountry}</span>}
                      </div>
                    </div>
                  )}

                  {ev.bronze && (
                    <div className="flex items-center gap-2 p-2 rounded bg-bronze/10 border border-bronze/20">
                      <span className="text-sm font-bold text-bronze">🥉</span>
                      <div className="leading-tight flex-1">
                        <strong className="block text-ink font-semibold">{ev.bronze}</strong>
                        {ev.bronzeCountry && <span className="text-[11px] text-muted">{ev.bronzeCountry}</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="py-12 text-center text-muted bg-surface rounded-xl border border-line">
              <p className="text-base font-semibold text-ink">No events match your search.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: OLYMPIC HERITAGE & TIMELINE */}
      {activeTab === "heritage" && (
        <div className="space-y-10">
          {/* Origins section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-card space-y-3">
              <p className="text-xs uppercase font-display tracking-widest text-brand-red font-bold">
                OLYMPIA 776 BC – 393 AD
              </p>
              <h3 className="text-2xl font-display font-bold text-ink">
                {SIDELINE_OLYMPICS_HERITAGE.ancientOrigins.title}
              </h3>
              <p className="text-sm text-ink/90 leading-relaxed bg-paper p-4 rounded-xl border border-line/60">
                {SIDELINE_OLYMPICS_HERITAGE.ancientOrigins.text}
              </p>
            </div>

            <div className="bg-surface p-6 rounded-2xl border border-line shadow-card space-y-3">
              <p className="text-xs uppercase font-display tracking-widest text-brand-blue font-bold">
                ATHENS 1896 REVIVAL
              </p>
              <h3 className="text-2xl font-display font-bold text-ink">
                {SIDELINE_OLYMPICS_HERITAGE.modernResurrection.title}
              </h3>
              <p className="text-sm text-ink/90 leading-relaxed bg-paper p-4 rounded-xl border border-line/60">
                {SIDELINE_OLYMPICS_HERITAGE.modernResurrection.text}
              </p>
            </div>
          </div>

          {/* Symbols & Values Grid */}
          <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-line shadow-card space-y-6">
            <div>
              <p className="text-xs uppercase font-display tracking-widest text-muted font-bold">
                CHARTER & PRINCIPLES
              </p>
              <h3 className="text-2xl font-display font-bold text-ink uppercase mt-0.5">
                {SIDELINE_OLYMPICS_HERITAGE.symbolsAndValues.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SIDELINE_OLYMPICS_HERITAGE.symbolsAndValues.values.map((v, i) => (
                <div key={i} className="bg-paper p-5 rounded-xl border border-line/70 space-y-2">
                  <h4 className="font-display font-bold text-lg text-ink">{v.name}</h4>
                  <p className="text-xs text-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Evolution Timeline */}
          <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-line shadow-card space-y-6">
            <div>
              <p className="text-xs uppercase font-display tracking-widest text-muted font-bold">
                1896 TO 2024
              </p>
              <h3 className="text-2xl font-display font-bold text-ink uppercase mt-0.5">
                Olympic Movement Evolution Milestones
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SIDELINE_OLYMPICS_HERITAGE.evolutionMilestones.map((m, i) => (
                <div
                  key={i}
                  className="bg-paper p-4 rounded-xl border border-line/70 flex items-start gap-3"
                >
                  <div className="px-2.5 py-1 rounded bg-ink text-paper text-xs font-mono font-bold shrink-0">
                    {m.year}
                  </div>
                  <div className="text-xs space-y-1">
                    <strong className="block text-ink font-semibold">{m.city}</strong>
                    <p className="text-muted leading-relaxed">{m.milestone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
