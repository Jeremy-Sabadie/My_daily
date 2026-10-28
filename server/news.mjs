import { createServer } from 'node:http';
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

createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');


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
