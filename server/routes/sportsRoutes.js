import express from "express";
import { sports, sportSlug, SPORT_ICONS, SPORT_CATEGORIES } from "../../src/data/sports.js";
import { SIDELINE_SPORTS_RULES, SIDELINE_TOURNAMENT_METADATA } from "../../src/data/sportsRules.js";

const router = express.Router();

// GET ALL SPORTS
router.get("/sports", (req, res) => {
  try {
    const list = sports.map((s) => ({
      name: s.name,
      slug: sportSlug(s),
      icon: SPORT_ICONS[s.name] || "🏅",
      category: SPORT_CATEGORIES[s.name] || "Sport",
      summary: s.summary,
      image: s.image,
      tournamentsCount: s.tournaments?.length || 0,
      events: s.events || [],
    }));

    res.json({
      success: true,
      count: list.length,
      sports: list,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET SINGLE SPORT BY SLUG
router.get("/sports/:slug", (req, res) => {
  try {
    const target = req.params.slug.toLowerCase();
    const sport = sports.find((s) => sportSlug(s) === target);

    if (!sport) {
      return res.status(404).json({ success: false, message: "Sport not found" });
    }

    const rules = SIDELINE_SPORTS_RULES[sport.name] || null;

    res.json({
      success: true,
      sport: {
        ...sport,
        slug: sportSlug(sport),
        icon: SPORT_ICONS[sport.name] || "🏅",
        category: SPORT_CATEGORIES[sport.name] || "Sport",
      },
      rules,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET ALL TOURNAMENTS WITH SEARCH & FILTER
router.get("/tournaments", (req, res) => {
  try {
    const { q, sport, category } = req.query;

    let allTournaments = [];
    sports.forEach((s) => {
      const sSlug = sportSlug(s);
      (s.tournaments || []).forEach((item) => {
        const [name, url, archiveUrl] = Array.isArray(item) ? item : [item, "", ""];
        const tSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const meta = SIDELINE_TOURNAMENT_METADATA[name] || {};

        allTournaments.push({
          name,
          slug: tSlug,
          sport: s.name,
          sportSlug: sSlug,
          sportIcon: SPORT_ICONS[s.name] || "🏅",
          category: SPORT_CATEGORIES[s.name] || "Sport",
          url,
          archiveUrl,
          ...meta,
        });
      });
    });

    if (q) {
      const query = q.toLowerCase();
      allTournaments = allTournaments.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.sport.toLowerCase().includes(query) ||
          (t.category && t.category.toLowerCase().includes(query))
      );
    }

    if (sport) {
      allTournaments = allTournaments.filter(
        (t) => t.sportSlug === sport.toLowerCase() || t.sport.toLowerCase() === sport.toLowerCase()
      );
    }

    if (category && category !== "all") {
      allTournaments = allTournaments.filter(
        (t) => t.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.json({
      success: true,
      count: allTournaments.length,
      tournaments: allTournaments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
