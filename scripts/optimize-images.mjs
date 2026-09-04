/**
 * Optimizes the JPEG photos in /public/gallery in place:
 *  - downscales large images to a max. dimension of 1920 px
 *  - recompresses with mozjpeg (progressive)
 *  - strips EXIF metadata (smaller files, no personal data)
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # all photos
 *   node scripts/optimize-images.mjs 0 6        # photos 0-5 only (batches)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const dirPath = fileURLToPath(new URL('../public/gallery/', import.meta.url));
const MAX_DIMENSION = 1920;
const QUALITY = 76;
const CONCURRENCY = 3;

const startIdx = Number(process.argv[2] || 0);
const endIdxRaw = Number(process.argv[3] ?? NaN);

// Only the original photos, e.g. "old-bridge-heidelberg (1).jpg".
const all = fs
  .readdirSync(dirPath)
  .filter((f) => /^old-bridge-heidelberg \(\d+\)\.jpe?g$/i.test(f))
  .sort();
const files = all.slice(startIdx, Number.isNaN(endIdxRaw) ? undefined : endIdxRaw);

if (files.length === 0) {
  console.log(`No files in range [${startIdx}, ${endIdxRaw}).`);
  process.exit(0);
}

async function processFile(file) {
  const src = path.join(dirPath, file);
  const before = fs.statSync(src).size;
  // Read via Node (reliable here), process in memory, then write in place.
  const input = fs.readFileSync(src);
  const image = sharp(input, { failOn: 'error' });
  const meta = await image.metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);

  let pipeline = image.rotate();
  if (longest > MAX_DIMENSION) {
    pipeline = pipeline.resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true });
  }
  // Overwrite the original in place (no file deletion, no temp leftovers).
  const buffer = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true }).toBuffer();
  fs.writeFileSync(src, buffer);

  const after = buffer.length;
  const pct = ((1 - after / before) * 100).toFixed(1);
  return `${(before / 1024).toFixed(0).padStart(6)} KB -> ${(after / 1024).toFixed(0).padStart(5)} KB  (-${pct.padStart(5)}%)  ${file}`;
}

let totalBefore = 0;
let totalAfter = 0;
let done = 0;
let failed = 0;

for (let i = 0; i < files.length; i += CONCURRENCY) {
  const chunk = files.slice(i, i + CONCURRENCY);
  const results = await Promise.all(
    chunk.map(async (file) => {
      const before = fs.statSync(path.join(dirPath, file)).size;
      totalBefore += before;
      try {
        const line = await processFile(file);
        totalAfter += fs.statSync(path.join(dirPath, file)).size;
        return line;
      } catch (err) {
        failed++;
        return `SKIP  ${file}  (${err.message})`;
      }
    })
  );
  for (const line of results) {
    console.log(line);
    done++;
  }
}

const saved = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(`\nProcessed ${done} file(s) (${failed} failed). Total: ${(totalBefore / 1024 / 1024).toFixed(1)} MB -> ${(totalAfter / 1024 / 1024).toFixed(1)} MB  (-${saved}%)`);
