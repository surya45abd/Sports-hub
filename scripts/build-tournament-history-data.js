const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const historyDir = path.join(projectRoot, "data", "tournament-history");
const outputFile = path.join(projectRoot, "tournament-history-data.js");
const esmOutputFile = path.join(projectRoot, "src", "data", "tournamentHistoryDataset.js");

function slug(value) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const bundle = {};
let count = 0;

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".json") && entry.name !== "manifest.json") {
      const relPath = path.relative(historyDir, fullPath).replace(/\\/g, "/");
      const content = fs.readFileSync(fullPath, "utf8");
      try {
        const data = JSON.parse(content);
        bundle[relPath] = data;
        count++;
      } catch (err) {
        console.error(`Failed to parse ${relPath}:`, err);
      }
    }
  }
}

walkDir(historyDir);

const jsContent = `/**
 * SIDELINE Sports Desk — Comprehensive Tournament History Dataset
 * Auto-generated bundle of all ${count} tournament historical archives.
 * Preloaded into window.SIDELINE_TOURNAMENT_HISTORY_DATA for instantaneous
 * rendering and 100% offline/file:/// protocol compatibility without CORS errors.
 *
 * Each tournament is serialized uniquely (zero duplicate data on disk).
 * Fast in-memory lookup aliases are generated dynamically at runtime.
 */
(() => {
  const dataset = ${JSON.stringify(bundle, null, 2)};

  function slug(value) {
    return (value || "")
      .normalize("NFD")
      .replace(/[\\u0300-\\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const lookup = {};
  for (const relPath in dataset) {
    const data = dataset[relPath];
    const normalized = relPath.replace(/\\\\/g, "/");
    lookup[normalized] = data;
    lookup[relPath] = data;
    const withoutExt = normalized.replace(/\\.json$/, "");
    lookup[withoutExt] = data;

    const sportName = data.sport || "";
    const tournamentName = data.tournament || "";
    if (sportName && tournamentName) {
      lookup[\`\${sportName}:\${tournamentName}\`] = data;
      lookup[\`\${slug(sportName)}:\${slug(tournamentName)}\`] = data;
      lookup[\`\${slug(sportName)}/\${slug(tournamentName)}\`] = data;
      lookup[\`\${slug(sportName)}/\${slug(tournamentName)}.json\`] = data;
    }
  }

  window.SIDELINE_TOURNAMENT_HISTORY_DATA = lookup;
})();
`;

const esmContent = `/**
 * SIDELINE Sports Desk — Comprehensive Tournament History Dataset
 * Auto-generated bundle of all ${count} tournament historical archives.
 */
const dataset = ${JSON.stringify(bundle, null, 2)};

function slug(value) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const lookup = {};
for (const relPath in dataset) {
  const data = dataset[relPath];
  const normalized = relPath.replace(/\\\\/g, "/");
  lookup[normalized] = data;
  lookup[relPath] = data;
  const withoutExt = normalized.replace(/\\.json$/, "");
  lookup[withoutExt] = data;

  const sportName = data.sport || "";
  const tournamentName = data.tournament || "";
  if (sportName && tournamentName) {
    lookup[\`\${sportName}:\${tournamentName}\`] = data;
    lookup[\`\${slug(sportName)}:\${slug(tournamentName)}\`] = data;
    lookup[\`\${slug(sportName)}/\${slug(tournamentName)}\`] = data;
    lookup[\`\${slug(sportName)}/\${slug(tournamentName)}.json\`] = data;
  }
}

export const SIDELINE_TOURNAMENT_HISTORY_DATA = lookup;
export default lookup;
`;

fs.writeFileSync(outputFile, jsContent, "utf8");
fs.writeFileSync(esmOutputFile, esmContent, "utf8");
console.log(`Successfully bundled ${count} tournament histories into ${outputFile} and ${esmOutputFile}.`);
