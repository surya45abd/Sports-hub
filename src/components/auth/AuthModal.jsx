import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { sports } from "../../data/sports";

export default function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal, openAuthModal, login, register } = useAuth();

  const [mode, setMode] = useState(authModalMode);
  const [identifier, setIdentifier] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteSport, setFavoriteSport] = useState("Cricket");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync mode when modal opens
  React.useEffect(() => {
    setMode(authModalMode);
    setError("");
  }, [authModalMode, authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(identifier, password);
      } else {
        await register(username, email, password, favoriteSport);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = () => {
    if (mode === "login") {
      setIdentifier("sportsfan");
      setPassword("password123");
    } else {
      const rand = Math.floor(Math.random() * 1000);
      setUsername(`sportsfan${rand}`);
      setEmail(`fan${rand}@sideline.org`);
      setPassword("password123");
      setFavoriteSport("Cricket");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={closeAuthModal} />

      <div className="relative w-full max-w-md bg-paper border border-line rounded-3xl shadow-2xl overflow-hidden z-10 transition-all">
        {/* Header Ribbon */}
        <div className="bg-ink text-paper px-6 py-5 flex items-center justify-between border-b border-line">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-paper text-ink flex items-center justify-center font-display text-base font-black">
              S
            </span>
            <div>
              <h3 className="font-display text-lg font-black tracking-tight leading-none text-paper">
                {mode === "login" ? "Welcome Back to Sideline" : "Join Sideline Desk"}
              </h3>
              <p className="text-[11px] font-mono text-paper/70 mt-0.5">
                {mode === "login"
                  ? "Access your saved sports, tournaments & athletes"
                  : "Create your personal sports desk profile"}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center text-paper transition-colors"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-line bg-surface-tint">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 py-3 text-xs font-display uppercase tracking-wider font-bold transition-all border-b-2 ${
              mode === "login"
                ? "border-ink text-ink bg-paper shadow-xs"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 py-3 text-xs font-display uppercase tracking-wider font-bold transition-all border-b-2 ${
              mode === "register"
                ? "border-ink text-ink bg-paper shadow-xs"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-sans font-medium flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {mode === "login" ? (
            <>
              <div>
                <label className="block text-xs font-display uppercase tracking-wider font-bold text-ink mb-1.5">
                  Email or Username
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. alex@example.com or sportsfan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent text-sm text-ink placeholder:text-muted transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider font-bold text-ink mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent text-sm text-ink placeholder:text-muted transition-all"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-display uppercase tracking-wider font-bold text-ink mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  required
                  minLength={3}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. statsmaster"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent text-sm text-ink placeholder:text-muted transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider font-bold text-ink mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent text-sm text-ink placeholder:text-muted transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider font-bold text-ink mb-1.5">
                  Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent text-sm text-ink placeholder:text-muted transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider font-bold text-ink mb-1.5">
                  Primary Favorite Sport
                </label>
                <select
                  value={favoriteSport}
                  onChange={(e) => setFavoriteSport(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent text-sm text-ink transition-all cursor-pointer"
                >
                  {sports.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-ink text-paper font-display uppercase tracking-wider font-black text-xs hover:bg-brand-red transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Processing...</span>
              ) : mode === "login" ? (
                <span>Sign In to Sideline →</span>
              ) : (
                <span>Create Free Account →</span>
              )}
            </button>

            <button
              type="button"
              onClick={fillQuickDemo}
              className="w-full py-2 rounded-lg border border-line text-[11px] font-mono text-muted hover:text-ink hover:bg-surface-tint transition-colors"
            >
              ⚡ Fill sample test credentials
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="px-6 py-3 bg-surface-tint/60 border-t border-line text-center text-[11px] text-muted">
          Backed by Node.js + Express & MongoDB Mongoose data layer
        </div>
      </div>
    </div>
  );
}
