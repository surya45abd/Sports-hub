import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import SportHubPage from "./pages/SportHubPage";
import TournamentDetailPage from "./pages/TournamentDetailPage";
import OlympicsPage from "./pages/OlympicsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-acid selection:text-ink">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports" element={<HomePage />} />
          <Route path="/tournaments" element={<SportHubPage />} />
          <Route path="/tournaments/:sportSlug" element={<SportHubPage />} />
          <Route path="/tournaments/:sportSlug/:tournamentSlug" element={<TournamentDetailPage />} />
          <Route path="/tournament" element={<TournamentDetailPage />} />
          <Route path="/olympics" element={<OlympicsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
