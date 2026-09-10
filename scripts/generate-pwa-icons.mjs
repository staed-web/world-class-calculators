#!/usr/bin/env node
/**
 * Generate PWA icons from public/logo.png (512×512).
 * Run: node scripts/generate-pwa-icons.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public/logo.png");
const outDir = path.join(root, "public/icons");
const bg = { r: 7, g: 11, b: 20, alpha: 1 };

async function squareIcon(size, out) {
  await sharp(src).resize(size, size, { fit: "cover" }).png().toFile(out);
  console.log("wrote", path.relative(root, out));
}

async function maskable(size, out) {
  const pad = Math.round(size * 0.1);
  const inner = size - pad * 2;
  const logo = await sharp(src)
    .resize(inner, inner, { fit: "contain", background: bg })
    .png()
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logo, left: pad, top: pad }])
    .png()
    .toFile(out);
  console.log("wrote", path.relative(root, out));
}

await squareIcon(192, path.join(outDir, "icon-192.png"));
await squareIcon(512, path.join(outDir, "icon-512.png"));
await maskable(192, path.join(outDir, "maskable-192.png"));
await maskable(512, path.join(outDir, "maskable-512.png"));
await sharp(src).resize(180, 180, { fit: "cover" }).png().toFile(path.join(root, "public/apple-touch-icon.png"));
await sharp(src).resize(192, 192, { fit: "cover" }).png().toFile(path.join(root, "public/icon.png"));
console.log("done");
