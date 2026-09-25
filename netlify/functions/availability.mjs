// Disponibilités d'un fare, lues dans son calendrier Airbnb exporté en iCal.
// GET /api/availability?fare=hani|tahi|hiva
//   → { enabled: true, busy: [{ start: "2026-10-01", end: "2026-10-05" }], updated }
//     (end = jour de départ, exclu)
//   → { enabled: false } si la variable d'environnement est absente ou si le
//     calendrier est illisible : la page masque alors le calendrier.
// Variables : ICAL_FARE_HANI, ICAL_FARE_TAHI, ICAL_FARE_HIVA (URL iCal Airbnb).
// Cache : 1 h (mémoire de la fonction + CDN Netlify).

const ENV = { hani: 'ICAL_FARE_HANI', tahi: 'ICAL_FARE_TAHI', hiva: 'ICAL_FARE_HIVA' };
const TTL = 60 * 60 * 1000;
const cache = new Map();

const json = (body, maxAge) => new Response(JSON.stringify(body), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': `public, max-age=${maxAge}`,
    'Netlify-CDN-Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=600`
  }
});

const getEnv = (name) => (globalThis.Netlify?.env?.get(name) ?? process.env[name] ?? '').trim();

function toIso(value) {
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(value);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

export function parseIcal(text) {
  // dépliage des lignes (RFC 5545 : une ligne qui commence par un espace continue la précédente)
  const lines = text.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '').split(/\r?\n/);
  const busy = [];
  let ev = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') ev = {};
    else if (line === 'END:VEVENT') {
      if (ev && ev.start) {
        const end = ev.end || ev.start;
        busy.push({ start: ev.start, end: end > ev.start ? end : ev.start });
      }
      ev = null;
    } else if (ev) {
      const i = line.indexOf(':');
      if (i < 0) continue;
      const key = line.slice(0, i).split(';')[0];
      if (key === 'DTSTART') ev.start = toIso(line.slice(i + 1));
      if (key === 'DTEND') ev.end = toIso(line.slice(i + 1));
    }
  }
  return busy;
}

export default async (req) => {
  const fare = new URL(req.url).searchParams.get('fare');
  const envName = ENV[fare];
  if (!envName) return json({ enabled: false, error: 'unknown fare' }, 3600);

  const url = getEnv(envName);
  if (!/^https:\/\//.test(url)) return json({ enabled: false }, 300);

  const hit = cache.get(fare);
  if (hit && Date.now() - hit.at < TTL) return json(hit.body, 3600);

  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'les-fare-de-maatea/1.0' }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('BEGIN:VCALENDAR')) throw new Error('not an iCal feed');
    const today = new Date().toISOString().slice(0, 10);
    const horizon = new Date(Date.now() + 400 * 864e5).toISOString().slice(0, 10);
    const busy = parseIcal(text)
      .filter((r) => r.end > today && r.start < horizon)
      .sort((a, b) => a.start.localeCompare(b.start));
    const body = { enabled: true, busy, updated: new Date().toISOString() };
    cache.set(fare, { at: Date.now(), body });
    return json(body, 3600);
  } catch (err) {
    console.error(`availability ${fare}:`, err.message);
    // un calendrier illisible ne doit jamais s'afficher « tout libre »
    return json({ enabled: false, error: 'unavailable' }, 300);
  }
};

export const config = { path: '/api/availability' };
