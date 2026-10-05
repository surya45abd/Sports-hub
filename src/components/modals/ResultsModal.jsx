import React, { useState, useEffect } from "react";
import { getTournamentHistory } from "../../data/tournamentHistory";

export default function ResultsModal({ isOpen, onClose, sportName, tournamentName, archiveUrl }) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState("all");

  useEffect(() => {
    if (!isOpen || !sportName || !tournamentName) return;

    let isMounted = true;
    setLoading(true);
    setHistory(null);
    setActiveCategoryIndex("all");

    getTournamentHistory(sportName, tournamentName)
      .then((data) => {
        if (isMounted) {
          setHistory(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading tournament history:", err);
        if (isMounted) setLoading(false);
      });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      isMounted = false;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, sportName, tournamentName]);

  if (!isOpen) return null;

  const sortRecords = (records = []) =>
    [...records].sort((a, b) => {
      const aYear = Number(String(a.year).match(/\d{4}/)?.[0] || 0);
      const bYear = Number(String(b.year).match(/\d{4}/)?.[0] || 0);
      return bYear - aYear;
    });

  const sections =
    Array.isArray(history?.sections) && history.sections.length > 0
      ? history.sections.map((s) => ({ ...s, records: sortRecords(s.records) }))
      : [
          {
            title: "Tournament history",
            records: sortRecords(history?.records || []),
            archiveUrl: history?.archiveUrl,
            archiveLabel: history?.archiveLabel,
          },
        ];

  const totalRecords = sections.reduce((acc, s) => acc + s.records.length, 0);

  const sourceLinks = [];
  if (history?.sourceUrl) sourceLinks.push({ url: history.sourceUrl, label: history.sourceLabel || "Verified history source" });
  for (const src of history?.verificationSources || []) {
    if (src.url && src.url !== history.sourceUrl) {
      sourceLinks.push({ url: src.url, label: src.label || "Additional result source" });
    }
  }
  for (const s of history?.sections || []) {
    if (s.sourceUrl && !sourceLinks.some((x) => x.url === s.sourceUrl)) {
      sourceLinks.push({ url: s.sourceUrl, label: s.sourceLabel || `${s.title} result source` });
    }
  }
  if (archiveUrl && !sourceLinks.some((x) => x.url === archiveUrl)) {
    sourceLinks.push({ url: archiveUrl, label: "Official competition page" });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="results-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-paper border border-line rounded-xl shadow-modal overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-line bg-paper">
          <div>
            <p className="text-xs uppercase font-display tracking-widest text-muted font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-live-pulse" />
              PAST RESULTS · {sections.length} {sections.length === 1 ? "CATEGORY" : "CATEGORIES"}
            </p>
            <h2 id="results-modal-title" className="text-2xl sm:text-3xl font-display font-bold text-ink mt-0.5">
              {tournamentName} <span className="text-muted font-normal">· {sportName}</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink hover:bg-surface transition-colors text-xl font-medium"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="py-16 text-center text-muted">
              <div className="inline-block w-8 h-8 border-2 border-line border-t-ink rounded-full animate-spin mb-3" />
              <p className="font-medium text-sm">Loading tournament historical archive…</p>
            </div>
          ) : !history || totalRecords === 0 ? (
            <div className="py-12 text-center text-muted bg-surface rounded-lg border border-line/60">
              <p className="text-base font-medium text-ink">No historical records found</p>
              <p className="text-sm mt-1 text-muted">Records for this competition have not been archived yet.</p>
              {archiveUrl && (
                <a
                  href={archiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-xs font-bold uppercase tracking-wider font-display text-brand-blue hover:underline"
                >
                  Visit official website ↗
                </a>
              )}
            </div>
          ) : (
            <>
              {/* Coverage summary banner */}
              <div className="bg-surface border border-line p-3.5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <span className="text-muted">
                  <strong className="text-ink font-semibold">{totalRecords}</strong> source-verified championship results across{" "}
                  <strong className="text-ink font-semibold">{sections.length}</strong> {sections.length === 1 ? "category" : "categories"}, newest first.
                </span>
                {history?.historyCoverage && (
                  <span className="bg-surface-tint border border-line px-2 py-0.5 rounded text-[11px] font-mono text-muted">
                    {history.historyCoverage}
                  </span>
                )}
              </div>

              {/* Category tabs if multi-event */}
              {sections.length > 1 && (
                <div className="flex flex-wrap gap-1.5 border-b border-line pb-3">
                  <button
                    type="button"
                    onClick={() => setActiveCategoryIndex("all")}
                    className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activeCategoryIndex === "all"
                        ? "bg-ink text-paper"
                        : "bg-surface-tint/60 text-muted hover:text-ink hover:bg-surface border border-line"
                    }`}
                  >
                    All ({totalRecords})
                  </button>
                  {sections.map((section, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveCategoryIndex(String(idx))}
                      className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                        activeCategoryIndex === String(idx)
                          ? "bg-ink text-paper"
                          : "bg-surface-tint/60 text-muted hover:text-ink hover:bg-surface border border-line"
                      }`}
                    >
                      {section.title} ({section.records.length})
                    </button>
                  ))}
                </div>
              )}

              {/* Historical Tables */}
              {sections.map((section, idx) => {
                if (activeCategoryIndex !== "all" && activeCategoryIndex !== String(idx)) {
                  return null;
                }
                if (!section.records.length) return null;

                return (
                  <div key={idx} className="space-y-2">
                    {(sections.length > 1 || section.title !== "Tournament history") && (
                      <h3 className="text-lg font-display font-bold text-ink">
                        {section.title}{" "}
                        <span className="text-xs font-normal text-muted font-body">
                          ({section.records.length} editions)
                        </span>
                      </h3>
                    )}

                    <div className="border border-line rounded-lg overflow-x-auto bg-surface">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-surface-tint/70 border-b border-line text-muted uppercase font-display tracking-wider text-[11px]">
                            <th className="py-2.5 px-3 font-bold w-16">Year</th>
                            <th className="py-2.5 px-3 font-bold">Winner</th>
                            <th className="py-2.5 px-3 font-bold">Runner-up</th>
                            <th className="py-2.5 px-3 font-bold">Final score</th>
                            <th className="py-2.5 px-3 font-bold">Margin / result</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line/60">
                          {section.records.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-surface-tint/30 transition-colors">
                              <td className="py-2 px-3 font-bold text-ink font-display text-sm">{r.year}</td>
                              <td className="py-2 px-3 font-semibold text-ink">{r.winner}</td>
                              <td className="py-2 px-3 text-muted">{r.runnerUp || "—"}</td>
                              <td className="py-2 px-3 font-mono text-[11px] text-ink">{r.score || "—"}</td>
                              <td className="py-2 px-3 text-muted text-[11px]">{r.margin || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {section.archiveUrl && (
                      <div className="text-right">
                        <a
                          href={section.archiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold font-display uppercase tracking-wider text-brand-blue hover:underline"
                        >
                          {section.archiveLabel || `Full ${section.title.toLowerCase()} archive`} ↗
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Modal Footer / Verified Sources */}
        {sourceLinks.length > 0 && (
          <div className="p-4 bg-surface-tint/50 border-t border-line text-xs flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold text-ink">Verified Sources:</span>
            {sourceLinks.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline inline-flex items-center gap-0.5"
              >
                {src.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
