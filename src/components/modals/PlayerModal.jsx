import React, { useEffect } from "react";

export default function PlayerModal({ isOpen, onClose, player }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !player) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="player-modal-name"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-paper border border-line rounded-xl shadow-modal overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-line bg-paper">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider font-display bg-surface border border-line px-2 py-0.5 rounded text-muted">
                {player.country}
              </span>
              <span className="text-xs text-muted font-medium">· {player.era}</span>
            </div>
            <h2 id="player-modal-name" className="text-2xl sm:text-3xl font-display font-bold text-ink">
              {player.name}
            </h2>
            <p className="text-sm font-semibold text-brand-red mt-0.5">{player.role}</p>
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

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Biography */}
          <div>
            <h3 className="text-xs uppercase font-display font-bold tracking-widest text-muted mb-2">
              Career Biography
            </h3>
            <p className="text-sm text-ink/90 leading-relaxed bg-surface p-4 rounded-lg border border-line/70">
              {player.bio}
            </p>
          </div>

          {/* Key Achievements */}
          {Array.isArray(player.achievements) && player.achievements.length > 0 && (
            <div>
              <h3 className="text-xs uppercase font-display font-bold tracking-widest text-muted mb-2">
                Major Honors & Career Milestones
              </h3>
              <ul className="space-y-2">
                {player.achievements.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-ink/90 bg-surface p-2.5 rounded border border-line/60"
                  >
                    <span className="text-gold mt-0.5 text-sm">★</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-tint/50 border-t border-line text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-ink text-paper text-xs uppercase font-display font-bold tracking-wider rounded hover:bg-brand-red transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
