/**
 * EP001 brand/visual minimal patch — FutureHerAfrica naming only.
 * Preserves approved host face from existing thumbnail left half.
 * Does NOT run full brand generate. Does NOT touch logo masters / EP002–10.
 */
import sharp from "sharp";
import opentype from "opentype.js";
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAND = join(__dirname, "..");
const ROOT = join(BRAND, "..");
const LAUNCH = join(ROOT, "launch");
const EP = join(LAUNCH, "EP001");

const C = {
  ink: "#121A21",
  stone: "#F3EFE8",
  washEnd: "#E8E0D4",
  brass: "#B8893A",
  brassDark: "#C9A05A",
  lagoon: "#2F6F6A",
  lagoonDark: "#1F4B48",
  ivory: "#FFFCF8",
  textSecondary: "#3D4A55",
  textSecondaryDark: "#A8B0B8",
  textTertiary: "#6B7380",
  textTertiaryDark: "#8A929A",
  night: "#0B1014",
  surfaceDark: "#1A232B",
  borderDark: "#2C3740",
};

const SERIES = "FutureHerAfrica · AI";
const BRAND_NAME = "FutureHerAfrica";
const TAGLINE = "Ready for what's next.";
const SIGN_OFF = `${BRAND_NAME} — ${TAGLINE}`;
const SUPPORT = "Map · Label · Run";
const TITLE_LINES = ["AI replaces", "tasks,", "not you"];

function loadFont(file) {
  const buf = readFileSync(join(__dirname, "fonts", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}
const FONT_MED = loadFont("Satoshi-Medium.ttf");
const FONT_BOLD = loadFont("Satoshi-Bold.ttf");

function ensure(dir) { mkdirSync(dir, { recursive: true }); }
function write(path, content) {
  ensure(dirname(path));
  writeFileSync(path, content);
  console.log("wrote", path.replace(ROOT + "\\", "").replace(ROOT + "/", ""));
}

function commandsToPath(commands, digits = 2) {
  const r = (n) => (!Number.isFinite(n) ? null : Number(n.toFixed(digits)));
  let d = "";
  for (const c of commands) {
    if (c.type === "M") {
      const x = r(c.x), y = r(c.y);
      if (x === null || y === null) continue;
      d += `M${x} ${y}`;
    } else if (c.type === "L") {
      const x = r(c.x), y = r(c.y);
      if (x === null || y === null) continue;
      d += `L${x} ${y}`;
    } else if (c.type === "Q") {
      const x1 = r(c.x1), y1 = r(c.y1), x = r(c.x), y = r(c.y);
      if ([x1, y1, x, y].some((v) => v === null)) continue;
      d += `Q${x1} ${y1} ${x} ${y}`;
    } else if (c.type === "C") {
      const vals = [c.x1, c.y1, c.x2, c.y2, c.x, c.y].map(r);
      if (vals.some((v) => v === null)) continue;
      d += `C${vals[0]} ${vals[1]} ${vals[2]} ${vals[3]} ${vals[4]} ${vals[5]}`;
    } else if (c.type === "Z") d += "Z";
  }
  return d;
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

function textPath(font, text, x, y, size, fill, { tracking = 0, anchor = "start" } = {}) {
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  let total = textWidth(font, text, size, tracking);
  let cx = anchor === "middle" ? x - total / 2 : x;
  let d = "";
  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i];
    const path = g.getPath(cx, y, size);
    d += commandsToPath(path.commands);
    cx += (g?.advanceWidth || font.unitsPerEm * 0.5) * scale + tracking;
  }
  return `<path d="${d}" fill="${fill}"/>`;
}

async function svgToPngExact(svg, outPath, width, height) {
  ensure(dirname(outPath));
  await sharp(Buffer.from(svg)).resize(width, height, { fit: "fill" }).png({ compressionLevel: 9 }).toFile(outPath);
  console.log("png ", outPath.replace(ROOT + "\\", "").replace(ROOT + "/", ""));
}

function pill(x, y, h, fontSize, tracking = 0.32) {
  const tw = textWidth(FONT_MED, SERIES, fontSize, tracking);
  const padX = 18;
  const w = Math.ceil(tw + padX * 2);
  const cy = y + Math.round(h * 0.62);
  return {
    w,
    svg: `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${C.lagoon}"/>
  ${textPath(FONT_MED, SERIES, x + w / 2, cy, fontSize, C.ivory, { tracking, anchor: "middle" })}`,
  };
}

async function patchThumbnail() {
  const srcPath = join(EP, "FH_EP001_Thumbnail.png");
  const outPath = join(EP, "FH_EP001_Thumbnail.png");
  const publishPath = join(EP, "PUBLISH", "08_THUMBNAIL.png");
  if (!existsSync(srcPath)) throw new Error("Missing EP001 thumbnail");

  const meta = await sharp(srcPath).metadata();
  const faceW = Math.floor(meta.width * 0.5);
  const faceBuf = await sharp(srcPath)
    .extract({ left: 0, top: 0, width: faceW, height: meta.height })
    .resize(640, 720, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();

  const p = pill(48, 160, 40, 16, 0.2);
  const panelSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="720" viewBox="0 0 640 720">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="720" fill="url(#wash)"/>
  ${p.svg}
  ${textPath(FONT_BOLD, TITLE_LINES[0], 48, 280, 56, C.ink, { tracking: -0.56 })}
  ${textPath(FONT_BOLD, TITLE_LINES[1], 48, 350, 56, C.ink, { tracking: -0.56 })}
  ${textPath(FONT_BOLD, TITLE_LINES[2], 48, 420, 56, C.ink, { tracking: -0.56 })}
  <rect x="48" y="460" width="120" height="4" fill="${C.brass}"/>
  ${textPath(FONT_MED, SUPPORT, 48, 520, 26, C.textSecondary)}
</svg>`;

  const monoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
  <rect width="56" height="56" rx="12" fill="${C.ink}"/>
  ${textPath(FONT_BOLD, "FH", 28, 37, 20, C.brassDark, { anchor: "middle" })}
</svg>`;

  const panelBuf = await sharp(Buffer.from(panelSvg)).png().toBuffer();
  const monoBuf = await sharp(Buffer.from(monoSvg)).png().toBuffer();
  const coverBuf = await sharp(
    Buffer.from(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="14" fill="${C.ink}"/></svg>`)
  ).png().toBuffer();

  const faceWithMono = await sharp(faceBuf)
    .composite([
      { input: coverBuf, left: 16, top: 16 },
      { input: monoBuf, left: 28, top: 28 },
    ])
    .png()
    .toBuffer();

  await sharp({ create: { width: 1280, height: 720, channels: 3, background: C.stone } })
    .composite([
      { input: faceWithMono, left: 0, top: 0 },
      { input: panelBuf, left: 640, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  ensure(dirname(publishPath));
  copyFileSync(outPath, publishPath);
  console.log("png  launch/EP001/FH_EP001_Thumbnail.png + PUBLISH/08_THUMBNAIL.png");
}

async function patchActionCard() {
  const outPath = join(EP, "PUBLISH", "AC01_ACTION_CARD.png");
  const lines = [
    "Write five work tasks from this week",
    "Label: Assist · Own · Hybrid",
    "Draft one with AI — edit in your voice",
  ];
  const list = lines
    .map((t, i) => {
      const y = 360 + i * 52;
      return `${textPath(FONT_MED, `${i + 1}.`, 96, y, 28, C.textSecondary)}
  ${textPath(FONT_MED, t, 140, y, 28, C.textSecondary)}`;
    })
    .join("\n");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#wash)"/>
  ${textPath(FONT_MED, "ACTION TODAY · UNDER 30 MIN", 96, 180, 22, C.lagoon, { tracking: 1.2 })}
  ${textPath(FONT_BOLD, "Map 5 tasks. Run 1 with AI.", 96, 270, 52, C.ink, { tracking: -0.4 })}
  <rect x="96" y="300" width="88" height="3" fill="${C.brass}"/>
  ${list}
  ${textPath(FONT_MED, SIGN_OFF, 1216, 660, 20, C.textTertiary, { anchor: "middle" })}
</svg>`;
  // right-align sign-off: compute width and place from right
  const sw = textWidth(FONT_MED, SIGN_OFF, 20, 0);
  const signX = 1280 - 64 - sw;
  const svg2 = svg.replace(
    textPath(FONT_MED, SIGN_OFF, 1216, 660, 20, C.textTertiary, { anchor: "middle" }),
    textPath(FONT_MED, SIGN_OFF, signX, 660, 20, C.textTertiary)
  );
  await svgToPngExact(svg2, outPath, 1280, 720);
}

function thumbLayout({ dark = false } = {}) {
  const title = dark ? C.ivory : C.ink;
  const support = dark ? C.textSecondaryDark : C.textSecondary;
  const field = dark ? C.ink : C.stone;
  const panel = dark ? C.night : C.ivory;
  const faceFill = dark ? C.surfaceDark : "#D8D2C8";
  const p = pill(752, 140, 36, 14, 0.2);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="${field}"/>
  <rect x="64" y="64" width="620" height="592" rx="12" fill="${faceFill}" opacity="0.55"/>
  <path d="M 274 435.4 Q 374 373.8 474 391.4" stroke="${C.brass}" stroke-width="8" stroke-linecap="round" fill="none"/>
  <circle cx="474" cy="391.4" r="4" fill="${C.brass}"/>
  <rect x="720" y="64" width="496" height="592" rx="12" fill="${panel}"/>
  ${p.svg}
  ${textPath(FONT_BOLD, TITLE_LINES[0], 752, 250, 52, title, { tracking: -0.52 })}
  ${textPath(FONT_BOLD, TITLE_LINES[1], 752, 312, 52, title, { tracking: -0.52 })}
  ${textPath(FONT_BOLD, TITLE_LINES[2], 752, 374, 52, title, { tracking: -0.52 })}
  <rect x="752" y="400" width="120" height="3" fill="${C.brass}"/>
  ${textPath(FONT_MED, SUPPORT, 752, 450, 22, support)}
  <g transform="translate(64, 592)">
    <rect width="64" height="64" rx="10" fill="${C.ink}"/>
    ${textPath(FONT_BOLD, "FH", 32, 42, 22, C.ivory, { anchor: "middle" })}
  </g>
</svg>`;
}

function socialSquare() {
  const p = pill(72, 72, 40, 16, 0.2);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#wash)"/>
  ${p.svg}
  ${textPath(FONT_BOLD, "AI replaces", 72, 320, 72, C.ink, { tracking: -0.72 })}
  ${textPath(FONT_BOLD, "tasks, not you", 72, 410, 72, C.ink, { tracking: -0.72 })}
  <rect x="72" y="450" width="160" height="4" fill="${C.brass}"/>
  ${textPath(FONT_MED, SUPPORT, 72, 520, 28, C.textSecondary)}
  <g transform="translate(72, 920)">
    <rect width="72" height="72" rx="12" fill="${C.ink}"/>
    ${textPath(FONT_BOLD, "FH", 36, 48, 28, C.ivory, { anchor: "middle" })}
  </g>
  ${textPath(FONT_MED, BRAND_NAME, 164, 966, 22, C.ink, { tracking: -0.22 })}
</svg>`;
}

function socialStory() {
  const p = pill(120, 700, 40, 16, 0.2);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <rect width="1080" height="1920" fill="${C.ink}"/>
  ${p.svg}
  ${textPath(FONT_BOLD, "AI replaces", 120, 900, 64, C.ivory, { tracking: -0.6 })}
  ${textPath(FONT_BOLD, "tasks, not you", 120, 980, 64, C.ivory, { tracking: -0.6 })}
  <rect x="120" y="1040" width="160" height="4" fill="${C.brass}"/>
  ${textPath(FONT_MED, SUPPORT, 120, 1130, 28, C.textSecondaryDark)}
  ${textPath(FONT_MED, TAGLINE, 540, 1770, 20, C.textTertiaryDark, { anchor: "middle" })}
  ${textPath(FONT_MED, BRAND_NAME, 540, 1810, 18, C.textSecondaryDark, { anchor: "middle" })}
</svg>`;
}

function socialPortrait() {
  const p = pill(72, 96, 40, 16, 0.2);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.stone}"/>
      <stop offset="100%" stop-color="${C.washEnd}"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#wash)"/>
  ${p.svg}
  ${textPath(FONT_BOLD, "AI replaces", 72, 420, 68, C.ink, { tracking: -0.68 })}
  ${textPath(FONT_BOLD, "tasks, not you", 72, 510, 68, C.ink, { tracking: -0.68 })}
  <rect x="72" y="550" width="160" height="4" fill="${C.brass}"/>
  ${textPath(FONT_MED, "AI pressures tasks - not your whole worth.", 72, 620, 26, C.textSecondary)}
  ${textPath(FONT_MED, BRAND_NAME, 72, 1260, 22, C.ink, { tracking: -0.22 })}
</svg>`;
}

function socialLinkedIn() {
  const p = pill(80, 280, 36, 15, 0.2);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="627" viewBox="0 0 1200 627">
  <rect width="1200" height="627" fill="${C.ink}"/>
  ${p.svg}
  ${textPath(FONT_BOLD, "AI replaces tasks, not you", 80, 400, 42, C.ivory, { tracking: -0.42 })}
  ${textPath(FONT_MED, SUPPORT, 80, 460, 22, C.textSecondaryDark)}
  ${textPath(FONT_MED, BRAND_NAME, 80, 560, 20, C.textSecondaryDark)}
</svg>`;
}

async function main() {
  console.log("EP001 brand/visual minimal patch…");
  await patchThumbnail();
  await patchActionCard();

  const thumbs = join(BRAND, "07_thumbnails");
  const social = join(BRAND, "13_social");

  const layout = thumbLayout({ dark: false });
  const dark = thumbLayout({ dark: true });
  // fix botched thumbLayout helper - rewrite cleanly below
  write(join(thumbs, "FH_EP001_Thumbnail_Layout_1280x720.svg"), layout);
  await svgToPngExact(layout, join(thumbs, "FH_EP001_Thumbnail_Layout_1280x720.png"), 1280, 720);
  write(join(thumbs, "FH_EP001_Thumbnail_Dark_1280x720.svg"), dark);
  await svgToPngExact(dark, join(thumbs, "FH_EP001_Thumbnail_Dark_1280x720.png"), 1280, 720);

  const packs = [
    ["FH_SOC_EP001_Feed_1080x1080", socialSquare(), 1080, 1080],
    ["FH_SOC_EP001_Story_1080x1920", socialStory(), 1080, 1920],
    ["FH_SOC_EP001_Portrait_1080x1350", socialPortrait(), 1080, 1350],
    ["FH_SOC_EP001_LinkedIn_1200x627", socialLinkedIn(), 1200, 627],
  ];
  for (const [name, svg, w, h] of packs) {
    write(join(social, `${name}.svg`), svg);
    await svgToPngExact(svg, join(social, `${name}.png`), w, h);
  }

  // Keep generate.mjs EP001.series in sync for future builds (single constant line)
  const genPath = join(__dirname, "generate.mjs");
  let gen = readFileSync(genPath, "utf8");
  const gen2 = gen.replace('series: "FutureHer · AI"', `series: "${SERIES}"`);
  if (gen2 !== gen) {
    writeFileSync(genPath, gen2);
    console.log("synced brand/_build/generate.mjs EP001.series");
  }

  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
