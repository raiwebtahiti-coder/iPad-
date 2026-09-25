// Crée des images PROVISOIRES, clairement marquées, pour chaque photo pas
// encore téléchargée. Elles portent le nom définitif : `npm run photos` les
// remplace sans rien changer d'autre.
import { loadPhotos, loadManifest, saveManifest, writeVariants } from './images-lib.mjs';

const photos = await loadPhotos();
const manifest = await loadManifest();
const TONES = { hani: ['#dfe7dc', '#4d6b57'], tahi: ['#d8e9ec', '#3f6670'], hiva: ['#ece4d6', '#7a6247'] };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

let n = 0;
for (const p of photos) {
  if (manifest[p.id] && !manifest[p.id].placeholder) continue;
  const W = 1600, H = Math.round(W / p.ratio);
  const [bg, ink] = TONES[p.fare];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="100%" height="100%" fill="${bg}"/>
    <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${ink}" stroke-opacity=".35" stroke-width="3" stroke-dasharray="14 12"/>
    <text x="50%" y="46%" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="${Math.round(W / 22)}" fill="${ink}">PHOTO À VENIR</text>
    <text x="50%" y="56%" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-size="${Math.round(W / 40)}" fill="${ink}" fill-opacity=".8">${esc(p.id)}</text>
  </svg>`;
  const r = await writeVariants(p.id, Buffer.from(svg), { cover: p.cover });
  manifest[p.id] = { w: r.w, h: r.h, placeholder: true };
  n++;
}
await saveManifest(manifest);
console.log(`${n} image(s) provisoire(s) créée(s).`);
