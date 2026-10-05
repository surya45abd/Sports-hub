let cachedData = null;

function slug(value) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Lazy loads the 1.2 MB historical dataset on demand.
 * This ensures initial page load stays ultra-fast (<150KB).
 */
export async function getTournamentHistory(sportNameOrSlug, tournamentNameOrSlug) {
  if (!cachedData) {
    const mod = await import("./tournamentHistoryDataset.js");
    cachedData = mod.SIDELINE_TOURNAMENT_HISTORY_DATA || mod.default;
  }

  const sSlug = slug(sportNameOrSlug);
  const tSlug = slug(tournamentNameOrSlug);

  return (
    cachedData[`${sportNameOrSlug}:${tournamentNameOrSlug}`] ||
    cachedData[`${sSlug}:${tSlug}`] ||
    cachedData[`${sSlug}/${tSlug}`] ||
    cachedData[`${sSlug}/${tSlug}.json`] ||
    null
  );
}

export default getTournamentHistory;
