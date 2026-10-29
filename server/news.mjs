import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  cdataPropName: '#text'
});

const feeds = [
  { category: 'TECHNOLOGIE', query: 'intelligence artificielle technologie' },
  { category: 'PYRÉNÉES', query: 'Pyrénées montagne environnement' },
  { category: 'SCIENCES', query: 'sciences découvertes espace' }
];

let cache = [];
let lastFetch = 0;

async function getNews() {
  if (cache.length && Date.now() - lastFetch < 900000) return cache;

  const results = await Promise.all(feeds.map(async feed => {
    const url = 'https://news.google.com/rss/search?q=' +
      encodeURIComponent(feed.query) +
      '&hl=fr&gl=FR&ceid=FR:fr';

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 MyDaily/1.0' },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) throw new Error(`RSS HTTP ${response.status}`);

    const xml = parser.parse(await response.text());
    const items = xml?.rss?.channel?.item;
    const item = (Array.isArray(items) ? items : [items]).find(Boolean);

    if (!item) throw new Error('Flux RSS vide');

    const source = typeof item.source === 'object'
      ? item.source['#text'] ?? ''
      : item.source ?? '';

    return {
      category: feed.category,
      title: String(item.title ?? '').replace(/\s+-\s+[^-]+$/, ''),
      description: source || feed.category,
      url: String(item.link ?? ''),
      date: String(item.pubDate ?? '')
    };
  }));

  cache = results;
  lastFetch = Date.now();
  return results;
}


// YouVersion : verset officiel du jour, traduction française LSG 1910.
const youversionKey = readFileSync(
  process.env.YOUVERSION_KEY_FILE || '/opt/my-daily/.secrets/youversion.key', 'utf8'
).trim();

let verseCache = null;
let verseCacheDate = '';

async function getDailyVerse() {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

  if (verseCache && verseCacheDate === today) return verseCache;

  const [year, month, day] = today.split('-').map(Number);
  const dayOfYear = Math.floor(
    (Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / 86400000
  ) + 1;

  const headers = {
    'X-YVP-App-Key': youversionKey,
    'Accept': 'application/json'
  };

  const dailyResponse = await fetch(
    `https://api.youversion.com/v1/verse-of-the-days/${dayOfYear}`,
    { headers, signal: AbortSignal.timeout(10000) }
  );

  if (!dailyResponse.ok) {
    throw new Error(`YouVersion quotidien HTTP ${dailyResponse.status}`);
  }

  const daily = await dailyResponse.json();

  if (!daily.passage_id) {
    throw new Error('Référence YouVersion absente');
  }

  const passageResponse = await fetch(
    `https://api.youversion.com/v1/bibles/93/passages/${encodeURIComponent(daily.passage_id)}`,
    { headers, signal: AbortSignal.timeout(10000) }
  );

  if (!passageResponse.ok) {
    throw new Error(`YouVersion passage HTTP ${passageResponse.status}`);
  }

  const passage = await passageResponse.json();

  if (!passage.content || !passage.reference) {
    throw new Error('Texte ou référence du passage absent');
  }

  verseCache = {
    text: passage.content,
    reference: passage.reference,
    translation: 'Louis Segond 1910',
    source: 'YouVersion',
    date: today
  };

  verseCacheDate = today;
  return verseCache;
}

createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');



  if (req.url === '/api/verse') {
    try {
      const verse = await getDailyVerse();
      res.setHeader('Cache-Control', 'no-store');
      res.writeHead(200);
      res.end(JSON.stringify(verse));
    } catch (error) {
      console.error('YouVersion indisponible :', error.message);
      res.writeHead(502);
      res.end(JSON.stringify({ error: 'Verset indisponible' }));
    }
    return;
  }

  if (req.url === '/api/agenda') {
    try {
      const response = await fetch('http://127.0.0.1:8083/api/agenda', {
        signal: AbortSignal.timeout(8000)
      });

      if (!response.ok) throw new Error(`Agenda HTTP ${response.status}`);

      const events = await response.json();

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      });
      res.end(JSON.stringify(events));
    } catch (error) {
      console.error('Agenda indisponible :', error.message);
      res.writeHead(502, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      });
      res.end(JSON.stringify({ error: 'Agenda indisponible' }));
    }
    return;
  }


  if (req.url === '/api/status') {
    const services = [
      { name: 'My Popote', url: process.env.MYPOPOTE_HEALTH_URL },
      { name: 'ProductPulse', url: process.env.PRODUCTPULSE_HEALTH_URL },
      { name: 'Paperless', url: process.env.PAPERLESS_HEALTH_URL },
      { name: 'Uptime Kuma', url: process.env.KUMA_HEALTH_URL }
    ];

    const results = await Promise.all(services.map(async service => {
      if (!service.url) {
        return { name: service.name, status: 'Non configuré' };
      }

      try {
        const response = await fetch(service.url, {
          signal: AbortSignal.timeout(5000),
          redirect: 'manual'
        });

        return {
          name: service.name,
          status: (response.ok || response.status === 302) ? 'En ligne' : 'Hors ligne'
        };
      } catch {
        return { name: service.name, status: 'Hors ligne' };
      }
    }));

    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(results));
    return;
  }

  if (req.url !== '/api/news') {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'Not found' }));
  }

  try {
    res.end(JSON.stringify(await getNews()));
  } catch (error) {
    console.error(error);
    res.writeHead(503);
    res.end(JSON.stringify({ error: 'Actualités indisponibles' }));
  }
}).listen(3100, '127.0.0.1', () =>
  console.log('My Daily News API : http://localhost:3100/api/news')
);
