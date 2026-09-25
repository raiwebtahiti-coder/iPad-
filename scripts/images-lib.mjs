// Outils partagés par fetch-photos.mjs et make-placeholders.mjs.
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const IMG_DIR = join(ROOT, 'src/images');
export const MANIFEST = join(IMG_DIR, 'manifest.json');
export const WIDTHS = [800, 1600];

export async function loadPhotos() {
  return JSON.parse(await readFile(join(ROOT, 'content/photos.json'), 'utf8')).photos;
}

export async function loadManifest() {
  if (!existsSync(MANIFEST)) return {};
  return JSON.parse(await readFile(MANIFEST, 'utf8'));
}

export async function saveManifest(m) {
  await mkdir(IMG_DIR, { recursive: true });
  const sorted = Object.fromEntries(Object.keys(m).sort().map((k) => [k, m[k]]));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
}

/* Écrit les déclinaisons WebP d'une image source (buffer) :
   <id>-800.webp, <id>-1600.webp, et pour les couvertures og-<id>.jpg (1200×630). */
export async function writeVariants(id, input, { cover = false } = {}) {
  await mkdir(IMG_DIR, { recursive: true });
  const meta = await sharp(input).rotate().metadata();
  const srcW = meta.autoOrient?.width ?? meta.width;
  const srcH = meta.autoOrient?.height ?? meta.height;
  let out = {};
  for (const w of WIDTHS) {
    const info = await sharp(input).rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(join(IMG_DIR, `${id}-${w}.webp`));
    out[w] = { w: info.width, h: info.height };
  }
  if (cover) {
    await sharp(input).rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(join(IMG_DIR, `og-${id}.jpg`));
  }
  return { srcW, srcH, w: out[1600].w, h: out[1600].h };
}
