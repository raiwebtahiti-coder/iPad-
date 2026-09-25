// Générateur du site : lit content/ et produit dist/ (HTML statique).
// Usage : npm run build   — aucune dépendance, Node ≥ 20.
import { mkdir, rm, cp, readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJSON, makeT, Images, TBC } from './lib.mjs';
import { homePage, contentJs } from './templates/home.mjs';
import { farePage } from './templates/fare.mjs';
import { contactPage, merciPage } from './templates/contact.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const VENDOR = join(ROOT, 'vendor/site-immersif');

const config = await readJSON(join(ROOT, 'content/config.json'));
const photos = (await readJSON(join(ROOT, 'content/photos.json'))).photos;
const manifestPath = join(ROOT, 'src/images/manifest.json');
const manifest = existsSync(manifestPath) ? await readJSON(manifestPath) : {};
const img = new Images(photos, manifest);

/* noindex : toujours hors production Netlify ; sinon selon config.preview */
const netlifyContext = process.env.CONTEXT;
const noindex = netlifyContext ? netlifyContext !== 'production' || config.preview : config.preview;

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

/* ─── moteur du template : copié, jamais réécrit ─── */
await cp(join(VENDOR, 'app.js'), join(DIST, 'app.js'));

/* styles.css : les DEUX seules valeurs que le skill autorise à changer */
let css = await readFile(join(VENDOR, 'styles.css'), 'utf8');
const accentFrom = '--lime: #e3f794;';
const spotFrom = "url('https://picsum.photos/id/375/1200/800')";
if (!css.includes(accentFrom) || !css.includes(spotFrom)) throw new Error('styles.css canonique inattendu');
css = css.replace(accentFrom, `--lime: ${config.accent};`);
const home0 = await readJSON(join(ROOT, `content/${config.defaultLocale}/home.json`));
css = css.replace(spotFrom, `url('images/${home0.hook.image}-1600.webp')`);
await writeFile(join(DIST, 'styles.css'), css);

/* injection canonique de content.js (moitié basse du fichier d'exemple) */
const example = await readFile(join(VENDOR, 'content.example.js'), 'utf8');
const injAt = example.lastIndexOf('/* ═', example.indexOf('INJECTION — NE PAS MODIFIER'));
const injection = example.slice(injAt);

/* ─── fichiers propres au site ─── */
for (const f of await readdir(join(ROOT, 'src/assets'))) await cp(join(ROOT, 'src/assets', f), join(DIST, f));
await cp(join(ROOT, 'src/fonts'), join(DIST, 'fonts'), { recursive: true });
await mkdir(join(DIST, 'images'), { recursive: true });
for (const f of await readdir(join(ROOT, 'src/images'))) {
  if (/\.(webp|jpg)$/.test(f)) await cp(join(ROOT, 'src/images', f), join(DIST, 'images', f));
}

/* ─── pages, par langue ─── */
const pagesForSitemap = [];
const tbcFound = new Set();

function collectTbc(obj, path) {
  if (typeof obj === 'string') { if (obj.includes(TBC)) tbcFound.add(path); return; }
  if (obj && typeof obj === 'object') for (const [k, v] of Object.entries(obj)) if (!k.startsWith('_')) collectTbc(v, `${path}.${k}`);
}

for (const locale of config.locales) {
  const dir = join(ROOT, 'content', locale);
  const site = await readJSON(join(dir, 'site.json'));
  const fareData = await readJSON(join(dir, 'fares.json'));
  const reviews = await readJSON(join(dir, 'reviews.json'));
  const home = await readJSON(join(dir, 'home.json'));
  const ui = await readJSON(join(dir, 'ui.json'));
  for (const [name, data] of Object.entries({ site, fares: fareData, home })) collectTbc(data, `content/${locale}/${name}.json`);

  const prefix = locale === config.defaultLocale ? '' : `/${locale}`;
  const base = (netlifyContext === 'production' && process.env.URL) || process.env.DEPLOY_PRIME_URL || site.seo.siteUrl;
  const ctx = {
    locale, prefix, base: base.replace(/\/$/, ''), noindex, config,
    site, home, reviews, ui, t: makeT(ui), img,
    fares: fareData.fares, common: fareData.common, compare: fareData.compare
  };

  const out = async (rel, html) => {
    const file = join(DIST, prefix, rel);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
  };

  await out('index.html', homePage(ctx, { injection }));
  await out('content.js', contentJs(ctx, injection));
  pagesForSitemap.push({ path: `${prefix}/`, base: ctx.base, priority: '1.0' });
  for (const f of ctx.fares) {
    await out(`${f.slug}/index.html`, farePage(ctx, f));
    pagesForSitemap.push({ path: `${prefix}/${f.slug}/`, base: ctx.base, priority: '0.9' });
  }
  await out('contact/index.html', contactPage(ctx));
  pagesForSitemap.push({ path: `${prefix}/contact/`, base: ctx.base, priority: '0.6' });
  await out('merci/index.html', merciPage(ctx));
}

/* ─── plan du site, robots, en-têtes ─── */
const today = new Date().toISOString().slice(0, 10);
const siteBase = pagesForSitemap[0].base;
await writeFile(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pagesForSitemap.map((p) => `  <url><loc>${p.base}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`);
await writeFile(join(DIST, 'robots.txt'), noindex
  ? `# Version d'aperçu : indexation désactivée (content/config.json → "preview")\nUser-agent: *\nDisallow: /\n`
  : `User-agent: *\nAllow: /\nDisallow: /merci/\n\nSitemap: ${siteBase}/sitemap.xml\n`);
await writeFile(join(DIST, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
${noindex ? '  X-Robots-Tag: noindex, nofollow\n' : ''}
/images/*
  Cache-Control: public, max-age=604800

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`);

const placeholders = Object.values(manifest).filter((m) => m.placeholder).length;
console.log(`✓ Site généré dans dist/ (${pagesForSitemap.length} pages indexables${noindex ? ', noindex d\'aperçu ACTIF' : ''}).`);
if (placeholders) console.log(`! ${placeholders} photo(s) provisoire(s) — lancer \`npm run photos\`.`);
console.log(`! ${tbcFound.size} champ(s) [à confirmer] :\n  ${[...tbcFound].join('\n  ')}`);
