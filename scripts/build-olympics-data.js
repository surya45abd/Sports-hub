const fs = require('fs');
const path = require('path');
const https = require('https');

const CACHE_DIR = 'd:/frontend-projects/project-2/data/olympics_cache';
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function fetchWithCache(pageTitle) {
  const filePath = path.join(CACHE_DIR, `${pageTitle}.html`);
  if (fs.existsSync(filePath)) {
    return Promise.resolve(fs.readFileSync(filePath, 'utf8'));
  }
  return new Promise((resolve, reject) => {
    https.get({
      hostname: 'en.wikipedia.org',
      path: `/api/rest_v1/page/html/${encodeURIComponent(pageTitle)}`,
      headers: { 'User-Agent': 'SidelineSportsBot/1.0 (olympics builder)' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(filePath, data, 'utf8');
        resolve(data);
      });
    }).on('error', reject);
  });
}

const NOC_MAP = {
  'United States': 'USA', 'China': 'CHN', 'Japan': 'JPN', 'Australia': 'AUS', 'France': 'FRA',
  'Netherlands': 'NED', 'Great Britain': 'GBR', 'South Korea': 'KOR', 'Italy': 'ITA', 'Germany': 'GER',
  'New Zealand': 'NZL', 'Canada': 'CAN', 'Uzbekistan': 'UZB', 'Hungary': 'HUN', 'Spain': 'ESP',
  'Sweden': 'SWE', 'Kenya': 'KEN', 'Norway': 'NOR', 'Ireland': 'IRL', 'Brazil': 'BRA',
  'Iran': 'IRI', 'Ukraine': 'UKR', 'Romania': 'ROU', 'Georgia': 'GEO', 'Belgium': 'BEL',
  'Bulgaria': 'BUL', 'Azerbaijan': 'AZE', 'Cuba': 'CUB', 'Croatia': 'CRO', 'Serbia': 'SRB',
  'Slovenia': 'SLO', 'Chinese Taipei': 'TPE', 'Austria': 'AUT', 'Hong Kong': 'HKG', 'Philippines': 'PHI',
  'Algeria': 'ALG', 'Indonesia': 'INA', 'Israel': 'ISR', 'Poland': 'POL', 'Kazakhstan': 'KAZ',
  'Jamaica': 'JAM', 'South Africa': 'RSA', 'Thailand': 'THA', 'Denmark': 'DEN', 'Switzerland': 'SUI',
  'Ecuador': 'ECU', 'Portugal': 'POR', 'Greece': 'GRE', 'Argentina': 'ARG', 'Egypt': 'EGY',
  'Tunisia': 'TUN', 'Botswana': 'BOT', 'Chile': 'CHI', 'Saint Lucia': 'LCA', 'Uganda': 'UGA',
  'Dominican Republic': 'DOM', 'Guatemala': 'GUA', 'Morocco': 'MAR', 'Dominica': 'DMA',
  'Pakistan': 'PAK', 'Turkey': 'TUR', 'Mexico': 'MEX', 'Armenia': 'ARM', 'Colombia': 'COL',
  'Kyrgyzstan': 'KGZ', 'North Korea': 'PRK', 'Lithuania': 'LTU', 'India': 'IND', 'Moldova': 'MDA',
  'Kosovo': 'KOS', 'Cyprus': 'CYP', 'Fiji': 'FIJ', 'Jordan': 'JOR', 'Mongolia': 'MGL',
  'Panama': 'PAN', 'Tajikistan': 'TJK', 'Albania': 'ALB', 'Grenada': 'GRN', 'Malaysia': 'MAS',
  'Puerto Rico': 'PUR', 'Ivory Coast': 'CIV', 'Cape Verde': 'CPV', 'Refugee Olympic Team': 'EOR',
  'Peru': 'PER', 'Qatar': 'QAT', 'Singapore': 'SGP', 'Slovakia': 'SVK', 'Zambia': 'ZAM',
  'Individual Neutral Athletes': 'AIN', 'Russia': 'RUS', 'ROC': 'ROC', 'Soviet Union': 'URS',
  'East Germany': 'GDR', 'West Germany': 'FRG', 'Czech Republic': 'CZE', 'Belarus': 'BLR',
  'Bahamas': 'BAH', 'Trinidad and Tobago': 'TTO', 'Estonia': 'EST', 'Latvia': 'LAT',
  'Finland': 'FIN', 'Venezuela': 'VEN', 'San Marino': 'SMR', 'Bermuda': 'BER', 'Burkina Faso': 'BUR',
  'Ghana': 'GHA', 'Syria': 'SYR', 'Turkmenistan': 'TKM', 'Kuwait': 'KUW', 'Saudi Arabia': 'KSA',
  'Bahrain': 'BRN', 'Burundi': 'BDI', 'Niger': 'NIG', 'United Arab Emirates': 'UAE', 'Vietnam': 'VIE',
  'Nigeria': 'NGA', 'Zimbabwe': 'ZIM', 'Namibia': 'NAM', 'Mozambique': 'MOZ', 'Cameroon': 'CMR',
  'Costa Rica': 'CRC', 'Sri Lanka': 'SRI', 'Uruguay': 'URU', 'Barbados': 'BAR', 'Iceland': 'ISL',
  'Macedonia': 'MKD', 'North Macedonia': 'MKD', 'Mauritius': 'MRI', 'Togo': 'TOG', 'Samoa': 'SAM',
  'Sudan': 'SUD', 'Afghanistan': 'AFG', 'Gabon': 'GAB', 'Montenegro': 'MNE', 'Unified Team': 'EUN'
};

const SPORT_NAMES = {
  'artistic swimming': 'Artistic Swimming',
  'canoeing': 'Canoe / Kayak',
  'equestrian events': 'Equestrian',
  'equestrian': 'Equestrian',
  'field hockey': 'Field Hockey',
  'hockey': 'Field Hockey',
  'modern pentathlon': 'Modern Pentathlon',
  'rugby sevens': 'Rugby Sevens',
  'sport climbing': 'Sport Climbing',
  'table tennis': 'Table Tennis',
  'water polo': 'Water Polo',
  'synchronized swimming': 'Artistic Swimming',
  'baseball and softball': 'Baseball & Softball',
  'baseball/softball': 'Baseball & Softball'
};

function standardizeSportName(raw) {
  let s = raw.replace(/\s*\(.*\)/, '').replace(/events?$/i, '').trim();
  const lower = s.toLowerCase();
  if (SPORT_NAMES[lower]) return SPORT_NAMES[lower];
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function parseMedalTable(html) {
  const rows = [];
  const tables = html.split(/<table[^>]*>/i);

  for (let t = 1; t < tables.length; t++) {
    const tableHtml = tables[t].split(/<\/table>/i)[0];
    if (!tableHtml.includes('Gold') || !tableHtml.includes('Silver')) continue;
    if (!tableHtml.includes('NOC') && !tableHtml.includes('Nation') && !tableHtml.includes('Country')) continue;

    const trs = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    let currentRank = 1;

    for (const tr of trs) {
      if (tr.includes('<th') && (tr.includes('NOC') || tr.includes('Nation') || tr.includes('Country'))) continue;
      // Stop on total row
      if (tr.toLowerCase().includes('total') || tr.toLowerCase().includes('totals')) {
        if (rows.length > 10) break;
      }

      const cellRegex = /<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;
      const cells = [];
      let cellMatch;
      while ((cellMatch = cellRegex.exec(tr)) !== null) {
        let txt = cellMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\n+/g, ' ').trim();
        cells.push(txt);
      }

      if (cells.length >= 5) {
        let rank, nation, gold, silver, bronze, total;
        if (cells.length >= 6) {
          rank = parseInt(cells[0].replace(/[^0-9]/g, ''), 10);
          nation = cells[1];
          gold = parseInt(cells[2].replace(/,/g, ''), 10);
          silver = parseInt(cells[3].replace(/,/g, ''), 10);
          bronze = parseInt(cells[4].replace(/,/g, ''), 10);
          total = parseInt(cells[5].replace(/,/g, ''), 10);
        } else {
          nation = cells[0];
          gold = parseInt(cells[1].replace(/,/g, ''), 10);
          silver = parseInt(cells[2].replace(/,/g, ''), 10);
          bronze = parseInt(cells[3].replace(/,/g, ''), 10);
          total = parseInt(cells[4].replace(/,/g, ''), 10);
        }

        if (!isNaN(gold) && !isNaN(silver) && !isNaN(bronze) && !isNaN(total) && nation) {
          let code = '';
          const codeMatch = nation.match(/\(([A-Z]{3})\)/);
          if (codeMatch) {
            code = codeMatch[1];
            nation = nation.replace(/\s*\([A-Z]{3}\)/, '').trim();
          }
          nation = nation.replace(/[‡*^†]/g, '').replace(/\[.*\]/g, '').trim();
          if (nation.startsWith('*')) nation = nation.replace(/^\*+\s*/, '').trim();

          if (!rank || isNaN(rank)) rank = currentRank;
          else currentRank = rank;

          if (!code) code = NOC_MAP[nation] || nation.slice(0, 3).toUpperCase();

          // Avoid duplicate or invalid names
          if (nation && !/^(total|totals|rank)$/i.test(nation)) {
            rows.push({ rank, nation, code, gold, silver, bronze, total });
          }
        }
      }
    }
    if (rows.length > 10) break; // Found main medal table!
  }
  return rows;
}

function parseAllTimeMedalTable(html) {
  const rows = [];
  const tables = html.split(/<table[^>]*>/i);
  // Table 2 in All-time_Olympic_Games_medal_table is the main table
  for (let t = 1; t < Math.min(tables.length, 5); t++) {
    const tableHtml = tables[t].split(/<\/table>/i)[0];
    if (!tableHtml.includes('Summer') || !tableHtml.includes('Gold')) continue;

    const trs = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    for (const tr of trs) {
      if (tr.includes('<th') && tr.includes('Team')) continue;
      if (tr.toLowerCase().includes('total')) continue;

      const cellRegex = /<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;
      const cells = [];
      let cellMatch;
      while ((cellMatch = cellRegex.exec(tr)) !== null) {
        let txt = cellMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\n+/g, ' ').trim();
        cells.push(txt);
      }

      if (cells.length >= 6) {
        let nation = cells[0].replace(/\[.*\]/g, '').trim();
        let gold = parseInt(cells[2].replace(/,/g, ''), 10);
        let silver = parseInt(cells[3].replace(/,/g, ''), 10);
        let bronze = parseInt(cells[4].replace(/,/g, ''), 10);
        let total = parseInt(cells[5].replace(/,/g, ''), 10);

        if (!isNaN(gold) && !isNaN(silver) && !isNaN(bronze) && !isNaN(total) && nation && total > 0) {
          let code = '';
          const codeMatch = nation.match(/\(([A-Z]{3})\)/);
          if (codeMatch) {
            code = codeMatch[1];
            nation = nation.replace(/\s*\([A-Z]{3}\)/, '').trim();
          }
          if (!code) code = NOC_MAP[nation] || nation.slice(0, 3).toUpperCase();
          rows.push({ nation, code, gold, silver, bronze, total });
        }
      }
    }
    if (rows.length > 20) break;
  }

  // Sort descending by gold, then silver, then bronze
  rows.sort((a, b) => {
    if (b.gold !== a.gold) return b.gold - a.gold;
    if (b.silver !== a.silver) return b.silver - a.silver;
    return b.bronze - a.bronze;
  });

  return rows.map((r, idx) => ({ rank: idx + 1, ...r }));
}

function cleanCellText(html) {
  if (!html) return '';

  const aRegex = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  const links = [];
  let m;
  while ((m = aRegex.exec(html)) !== null) {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    if (text && !text.toLowerCase().includes('details') && !text.toLowerCase().includes('file:')) {
      links.push({ href, text });
    }
  }

  let countryName = '';
  let countryCode = '';
  let athletes = [];

  for (const l of links) {
    if (l.href.includes('_at_the_') || NOC_MAP[l.text]) {
      countryName = l.text;
      countryCode = NOC_MAP[l.text] || l.text.slice(0, 3).toUpperCase();
    } else {
      athletes.push(l.text);
    }
  }

  if (athletes.length > 0) {
    const athleteStr = athletes.slice(0, 3).join(' / ');
    return countryCode ? `${athleteStr} (${countryCode})` : (countryName ? `${athleteStr} (${countryName})` : athleteStr);
  }

  if (countryName) {
    return countryCode ? `${countryName} (${countryCode})` : countryName;
  }

  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanResult(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/(&lt;\/span>|"\}\]\]\}'|id="[^"]*")/gi, '')
    .replace(/\{.*\}/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#160;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseEvents(html) {
  const sections = html.split(/<h2[^>]*>/i);
  const events = [];

  for (let i = 1; i < sections.length; i++) {
    const sec = sections[i];
    let rawSport = sec.split(/<\/h2>/i)[0].replace(/<[^>]+>/g, '').trim();
    if (['See also', 'Notes', 'References', 'External links', 'Participating nations', 'Medal table'].includes(rawSport)) continue;
    const sport = standardizeSportName(rawSport);

    const tables = sec.split(/<table[^>]*>/i);
    for (let t = 1; t < tables.length; t++) {
      const tableHtml = tables[t].split(/<\/table>/i)[0];
      if (!tableHtml.includes('Gold') || !tableHtml.includes('Silver')) continue;
      if (!tableHtml.includes('Event') && !tableHtml.includes('Games') && !tableHtml.includes('Discipline')) continue;

      const trs = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
      for (const tr of trs) {
        if (tr.includes('<th') && (tr.includes('>Event<') || tr.includes('>Games<') || tr.includes('>Discipline<'))) continue;
        const rawCells = tr.match(/<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi) || [];
        if (rawCells.length < 4) continue;

        let eventName = rawCells[0].replace(/<[^>]+>/g, ' ').replace(/\s*details/i, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
        if (/^\d+$/.test(eventName) || /^(event|games|rank|discipline)$/i.test(eventName)) continue;

        let gold = '', silver = '', bronze = '', result = '';

        if (rawCells.length >= 7) {
          gold = cleanCellText(rawCells[1]);
          result = cleanResult(rawCells[2]);
          silver = cleanCellText(rawCells[3]);
          bronze = cleanCellText(rawCells[5]);
        } else if (rawCells.length === 5) {
          gold = cleanCellText(rawCells[1]);
          silver = cleanCellText(rawCells[2]);
          const b1 = cleanCellText(rawCells[3]);
          const b2 = cleanCellText(rawCells[4]);
          if (b2 && !/^\d+(\.\d+)?/.test(b2) && !/^(or|wr|pb|sb)/i.test(b2)) {
            bronze = `${b1} & ${b2}`;
          } else {
            bronze = b1;
            result = cleanResult(b2);
          }
        } else {
          gold = cleanCellText(rawCells[1]);
          silver = cleanCellText(rawCells[2]);
          bronze = cleanCellText(rawCells[3]);
        }

        if (gold && !/^\d+$/.test(gold) && !/^(gold|first)$/i.test(gold)) {
          events.push({ sport, event: eventName, gold, silver, bronze, result });
        }
      }
    }
  }
  return events;
}

const EDITIONS_META = {
  "paris-2024": {
    name: "Paris 2024",
    officialTitle: "Games of the XXXIII Olympiad",
    year: 2024,
    hostCity: "Paris, France",
    dates: "26 July – 11 August 2024",
    motto: "Ouvrons grand les Jeux (Games Wide Open)",
    nations: 206,
    athletes: 10714,
    sportsCount: 32,
    eventsCount: 329,
    openingVenue: "River Seine & Jardins du Trocadéro",
    flameLighters: "Teddy Riner & Marie-José Pérec",
    summary: "Historic centenary games featuring the first Opening Ceremony held along a river (the Seine), exact 50:50 gender parity in athlete quotas, and breakthrough venues at iconic Parisian landmarks (Eiffel Tower Stadium, Grand Palais, Place de la Concorde, Versailles).",
    medalPage: '2024_Summer_Olympics_medal_table',
    winnersPage: 'List_of_2024_Summer_Olympics_medal_winners'
  },
  "tokyo-2020": {
    name: "Tokyo 2020",
    officialTitle: "Games of the XXXII Olympiad (Celebrated in 2021)",
    year: 2021,
    hostCity: "Tokyo, Japan",
    dates: "23 July – 8 August 2021",
    motto: "United by Emotion",
    nations: 205,
    athletes: 11420,
    sportsCount: 33,
    eventsCount: 339,
    openingVenue: "Japan National Stadium",
    flameLighters: "Naomi Osaka",
    summary: "Historic pandemic-delayed games that showcased incredible human resilience. Debuted Surfing, Skateboarding, Sport Climbing, 3x3 Basketball, and Karate while returning Baseball and Softball to the program.",
    medalPage: '2020_Summer_Olympics_medal_table',
    winnersPage: 'List_of_2020_Summer_Olympics_medal_winners'
  },
  "rio-2016": {
    name: "Rio 2016",
    officialTitle: "Games of the XXXI Olympiad",
    year: 2016,
    hostCity: "Rio de Janeiro, Brazil",
    dates: "5 – 21 August 2016",
    motto: "Um mundo novo (A New World)",
    nations: 207,
    athletes: 11238,
    sportsCount: 28,
    eventsCount: 306,
    openingVenue: "Maracanã Stadium",
    flameLighters: "Vanderlei Cordeiro de Lima",
    summary: "The first Olympic Games held in South America. Witnessed Usain Bolt complete his historic 'Triple-Triple' of sprint titles, Michael Phelps extend his record to 23 Olympic golds, and Brazil capture historic gold in men's football at the Maracanã.",
    medalPage: '2016_Summer_Olympics_medal_table',
    winnersPage: 'List_of_2016_Summer_Olympics_medal_winners'
  },
  "london-2012": {
    name: "London 2012",
    officialTitle: "Games of the XXX Olympiad",
    year: 2012,
    hostCity: "London, Great Britain",
    dates: "27 July – 12 August 2012",
    motto: "Inspire a Generation",
    nations: 204,
    athletes: 10568,
    sportsCount: 26,
    eventsCount: 302,
    openingVenue: "Olympic Stadium, Stratford",
    flameLighters: "Seven Young British Athletes",
    summary: "London became the first city to host the modern Olympic Games three times (1908, 1948, 2012). Celebrated for 'Super Saturday' (six British golds in one night) and David Rudisha's stunning 800m world record.",
    medalPage: '2012_Summer_Olympics_medal_table',
    winnersPage: 'List_of_2012_Summer_Olympics_medal_winners'
  },
  "beijing-2008": {
    name: "Beijing 2008",
    officialTitle: "Games of the XXIX Olympiad",
    year: 2008,
    hostCity: "Beijing, China",
    dates: "8 – 24 August 2008",
    motto: "One World, One Dream",
    nations: 204,
    athletes: 10942,
    sportsCount: 28,
    eventsCount: 302,
    openingVenue: "National Stadium (The Bird's Nest)",
    flameLighters: "Li Ning (flying through the air)",
    summary: "A spectacular showcase of sporting greatness. Michael Phelps won a record-breaking 8 gold medals in a single Games, while Usain Bolt announced himself to the world by shattering the 100m and 200m world records with electrifying ease.",
    medalPage: '2008_Summer_Olympics_medal_table',
    winnersPage: 'List_of_2008_Summer_Olympics_medal_winners'
  },
  "sydney-2000": {
    name: "Sydney 2000",
    officialTitle: "Games of the XXVII Olympiad",
    year: 2000,
    hostCity: "Sydney, Australia",
    dates: "15 September – 1 October 2000",
    motto: "Share the Spirit / Dare to Dream",
    nations: 199,
    athletes: 10651,
    sportsCount: 28,
    eventsCount: 300,
    openingVenue: "Stadium Australia",
    flameLighters: "Cathy Freeman",
    summary: "Hailed by IOC President Juan Antonio Samaranch as 'the best Olympic Games ever'. Cathy Freeman lit the cauldron and won 400m gold in one of the most culturally profound moments in sports history.",
    medalPage: '2000_Summer_Olympics_medal_table',
    winnersPage: 'List_of_2000_Summer_Olympics_medal_winners'
  }
};

const HERITAGE_DATA = {
  ancientOrigins: {
    title: "Ancient Roots (776 BC – 393 AD)",
    text: "The ancient Olympic Games were staged every four years in Olympia, Greece, in honor of Zeus. The games featured footraces (stadion), pankration, chariot races, and pentathlon. The 'Ekecheiria' (Olympic Truce) required all warring Greek city-states to suspend hostilities so athletes and spectators could travel safely."
  },
  modernResurrection: {
    title: "Modern Revival (Athens 1896)",
    text: "French educator Baron Pierre de Coubertin founded the International Olympic Committee (IOC) in 1894 at the Sorbonne in Paris. The inaugural modern Olympic Games opened in Athens at the Panathenaic Stadium in 1896, drawing 241 athletes from 14 nations to compete in 43 events."
  },
  symbolsAndValues: {
    title: "The Olympic Symbols & Values",
    values: [
      { name: "The Five Rings", desc: "Designed by Pierre de Coubertin in 1913, the five interlocking rings (blue, yellow, black, green, red) represent the union of the five inhabited continents of the world and the meeting of athletes from across the globe." },
      { name: "The Olympic Motto", desc: "'Citius, Altius, Fortius' (Faster, Higher, Stronger). In 2021, the IOC officially added 'Communiter' (Together) to reflect solidarity: 'Faster, Higher, Stronger – Together'." },
      { name: "The Olympic Flame & Torch Relay", desc: "Lit in ancient Olympia from the rays of the sun using a parabolic mirror, the flame travels across nations to signify peace and the passing of the Olympic spirit." },
      { name: "Olympic Creed", desc: "'The important thing in the Olympic Games is not to win, but to take part; the important thing in life is not triumph, but the struggle; the essential thing is not to have conquered, but to have fought well.'" }
    ]
  },
  evolutionMilestones: [
    { year: 1900, city: "Paris", milestone: "Women competed for the first time in Olympic history (Hélène de Pourtalès in sailing, Charlotte Cooper in tennis)." },
    { year: 1924, city: "Chamonix", milestone: "The first Winter Olympic Games were inaugurated in Chamonix, France." },
    { year: 1936, city: "Berlin", milestone: "Jesse Owens won four gold medals (100m, 200m, long jump, 4x100m relay), dismantling Nazi racial supremacy myths." },
    { year: 1960, city: "Rome", milestone: "Abebe Bikila of Ethiopia ran barefoot through the streets of Rome to become the first Black African Olympic gold medalist." },
    { year: 1968, city: "Mexico City", milestone: "Tommie Smith and John Carlos raised black-gloved fists on the 200m podium in a courageous silent protest for human rights." },
    { year: 1976, city: "Montreal", milestone: "14-year-old Romanian gymnast Nadia Comăneci scored the first perfect 10.0 in Olympic gymnastics history." },
    { year: 1992, city: "Barcelona", milestone: "The USA 'Dream Team' (Jordan, Magic, Bird) captivated the world as NBA players were welcomed to the Olympic tournament." },
    { year: 2008, city: "Beijing", milestone: "Michael Phelps won 8 gold medals and Usain Bolt broke three world records in the most decorated Olympic festival in history." },
    { year: 2024, city: "Paris", milestone: "First Olympic Games with exact 50:50 gender parity in athlete allocations and the first open-air river opening ceremony." }
  ]
};

async function buildAll() {
  console.log('--- 1. Building All-Time Medal Table ---');
  const allTimeHtml = await fetchWithCache('All-time_Olympic_Games_medal_table');
  const allTimeMedals = parseAllTimeMedalTable(allTimeHtml);
  console.log(`Extracted ${allTimeMedals.length} all-time nations.`);

  const editionsOutput = {};

  for (const [key, meta] of Object.entries(EDITIONS_META)) {
    console.log(`\n--- 2. Processing ${meta.name} (${key}) ---`);
    const medalHtml = await fetchWithCache(meta.medalPage);
    const medalTally = parseMedalTable(medalHtml);
    console.log(`  Medal Tally: ${medalTally.length} teams who won medals`);

    const winnersHtml = await fetchWithCache(meta.winnersPage);
    const events = parseEvents(winnersHtml);
    const sportSet = new Set(events.map(e => e.sport));
    console.log(`  Events: ${events.length} events across ${sportSet.size} sports`);

    editionsOutput[key] = {
      name: meta.name,
      officialTitle: meta.officialTitle,
      year: meta.year,
      hostCity: meta.hostCity,
      dates: meta.dates,
      motto: meta.motto,
      nations: meta.nations,
      athletes: meta.athletes,
      sportsCount: sportSet.size || meta.sportsCount,
      eventsCount: events.length || meta.eventsCount,
      openingVenue: meta.openingVenue,
      flameLighters: meta.flameLighters,
      summary: meta.summary,
      medalTally,
      events
    };
  }

  console.log('\n--- 3. Writing olympics-data.js ---');
  const content = `/**
 * SIDELINE Sports Desk — Comprehensive Olympic Games Database
 * Complete history from 1896 to present, edition-by-edition medal tallies (all teams),
 * and complete events & results across all sports.
 */

window.SIDELINE_ALL_TIME_OLYMPIC_MEDALS = ${JSON.stringify(allTimeMedals, null, 2)};

window.SIDELINE_OLYMPICS_EDITIONS = ${JSON.stringify(editionsOutput, null, 2)};

window.SIDELINE_OLYMPICS_HERITAGE = ${JSON.stringify(HERITAGE_DATA, null, 2)};
`;

  const outputPath = 'd:/frontend-projects/project-2/olympics-data.js';
  fs.writeFileSync(outputPath, content, 'utf8');
  const stats = fs.statSync(outputPath);
  console.log(`Successfully generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
}

buildAll().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
