/**
 * FutureHer Horizon — Brand Asset Generator (Sprint 1 production)
 * Authority: FUTUREHER_BRAND_DESIGN_STUDIO.md
 * Outlined Satoshi paths · correct dims · a11y dark lifts · no placeholders
 */
import sharp from "sharp";
import opentype from "opentype.js";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAND = join(__dirname, "..");
const LAUNCH = join(BRAND, "..", "launch");

const C = {
  ink: "#121A21",
  stone: "#F3EFE8",
  brass: "#B8893A",
  lagoon: "#2F6F6A",
  clay: "#C48B78",
  mist: "#D8D2C8",
  sunrise: "#E2B15A",
  ember: "#A24B3A",
  deepLagoon: "#1F4B48",
  ivory: "#FFFCF8",
  night: "#0B1014",
  surfaceDark: "#1A232B",
  borderDark: "#2C3740",
  textSecondary: "#3D4A55",
  textTertiary: "#6B7380",
  brassDark: "#C9A05A",
  lagoonDark: "#3F8F88",
  clayDark: "#D4A090",
  textSecondaryDark: "#C9C2B8",
  textTertiaryDark: "#8A929A",
  washEnd: "#E8E0D4",
};

/* EP001 production copy — replaces all bracket placeholders */
const EP001 = {
  series: "FutureHerAfrica · AI",
  seriesShort: "AI",
  titleLines: ["AI replaces", "tasks,", "not you"],
  titleOneLine: "AI replaces tasks, not you",
  support: "Map · Label · Run",
  idea: "AI pressures tasks - not your whole worth.",
  skill: "The Task Layer - Map · Label · Run one.",
  action: "List 5 tasks. Assist 1. Edit in your voice.",
  tagline: "Ready for what's next.",
  hold: "Welcome forward.",
};

function ensure(dir) {
  mkdirSync(dir, { recursive: true });
}

function write(path, content) {
  ensure(dirname(path));
  writeFileSync(path, content);
  console.log("wrote", path.replace(BRAND, "brand").replace(LAUNCH, "launch"));
}

async function svgToPng(svg, outPath, width, height) {
  ensure(dirname(outPath));
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log("png ", outPath.replace(BRAND, "brand").replace(LAUNCH, "launch"));
}

async function svgToPngExact(svg, outPath, width, height) {
  ensure(dirname(outPath));
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log("png ", outPath.replace(BRAND, "brand").replace(LAUNCH, "launch"));
}

function loadFont(file) {
  const buf = readFileSync(join(__dirname, "fonts", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const FONT_MED = loadFont("Satoshi-Medium.ttf");
const FONT_BOLD = loadFont("Satoshi-Bold.ttf");

/** ASCII-safe punctuation — avoids rare-glyph outline quirks in exports */
function sanitizeType(text) {
  return String(text)
    .replace(/[—–]/g, "-")
    .replace(/[··•]/g, "-")
    .replace(/[’’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...");
}

/** opentype toPathData(digits) can emit NaN — serialize commands ourselves */
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
      const x1 = r(c.x1),
        y1 = r(c.y1),
        x = r(c.x),
        y = r(c.y);
      if ([x1, y1, x, y].some((v) => v === null)) continue;
      d += `Q${x1} ${y1} ${x} ${y}`;
    } else if (c.type === "C") {
      const vals = [c.x1, c.y1, c.x2, c.y2, c.x, c.y].map(r);
      if (vals.some((v) => v === null)) continue;
      d += `C${vals[0]} ${vals[1]} ${vals[2]} ${vals[3]} ${vals[4]} ${vals[5]}`;
    } else if (c.type === "Z") {
      d += "Z";
    }
  }
  return d;
}

/**
 * Convert text to outlined SVG path (production-safe, font-independent).
 * tracking: extra px between glyphs (negative = tighter).
 * anchor: 'start' | 'middle'
 */
function textPath(font, text, x, y, size, fill, { tracking = 0, anchor = "start" } = {}) {
  const safe = sanitizeType(text);
  const glyphs = font.stringToGlyphs(safe);
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

function arcPath(cx, cy, w, rise = 0.22) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const y0 = cy + w * rise * 0.35;
  const y1 = cy - w * rise * 0.65;
  const cpx = cx;
  const cpy = cy - w * rise * 1.05;
  return `M ${x0} ${y0} Q ${cpx} ${cpy} ${x1} ${y1}`;
}

/* ─── Primary lockup SVG ─── */
function primaryLockup({ word = C.ink, arc = C.brass, bg = null, w = 640, h = 280 }) {
  const cx = w / 2;
  const arcY = 78;
  const arcW = 220;
  const stroke = 7;
  const fontSize = 64;
  const baseline = 175;
  const tracking = -0.64;
  const bgRect = bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  ${bgRect}
  <path d="${arcPath(cx, arcY, arcW)}" stroke="${arc}" stroke-width="${stroke}" stroke-linecap="round" fill="none"/>
  <circle cx="${cx + arcW / 2}" cy="${arcY - arcW * 0.22 * 0.65}" r="3.5" fill="${arc}"/>
  ${textPath(FONT_MED, "FutureHer", cx, baseline, fontSize, word, { tracking, anchor: "middle" })}
</svg>`;
}

function wordmarkOnly({ word = C.ink, bg = null, w = 560, h = 140 }) {
  const bgRect = bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  ${bgRect}
  ${textPath(FONT_MED, "FutureHer", w / 2, h / 2 + 18, 64, word, { tracking: -0.64, anchor: "middle" })}
</svg>`;
}

function horizonIcon({ stroke = C.brass, bg = null, size = 256, microDot = true }) {
  const bgRect = bg
    ? `<rect width="${size}" height="${size}" fill="${bg}" rx="${size * 0.16}"/>`
    : "";
  const cx = size / 2;
  const cy = size / 2 + size * 0.04;
  const w = size * 0.62;
  const sw = size / 12;
  const endX = cx + w / 2;
  const endY = cy - w * 0.22 * 0.65;
  const dot = microDot
    ? `<circle cx="${endX}" cy="${endY}" r="${sw * 0.45}" fill="${stroke}"/>`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  ${bgRect}
  <path d="${arcPath(cx, cy, w)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" fill="none"/>
  ${dot}
</svg>`;
}

function monogram({ fg = C.ink, bg = C.stone, size = 512, brassRule = true, brassSolid = false }) {
  const r = size * 0.16;
  const fillBg = brassSolid ? C.brass : bg;
  const fillFg = brassSolid ? C.ivory : fg;
  const rule =
    brassRule && !brassSolid
      ? `<rect x="${size * 0.22}" y="${size * 0.82}" width="${size * 0.56}" height="${Math.max(2, size * 0.012)}" rx="1" fill="${C.brass}"/>`
      : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  <rect width="${size}" height="${size}" rx="${r}" fill="${fillBg}"/>
  ${textPath(FONT_BOLD, "FH", size / 2, size * 0.58, size * 0.36, fillFg, { anchor: "middle" })}
  ${rule}
</svg>`;
}

function favicon() {
  return monogram({ fg: C.ivory, bg: C.ink, size: 64, brassRule: false });
}

/* ─── Icons 24×24 ─── */
const iconDefs = {
  Horizon: (c) =>
    `<path d="M4 16 Q12 4 20 10" stroke="${c}" stroke-width="1.75" stroke-linecap="round" fill="none"/><circle cx="20" cy="10" r="1.2" fill="${c}"/>`,
  Idea: (c) =>
    `<circle cx="12" cy="11" r="4.5" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M12 6.5 V4.5 M12 17.5 V19.5 M6.5 11 H4.5 M19.5 11 H17.5 M8 7 L6.6 5.6 M16 7 L17.4 5.6" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`,
  Skill: (c) =>
    `<path d="M7 16 L10 8 L14 14 L17 8" stroke="${c}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M5 19 H19" stroke="${c}" stroke-width="1.75" stroke-linecap="round"/>`,
  Action: (c) =>
    `<rect x="4" y="4" width="16" height="16" rx="2" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M10 8 L15 12 L10 16" stroke="${c}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  AI: (c) =>
    `<circle cx="12" cy="7" r="2.2" stroke="${c}" stroke-width="1.75" fill="none"/><circle cx="7" cy="16" r="2.2" stroke="${c}" stroke-width="1.75" fill="none"/><circle cx="17" cy="16" r="2.2" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M12 9.2 L7.8 14 M12 9.2 L16.2 14 M9.2 16 H14.8" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`,
  Money: (c) =>
    `<ellipse cx="12" cy="8" rx="6" ry="2.5" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M6 8 V14 C6 15.4 8.7 16.5 12 16.5 S18 15.4 18 14 V8" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M6 11 C6 12.4 8.7 13.5 12 13.5 S18 12.4 18 11" stroke="${c}" stroke-width="1.5" fill="none"/>`,
  Career: (c) =>
    `<rect x="5" y="9" width="14" height="10" rx="1.5" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M9 9 V7.5 C9 6.7 9.7 6 10.5 6 H13.5 C14.3 6 15 6.7 15 7.5 V9" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M5 13 H19" stroke="${c}" stroke-width="1.5"/>`,
  Build: (c) =>
    `<rect x="4" y="14" width="7" height="6" rx="1" stroke="${c}" stroke-width="1.75" fill="none"/><rect x="13" y="10" width="7" height="10" rx="1" stroke="${c}" stroke-width="1.75" fill="none"/><rect x="7" y="6" width="7" height="6" rx="1" stroke="${c}" stroke-width="1.75" fill="none"/>`,
  Speak: (c) =>
    `<path d="M5 8 H13 C14.1 8 15 8.9 15 10 V13 C15 14.1 14.1 15 13 15 H10 L7 18 V15 H5 C3.9 15 3 14.1 3 13 V10 C3 8.9 3.9 8 5 8 Z" stroke="${c}" stroke-width="1.75" fill="none" stroke-linejoin="round"/><circle cx="18.5" cy="10.5" r="2" stroke="${c}" stroke-width="1.5" fill="none"/>`,
  Story: (c) =>
    `<path d="M7 5 H15 C16.1 5 17 5.9 17 7 V19 L12 16 L7 19 V7 C7 5.9 7.9 5 9 5" stroke="${c}" stroke-width="1.75" fill="none" stroke-linejoin="round"/><path d="M10 9 H14 M10 12 H14" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`,
  Systems: (c) =>
    `<path d="M12 4 A8 8 0 1 1 7 6.5" stroke="${c}" stroke-width="1.75" fill="none" stroke-linecap="round"/><path d="M7 3.5 V6.5 H10" stroke="${c}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  Presence: (c) =>
    `<circle cx="12" cy="7" r="2.5" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M7 20 V16 C7 13.8 9.2 12 12 12 S17 13.8 17 16 V20" stroke="${c}" stroke-width="1.75" stroke-linecap="round" fill="none"/>`,
  Check: (c) =>
    `<path d="M5 12.5 L10 17.5 L19 7" stroke="${c}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  Play: (c) =>
    `<rect x="4" y="4" width="16" height="16" rx="2" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M10 8.5 L16 12 L10 15.5 Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  Download: (c) =>
    `<path d="M12 5 V15 M8 12 L12 16 L16 12" stroke="${c}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M5 19 H19" stroke="${c}" stroke-width="1.75" stroke-linecap="round"/>`,
  Community: (c) =>
    `<circle cx="12" cy="7" r="2.2" stroke="${c}" stroke-width="1.75" fill="none"/><circle cx="6.5" cy="16" r="2.2" stroke="${c}" stroke-width="1.75" fill="none"/><circle cx="17.5" cy="16" r="2.2" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M10.3 8.7 L7.8 14 M13.7 8.7 L16.2 14 M8.7 16 H15.3" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`,
  Phone: (c) =>
    `<rect x="7" y="3" width="10" height="18" rx="2" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M10 18.5 H14" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`,
  Shield: (c) =>
    `<path d="M12 3.5 L19 6.5 V12 C19 16 15.5 19.2 12 20.5 C8.5 19.2 5 16 5 12 V6.5 L12 3.5 Z" stroke="${c}" stroke-width="1.75" stroke-linejoin="round" fill="none"/>`,
  Book: (c) =>
    `<path d="M5 5 H10.5 C11.3 5 12 5.7 12 6.5 V19 C12 18.2 11.3 17.5 10.5 17.5 H5 V5 Z" stroke="${c}" stroke-width="1.75" fill="none" stroke-linejoin="round"/><path d="M19 5 H13.5 C12.7 5 12 5.7 12 6.5 V19 C12 18.2 12.7 17.5 13.5 17.5 H19 V5 Z" stroke="${c}" stroke-width="1.75" fill="none" stroke-linejoin="round"/>`,
  Clock: (c) =>
    `<circle cx="12" cy="12" r="8" stroke="${c}" stroke-width="1.75" fill="none"/><path d="M12 7.5 V12 L15.5 14.5" stroke="${c}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
};

function iconSvg(name, colour, size = 24) {
  const body = iconDefs[name](colour);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  ${body}
</svg>`;
}

function iconPackSheet() {
  const names = Object.keys(iconDefs);
  const colours = [
    ["Ink", C.ink],
    ["Ivory", C.ivory],
    ["Brass", C.brass],
    ["Lagoon", C.lagoon],
    ["Clay", C.clay],
  ];
  const cell = 72;
  const pad = 48;
  const cols = colours.length;
  const rows = names.length;
  const w = pad * 2 + cols * cell + 160;
  const h = pad * 2 + 80 + rows * cell;
  let cells = "";
  names.forEach((name, ri) => {
    colours.forEach(([, hex], ci) => {
      const x = pad + 140 + ci * cell;
      const y = pad + 70 + ri * cell;
      const body = iconDefs[name](hex === C.ivory ? C.mist : hex);
      cells += `<g transform="translate(${x},${y}) scale(2)">${body}</g>`;
    });
    cells += textPath(FONT_MED, name, pad, pad + 70 + ri * cell + 28, 14, C.ink);
  });
  colours.forEach(([label], ci) => {
    cells += textPath(FONT_MED, label, pad + 140 + ci * cell + 12, pad + 40, 12, C.textSecondary);
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.stone}"/>
  ${textPath(FONT_BOLD, "FutureHer · Icon Pack", pad, pad + 8, 22, C.ink)}
  ${cells}
</svg>`;
}

/* ─── YouTube banner ─── */
function ytBanner() {
  const w = 2560,
    h = 1440;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="inkDepth" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.ink}"/>
      <stop offset="100%" stop-color="${C.night}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="45%">
      <stop offset="0%" stop-color="${C.brass}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${C.night}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#inkDepth)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <path d="M0 980 Q640 860 1280 920 T2560 880 L2560 1440 L0 1440 Z" fill="${C.surfaceDark}" opacity="0.35"/>
  <path d="${arcPath(1280, 620, 320)}" stroke="${C.brassDark}" stroke-width="10" stroke-linecap="round" fill="none"/>
  <circle cx="${1280 + 160}" cy="${620 - 320 * 0.22 * 0.65}" r="5" fill="${C.brassDark}"/>
  ${textPath(FONT_MED, "FutureHer", 1280, 760, 96, C.ivory, { tracking: -0.96, anchor: "middle" })}
  ${textPath(FONT_MED, EP001.tagline, 1280, 830, 36, C.textSecondaryDark, { tracking: 0.5, anchor: "middle" })}
</svg>`;
}

function ytBannerLight() {
  const w = 2560,
    h = 1440;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#wash)"/>
  <path d="${arcPath(1280, 620, 320)}" stroke="${C.brass}" stroke-width="10" stroke-linecap="round" fill="none"/>
  <circle cx="${1280 + 160}" cy="${620 - 320 * 0.22 * 0.65}" r="5" fill="${C.brass}"/>
  ${textPath(FONT_MED, "FutureHer", 1280, 760, 96, C.ink, { tracking: -0.96, anchor: "middle" })}
  ${textPath(FONT_MED, EP001.tagline, 1280, 830, 36, C.textSecondary, { tracking: 0.5, anchor: "middle" })}
</svg>`;
}

/* ─── Thumbnail — production EP001 (no placeholders) ─── */
function thumbnailProduction({ dark = false } = {}) {
  const w = 1280,
    h = 720;
  if (dark) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="inkD" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.ink}"/>
      <stop offset="100%" stop-color="${C.night}"/>
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="55%" stop-color="${C.night}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${C.surfaceDark}" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#inkD)"/>
  <rect x="64" y="64" width="620" height="592" rx="12" fill="${C.surfaceDark}"/>
  <path d="${arcPath(374, 420, 200)}" stroke="${C.brassDark}" stroke-width="8" stroke-linecap="round" fill="none"/>
  <circle cx="${374 + 100}" cy="${420 - 200 * 0.22 * 0.65}" r="4" fill="${C.brassDark}"/>
  <rect x="720" y="64" width="496" height="592" rx="12" fill="${C.surfaceDark}"/>
  <rect x="752" y="140" width="168" height="36" rx="6" fill="${C.lagoonDark}"/>
  ${textPath(FONT_MED, EP001.series, 836, 164, 14, C.ivory, { tracking: 0.28, anchor: "middle" })}
  ${textPath(FONT_BOLD, EP001.titleLines[0], 752, 250, 52, C.ivory, { tracking: -0.52 })}
  ${textPath(FONT_BOLD, EP001.titleLines[1], 752, 312, 52, C.ivory, { tracking: -0.52 })}
  ${textPath(FONT_BOLD, EP001.titleLines[2], 752, 374, 52, C.ivory, { tracking: -0.52 })}
  <rect x="752" y="400" width="180" height="3" fill="${C.brassDark}"/>
  ${textPath(FONT_MED, EP001.support, 752, 450, 22, C.textSecondaryDark)}
  <g transform="translate(64, 592)">
    <rect width="64" height="64" rx="10" fill="${C.ink}"/>
    ${textPath(FONT_BOLD, "FH", 32, 42, 24, C.brassDark, { anchor: "middle" })}
  </g>
</svg>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#wash)"/>
  <rect x="64" y="64" width="620" height="592" rx="12" fill="${C.mist}" opacity="0.55"/>
  <path d="${arcPath(374, 420, 200)}" stroke="${C.brass}" stroke-width="8" stroke-linecap="round" fill="none"/>
  <circle cx="${374 + 100}" cy="${420 - 200 * 0.22 * 0.65}" r="4" fill="${C.brass}"/>
  <rect x="720" y="64" width="496" height="592" rx="12" fill="${C.ivory}"/>
  <rect x="752" y="140" width="168" height="36" rx="6" fill="${C.lagoon}"/>
  ${textPath(FONT_MED, EP001.series, 836, 164, 14, C.ivory, { tracking: 0.28, anchor: "middle" })}
  ${textPath(FONT_BOLD, EP001.titleLines[0], 752, 250, 52, C.ink, { tracking: -0.52 })}
  ${textPath(FONT_BOLD, EP001.titleLines[1], 752, 312, 52, C.ink, { tracking: -0.52 })}
  ${textPath(FONT_BOLD, EP001.titleLines[2], 752, 374, 52, C.ink, { tracking: -0.52 })}
  <rect x="752" y="400" width="180" height="3" fill="${C.brass}"/>
  ${textPath(FONT_MED, EP001.support, 752, 450, 22, C.textSecondary)}
  <g transform="translate(64, 592)">
    <rect width="64" height="64" rx="10" fill="${C.ink}"/>
    ${textPath(FONT_BOLD, "FH", 32, 42, 24, C.ivory, { anchor: "middle" })}
  </g>
</svg>`;
}

/* Layout guide only — no placeholder copy; labels are meta, not fake content */
function thumbnailGuide() {
  const w = 1280,
    h = 720;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.stone}"/>
  <rect x="64" y="64" width="620" height="592" rx="12" fill="none" stroke="${C.mist}" stroke-width="2" stroke-dasharray="8 6"/>
  <rect x="720" y="64" width="496" height="592" rx="12" fill="${C.ivory}" stroke="${C.mist}" stroke-width="1"/>
  <rect x="752" y="140" width="92" height="32" rx="6" fill="${C.lagoon}"/>
  ${textPath(FONT_MED, "AI", 798, 161, 13, C.ivory, { tracking: 0.26, anchor: "middle" })}
  ${textPath(FONT_BOLD, EP001.titleLines[0], 752, 230, 48, C.ink, { tracking: -0.48 })}
  ${textPath(FONT_BOLD, EP001.titleLines[1], 752, 290, 48, C.ink, { tracking: -0.48 })}
  ${textPath(FONT_BOLD, EP001.titleLines[2], 752, 350, 48, C.ink, { tracking: -0.48 })}
  <rect x="752" y="380" width="180" height="3" fill="${C.brass}"/>
  ${textPath(FONT_MED, EP001.support, 752, 430, 20, C.textSecondary)}
  <g transform="translate(64, 592)">
    <rect width="64" height="64" rx="10" fill="${C.ink}"/>
    ${textPath(FONT_BOLD, "FH", 32, 42, 24, C.ivory, { anchor: "middle" })}
  </g>
  <rect x="64" y="36" width="1152" height="1" fill="${C.brass}" opacity="0.25"/>
  ${textPath(FONT_MED, "FH_TMPL_Thumbnail_1280x720 · Layout A · Face-left / Text-right", 64, 28, 11, C.textTertiary, { tracking: 0.4 })}
</svg>`;
}

/* ─── Colour palette board ─── */
function colourBoard() {
  const swatches = [
    ["Ink", C.ink, "Primary"],
    ["Stone", C.stone, "Primary"],
    ["Brass", C.brass, "Primary"],
    ["Lagoon", C.lagoon, "Secondary"],
    ["Clay", C.clay, "Secondary"],
    ["Mist", C.mist, "Secondary"],
    ["Sunrise", C.sunrise, "Accent"],
    ["Ember", C.ember, "Accent"],
    ["Deep Lagoon", C.deepLagoon, "Accent"],
    ["Ivory", C.ivory, "Surface"],
    ["Night", C.night, "Surface"],
    ["Surface Dark", C.surfaceDark, "Surface"],
  ];
  const cols = 4;
  const cardW = 280;
  const cardH = 160;
  const gap = 24;
  const pad = 64;
  const rows = Math.ceil(swatches.length / cols);
  const w = pad * 2 + cols * cardW + (cols - 1) * gap;
  const h = pad * 2 + 120 + rows * cardH + (rows - 1) * gap + 80;
  let cards = "";
  swatches.forEach(([name, hex, role], i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = pad + col * (cardW + gap);
    const y = pad + 100 + row * (cardH + gap);
    const light =
      hex.toLowerCase() === C.stone.toLowerCase() ||
      hex.toLowerCase() === C.ivory.toLowerCase() ||
      hex.toLowerCase() === C.mist.toLowerCase() ||
      hex.toLowerCase() === C.sunrise.toLowerCase();
    const label = light ? C.ink : C.ivory;
    cards += `
    <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="12" fill="${hex}" stroke="${C.mist}" stroke-width="1"/>
    ${textPath(FONT_MED, name, x + 20, y + 40, 22, label)}
    ${textPath(FONT_MED, hex, x + 20, y + 70, 16, label)}
    ${textPath(FONT_MED, role, x + 20, y + 100, 13, label)}`;
  });
  return { svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.stone}"/>
  ${textPath(FONT_BOLD, "FutureHer · Horizon", pad, pad + 20, 36, C.ink)}
  ${textPath(FONT_MED, "Colour palette · 70% Ink/Stone · 20% series accent · 10% Brass", pad, pad + 56, 18, C.textSecondary)}
  ${cards}
  ${textPath(FONT_MED, "Forbidden: purple→pink · neon cyber · gold glitter · influencer rainbow", pad, h - 36, 14, C.textTertiary)}
</svg>`, w, h };
}

/* ─── Typography specimen ─── */
function typeSpecimen() {
  const w = 1200,
    h = 1600;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.ivory}"/>
  ${textPath(FONT_MED, "TYPOGRAPHY · HORIZON", 64, 80, 14, C.ink, { tracking: 2 })}
  ${textPath(FONT_BOLD, "Satoshi Bold H1", 64, 180, 48, C.ink)}
  ${textPath(FONT_MED, "Primary UI · captions · thumbnails · CapCut", 64, 220, 18, C.textSecondary)}
  <rect x="64" y="250" width="1072" height="1" fill="${C.mist}"/>
  ${textPath(FONT_MED, "Satoshi Medium H2", 64, 310, 32, C.ink)}
  ${textPath(FONT_MED, "Satoshi Medium H3", 64, 370, 24, C.ink)}
  ${textPath(FONT_MED, "Satoshi Medium body — phone-first readability, sentence case, restrained titles.", 64, 430, 18, C.ink)}
  ${textPath(FONT_MED, "Secondary text · #3D4A55 · body 16–18px · leading 1.45–1.55", 64, 480, 16, C.textSecondary)}
  <rect x="64" y="520" width="1072" height="1" fill="${C.mist}"/>
  ${textPath(FONT_MED, "META · SERIES · AI · STEP 02", 64, 580, 13, C.textTertiary, { tracking: 2 })}
  <rect x="64" y="620" width="1072" height="1" fill="${C.mist}"/>
  ${textPath(FONT_MED, "Pairing recipes", 64, 690, 22, C.ink)}
  ${textPath(FONT_MED, "Academy Light — Newsreader + Satoshi", 64, 740, 18, C.textSecondary)}
  ${textPath(FONT_MED, "Product UI — Satoshi only", 64, 780, 18, C.textSecondary)}
  ${textPath(FONT_MED, "Editorial Story — Newsreader quote + Satoshi", 64, 820, 18, C.textSecondary)}
  ${textPath(FONT_MED, "Fallback — IBM Plex Sans · Canva emergency Plus Jakarta Sans", 64, 860, 18, C.textSecondary)}
  <rect x="64" y="910" width="1072" height="1" fill="${C.mist}"/>
  ${textPath(FONT_MED, "FutureHer", 64, 990, 42, C.brass, { tracking: -0.42 })}
  ${textPath(FONT_MED, EP001.tagline, 64, 1040, 20, C.textSecondary)}
  ${textPath(FONT_MED, "Satoshi Medium / Bold outlined · Fontshare commercial licence", 64, 1120, 14, C.textTertiary)}
  ${textPath(FONT_MED, "FH_Type_Specimen_Horizon · brand/04_typography/specimens/", 64, 1520, 14, C.textTertiary)}
</svg>`;
}

/* ─── Watermark ─── */
function watermarkFH(opacity = 1) {
  const size = 256;
  const r = size * 0.16;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  <g opacity="${opacity}">
    <rect width="${size}" height="${size}" rx="${r}" fill="${C.ivory}"/>
    ${textPath(FONT_BOLD, "FH", size / 2, size * 0.58, size * 0.36, C.ink, { anchor: "middle" })}
  </g>
</svg>`;
}

function watermarkHorizon(opacity = 1) {
  const size = 256;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  <g opacity="${opacity}">
    <path d="${arcPath(128, 140, 160)}" stroke="${C.ivory}" stroke-width="14" stroke-linecap="round" fill="none"/>
  </g>
</svg>`;
}

/* ─── Intro / Outro still frames ─── */
function introFrame(beat) {
  const w = 1920,
    h = 1080;
  let content = "";
  if (beat === 0) {
    content = `<rect width="${w}" height="${h}" fill="${C.stone}"/>`;
  } else if (beat === 1) {
    content = `
      <rect width="${w}" height="${h}" fill="${C.ink}"/>
      <path d="${arcPath(960, 480, 280)}" stroke="${C.brassDark}" stroke-width="10" stroke-linecap="round" fill="none" stroke-dasharray="420" stroke-dashoffset="120"/>`;
  } else if (beat === 2) {
    content = `
      <rect width="${w}" height="${h}" fill="${C.ink}"/>
      <path d="${arcPath(960, 480, 280)}" stroke="${C.brassDark}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <circle cx="${960 + 140}" cy="${480 - 280 * 0.22 * 0.65}" r="5" fill="${C.brassDark}"/>`;
  } else if (beat === 3) {
    content = `
      <rect width="${w}" height="${h}" fill="${C.ink}"/>
      <path d="${arcPath(960, 420, 280)}" stroke="${C.brassDark}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <circle cx="${960 + 140}" cy="${420 - 280 * 0.22 * 0.65}" r="5" fill="${C.brassDark}"/>
      ${textPath(FONT_MED, "FutureHer", 960, 560, 72, C.ivory, { tracking: -0.72, anchor: "middle" })}`;
  } else {
    content = `
      <rect width="${w}" height="${h}" fill="${C.ink}"/>
      <path d="${arcPath(960, 400, 280)}" stroke="${C.brassDark}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <circle cx="${960 + 140}" cy="${400 - 280 * 0.22 * 0.65}" r="5" fill="${C.brassDark}"/>
      ${textPath(FONT_MED, "FutureHer", 960, 540, 72, C.ivory, { tracking: -0.72, anchor: "middle" })}
      ${textPath(FONT_MED, EP001.tagline, 960, 610, 28, C.textSecondaryDark, { anchor: "middle" })}`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${content}
</svg>`;
}

function outroFrame(kind) {
  const w = 1920,
    h = 1080;
  if (kind === "idea") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.ink}"/>
  <rect x="160" y="400" width="8" height="140" fill="${C.lagoonDark}"/>
  ${textPath(FONT_MED, "IDEA", 200, 440, 18, C.lagoonDark, { tracking: 2 })}
  ${textPath(FONT_MED, EP001.idea, 200, 520, 44, C.ivory)}
</svg>`;
  }
  if (kind === "skill") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.ink}"/>
  <rect x="160" y="400" width="8" height="140" fill="${C.brassDark}"/>
  ${textPath(FONT_MED, "SKILL", 200, 440, 18, C.brassDark, { tracking: 2 })}
  ${textPath(FONT_MED, EP001.skill, 200, 520, 44, C.ivory)}
</svg>`;
  }
  if (kind === "action") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.ink}"/>
  <rect x="160" y="400" width="8" height="140" fill="${C.clayDark}"/>
  ${textPath(FONT_MED, "ACTION", 200, 440, 18, C.clayDark, { tracking: 2 })}
  ${textPath(FONT_MED, EP001.action, 200, 520, 44, C.ivory)}
</svg>`;
  }
  if (kind === "cta") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.ink}"/>
  <rect x="560" y="460" width="280" height="64" rx="8" fill="${C.brass}"/>
  ${textPath(FONT_MED, "Subscribe", 700, 502, 24, C.ivory, { anchor: "middle" })}
  <rect x="880" y="460" width="400" height="64" rx="8" fill="none" stroke="${C.mist}" stroke-width="2"/>
  ${textPath(FONT_MED, "Forward Collective", 1080, 502, 22, C.ivory, { anchor: "middle" })}
</svg>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.ink}"/>
  <path d="${arcPath(960, 420, 260)}" stroke="${C.brassDark}" stroke-width="10" stroke-linecap="round" fill="none"/>
  ${textPath(FONT_MED, "FutureHer", 960, 560, 72, C.ivory, { tracking: -0.72, anchor: "middle" })}
  ${textPath(FONT_MED, EP001.hold, 960, 620, 28, C.textSecondaryDark, { anchor: "middle" })}
  <rect x="120" y="720" width="400" height="220" rx="8" fill="none" stroke="${C.borderDark}" stroke-width="2" stroke-dasharray="8 6"/>
  <rect x="560" y="720" width="400" height="220" rx="8" fill="none" stroke="${C.borderDark}" stroke-width="2" stroke-dasharray="8 6"/>
</svg>`;
}

/* ─── Lower thirds ─── */
function lowerThird(kind) {
  const w = 1920,
    h = 1080;
  if (kind === "name") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="none"/>
  <rect x="120" y="860" width="520" height="88" rx="8" fill="${C.ink}" opacity="0.92"/>
  <rect x="120" y="860" width="6" height="88" fill="${C.brassDark}"/>
  ${textPath(FONT_MED, "FutureHerAfrica", 148, 900, 28, C.ivory)}
  ${textPath(FONT_MED, "Ready for what’s next.", 148, 932, 18, C.textSecondaryDark)}
</svg>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="none"/>
  <rect x="120" y="880" width="280" height="48" rx="6" fill="${C.lagoonDark}"/>
  ${textPath(FONT_MED, EP001.series, 260, 912, 18, C.ivory, { tracking: 0.36, anchor: "middle" })}
</svg>`;
}

/* ─── Social launch masters (EP001) ─── */
function socialSquare() {
  const s = 1080;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="${s}" height="${s}" fill="url(#wash)"/>
  <rect x="72" y="72" width="140" height="40" rx="6" fill="${C.lagoon}"/>
  ${textPath(FONT_MED, EP001.series, 142, 98, 16, C.ivory, { tracking: 0.32, anchor: "middle" })}
  ${textPath(FONT_BOLD, "AI replaces", 72, 320, 72, C.ink, { tracking: -0.72 })}
  ${textPath(FONT_BOLD, "tasks, not you", 72, 410, 72, C.ink, { tracking: -0.72 })}
  <rect x="72" y="450" width="160" height="4" fill="${C.brass}"/>
  ${textPath(FONT_MED, EP001.support, 72, 520, 28, C.textSecondary)}
  <g transform="translate(72, 920)">
    <rect width="72" height="72" rx="12" fill="${C.ink}"/>
    ${textPath(FONT_BOLD, "FH", 36, 48, 28, C.ivory, { anchor: "middle" })}
  </g>
  ${textPath(FONT_MED, "FutureHerAfrica", 164, 966, 24, C.ink, { tracking: -0.24 })}
</svg>`;
}

function socialStory() {
  const w = 1080,
    h = 1920;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.ink}"/>
  <path d="${arcPath(540, 520, 280)}" stroke="${C.brassDark}" stroke-width="10" stroke-linecap="round" fill="none"/>
  <circle cx="${540 + 140}" cy="${520 - 280 * 0.22 * 0.65}" r="5" fill="${C.brassDark}"/>
  <rect x="120" y="700" width="168" height="40" rx="6" fill="${C.lagoonDark}"/>
  ${textPath(FONT_MED, EP001.series, 204, 726, 16, C.ivory, { tracking: 0.32, anchor: "middle" })}
  ${textPath(FONT_BOLD, "AI replaces", 120, 860, 64, C.ivory, { tracking: -0.64 })}
  ${textPath(FONT_BOLD, "tasks,", 120, 940, 64, C.ivory, { tracking: -0.64 })}
  ${textPath(FONT_BOLD, "not you", 120, 1020, 64, C.ivory, { tracking: -0.64 })}
  <rect x="120" y="1060" width="160" height="4" fill="${C.brassDark}"/>
  ${textPath(FONT_MED, EP001.support, 120, 1130, 28, C.textSecondaryDark)}
  ${textPath(FONT_MED, "FutureHer", 540, 1720, 32, C.ivory, { tracking: -0.32, anchor: "middle" })}
  ${textPath(FONT_MED, EP001.tagline, 540, 1770, 20, C.textTertiaryDark, { anchor: "middle" })}
</svg>`;
}

function socialPortrait() {
  const w = 1080,
    h = 1350;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#wash)"/>
  <rect x="72" y="96" width="140" height="40" rx="6" fill="${C.lagoon}"/>
  ${textPath(FONT_MED, EP001.series, 142, 122, 16, C.ivory, { tracking: 0.32, anchor: "middle" })}
  ${textPath(FONT_BOLD, "AI replaces", 72, 380, 68, C.ink, { tracking: -0.68 })}
  ${textPath(FONT_BOLD, "tasks, not you", 72, 470, 68, C.ink, { tracking: -0.68 })}
  <rect x="72" y="520" width="160" height="4" fill="${C.brass}"/>
  ${textPath(FONT_MED, EP001.idea, 72, 600, 26, C.textSecondary)}
  <g transform="translate(72, 1180)">
    <rect width="72" height="72" rx="12" fill="${C.ink}"/>
    ${textPath(FONT_BOLD, "FH", 36, 48, 28, C.ivory, { anchor: "middle" })}
  </g>
</svg>`;
}

function socialLinkedIn() {
  const w = 1200,
    h = 627;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.ink}"/>
  <path d="${arcPath(200, 200, 160)}" stroke="${C.brassDark}" stroke-width="8" stroke-linecap="round" fill="none"/>
  <rect x="80" y="280" width="160" height="36" rx="6" fill="${C.lagoonDark}"/>
  ${textPath(FONT_MED, EP001.series, 160, 304, 15, C.ivory, { tracking: 0.3, anchor: "middle" })}
  ${textPath(FONT_BOLD, EP001.titleOneLine, 80, 400, 42, C.ivory, { tracking: -0.42 })}
  ${textPath(FONT_MED, EP001.support, 80, 460, 22, C.textSecondaryDark)}
  ${textPath(FONT_MED, "FutureHer", 80, 560, 20, C.brassDark, { tracking: -0.2 })}
</svg>`;
}

function socialTip() {
  const s = 1080;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" fill="${C.stone}"/>
  <rect x="0" y="0" width="16" height="${s}" fill="${C.lagoon}"/>
  ${textPath(FONT_MED, "TIP", 72, 120, 18, C.lagoon, { tracking: 2 })}
  ${textPath(FONT_BOLD, "Fear without a plan", 72, 280, 52, C.ink, { tracking: -0.52 })}
  ${textPath(FONT_BOLD, "becomes avoidance.", 72, 360, 52, C.ink, { tracking: -0.52 })}
  ${textPath(FONT_MED, "Map five tasks. Assist one. Edit in your voice.", 72, 460, 26, C.textSecondary)}
  <g transform="translate(72, 920)">
    <rect width="64" height="64" rx="10" fill="${C.ink}"/>
    ${textPath(FONT_BOLD, "FH", 32, 42, 24, C.ivory, { anchor: "middle" })}
  </g>
</svg>`;
}

function socialQuote() {
  const s = 1080;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" fill="${C.ink}"/>
  ${textPath(FONT_BOLD, "“", 72, 280, 120, C.brassDark)}
  ${textPath(FONT_MED, "Your workday is made", 72, 420, 44, C.ivory)}
  ${textPath(FONT_MED, "of tasks — not of a", 72, 490, 44, C.ivory)}
  ${textPath(FONT_MED, "single identity AI can", 72, 560, 44, C.ivory)}
  ${textPath(FONT_MED, "delete overnight.", 72, 630, 44, C.ivory)}
  <rect x="72" y="700" width="120" height="3" fill="${C.brassDark}"/>
  ${textPath(FONT_MED, "FutureHerAfrica · EP001", 72, 760, 20, C.textSecondaryDark)}
</svg>`;
}

/* ─── EP001 photo thumbnail compositor ─── */
async function buildEp001Thumbnail() {
  const srcPath = join(LAUNCH, "EP001", "FH_EP001_Thumbnail.png");
  const outPath = join(LAUNCH, "EP001", "FH_EP001_Thumbnail.png");
  const backupPath = join(LAUNCH, "EP001", "FH_EP001_Thumbnail_source_1536x1024.png");

  if (!existsSync(srcPath)) {
    console.warn("EP001 source missing — writing layout-only production thumb");
    const svg = thumbnailProduction({ dark: false });
    await svgToPngExact(svg, outPath, 1280, 720);
    return;
  }

  const meta = await sharp(srcPath).metadata();
  // Preserve original wrong-size export once
  if (meta.width !== 1280 || meta.height !== 720) {
    if (!existsSync(backupPath)) {
      await sharp(srcPath).png().toFile(backupPath);
      console.log("backed up source →", backupPath);
    }
  }

  // Extract face from left ~48% of source, cover-fit into 640×720 visual zone
  const faceW = Math.floor(meta.width * 0.5);
  const faceBuf = await sharp(srcPath)
    .extract({ left: 0, top: 0, width: faceW, height: meta.height })
    .resize(640, 720, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();

  const panelSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="720" viewBox="0 0 640 720">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="720" fill="url(#wash)"/>
  <rect x="48" y="160" width="200" height="40" rx="6" fill="${C.lagoon}"/>
  ${textPath(FONT_MED, EP001.series, 148, 186, 18, C.ivory, { tracking: 0.36, anchor: "middle" })}
  ${textPath(FONT_BOLD, EP001.titleLines[0], 48, 280, 56, C.ink, { tracking: -0.56 })}
  ${textPath(FONT_BOLD, EP001.titleLines[1], 48, 350, 56, C.ink, { tracking: -0.56 })}
  ${textPath(FONT_BOLD, EP001.titleLines[2], 48, 420, 56, C.ink, { tracking: -0.56 })}
  <rect x="48" y="460" width="120" height="4" fill="${C.brass}"/>
  ${textPath(FONT_MED, EP001.support, 48, 520, 26, C.textSecondary)}
</svg>`;

  const monoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
  <rect width="56" height="56" rx="12" fill="${C.ink}"/>
  ${textPath(FONT_BOLD, "FH", 28, 37, 20, C.brassDark, { anchor: "middle" })}
</svg>`;

  const panelBuf = await sharp(Buffer.from(panelSvg)).png().toBuffer();
  const monoBuf = await sharp(Buffer.from(monoSvg)).png().toBuffer();

  // Cover baked-in serif FH from source photo, then place outlined Satoshi monogram
  const coverBuf = await sharp(
    Buffer.from(
      `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="14" fill="${C.ink}"/></svg>`
    )
  )
    .png()
    .toBuffer();
  const faceWithMono = await sharp(faceBuf)
    .composite([
      { input: coverBuf, left: 16, top: 16 },
      { input: monoBuf, left: 28, top: 28 },
    ])
    .png()
    .toBuffer();

  await sharp({
    create: { width: 1280, height: 720, channels: 3, background: C.stone },
  })
    .composite([
      { input: faceWithMono, left: 0, top: 0 },
      { input: panelBuf, left: 640, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log("png  launch/EP001/FH_EP001_Thumbnail.png 1280×720");
}

async function main() {
  const logoSvg = join(BRAND, "01_logo", "svg");
  const logoPng = join(BRAND, "01_logo", "png");
  const logoApp = join(BRAND, "01_logo", "app");
  const logoFav = join(BRAND, "01_logo", "favicon");
  const iconsSvg = join(BRAND, "02_icons", "svg");
  const iconsPng = join(BRAND, "02_icons", "png");
  const ytBannerDir = join(BRAND, "14_youtube", "banner");
  const ytProfile = join(BRAND, "14_youtube", "profile");
  const thumbs = join(BRAND, "07_thumbnails");
  const colour = join(BRAND, "03_colour");
  const typeSpec = join(BRAND, "04_typography", "specimens");
  const wm = join(BRAND, "15_watermarks");
  const intro = join(BRAND, "08_motion", "intro");
  const outro = join(BRAND, "08_motion", "outro");
  const lower = join(BRAND, "08_motion", "lower-thirds");
  const social = join(BRAND, "13_social");
  const press = join(BRAND, "17_exports_press");

  // Logos SVG
  const logos = {
    FH_Logo_Primary_Ink: primaryLockup({ word: C.ink, arc: C.brass, bg: C.stone }),
    FH_Logo_Primary_Ivory: primaryLockup({ word: C.ivory, arc: C.brassDark, bg: C.ink }),
    FH_Logo_Primary_MonoInk: primaryLockup({ word: C.ink, arc: C.ink, bg: C.stone }),
    FH_Logo_Primary_MonoIvory: primaryLockup({ word: C.ivory, arc: C.ivory, bg: C.ink }),
    FH_Logo_Primary_Brass: primaryLockup({ word: C.brassDark, arc: C.brassDark, bg: C.ink }),
    FH_Logo_Primary_Transparent_Ink: primaryLockup({ word: C.ink, arc: C.brass, bg: null }),
    FH_Logo_Primary_Transparent_Ivory: primaryLockup({
      word: C.ivory,
      arc: C.brassDark,
      bg: null,
    }),
    FH_Logo_Wordmark_Ink: wordmarkOnly({ word: C.ink }),
    FH_Logo_Wordmark_Ivory: wordmarkOnly({ word: C.ivory }),
    FH_Logo_Icon_Horizon_Brass: horizonIcon({ stroke: C.brass }),
    FH_Logo_Icon_Horizon_Ink: horizonIcon({ stroke: C.ink }),
    FH_Logo_Icon_Horizon_Ivory: horizonIcon({ stroke: C.ivory }),
    FH_Logo_Monogram_SoftSquare_Ink: monogram({ fg: C.ink, bg: C.stone }),
    FH_Logo_Monogram_SoftSquare_Dark: monogram({ fg: C.ivory, bg: C.ink }),
    FH_Logo_Monogram_Brass: monogram({ brassSolid: true }),
  };

  for (const [id, svg] of Object.entries(logos)) {
    write(join(logoSvg, `${id}.svg`), svg);
    const isIcon = id.includes("Icon") || id.includes("Monogram");
    const w = isIcon ? 512 : 1280;
    const h = isIcon ? 512 : 560;
    await svgToPng(svg, join(logoPng, `${id}_1x.png`), isIcon ? 256 : 640, isIcon ? 256 : 280);
    await svgToPng(svg, join(logoPng, `${id}_2x.png`), w, h);
  }

  // Transparent dedicated exports (no bg) — 1x + 2x
  const transparentInk = primaryLockup({ word: C.ink, arc: C.brass, bg: null });
  const transparentIvory = primaryLockup({ word: C.ivory, arc: C.brassDark, bg: null });
  write(join(logoSvg, "FH_Logo_Transparent_Ink.svg"), transparentInk);
  write(join(logoSvg, "FH_Logo_Transparent_Ivory.svg"), transparentIvory);
  await svgToPng(transparentInk, join(logoPng, "FH_Logo_Transparent_Ink_1x.png"), 640, 280);
  await svgToPng(transparentInk, join(logoPng, "FH_Logo_Transparent_Ink_2x.png"), 1280, 560);
  await svgToPng(transparentIvory, join(logoPng, "FH_Logo_Transparent_Ivory_1x.png"), 640, 280);
  await svgToPng(transparentIvory, join(logoPng, "FH_Logo_Transparent_Ivory_2x.png"), 1280, 560);

  // App icon
  const appSize = 1024;
  const appCx = appSize / 2;
  const appCy = appSize / 2 + appSize * 0.04;
  const appW = appSize * 0.62;
  const appSw = appSize / 12;
  const appEndX = appCx + appW / 2;
  const appEndY = appCy - appW * 0.22 * 0.65;
  const appIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${appSize}" height="${appSize}" viewBox="0 0 ${appSize} ${appSize}" fill="none">
  <rect width="${appSize}" height="${appSize}" fill="${C.ink}" rx="${appSize * 0.16}"/>
  <path d="${arcPath(appCx, appCy, appW)}" stroke="${C.ivory}" stroke-width="${appSw}" stroke-linecap="round" fill="none"/>
  <circle cx="${appEndX}" cy="${appEndY}" r="${appSw * 0.45}" fill="${C.brass}"/>
</svg>`;
  write(join(logoApp, "FH_Logo_AppIcon_1024.svg"), appIcon);
  await svgToPngExact(appIcon, join(logoApp, "FH_Logo_AppIcon_1024.png"), 1024, 1024);

  // Favicon
  const fav = favicon();
  write(join(logoFav, "FH_Logo_Favicon.svg"), fav);
  await svgToPngExact(fav, join(logoFav, "FH_Logo_Favicon_32.png"), 32, 32);
  await svgToPngExact(fav, join(logoFav, "FH_Logo_Favicon_16.png"), 16, 16);

  // Icons + pack sheet
  for (const name of Object.keys(iconDefs)) {
    for (const [cname, chex] of [
      ["Ink", C.ink],
      ["Ivory", C.ivory],
      ["Brass", C.brass],
      ["Lagoon", C.lagoon],
      ["Clay", C.clay],
    ]) {
      const svg = iconSvg(name, chex, 24);
      const id = `FH_Icon_${name}_24_${cname}`;
      write(join(iconsSvg, `${id}.svg`), svg);
      const svg48 = iconSvg(name, chex, 48);
      await svgToPngExact(svg48, join(iconsPng, `FH_Icon_${name}_48_${cname}.png`), 48, 48);
    }
  }
  const sheet = iconPackSheet();
  write(join(BRAND, "02_icons", "FH_Icon_Pack_Sheet.svg"), sheet);
  await svgToPngExact(sheet, join(BRAND, "02_icons", "FH_Icon_Pack_Sheet.png"), 560, 1600);

  // YouTube
  const banner = ytBanner();
  write(join(ytBannerDir, "FH_TMPL_YT_Banner_2560x1440.svg"), banner);
  await svgToPngExact(banner, join(ytBannerDir, "FH_TMPL_YT_Banner_2560x1440.png"), 2560, 1440);
  const bannerLight = ytBannerLight();
  write(join(ytBannerDir, "FH_TMPL_YT_Banner_Light_2560x1440.svg"), bannerLight);
  await svgToPngExact(
    bannerLight,
    join(ytBannerDir, "FH_TMPL_YT_Banner_Light_2560x1440.png"),
    2560,
    1440
  );

  const profile = monogram({ fg: C.ivory, bg: C.ink, size: 800, brassRule: true });
  write(join(ytProfile, "FH_Profile_800.svg"), profile);
  await svgToPngExact(profile, join(ytProfile, "FH_Profile_800.png"), 800, 800);
  const profile1080 = monogram({ fg: C.ivory, bg: C.ink, size: 1080, brassRule: true });
  write(join(ytProfile, "FH_Profile_1080.svg"), profile1080);
  await svgToPngExact(profile1080, join(ytProfile, "FH_Profile_1080.png"), 1080, 1080);

  // Thumbnails — production filled + dark + layout guide
  const thumb = thumbnailGuide();
  write(join(thumbs, "FH_TMPL_Thumbnail_1280x720.svg"), thumb);
  await svgToPngExact(thumb, join(thumbs, "FH_TMPL_Thumbnail_1280x720.png"), 1280, 720);

  const thumbProd = thumbnailProduction({ dark: false });
  write(join(thumbs, "FH_EP001_Thumbnail_Layout_1280x720.svg"), thumbProd);
  await svgToPngExact(thumbProd, join(thumbs, "FH_EP001_Thumbnail_Layout_1280x720.png"), 1280, 720);

  const thumbDark = thumbnailProduction({ dark: true });
  write(join(thumbs, "FH_EP001_Thumbnail_Dark_1280x720.svg"), thumbDark);
  await svgToPngExact(thumbDark, join(thumbs, "FH_EP001_Thumbnail_Dark_1280x720.png"), 1280, 720);

  // Colour board — native dimensions (no stretch)
  const board = colourBoard();
  write(join(colour, "FH_Colour_Palette_Board.svg"), board.svg);
  await svgToPngExact(board.svg, join(colour, "FH_Colour_Palette_Board.png"), board.w, board.h);

  // Type specimen
  const type = typeSpecimen();
  write(join(typeSpec, "FH_Type_Specimen_Horizon.svg"), type);
  await svgToPngExact(type, join(typeSpec, "FH_Type_Specimen_Horizon.png"), 1200, 1600);

  // Watermarks
  const wmFh = watermarkFH(1);
  const wmFhOp = watermarkFH(0.16);
  const wmArc = watermarkHorizon(1);
  const wmArcOp = watermarkHorizon(0.16);
  write(join(wm, "FH_Logo_Watermark_FH.svg"), wmFh);
  write(join(wm, "FH_Logo_Watermark_FH_16pct.svg"), wmFhOp);
  write(join(wm, "FH_Logo_Watermark_Horizon.svg"), wmArc);
  write(join(wm, "FH_Logo_Watermark_Horizon_16pct.svg"), wmArcOp);
  await svgToPng(wmFh, join(wm, "FH_Logo_Watermark_FH.png"), 256, 256);
  await svgToPng(wmFhOp, join(wm, "FH_Logo_Watermark_FH_16pct.png"), 256, 256);
  await svgToPng(wmArc, join(wm, "FH_Logo_Watermark_Horizon.png"), 256, 256);
  await svgToPng(wmArcOp, join(wm, "FH_Logo_Watermark_Horizon_16pct.png"), 256, 256);

  // Intro frames (no meta labels burned in)
  for (let b = 0; b <= 4; b++) {
    const svg = introFrame(b);
    const id = `FH_MOT_Intro_Frame_0${b}`;
    write(join(intro, `${id}.svg`), svg);
    await svgToPngExact(svg, join(intro, `${id}.png`), 1920, 1080);
  }

  // Outro frames — production EP001 copy
  for (const kind of ["idea", "skill", "action", "cta", "hold"]) {
    const svg = outroFrame(kind);
    const id = `FH_MOT_Outro_Frame_${kind}`;
    write(join(outro, `${id}.svg`), svg);
    await svgToPngExact(svg, join(outro, `${id}.png`), 1920, 1080);
  }

  // Lower thirds
  for (const kind of ["name", "series"]) {
    const svg = lowerThird(kind);
    const id = `FH_MOT_LowerThird_${kind}`;
    write(join(lower, `${id}.svg`), svg);
    await svgToPngExact(svg, join(lower, `${id}.png`), 1920, 1080);
  }

  // Social launch pack
  const socialAssets = [
    ["FH_SOC_EP001_Feed_1080x1080", socialSquare(), 1080, 1080],
    ["FH_SOC_EP001_Story_1080x1920", socialStory(), 1080, 1920],
    ["FH_SOC_EP001_Portrait_1080x1350", socialPortrait(), 1080, 1350],
    ["FH_SOC_EP001_LinkedIn_1200x627", socialLinkedIn(), 1200, 627],
    ["FH_SOC_Tip_FearPlan_1080x1080", socialTip(), 1080, 1080],
    ["FH_SOC_Quote_Tasks_1080x1080", socialQuote(), 1080, 1080],
  ];
  for (const [id, svg, w, h] of socialAssets) {
    write(join(social, `${id}.svg`), svg);
    await svgToPngExact(svg, join(social, `${id}.png`), w, h);
  }

  // WhatsApp community avatar
  const wa = horizonIcon({ stroke: C.ivory, bg: C.ink, size: 640 });
  write(join(social, "FH_SOC_WhatsApp_640.svg"), wa);
  await svgToPngExact(wa, join(social, "FH_SOC_WhatsApp_640.png"), 640, 640);

  // Press kit index (minimal — user asked no docs, but regenerate existing index file)
  write(
    join(press, "FH_Press_Kit_Index.md"),
    `# FutureHer Press Kit Index

| Asset | Path |
|---|---|
| Primary logo (light) | \`../01_logo/png/FH_Logo_Primary_Ink_2x.png\` |
| Primary logo (dark) | \`../01_logo/png/FH_Logo_Primary_Ivory_2x.png\` |
| Transparent | \`../01_logo/png/FH_Logo_Transparent_Ink_2x.png\` |
| Monogram | \`../01_logo/png/FH_Logo_Monogram_SoftSquare_Dark_2x.png\` |
| Colour board | \`../03_colour/FH_Colour_Palette_Board.png\` |
| Type specimen | \`../04_typography/specimens/FH_Type_Specimen_Horizon.png\` |
| Profile | \`../14_youtube/profile/FH_Profile_800.png\` |
| Banner | \`../14_youtube/banner/FH_TMPL_YT_Banner_2560x1440.png\` |

Tagline: *Ready for what’s next.*
`
  );

  // EP001 launch thumbnail at correct YouTube size
  await buildEp001Thumbnail();

  console.log("\n✓ Horizon Sprint 1 production assets complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
