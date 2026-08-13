/**
 * FutureHerAfrica Logo System — Candidate Generator (FHA-01 Ascend)
 *
 * CONTROLLED CANDIDATE ONLY.
 * Does NOT write to brand/01_logo/svg|png|app|favicon production paths.
 * Does NOT replace approved Horizon FH_Logo_* masters.
 *
 * Output: brand/01_logo/candidates/fha_v1/
 */
import sharp from "sharp";
import opentype from "opentype.js";
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAND = join(__dirname, "..");
const OUT = join(BRAND, "01_logo", "candidates", "fha_v1");

const C = {
  ink: "#121A21",
  stone: "#F3EFE8",
  brass: "#B8893A",
  ivory: "#FFFCF8",
  night: "#0B1014",
};

const WORD = "FutureHerAfrica";

function ensure(dir) {
  mkdirSync(dir, { recursive: true });
}

function write(path, content) {
  ensure(dirname(path));
  writeFileSync(path, content);
  console.log("wrote", path.replace(BRAND, "brand"));
}

async function svgToPng(svg, outPath, width, height) {
  ensure(dirname(outPath));
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log("png ", outPath.replace(BRAND, "brand"));
}

async function svgToPngExact(svg, outPath, width, height) {
  ensure(dirname(outPath));
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log("png ", outPath.replace(BRAND, "brand"));
}

function loadFont(file) {
  const buf = readFileSync(join(__dirname, "fonts", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const FONT_MED = loadFont("Satoshi-Medium.ttf");
const FONT_BOLD = loadFont("Satoshi-Bold.ttf");

function commandsToPath(commands, digits = 2) {
  const r = (n) => {
    if (!Number.isFinite(n)) return null;
    return Number(n.toFixed(digits));
  };
  let d = "";
  for (const c of commands) {
    if (c.type === "M") {
      const x = r(c.x),
        y = r(c.y);
      if (x === null || y === null) continue;
      d += `M${x} ${y}`;
    } else if (c.type === "L") {
      const x = r(c.x),
        y = r(c.y);
      if (x === null || y === null) continue;
      d += `L${x} ${y}`;
    } else if (c.type === "Q") {
      const vals = [c.x1, c.y1, c.x, c.y].map(r);
      if (vals.some((v) => v === null)) continue;
      d += `Q${vals[0]} ${vals[1]} ${vals[2]} ${vals[3]}`;
    } else if (c.type === "C") {
      const vals = [c.x1, c.y1, c.x2, c.y2, c.x, c.y].map(r);
      if (vals.some((v) => v === null)) continue;
      d += `C${vals.join(" ")}`;
    } else if (c.type === "Z") {
      d += "Z";
    }
  }
  return d;
}

function textPath(font, text, x, y, size, fill, { tracking = 0, anchor = "start" } = {}) {
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  let total = 0;
  for (let i = 0; i < glyphs.length; i++) {
    total += glyphs[i].advanceWidth * scale;
    if (i < glyphs.length - 1) total += tracking;
  }
  let cx = anchor === "middle" ? x - total / 2 : x;
  let d = "";
  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i];
    if (!g || g.index === 0) {
      cx += (g?.advanceWidth || font.unitsPerEm * 0.5) * scale + tracking;
      continue;
    }
    d += commandsToPath(g.getPath(cx, y, size).commands) + " ";
    cx += g.advanceWidth * scale + tracking;
  }
  return `<path d="${d.trim()}" fill="${fill}"/>`;
}

function textWidth(font, text, size, tracking = 0) {
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  let total = 0;
  for (let i = 0; i < glyphs.length; i++) {
    total += glyphs[i].advanceWidth * scale;
    if (i < glyphs.length - 1) total += tracking;
  }
  return total;
}

/**
 * FHA Ascend mark — symbol that works without wordmark.
 *
 * Construction (unit grid 0–100 inside optical square):
 * - Left upright + short top spur → F (Future)
 * - Two uprights + bridging rising arc → H (Her)
 * - Open ascending silhouette / peak motion → A (Africa / Ascend)
 * - Rising Brass arc + micro-dot → horizon, forward, growth, potential
 *
 * Small-size mode drops spur + uprights → proven Horizon arc alone.
 */
function ascendMark({
  size = 256,
  stem = C.ink,
  arc = C.brass,
  bg = null,
  softSquare = false,
  small = false,
  padding = 0.18,
}) {
  const r = softSquare ? size * 0.16 : 0;
  const bgRect = bg
    ? `<rect width="${size}" height="${size}" fill="${bg}"${r ? ` rx="${r}"` : ""}/>`
    : "";

  const inset = size * padding;
  const field = size - inset * 2;
  const ox = inset;
  const oy = inset;

  // Map 0–100 construction coords into field
  const X = (u) => ox + (u / 100) * field;
  const Y = (v) => oy + (v / 100) * field;
  const S = (u) => (u / 100) * field;

  const stemW = small ? 0 : S(5.5);
  const arcW = small ? S(8.5) : S(6.2);
  const dotR = small ? S(4.2) : S(3.2);
  const r2 = (n) => Number(n.toFixed(2));

  // Arc geometry (rising L→R)
  const ax0 = r2(X(small ? 12 : 18));
  const ay0 = r2(Y(small ? 58 : 52));
  const ax1 = r2(X(small ? 88 : 84));
  const ay1 = r2(Y(small ? 38 : 34));
  const cpx = r2(X(50));
  const cpy = r2(Y(small ? 18 : 14));

  const arcPath = `M ${ax0} ${ay0} Q ${cpx} ${cpy} ${ax1} ${ay1}`;
  const arcEl = `<path d="${arcPath}" stroke="${arc}" stroke-width="${r2(arcW)}" stroke-linecap="round" fill="none"/>`;
  const dotEl = `<circle cx="${ax1}" cy="${ay1}" r="${r2(dotR)}" fill="${arc}"/>`;

  if (small) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  ${bgRect}
  ${arcEl}
  ${dotEl}
</svg>`;
  }

  // Stems: H uprights / open A legs; left spur = F
  const lx = r2(X(28));
  const rx = r2(X(72));
  const topL = r2(Y(28));
  const topR = r2(Y(34)); // slightly lower → forward asymmetry
  const base = r2(Y(86));
  const spurX = r2(X(48)); // short F spur — must not meet right stem
  const sw = r2(stemW);

  const stems = `
  <path d="M ${lx} ${base} L ${lx} ${topL}" stroke="${stem}" stroke-width="${sw}" stroke-linecap="round"/>
  <path d="M ${rx} ${base} L ${rx} ${topR}" stroke="${stem}" stroke-width="${sw}" stroke-linecap="round"/>
  <path d="M ${lx} ${topL} L ${spurX} ${topL}" stroke="${stem}" stroke-width="${sw}" stroke-linecap="round"/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  ${bgRect}
  ${stems}
  ${arcEl}
  ${dotEl}
</svg>`;
}

/** Arc-only extract for micro/favicon companion (Horizon continuity) */
function arcOnlyMark({ size = 256, stroke = C.brass, bg = null, softSquare = false }) {
  return ascendMark({ size, stem: stroke, arc: stroke, bg, softSquare, small: true, padding: 0.19 });
}

function primaryLockup({
  word = C.ink,
  stem = C.ink,
  arc = C.brass,
  bg = null,
  w = 900,
  h = 320,
}) {
  const bgRect = bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : "";
  const markSize = 88;
  const markX = (w - markSize) / 2;
  const markY = 36;
  const fontSize = 52;
  const tracking = -0.52;
  const baseline = 250;
  const cx = w / 2;

  // Inline mark at top (no soft square)
  const markSvg = ascendMark({ size: markSize, stem, arc, small: false, padding: 0.08 });
  const markInner = markSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  ${bgRect}
  <g transform="translate(${markX} ${markY})">
    ${markInner}
  </g>
  ${textPath(FONT_MED, WORD, cx, baseline, fontSize, word, { tracking, anchor: "middle" })}
</svg>`;
}

function wordmarkOnly({ word = C.ink, bg = null, w = 820, h = 140 }) {
  const bgRect = bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  ${bgRect}
  ${textPath(FONT_MED, WORD, w / 2, h / 2 + 16, 48, word, { tracking: -0.48, anchor: "middle" })}
</svg>`;
}

function horizontalLockup({
  word = C.ink,
  stem = C.ink,
  arc = C.brass,
  bg = null,
  w = 980,
  h = 200,
}) {
  const bgRect = bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : "";
  const markSize = 112;
  const markX = 48;
  const markY = (h - markSize) / 2;
  const fontSize = 44;
  const tracking = -0.44;
  const tw = textWidth(FONT_MED, WORD, fontSize, tracking);
  const gap = 36;
  const textX = markX + markSize + gap;
  const textY = h / 2 + fontSize * 0.35;
  // Optical centre of whole lockup
  const totalW = markSize + gap + tw;
  const shift = (w - totalW) / 2 - markX;

  const markSvg = ascendMark({ size: markSize, stem, arc, padding: 0.1 });
  const markInner = markSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  ${bgRect}
  <g transform="translate(${markX + shift} ${markY})">
    ${markInner}
  </g>
  ${textPath(FONT_MED, WORD, textX + shift, textY, fontSize, word, { tracking })}
</svg>`;
}

function stackedLockup({
  word = C.ink,
  stem = C.ink,
  arc = C.brass,
  bg = null,
  w = 560,
  h = 420,
}) {
  const bgRect = bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : "";
  const markSize = 120;
  const markX = (w - markSize) / 2;
  const markY = 40;
  const line1 = "FutureHer";
  const line2 = "Africa";
  const size1 = 44;
  const size2 = 44;
  const track = -0.44;
  const y1 = 240;
  const y2 = 296;
  const cx = w / 2;

  const markSvg = ascendMark({ size: markSize, stem, arc, padding: 0.1 });
  const markInner = markSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  ${bgRect}
  <g transform="translate(${markX} ${markY})">
    ${markInner}
  </g>
  ${textPath(FONT_MED, line1, cx, y1, size1, word, { tracking: track, anchor: "middle" })}
  ${textPath(FONT_MED, line2, cx, y2, size2, word, { tracking: track, anchor: "middle" })}
</svg>`;
}

function socialProfile({ size = 800, fg = C.ivory, arc = C.brass, bg = C.ink }) {
  // Soft-square social avatar: Ascend mark centred, Brass arc retained
  return ascendMark({
    size,
    stem: fg,
    arc,
    bg,
    softSquare: true,
    small: false,
    padding: 0.22,
  });
}

function favicon({ size = 64 }) {
  // Small-size law: Ivory arc + Brass micro-dot on Ink soft-square (Horizon continuity)
  const soft = ascendMark({
    size,
    stem: C.ivory,
    arc: C.ivory,
    bg: C.ink,
    softSquare: true,
    small: true,
    padding: 0.19,
  });
  // Recolour micro-dot to Brass for brand warmth at 16/32
  return soft.replace(
    /(<circle[^>]*fill=")[^"]+(")/,
    `$1${C.brass}$2`
  );
}

function appIcon({ size = 1024 }) {
  return ascendMark({
    size,
    stem: C.ivory,
    arc: C.brass,
    bg: C.ink,
    softSquare: true,
    small: false,
    padding: 0.2,
  });
}

async function exportPair(id, svg, w, h) {
  const svgDir = join(OUT, "svg");
  const pngDir = join(OUT, "png");
  write(join(svgDir, `${id}.svg`), svg);
  await svgToPng(svg, join(pngDir, `${id}_1x.png`), Math.round(w / 2), Math.round(h / 2));
  await svgToPng(svg, join(pngDir, `${id}_2x.png`), w, h);
}

async function main() {
  ensure(OUT);
  console.log("Generating FHA-01 Ascend candidates →", OUT.replace(BRAND, "brand"));

  // 1. Primary
  await exportPair(
    "FHA_Logo_Primary_Light",
    primaryLockup({ word: C.ink, stem: C.ink, arc: C.brass, bg: C.stone }),
    900,
    320
  );
  await exportPair(
    "FHA_Logo_Primary_Dark",
    primaryLockup({ word: C.ivory, stem: C.ivory, arc: C.brass, bg: C.ink }),
    900,
    320
  );
  await exportPair(
    "FHA_Logo_Primary_Transparent_Ink",
    primaryLockup({ word: C.ink, stem: C.ink, arc: C.brass, bg: null }),
    900,
    320
  );
  await exportPair(
    "FHA_Logo_Primary_Transparent_Ivory",
    primaryLockup({ word: C.ivory, stem: C.ivory, arc: C.brass, bg: null }),
    900,
    320
  );

  // 2. Symbol-only
  await exportPair(
    "FHA_Logo_Symbol_Colour",
    ascendMark({ size: 512, stem: C.ink, arc: C.brass }),
    512,
    512
  );
  await exportPair(
    "FHA_Logo_Symbol_Brass",
    ascendMark({ size: 512, stem: C.brass, arc: C.brass }),
    512,
    512
  );
  await exportPair(
    "FHA_Logo_Symbol_Ink",
    ascendMark({ size: 512, stem: C.ink, arc: C.ink }),
    512,
    512
  );
  await exportPair(
    "FHA_Logo_Symbol_Ivory",
    ascendMark({ size: 512, stem: C.ivory, arc: C.ivory }),
    512,
    512
  );

  // 3. Wordmark
  await exportPair("FHA_Logo_Wordmark_Ink", wordmarkOnly({ word: C.ink }), 820, 140);
  await exportPair("FHA_Logo_Wordmark_Ivory", wordmarkOnly({ word: C.ivory }), 820, 140);
  await exportPair("FHA_Logo_Wordmark_Brass", wordmarkOnly({ word: C.brass }), 820, 140);

  // 4. Horizontal
  await exportPair(
    "FHA_Logo_Horizontal_Light",
    horizontalLockup({ word: C.ink, stem: C.ink, arc: C.brass, bg: C.stone }),
    980,
    200
  );
  await exportPair(
    "FHA_Logo_Horizontal_Dark",
    horizontalLockup({ word: C.ivory, stem: C.ivory, arc: C.brass, bg: C.ink }),
    980,
    200
  );
  await exportPair(
    "FHA_Logo_Horizontal_Transparent_Ink",
    horizontalLockup({ word: C.ink, stem: C.ink, arc: C.brass, bg: null }),
    980,
    200
  );
  await exportPair(
    "FHA_Logo_Horizontal_Transparent_Ivory",
    horizontalLockup({ word: C.ivory, stem: C.ivory, arc: C.brass, bg: null }),
    980,
    200
  );

  // 5. Stacked
  await exportPair(
    "FHA_Logo_Stacked_Light",
    stackedLockup({ word: C.ink, stem: C.ink, arc: C.brass, bg: C.stone }),
    560,
    420
  );
  await exportPair(
    "FHA_Logo_Stacked_Dark",
    stackedLockup({ word: C.ivory, stem: C.ivory, arc: C.brass, bg: C.ink }),
    560,
    420
  );
  await exportPair(
    "FHA_Logo_Stacked_Transparent_Ink",
    stackedLockup({ word: C.ink, stem: C.ink, arc: C.brass, bg: null }),
    560,
    420
  );

  // 6. Monochrome
  await exportPair(
    "FHA_Logo_Mono_Ink",
    primaryLockup({ word: C.ink, stem: C.ink, arc: C.ink, bg: C.stone }),
    900,
    320
  );
  await exportPair(
    "FHA_Logo_Mono_Ivory",
    primaryLockup({ word: C.ivory, stem: C.ivory, arc: C.ivory, bg: C.ink }),
    900,
    320
  );
  await exportPair(
    "FHA_Logo_Mono_Transparent_Ink",
    primaryLockup({ word: C.ink, stem: C.ink, arc: C.ink, bg: null }),
    900,
    320
  );
  await exportPair(
    "FHA_Logo_Mono_Transparent_Ivory",
    primaryLockup({ word: C.ivory, stem: C.ivory, arc: C.ivory, bg: null }),
    900,
    320
  );

  // 7–8 Light / Dark covered by Primary + Horizontal + Stacked

  // 9. Small-size / favicon
  const fav64 = favicon({ size: 64 });
  write(join(OUT, "favicon", "FHA_Logo_Favicon.svg"), fav64);
  await svgToPngExact(fav64, join(OUT, "favicon", "FHA_Logo_Favicon_32.png"), 32, 32);
  await svgToPngExact(fav64, join(OUT, "favicon", "FHA_Logo_Favicon_16.png"), 16, 16);

  await exportPair(
    "FHA_Logo_Symbol_Small_Brass",
    arcOnlyMark({ size: 256, stroke: C.brass }),
    256,
    256
  );
  await exportPair(
    "FHA_Logo_Symbol_Small_Ivory",
    arcOnlyMark({ size: 256, stroke: C.ivory, bg: C.ink, softSquare: true }),
    256,
    256
  );

  // 10. Social profile
  const social800 = socialProfile({ size: 800 });
  const social1080 = socialProfile({ size: 1080 });
  write(join(OUT, "social", "FHA_Logo_Social_800.svg"), social800);
  write(join(OUT, "social", "FHA_Logo_Social_1080.svg"), social1080);
  await svgToPngExact(social800, join(OUT, "social", "FHA_Logo_Social_800.png"), 800, 800);
  await svgToPngExact(social1080, join(OUT, "social", "FHA_Logo_Social_1080.png"), 1080, 1080);

  // App icon candidate (not production app path)
  const app = appIcon({ size: 1024 });
  write(join(OUT, "app", "FHA_Logo_AppIcon_1024.svg"), app);
  await svgToPngExact(app, join(OUT, "app", "FHA_Logo_AppIcon_1024.png"), 1024, 1024);

  // Sheet for review
  const sheet = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900" fill="none">
  <rect width="1400" height="900" fill="${C.stone}"/>
  ${textPath(FONT_BOLD, "FutureHerAfrica · Logo Candidate FHA-01 Ascend", 64, 64, 28, C.ink)}
  ${textPath(FONT_MED, "CONTROLLED CANDIDATE — does not replace approved Horizon FH_Logo_* masters", 64, 96, 16, C.brass)}
  <g transform="translate(64 140)">
    ${ascendMark({ size: 200, stem: C.ink, arc: C.brass, padding: 0.1 }).replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}
  </g>
  <g transform="translate(320 180)">
    ${primaryLockup({ word: C.ink, stem: C.ink, arc: C.brass, bg: null, w: 700, h: 240 }).replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}
  </g>
  <rect x="64" y="420" width="400" height="200" fill="${C.ink}"/>
  <g transform="translate(84 450)">
    ${horizontalLockup({ word: C.ivory, stem: C.ivory, arc: C.brass, bg: null, w: 360, h: 140 }).replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}
  </g>
  <g transform="translate(520 400)">
    ${stackedLockup({ word: C.ink, stem: C.ink, arc: C.brass, bg: null, w: 280, h: 320 }).replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}
  </g>
  <g transform="translate(860 420)">
    ${socialProfile({ size: 220 }).replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}
  </g>
  <g transform="translate(1120 480)">
    ${favicon({ size: 96 }).replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}
  </g>
  ${textPath(FONT_MED, "Symbol", 64, 380, 14, "#6B7380")}
  ${textPath(FONT_MED, "Primary lockup", 320, 160, 14, "#6B7380")}
  ${textPath(FONT_MED, "Horizontal (dark)", 64, 660, 14, "#6B7380")}
  ${textPath(FONT_MED, "Stacked", 520, 760, 14, "#6B7380")}
  ${textPath(FONT_MED, "Social", 860, 680, 14, "#6B7380")}
  ${textPath(FONT_MED, "Favicon", 1120, 620, 14, "#6B7380")}
  ${textPath(FONT_MED, "Status: candidate pending brand adoption · AI host unchanged", 64, 860, 14, "#6B7380")}
</svg>`;
  write(join(OUT, "FHA_Logo_Candidate_Sheet.svg"), sheet);
  await svgToPngExact(sheet, join(OUT, "FHA_Logo_Candidate_Sheet.png"), 1400, 900);

  write(
    join(OUT, "README.md"),
    `# FHA-01 Ascend — Logo Candidate Pack

**Status:** Controlled candidate — NOT production-approved  
**Does not replace:** \`brand/01_logo/\` Horizon masters (\`FH_Logo_*\`)  
**Authority doc:** \`brand/FUTUREHERAFRICA_LOGO_SYSTEM.md\`  
**Rebuild:** \`cd brand/_build && node generate-fha-logo-candidates.mjs\`

## Contents

| Folder | Assets |
|---|---|
| \`svg/\` · \`png/\` | Primary, symbol, wordmark, horizontal, stacked, mono |
| \`favicon/\` | 16 / 32 / SVG small-size mark |
| \`social/\` | 800 · 1080 profile avatars |
| \`app/\` | 1024 soft-square app icon candidate |
| \`FHA_Logo_Candidate_Sheet.*\` | Review board |

*Ready for what's next.*
`
  );

  console.log("\n✓ FHA-01 Ascend candidate pack complete (production logos untouched)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
