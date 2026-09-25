// Télécharge les photos de la cliente (annonces Airbnb) en pleine résolution,
// les convertit en WebP et les range dans src/images/.
// Usage : npm run photos            (toutes les photos manquantes ou provisoires)
//         npm run photos -- --force (tout retélécharger)
import { loadPhotos, loadManifest, saveManifest, writeVariants } from './images-lib.mjs';

const force = process.argv.includes('--force');
const photos = await loadPhotos();
const manifest = await loadManifest();
const failed = [], small = [];
let ok = 0;

async function download(url) {
  // l'URL sans paramètre renvoie l'original ; im_w=1440 en repli
  for (const u of [url, url + '?im_w=1440']) {
    try {
      const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok && (res.headers.get('content-type') || '').startsWith('image/')) {
        return Buffer.from(await res.arrayBuffer());
      }
    } catch { /* on essaie la suivante */ }
  }
  return null;
}

for (const p of photos) {
  const cur = manifest[p.id];
  if (!force && cur && !cur.placeholder) continue;
  const buf = await download(p.source);
  if (!buf) { failed.push(p.id); console.log(`✗ ${p.id}`); continue; }
  const r = await writeVariants(p.id, buf, { cover: p.cover });
  manifest[p.id] = { w: r.w, h: r.h, srcW: r.srcW, srcH: r.srcH, placeholder: false };
  if (r.srcW < 1600) small.push(`${p.id} (${r.srcW}×${r.srcH})`);
  ok++;
  console.log(`✓ ${p.id}  ${r.srcW}×${r.srcH}`);
}
await saveManifest(manifest);

console.log(`\n${ok} photo(s) téléchargée(s).`);
if (small.length) console.log(`Moins de 1600 px de large :\n  ${small.join('\n  ')}`);
if (failed.length) {
  console.log(`Échec (${failed.length}) — les images provisoires restent en place :\n  ${failed.join('\n  ')}`);
  process.exitCode = 1;
}
console.log('Relancer `npm run build` pour régénérer le site.');
