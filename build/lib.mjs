// Outils du générateur : chargement du contenu, traduction, échappement,
// images responsive, <head> SEO. Aucune dépendance externe.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const TBC = '[à confirmer]';

export async function readJSON(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

/* ─── texte ─── */
export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export const isTbc = (s) => typeof s === 'string' && (s.includes(TBC) || s.trim() === '');

/* Texte visible : échappé, et chaque [à confirmer] surligné pour qu'aucun
   bouche-trou ne passe inaperçu à la relecture. */
export const txt = (s) => esc(s).replace(/\[à confirmer\]/g, '<mark class="tbc">[à confirmer]</mark>');

/* Texte pour attribut / meta : [à confirmer] retiré proprement. */
export const plain = (s) => String(s ?? '').replace(/\s*[:—-]?\s*\[à confirmer\]\.?/g, '').trim();

/* ─── i18n ─── */
export function makeT(ui) {
  return (key, vars = {}) => {
    let s = ui[key];
    if (s === undefined) throw new Error(`Clé de traduction manquante : ${key}`);
    for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
    return s;
  };
}

/* ─── images ─── */
export class Images {
  constructor(photos, manifest) {
    this.byId = Object.fromEntries(photos.map((p) => [p.id, p]));
    this.manifest = manifest;
  }
  get(id) {
    const p = this.byId[id];
    if (!p) throw new Error(`Photo inconnue : ${id}`);
    const m = this.manifest[id] || {};
    const w = m.w || 1600, h = m.h || Math.round(1600 / p.ratio);
    return { ...p, w, h, placeholder: m.placeholder !== false };
  }
  src(id, size = 1600) { return `/images/${id}-${size}.webp`; }
  srcset(id) { return `/images/${id}-800.webp 800w, /images/${id}-1600.webp 1600w`; }
  /* <img> responsive, chargement différé par défaut */
  img(id, { sizes = '100vw', alt, cls = '', eager = false, attrs = '' } = {}) {
    const p = this.get(id);
    return `<img src="${this.src(id)}" srcset="${this.srcset(id)}" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="${esc(alt ?? p.alt)}"${cls ? ` class="${cls}"` : ''}${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}${attrs ? ' ' + attrs : ''}>`;
  }
  og(id) { return `/images/og-${id}.jpg`; }
  exists(root, id) { return existsSync(join(root, 'src/images', `${id}-1600.webp`)); }
}

/* ─── <head> ─── */
export function head({ ctx, title, description, path, image, jsonld = [], extraCss = true, alternates = [] }) {
  const { site, ui, base, noindex } = ctx;
  const url = base + path;
  const img = base + image;
  return `<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(plain(description))}">
  ${noindex ? '<meta name="robots" content="noindex, nofollow"><!-- aperçu : retirer à la mise en ligne (content/config.json → "preview": false) -->' : ''}
  <link rel="canonical" href="${esc(url)}">
  ${alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${esc(base + a.path)}">`).join('\n  ')}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(site.brand.name)}">
  <meta property="og:locale" content="${esc(ui.ogLocale)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(plain(description))}">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:image" content="${esc(img)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#f4f3f0">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/fonts/bricolage-grotesque-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/fonts/fonts.css">
  <link rel="stylesheet" href="/styles.css">
  ${extraCss ? '<link rel="stylesheet" href="/pages.css">' : ''}
  ${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n  ')}`;
}

/* Données structurées : on n'y met jamais de valeur « à confirmer ». */
export function clean(obj) {
  if (Array.isArray(obj)) return obj.map(clean).filter((v) => v !== undefined);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const c = clean(v);
      if (c !== undefined && !(Array.isArray(c) && !c.length)) out[k] = c;
    }
    return out;
  }
  if (typeof obj === 'string' && isTbc(obj)) return undefined;
  return obj;
}
