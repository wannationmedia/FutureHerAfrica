/**
 * FutureHer Africa — production logo system
 * Visual source: approved woman-profile / headwrap / H monogram board.
 * Outlines Satoshi for AFRICA; FUTUREHER is a drawn high-contrast serif.
 * Writes public/brand/futureher-africa/ only (plus required public rasters).
 */
import sharp from "sharp";
import opentype from "opentype.js";
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const OUT = join(ROOT, "public", "brand", "futureher-africa");

const C = {
  cocoa: "#2A1812",
  earth: "#3A2118",
  bronze: "#9A7650",
  gold: "#D4AF7A",
  sand: "#C8A98B",
  ivory: "#F3EBDD",
  charcoal: "#171311",
};

function ensure(dir) {
  mkdirSync(dir, { recursive: true });
}

function write(path, content) {
  ensure(dirname(path));
  writeFileSync(path, content);
  console.log("wrote", path.replace(ROOT + "\\", "").replace(ROOT + "/", ""));
}

function loadFont(file) {
  const buf = readFileSync(join(__dirname, "fonts", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const FONT_MED = loadFont("Satoshi-Medium.ttf");

function commandsToPath(commands, digits = 2) {
  const r = (n) => (Number.isFinite(n) ? Number(n.toFixed(digits)) : null);
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
  const total = textWidth(font, text, size, tracking);
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

/** Recognizable Africa continent (approved monogram counters). */
function africaD(cx, cy, h) {
  const sx = h / 114;
  const sy = h / 114;
  const X = (n) => +(cx + (n - 50) * sx).toFixed(2);
  const Y = (n) => +(cy + (n - 56) * sy).toFixed(2);
  return [
    `M${X(44)} ${Y(4)}`,
    `L${X(60)} ${Y(8)}`,
    `L${X(66)} ${Y(22)}`,
    `L${X(64)} ${Y(32)}`,
    `L${X(80)} ${Y(38)}`,
    `L${X(96)} ${Y(50)}`,
    `L${X(88)} ${Y(58)}`,
    `L${X(72)} ${Y(56)}`,
    `L${X(70)} ${Y(70)}`,
    `L${X(74)} ${Y(86)}`,
    `L${X(62)} ${Y(108)}`,
    `L${X(48)} ${Y(104)}`,
    `L${X(46)} ${Y(86)}`,
    `L${X(40)} ${Y(74)}`,
    `L${X(18)} ${Y(66)}`,
    `L${X(6)} ${Y(52)}`,
    `L${X(10)} ${Y(38)}`,
    `L${X(28)} ${Y(32)}`,
    `L${X(36)} ${Y(20)}`,
    `L${X(34)} ${Y(10)}`,
    "Z",
  ].join("");
}

function circleD(cx, cy, r) {
  const k = +(r * 0.5522847498).toFixed(3);
  const x = +cx.toFixed(2);
  const y = +cy.toFixed(2);
  const rr = +r.toFixed(2);
  return [
    `M${x} ${+(y - rr).toFixed(2)}`,
    `C${+(x + k).toFixed(2)} ${+(y - rr).toFixed(2)} ${+(x + rr).toFixed(2)} ${+(y - k).toFixed(2)} ${+(x + rr).toFixed(2)} ${y}`,
    `C${+(x + rr).toFixed(2)} ${+(y + k).toFixed(2)} ${+(x + k).toFixed(2)} ${+(y + rr).toFixed(2)} ${x} ${+(y + rr).toFixed(2)}`,
    `C${+(x - k).toFixed(2)} ${+(y + rr).toFixed(2)} ${+(x - rr).toFixed(2)} ${+(y + k).toFixed(2)} ${+(x - rr).toFixed(2)} ${y}`,
    `C${+(x - rr).toFixed(2)} ${+(y - k).toFixed(2)} ${+(x - k).toFixed(2)} ${+(y - rr).toFixed(2)} ${x} ${+(y - rr).toFixed(2)}Z`,
  ].join("");
}

/** Woman-profile + sculptural gele + serif H. Artboard 0 0 280 300. */
function markGeometry() {
  const profile = [
    "M126 96",
    "C136 86 150 86 160 96",
    "C168 104 172 114 174 126",
    "C176 136 184 144 196 150",
    "C202 154 204 160 200 165",
    "C196 169 190 170 184 169",
    "C188 176 192 184 190 192",
    "C188 200 182 204 174 204",
    "C170 214 168 228 168 244",
    "C168 258 170 268 176 272",
    "L190 272",
    "L190 258",
    "C180 258 176 250 176 238",
    "C176 220 178 204 182 192",
    "C152 184 136 168 132 148",
    "C128 134 128 116 130 106",
    "C130 100 128 98 126 96Z",
  ].join("");

  const wrapVolume = [
    "M74 68",
    "C64 40 98 18 140 22",
    "C172 26 192 52 184 82",
    "C178 102 154 112 128 106",
    "C108 118 84 114 72 94",
    "C66 82 68 74 74 68Z",
  ].join("");

  const wrapFoldA = [
    "M88 42",
    "C120 30 164 48 178 78",
    "C180 84 174 86 168 80",
    "C154 58 118 44 94 52",
    "C88 54 84 46 88 42Z",
  ].join("");

  const wrapFoldB = [
    "M70 86",
    "C108 64 160 72 186 104",
    "C188 110 180 112 170 104",
    "C144 84 104 80 80 96",
    "C74 100 66 92 70 86Z",
  ].join("");

  const hRight = [
    "M226 70",
    "L244 70",
    "L244 72.2",
    "L255 72.2",
    "L255 74.6",
    "L244 74.6",
    "L244 255.4",
    "L255 255.4",
    "L255 257.8",
    "L244 257.8",
    "L244 260",
    "L226 260",
    "L226 257.8",
    "L215 257.8",
    "L215 255.4",
    "L226 255.4Z",
  ].join("");

  const hBar = "M176 208 L226 208 L226 213 L176 213Z";

  const flourish = [
    "M174 258",
    "C136 270 90 272 54 258",
    "C38 251 34 238 48 232",
    "C60 227 82 236 110 244",
    "C136 251 158 254 174 252",
    "C178 254 178 257 174 258Z",
  ].join("");

  const earringOuter = circleD(128, 178, 16.2);
  const earringInner = circleD(128, 178, 8.6);
  const hAfrica = africaD(202, 236, 38);

  return {
    profile,
    wrapVolume,
    wrapFoldA,
    wrapFoldB,
    hRight,
    hBar,
    flourish,
    earringOuter,
    earringInner,
    hAfrica,
    hBody: `${hRight}${hBar}`,
  };
}

function markColorGroup(g) {
  return [
    `<g fill="${C.bronze}">`,
    `<path d="${g.hBody}"/>`,
    `<path d="${g.flourish}"/>`,
    `<path d="${g.wrapVolume}"/>`,
    `</g>`,
    `<path fill="${C.gold}" d="${g.hAfrica}"/>`,
    `<path fill="${C.cocoa}" d="${g.profile}"/>`,
    `<path fill="${C.gold}" d="${g.wrapFoldA}"/>`,
    `<path fill="${C.sand}" d="${g.wrapFoldB}"/>`,
    `<path fill="${C.gold}" fill-rule="evenodd" d="${g.earringOuter}${g.earringInner}"/>`,
  ].join("");
}

function markMonoGroup(g, fill) {
  const hCompound = `${g.hBody}${g.hAfrica}`;
  const earring = `${g.earringOuter}${g.earringInner}`;
  return [
    `<g fill="${fill}">`,
    `<path fill-rule="evenodd" d="${hCompound}"/>`,
    `<path d="${g.flourish}"/>`,
    `<path d="${g.wrapVolume}"/>`,
    `<path d="${g.profile}"/>`,
    `<path d="${g.wrapFoldA}"/>`,
    `<path d="${g.wrapFoldB}"/>`,
    `<path fill-rule="evenodd" d="${earring}"/>`,
    `</g>`,
  ].join("");
}

function svgShell({ viewBox, width, height, title, inner }) {
  const [vw, vh] = viewBox.split(" ").slice(2).map(Number);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width ?? vw}" height="${height ?? vh}" viewBox="${viewBox}" fill="none" role="img">
  <title>${title}</title>
  ${inner}
</svg>
`;
}

function p(n) {
  return +n.toFixed(2);
}

function didotLetter(ch, x, baseline, cap, fill) {
  const s = cap / 100;
  const X = (n) => p(x + n * s);
  const Y = (n) => p(baseline + (n - 100) * s);
  const stem = 15.8;
  const hair = 2.55;
  const serif = 9.2;
  const tick = 11.5;

  const box = (x0, y0, w, h) =>
    `M${X(x0)} ${Y(y0)}L${X(x0 + w)} ${Y(y0)}L${X(x0 + w)} ${Y(y0 + h)}L${X(x0)} ${Y(y0 + h)}Z`;

  const stemSerifs = (sx, width = stem) =>
    [
      box(sx - serif * 0.35, 0, width + serif * 0.35, hair),
      box(sx - serif * 0.55, 100 - hair, width + serif * 1.05, hair),
    ].join("");

  let d = "";
  let adv = 58;

  if (ch === "F") {
    d += box(0, 0, stem, 100);
    d += stemSerifs(0);
    d += box(stem - 0.4, 0, 36.5, hair);
    d += box(stem + 36.1, 0, hair, tick);
    d += box(stem - 0.4, 46.5, 27.5, hair);
    adv = 54;
  } else if (ch === "U") {
    const uw = 62;
    d += [
      `M${X(0)} ${Y(0)}`,
      `L${X(stem)} ${Y(0)}`,
      `L${X(stem)} ${Y(74)}`,
      `C${X(stem)} ${Y(88)} ${X(24)} ${Y(94.8)} ${X(uw / 2)} ${Y(94.8)}`,
      `C${X(uw - 24)} ${Y(94.8)} ${X(uw - stem)} ${Y(88)} ${X(uw - stem)} ${Y(74)}`,
      `L${X(uw - stem)} ${Y(0)}`,
      `L${X(uw)} ${Y(0)}`,
      `L${X(uw)} ${Y(76)}`,
      `C${X(uw)} ${Y(94)} ${X(46)} ${Y(100)} ${X(uw / 2)} ${Y(100)}`,
      `C${X(16)} ${Y(100)} ${X(0)} ${Y(94)} ${X(0)} ${Y(76)}Z`,
      box(-serif * 0.3, 0, stem + serif * 0.3, hair),
      box(uw - stem, 0, stem + serif * 0.3, hair),
    ].join("");
    adv = 70;
  } else if (ch === "T") {
    const w = 62;
    d += box((w - stem) / 2, 0, stem, 100);
    d += box((w - stem) / 2 - serif * 0.45, 100 - hair, stem + serif * 0.9, hair);
    d += box(0, 0, w, hair);
    d += box(0, 0, hair, tick);
    d += box(w - hair, 0, hair, tick);
    adv = 66;
  } else if (ch === "R") {
    d += box(0, 0, stem, 100);
    d += stemSerifs(0);
    d += [
      `M${X(stem - 0.4)} ${Y(0)}`,
      `L${X(38)} ${Y(0)}`,
      `C${X(52.5)} ${Y(0)} ${X(60)} ${Y(10)} ${X(60)} ${Y(24.5)}`,
      `C${X(60)} ${Y(39)} ${X(51)} ${Y(49.2)} ${X(36)} ${Y(49.2)}`,
      `L${X(stem - 0.4)} ${Y(49.2)}Z`,
      `M${X(stem + 5.4)} ${Y(hair + 1.4)}`,
      `L${X(36.5)} ${Y(hair + 1.4)}`,
      `C${X(46.8)} ${Y(hair + 1.4)} ${X(52.2)} ${Y(14.8)} ${X(52.2)} ${Y(24.5)}`,
      `C${X(52.2)} ${Y(34.2)} ${X(46.2)} ${Y(41.8)} ${X(35.8)} ${Y(41.8)}`,
      `L${X(stem + 5.4)} ${Y(41.8)}Z`,
      `M${X(stem - 0.4)} ${Y(49.2)}`,
      `L${X(34)} ${Y(49.2)}`,
      `L${X(61)} ${Y(100)}`,
      `L${X(44.8)} ${Y(100)}`,
      `L${X(stem - 0.4)} ${Y(62)}Z`,
    ].join("");
    adv = 66;
  } else if (ch === "E") {
    d += box(0, 0, stem, 100);
    d += stemSerifs(0);
    d += box(stem - 0.4, 0, 36.8, hair);
    d += box(stem + 36.4, 0, hair, tick);
    d += box(stem - 0.4, 47, 27.8, hair);
    d += box(stem - 0.4, 100 - hair, 36.8, hair);
    d += box(stem + 36.4, 100 - tick, hair, tick);
    adv = 56;
  } else if (ch === "H") {
    d += box(0, 0, stem, 100);
    d += stemSerifs(0);
    d += box(48, 0, stem, 100);
    d += stemSerifs(48);
    d += box(stem - 0.4, 47.2, 48 - stem + 0.8, hair);
    adv = 70;
  } else {
    throw new Error(`Missing Didot cap ${ch}`);
  }

  return { path: `<path d="${d}" fill="${fill}"/>`, adv: adv * s };
}

function futureherWordmark(cx, baseline, cap, fills) {
  const letters = "FUTUREHER".split("");
  const tracking = cap * 0.055;
  const parts = [];
  let widths = [];
  for (const ch of letters) {
    const { adv } = didotLetter(ch, 0, 0, cap, "#000");
    widths.push(adv);
  }
  const total = widths.reduce((a, b) => a + b, 0) + tracking * (letters.length - 1);
  let x = cx - total / 2;
  letters.forEach((ch, i) => {
    const fill = Array.isArray(fills) ? fills[i] : fills;
    const { path, adv } = didotLetter(ch, x, baseline, cap, fill);
    parts.push(path);
    x += adv + tracking;
  });
  return { svg: parts.join(""), width: total };
}

function taperedRule(x1, x2, y, fill) {
  const mid = (x1 + x2) / 2;
  const h = Math.max(1.1, (x2 - x1) * 0.018);
  return `<path fill="${fill}" d="M${p(x1)} ${p(y)} L${p(x2)} ${p(y)} L${p(mid)} ${p(y - h)}Z"/>`;
}

function wordmarkBlock({
  cx,
  top,
  futureFill,
  africaFill,
  ruleFill,
  herFill = null,
  cap = 54,
  africaSize = 15.5,
}) {
  const fills = herFill
    ? "FUTUREHER".split("").map((ch, i) => (i >= 6 ? herFill : futureFill))
    : futureFill;
  const { svg, width } = futureherWordmark(cx, top + cap, cap, fills);
  const africaY = top + cap + 28;
  const africaTracking = africaSize * 0.42;
  const africaW = textWidth(FONT_MED, "AFRICA", africaSize, africaTracking);
  const gap = 18;
  const ruleY = africaY - africaSize * 0.32;
  const left1 = cx - width / 2;
  const left2 = cx - africaW / 2 - gap;
  const right1 = cx + africaW / 2 + gap;
  const right2 = cx + width / 2;
  return {
    svg: [
      svg,
      taperedRule(left1, left2, ruleY, ruleFill),
      taperedRule(right2, right1, ruleY, ruleFill),
      textPath(FONT_MED, "AFRICA", cx, africaY, africaSize, africaFill, {
        tracking: africaTracking,
        anchor: "middle",
      }),
    ].join(""),
    height: africaY + 8 - top,
    width,
  };
}

function markSvg(inner, title) {
  return svgShell({
    viewBox: "0 0 280 300",
    title,
    inner: `<g>${inner}</g>`,
  });
}

function primarySvg(markInner, wordInner, title) {
  return svgShell({
    viewBox: "0 0 640 760",
    title,
    inner: `<g transform="translate(180 36)">${markInner}</g>${wordInner}`,
  });
}

function wordmarkSvg(inner, title) {
  return svgShell({
    viewBox: "0 0 640 168",
    title,
    inner,
  });
}

async function svgToPng(svg, outPath, width, height, background) {
  ensure(dirname(outPath));
  let img = sharp(Buffer.from(svg)).resize(width, height, {
    fit: "contain",
    background: background || { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (background && background.alpha === 1) {
    img = img.flatten({ background });
  }
  await img.png({ compressionLevel: 9 }).toFile(outPath);
  console.log("png ", outPath.replace(ROOT + "\\", "").replace(ROOT + "/", ""));
}

function roundedFieldSvg(size, radius, field, markInner, markScale) {
  const ox = (size - 280 * markScale) / 2;
  const oy = (size - 300 * markScale) / 2 - size * 0.01;
  return svgShell({
    viewBox: `0 0 ${size} ${size}`,
    width: size,
    height: size,
    title: "FutureHer Africa",
    inner: `<rect width="${size}" height="${size}" rx="${radius}" fill="${field}"/>
  <g transform="translate(${ox} ${oy}) scale(${markScale})">${markInner}</g>`,
  });
}

async function main() {
  ensure(OUT);
  const g = markGeometry();
  const colorMark = markColorGroup(g);
  const ivoryMark = markMonoGroup(g, C.ivory);
  const inkMark = markMonoGroup(g, C.charcoal);

  const wordColor = wordmarkBlock({
    cx: 320,
    top: 352,
    futureFill: C.cocoa,
    herFill: C.bronze,
    africaFill: C.cocoa,
    ruleFill: C.bronze,
    cap: 52,
  });
  const wordIvory = wordmarkBlock({
    cx: 320,
    top: 352,
    futureFill: C.ivory,
    africaFill: C.ivory,
    ruleFill: C.ivory,
    cap: 52,
  });
  const wordInk = wordmarkBlock({
    cx: 320,
    top: 352,
    futureFill: C.charcoal,
    africaFill: C.charcoal,
    ruleFill: C.charcoal,
    cap: 52,
  });

  const wordOnlyColor = wordmarkBlock({
    cx: 320,
    top: 28,
    futureFill: C.cocoa,
    herFill: C.bronze,
    africaFill: C.cocoa,
    ruleFill: C.bronze,
    cap: 72,
    africaSize: 20,
  });
  const wordOnlyIvory = wordmarkBlock({
    cx: 320,
    top: 28,
    futureFill: C.ivory,
    africaFill: C.ivory,
    ruleFill: C.ivory,
    cap: 72,
    africaSize: 20,
  });
  const wordOnlyInk = wordmarkBlock({
    cx: 320,
    top: 28,
    futureFill: C.charcoal,
    africaFill: C.charcoal,
    ruleFill: C.charcoal,
    cap: 72,
    africaSize: 20,
  });

  write(
    join(OUT, "futureher-africa-primary.svg"),
    primarySvg(colorMark, wordColor.svg, "FutureHer Africa"),
  );
  write(
    join(OUT, "futureher-africa-primary-ivory.svg"),
    primarySvg(ivoryMark, wordIvory.svg, "FutureHer Africa"),
  );
  write(
    join(OUT, "futureher-africa-primary-ink.svg"),
    primarySvg(inkMark, wordInk.svg, "FutureHer Africa"),
  );
  write(join(OUT, "futureher-africa-mark.svg"), markSvg(colorMark, "FutureHer Africa mark"));
  write(join(OUT, "futureher-africa-mark-ivory.svg"), markSvg(ivoryMark, "FutureHer Africa mark"));
  write(join(OUT, "futureher-africa-mark-ink.svg"), markSvg(inkMark, "FutureHer Africa mark"));
  write(
    join(OUT, "futureher-africa-wordmark.svg"),
    wordmarkSvg(wordOnlyColor.svg, "FutureHer Africa"),
  );
  write(
    join(OUT, "futureher-africa-wordmark-ivory.svg"),
    wordmarkSvg(wordOnlyIvory.svg, "FutureHer Africa"),
  );
  write(
    join(OUT, "futureher-africa-wordmark-ink.svg"),
    wordmarkSvg(wordOnlyInk.svg, "FutureHer Africa"),
  );

  const app = roundedFieldSvg(1024, 180, C.cocoa, ivoryMark, 2.35);
  const fav = roundedFieldSvg(32, 6, C.cocoa, ivoryMark, 0.086);
  write(join(OUT, "futureher-africa-apple-touch-1024.svg"), app);
  await svgToPng(app, join(OUT, "futureher-africa-apple-touch-1024.png"), 1024, 1024, {
    r: 42,
    g: 24,
    b: 18,
    alpha: 1,
  });
  await svgToPng(fav, join(OUT, "futureher-africa-favicon-32.png"), 32, 32, {
    r: 42,
    g: 24,
    b: 18,
    alpha: 1,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
