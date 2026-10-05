import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { sports, sportSlug, getSportBySlug, SPORT_ICONS } from "../data/sports";
import { SIDELINE_SPORTS_RULES, SIDELINE_TOURNAMENT_RULES, SIDELINE_TOURNAMENT_METADATA } from "../data/sportsRules";
import { SIDELINE_FAMOUS_PLAYERS } from "../data/famousPlayers";
import { getTournamentHistory } from "../data/tournamentHistory";
import { SIDELINE_TOURNAMENT_IMAGES } from "../data/tournamentImages";
import SafeImage from "../components/common/SafeImage";
import PlayerModal from "../components/modals/PlayerModal";

export default function TournamentDetailPage() {
  const { sportSlug: paramSSlug, tournamentSlug: paramTSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sSlug = paramSSlug || searchParams.get("sport") || "";
  const tSlug = paramTSlug || searchParams.get("tournament") || "";

  const sport = useMemo(() => {
    return getSportBySlug(sSlug) || sports[0];
  }, [sSlug]);

  // Find matching tournament in sport's list
  const tournamentObj = useMemo(() => {
    const list = sport.tournaments || [];
    for (const item of list) {
      const name = Array.isArray(item) ? item[0] : (item.name || item);
      const url = Array.isArray(item) ? item[1] : (item.url || "");
      const archiveUrl = Array.isArray(item) ? (item[2] || item[1]) : (item.archiveUrl || item.url);
      if (
        sportSlug(name) === sportSlug(tSlug) ||
        name.toLowerCase() === decodeURIComponent(tSlug).toLowerCase()
      ) {
        return { name, url, archiveUrl };
      }
    }
    // Fallback: format name from slug
    const formatted = tSlug ? decodeURIComponent(tSlug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Tournament";
    return { name: formatted, url: "", archiveUrl: "" };
  }, [sport, tSlug]);

  const tournamentName = tournamentObj.name;
  const metadata = SIDELINE_TOURNAMENT_METADATA?.[tournamentName] || {};
  const tourneyRules = SIDELINE_TOURNAMENT_RULES?.[tournamentName] || null;
  const generalSportRules = SIDELINE_SPORTS_RULES?.[sport.name] || {};
  const sportLegends = SIDELINE_FAMOUS_PLAYERS?.[sport.name] || [];

  // Hero Image
  const heroImage = useMemo(() => {
    if (SIDELINE_TOURNAMENT_IMAGES?.getTournamentImage) {
      return SIDELINE_TOURNAMENT_IMAGES.getTournamentImage(sport.name, tournamentName);
    }
    return null;
  }, [sport.name, tournamentName]);

  // Dual-tab rules selection
  const [activeRulesTab, setActiveRulesTab] = useState(tourneyRules ? "tournament" : "sport");

  // History state
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyData, setHistoryData] = useState(null);
  const [historySearch, setHistorySearch] = useState("");
  const [activeHistoryCategory, setActiveHistoryCategory] = useState("all");

  // Player modal state
  const [activePlayerModal, setActivePlayerModal] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setHistoryLoading(true);
    setHistoryData(null);

    getTournamentHistory(sport.name, tournamentName)
      .then((data) => {
        if (isMounted) {
          setHistoryData(data);
          setHistoryLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading tournament history:", err);
        if (isMounted) setHistoryLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [sport.name, tournamentName]);

  // Sort history records newest first
  const sortRecords = (records = []) =>
    [...records].sort((a, b) => {
      const aYear = Number(String(a.year).match(/\d{4}/)?.[0] || 0);
      const bYear = Number(String(b.year).match(/\d{4}/)?.[0] || 0);
      return bYear - aYear;
    });

  const sections = useMemo(() => {
    if (Array.isArray(historyData?.sections) && historyData.sections.length > 0) {
      return historyData.sections.map((s) => ({ ...s, records: sortRecords(s.records) }));
    }
    if (historyData?.records) {
      return [
        {
          title: "Tournament history",
          records: sortRecords(historyData.records),
          archiveUrl: historyData.archiveUrl,
        },
      ];
    }
    return [];
  }, [historyData]);

  const totalRecords = sections.reduce((acc, s) => acc + s.records.length, 0);

  const filteredSections = useMemo(() => {
    return sections.map((s) => {
      const filtered = s.records.filter((r) => {
        if (!historySearch.trim()) return true;
        const q = historySearch.toLowerCase();
        return (
          String(r.year).toLowerCase().includes(q) ||
          String(r.winner).toLowerCase().includes(q) ||
          String(r.runnerUp || "").toLowerCase().includes(q) ||
          String(r.score || "").toLowerCase().includes(q) ||
          String(r.margin || "").toLowerCase().includes(q)
        );
      });
      return { ...s, records: filtered };
    });
  }, [sections, historySearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest text-muted font-bold">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-live-pulse" />
          TOURNAMENT PROFILE & HISTORY
        </p>
        <Link
          to={`/tournaments/${sportSlug(sport)}`}
          className="text-xs uppercase font-display tracking-wider font-bold text-muted hover:text-ink transition-colors flex items-center gap-1"
        >
          ← All {sport.name} Tournaments
        </Link>
      </div>

      {/* Hero Title & Information Banner */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/tournaments/${sportSlug(sport)}`}
            className="px-2.5 py-0.5 rounded bg-ink text-paper text-xs font-mono font-bold hover:bg-brand-red transition-colors flex items-center gap-1"
          >
            <span>{SPORT_ICONS[sport.name] || "🏅"}</span>
            <span>{sport.name.toUpperCase()}</span>
          </Link>
          {metadata.founded && (
            <span className="px-2.5 py-0.5 rounded bg-surface-tint border border-line text-xs font-mono text-muted">
              EST. {metadata.founded}
            </span>
          )}
          {metadata.categories?.[0] && (
            <span className="px-2.5 py-0.5 rounded bg-brand-red/10 border border-brand-red/20 text-xs font-display uppercase tracking-wider text-brand-red font-bold">
              {metadata.categories[0]}
            </span>
          )}
          {metadata.frequency && (
            <span className="px-2.5 py-0.5 rounded bg-surface-tint border border-line text-xs font-display uppercase tracking-wider text-muted font-bold">
              {metadata.frequency}
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink uppercase tracking-tight leading-[0.92]">
          {tournamentName}
        </h1>

        {metadata.format && (
          <p className="text-muted text-base max-w-3xl leading-relaxed">
            {metadata.format}
          </p>
        )}
      </section>

      {/* Hero Image */}
      {heroImage?.url && (
        <figure className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-line shadow-card group">
          <SafeImage
            src={heroImage.url}
            alt={heroImage.title || tournamentName}
            containerClassName="absolute inset-0"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            credit={heroImage.credit || "Editorial sports archive"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-paper text-xs uppercase font-display tracking-widest font-semibold pointer-events-none">
            <span className="bg-paper/20 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold">
              OFFICIAL SANCTIONED EVENT
            </span>
          </div>
        </figure>
      )}

      {/* Tournament Specifications Section */}
      <section className="bg-surface rounded-2xl p-6 sm:p-8 border border-line shadow-card space-y-6">
        <div>
          <p className="text-xs uppercase font-display tracking-widest text-brand-red font-bold">
            OVERVIEW & PROFILE
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink uppercase mt-0.5">
            Tournament Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-paper p-4 rounded-xl border border-line/70">
            <span className="text-[11px] uppercase font-display font-bold tracking-wider text-muted">
              Inaugural Year
            </span>
            <p className="text-xl font-display font-bold text-ink mt-1">
              {metadata.founded || "Traditional"}
            </p>
          </div>

          <div className="bg-paper p-4 rounded-xl border border-line/70">
            <span className="text-[11px] uppercase font-display font-bold tracking-wider text-muted">
              Tournament Trophy
            </span>
            <p className="text-xl font-display font-bold text-ink mt-1 line-clamp-1" title={metadata.trophy}>
              {metadata.trophy || "Championship Trophy"}
            </p>
          </div>

          <div className="bg-paper p-4 rounded-xl border border-line/70">
            <span className="text-[11px] uppercase font-display font-bold tracking-wider text-muted">
              Primary Venue
            </span>
            <p className="text-xl font-display font-bold text-ink mt-1 line-clamp-1" title={metadata.venue}>
              {metadata.venue || "Rotating International Venues"}
            </p>
          </div>

          <div className="bg-paper p-4 rounded-xl border border-line/70">
            <span className="text-[11px] uppercase font-display font-bold tracking-wider text-muted">
              Record Title Holder
            </span>
            <p className="text-xl font-display font-bold text-ink mt-1 line-clamp-1" title={metadata.recordHolder}>
              {metadata.recordHolder || "Multiple Champions"}
            </p>
          </div>
        </div>

        {tournamentObj.url && (
          <div className="pt-2">
            <a
              href={tournamentObj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase font-display font-bold tracking-wider text-brand-blue hover:underline inline-flex items-center gap-1"
            >
              Visit Official Competition Portal ({tournamentName}) ↗
            </a>
          </div>
        )}
      </section>

      {/* Regulations & Rules Section */}
      <section className="bg-surface rounded-2xl p-6 sm:p-8 border border-line shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="text-xs uppercase font-display tracking-widest text-muted font-bold">
              COMPETITION REGULATIONS
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink uppercase mt-0.5">
              Rules & Regulations
            </h2>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-2">
            {tourneyRules && (
              <button
                type="button"
                onClick={() => setActiveRulesTab("tournament")}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase font-display font-bold tracking-wider transition-all ${
                  activeRulesTab === "tournament"
                    ? "bg-ink text-paper"
                    : "bg-surface-tint border border-line text-muted hover:text-ink"
                }`}
              >
                Tournament Specific Rules
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveRulesTab("sport")}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase font-display font-bold tracking-wider transition-all ${
                activeRulesTab === "sport"
                  ? "bg-ink text-paper"
                  : "bg-surface-tint border border-line text-muted hover:text-ink"
              }`}
            >
              Official Sport Rules
            </button>
          </div>
        </div>

        {activeRulesTab === "tournament" && tourneyRules && (
          <div className="space-y-4">
            <div className="bg-paper p-5 rounded-xl border border-line/70 space-y-2">
              <h3 className="font-display font-bold text-lg text-ink">Format & Tournament Structure</h3>
              <p className="text-sm text-ink/90 leading-relaxed">{tourneyRules.format || tourneyRules.structure}</p>
            </div>
            {Array.isArray(tourneyRules.specialRules) && tourneyRules.specialRules.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-display font-bold tracking-widest text-muted">
                  Tournament-Specific Regulations
                </h4>
                <ul className="space-y-2">
                  {tourneyRules.specialRules.map((r, i) => (
                    <li key={i} className="text-xs text-ink/90 bg-paper p-3 rounded-lg border border-line/60 flex items-start gap-2">
                      <span className="text-brand-red font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeRulesTab === "sport" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-paper p-5 rounded-xl border border-line/70 space-y-2">
              <h3 className="font-display font-bold text-lg text-ink">Playing Area & Specifications</h3>
              <p className="text-sm text-ink/90 leading-relaxed">{generalSportRules.playingArea || "Governed by federation guidelines."}</p>
            </div>
            <div className="bg-paper p-5 rounded-xl border border-line/70 space-y-2">
              <h3 className="font-display font-bold text-lg text-ink">Scoring & Decision Rules</h3>
              <p className="text-sm text-ink/90 leading-relaxed">{generalSportRules.scoring || "Official points scoring rules."}</p>
            </div>
          </div>
        )}
      </section>

      {/* Historical Records Section */}
      <section className="bg-surface rounded-2xl p-6 sm:p-8 border border-line shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="text-xs uppercase font-display tracking-widest text-muted font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-live-pulse" />
              PAST CHAMPIONS & ARCHIVES
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink uppercase mt-0.5">
              Tournament History
            </h2>
          </div>

          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted text-xs">
              🔍
            </span>
            <input
              type="search"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="Search year, champion, score…"
              className="w-full pl-8 pr-3 py-1.5 bg-paper border border-line rounded-lg text-xs text-ink placeholder-muted focus:outline-none focus:ring-1 focus:ring-ink"
            />
          </div>
        </div>

        {historyLoading ? (
          <div className="py-16 text-center text-muted">
            <div className="inline-block w-8 h-8 border-2 border-line border-t-ink rounded-full animate-spin mb-3" />
            <p className="text-sm font-medium">Loading saved history archives…</p>
          </div>
        ) : sections.length === 0 ? (
          <div className="py-12 text-center text-muted bg-paper rounded-xl border border-line">
            <p className="text-base font-semibold text-ink">No historical records available</p>
            <p className="text-xs text-muted mt-1">Official championship rolls are being collated for this tournament.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.length > 1 && (
              <div className="flex flex-wrap gap-1.5 border-b border-line pb-3">
                <button
                  type="button"
                  onClick={() => setActiveHistoryCategory("all")}
                  className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeHistoryCategory === "all"
                      ? "bg-ink text-paper"
                      : "bg-surface-tint border border-line text-muted hover:text-ink"
                  }`}
                >
                  All Categories ({totalRecords})
                </button>
                {sections.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveHistoryCategory(String(idx))}
                    className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activeHistoryCategory === String(idx)
                        ? "bg-ink text-paper"
                        : "bg-surface-tint border border-line text-muted hover:text-ink"
                    }`}
                  >
                    {s.title} ({s.records.length})
                  </button>
                ))}
              </div>
            )}

            {filteredSections.map((sec, idx) => {
              if (activeHistoryCategory !== "all" && activeHistoryCategory !== String(idx)) {
                return null;
              }
              if (!sec.records.length) return null;

              return (
                <div key={idx} className="space-y-3">
                  {(sections.length > 1 || sec.title !== "Tournament history") && (
                    <h3 className="text-xl font-display font-bold text-ink">
                      {sec.title}{" "}
                      <span className="text-xs font-normal text-muted font-body">
                        ({sec.records.length} editions shown)
                      </span>
                    </h3>
                  )}

                  <div className="border border-line rounded-xl overflow-x-auto bg-paper shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-surface border-b border-line text-muted uppercase font-display tracking-wider text-[11px]">
                          <th className="py-2.5 px-4 font-bold w-20">Year</th>
                          <th className="py-2.5 px-4 font-bold">Champion / Winner</th>
                          <th className="py-2.5 px-4 font-bold">Runner-Up</th>
                          <th className="py-2.5 px-4 font-bold">Score</th>
                          <th className="py-2.5 px-4 font-bold">Margin / Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {sec.records.map((r, rIdx) => (
                          <tr key={rIdx} className="hover:bg-surface-tint/40 transition-colors">
                            <td className="py-2.5 px-4 font-display font-bold text-sm text-ink">{r.year}</td>
                            <td className="py-2.5 px-4 font-semibold text-ink">
                              <span className="inline-flex items-center gap-1.5">
                                <span className="text-gold text-xs" title="Champion">🥇</span>
                                <span>{r.winner}</span>
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-muted">
                              {r.runnerUp ? (
                                <span className="inline-flex items-center gap-1.5">
                                  <span className="text-silver text-xs" title="Runner-up">🥈</span>
                                  <span>{r.runnerUp}</span>
                                </span>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className="py-2.5 px-4">
                              {r.score ? (
                                <span className="inline-block px-1.5 py-0.5 rounded bg-surface border border-line/70 font-mono text-[11px] text-ink">
                                  {r.score}
                                </span>
                              ) : (
                                <span className="text-muted text-[11px]">—</span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-muted text-[11px]">{r.margin || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {sec.archiveUrl && (
                    <div className="text-right">
                      <a
                        href={sec.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase font-display font-bold tracking-wider text-brand-blue hover:underline"
                      >
                        {sec.archiveLabel || "Full Archive"} ↗
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Hall of Fame / Famous Players for this sport */}
      {sportLegends.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <div>
              <p className="text-xs uppercase font-display tracking-widest text-muted font-bold">
                {sport.name.toUpperCase()} ICONS
              </p>
              <h2 className="text-2xl font-display font-bold text-ink uppercase">
                Famous Players & Hall of Famers
              </h2>
            </div>
            <Link
              to={`/tournaments/${sportSlug(sport)}`}
              className="text-xs uppercase font-display font-bold text-brand-blue hover:underline"
            >
              View all {sport.name} legends →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sportLegends.slice(0, 4).map((p) => (
              <div
                key={p.name}
                className="bg-surface border border-line rounded-xl p-4 shadow-card hover:shadow-lift transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-muted mb-1">
                    <span className="font-display uppercase font-bold text-[11px]">{p.country}</span>
                    <span className="font-mono text-[11px]">{p.era}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-ink">{p.name}</h3>
                  <p className="text-xs text-brand-red font-semibold">{p.role}</p>
                  <p className="text-xs text-muted line-clamp-2 mt-1">{p.bio}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePlayerModal(p)}
                  className="w-full py-1.5 bg-paper hover:bg-ink text-ink hover:text-paper border border-line rounded text-xs uppercase font-display font-bold tracking-wider transition-all"
                >
                  View Profile →
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Player Modal */}
      <PlayerModal
        isOpen={Boolean(activePlayerModal)}
        onClose={() => setActivePlayerModal(null)}
        player={activePlayerModal}
      />
    </div>
  );
}
