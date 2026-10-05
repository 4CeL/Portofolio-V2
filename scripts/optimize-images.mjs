// Compress source images into src/assets as WebP.
// Usage: npm run images -- <file-or-folder> [more...]
// Example: npm run images -- "../portfolio/src/assets" "../portfolio/public/Profiles.png"
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("src/assets");
const MAX_WIDTH = 1600;
const QUALITY = 78;
const EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const toKebab = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

async function collect(input) {
  const info = await stat(input);
  if (info.isFile()) return EXT.has(path.extname(input).toLowerCase()) ? [input] : [];
  const entries = await readdir(input);
  return entries
    .filter((f) => EXT.has(path.extname(f).toLowerCase()))
    .map((f) => path.join(input, f));
}

async function main() {
  const inputs = process.argv.slice(2);
  if (inputs.length === 0) {
    console.error("Usage: npm run images -- <file-or-folder> [more...]");
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await Promise.all(inputs.map(collect))).flat();
  for (const file of files) {
    const out = path.join(OUT_DIR, `${toKebab(path.basename(file))}.webp`);
    const before = (await stat(file)).size;
    await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    const after = (await stat(out)).size;
    console.log(
      `${path.basename(file)} -> ${path.relative(process.cwd(), out)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
