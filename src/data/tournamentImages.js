// Curated action photography mapped by sport and tournament
const SIDELINE_TOURNAMENT_IMAGES_FN = (() => {
  const apiUrl = "https://commons.wikimedia.org/w/api.php";

  // Curated, high-resolution, verified action photography mapped by sport
  const SPORT_ACTION_IMAGES = {
    Cricket: [
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1200&q=80"
    ],
    Football: [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80"
    ],
    Basketball: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    Tennis: [
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80"
    ],
    Badminton: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=1200&q=80"
    ],
    Hockey: [
      "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?auto=format&fit=crop&w=1200&q=80"
    ],
    Rugby: [
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544919982-b61976f0ba43?auto=format&fit=crop&w=1200&q=80"
    ],
    Volleyball: [
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1200&q=80"
    ],
    "Formula 1": [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=1200&q=80"
    ],
    Athletics: [
      "https://images.unsplash.com/photo-1533561052604-c3beb6d55b8d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80"
    ],
    Baseball: [
      "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80"
    ],
    Golf: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80"
    ],
    Boxing: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80"
    ],
    Wrestling: [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80"
    ],
    Swimming: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1200&q=80"
    ],
    Cycling: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80"
    ],
    "Table Tennis": [
      "https://images.unsplash.com/photo-1611251135345-18c56206b863?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=80"
    ],
    "Kho-kho": [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80"
    ],
    Kabaddi: [
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80"
    ],
    Chess: [
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80"
    ],
    Olympics: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533561052604-c3beb6d55b8d?auto=format&fit=crop&w=1200&q=80"
    ]
  };

  // Specific high-resolution photos for iconic tournaments
  const SPECIFIC_TOURNAMENT_IMAGES = {
    Wimbledon: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80",
    "Roland-Garros": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80",
    "Australian Open": "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80",
    "US Open": "https://images.unsplash.com/photo-1530915365347-e35b749a0381?auto=format&fit=crop&w=1200&q=80",
    "The Masters": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80",
    "The Open": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80",
    "Tour de France": "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    "FIFA World Cup": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    "UEFA Champions League": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
    "Premier League": "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
    "Indian Premier League": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    "The Ashes": "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1200&q=80",
    NBA: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    "WBC Championship Fights": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80",
    "Olympic Boxing": "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80",
    "All England Open": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
    "BWF World Championships": "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=1200&q=80",
    "World Table Tennis Championships": "https://images.unsplash.com/photo-1611251135345-18c56206b863?auto=format&fit=crop&w=1200&q=80"
  };

  function cleanMetadata(value) {
    if (!value) return "";
    const parsed = new DOMParser().parseFromString(value, "text/html");
    return parsed.body.textContent.trim().replace(/\s+/g, " ");
  }

  function fallbackImage(tournament, sport, index = 0) {
    // 1. Check specific tournament curated image
    if (SPECIFIC_TOURNAMENT_IMAGES[tournament]) {
      const sp = SPECIFIC_TOURNAMENT_IMAGES[tournament];
      return typeof sp === "string" ? sp : sp[0];
    }
    // 2. Check sport action photo pool
    const pool = SPORT_ACTION_IMAGES[sport] || SPORT_ACTION_IMAGES.Athletics;
    const selected = pool[index % pool.length];
    if (selected) return selected;

    return "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80";
  }

  async function findUnique(query, usedUrls = new Set()) {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      formatversion: "2",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: "16",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1400",
      origin: "*"
    });
    let payload;
    try {
      const response = await fetch(`${apiUrl}?${params}`, { signal: AbortSignal.timeout(6000) });
      if (!response.ok) return null;
      payload = await response.json();
    } catch {
      return null;
    }
    const pages = payload.query?.pages || [];
    const excluded = /logo|poster|ticket|map|flag|diagram|icon|brand|schedule|bracket|scoreboard/i;
    for (const page of pages) {
      if (excluded.test(page.title || "")) continue;
      const info = page.imageinfo?.[0];
      const url = info?.thumburl || info?.url;
      const pageUrl = info?.descriptionurl;
      if (!url || !pageUrl || usedUrls.has(url)) continue;
      const safeUrl = new URL(url);
      const safePageUrl = new URL(pageUrl);
      const isWikimediaHost = safeUrl.hostname === "wikimedia.org" || safeUrl.hostname.endsWith(".wikimedia.org");
      if (safeUrl.protocol !== "https:" || !isWikimediaHost || safePageUrl.hostname !== "commons.wikimedia.org") continue;
      usedUrls.add(url);
      const metadata = info.extmetadata || {};
      const artist = cleanMetadata(metadata.Artist?.value);
      const license = cleanMetadata(metadata.LicenseShortName?.value);
      const attribution = [artist, license, "Wikimedia Commons"].filter(Boolean).join(" · ");
      return {
        url,
        pageUrl,
        credit: `Photo: ${attribution}`,
        title: (page.title || "Photo").replace(/^File:/, "")
      };
    }
    return null;
  }

  return { findUnique, fallbackImage, SPORT_ACTION_IMAGES, SPECIFIC_TOURNAMENT_IMAGES };
})();

export function getTournamentImage(sportName, tournamentName) {
  const specific = SIDELINE_TOURNAMENT_IMAGES_FN.SPECIFIC_TOURNAMENT_IMAGES?.[tournamentName];
  if (specific) {
    const url = typeof specific === "string" ? specific : (Array.isArray(specific) ? specific[0] : specific);
    return {
      url,
      credit: "Curated Tournament Archive",
      title: tournamentName,
    };
  }
  const sportList = SIDELINE_TOURNAMENT_IMAGES_FN.SPORT_ACTION_IMAGES?.[sportName];
  if (Array.isArray(sportList) && sportList.length > 0) {
    // Deterministic selection based on tournament name hash for photography variety
    const hash = Math.abs((tournamentName || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0));
    const url = sportList[hash % sportList.length];
    return {
      url,
      credit: "Curated Sport Photography",
      title: sportName,
    };
  }
  return {
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    credit: "Sideline Archive",
    title: tournamentName || sportName,
  };
}

SIDELINE_TOURNAMENT_IMAGES_FN.getTournamentImage = getTournamentImage;
export const SIDELINE_TOURNAMENT_IMAGES = SIDELINE_TOURNAMENT_IMAGES_FN;
export default SIDELINE_TOURNAMENT_IMAGES;
