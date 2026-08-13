/**
 * Sprint 5 — Export CapCut IMPORT pack
 * Converts motion/overlay SVGs → PNG and copies logo assets into
 * operations/CAPCUT/MASTER_PROJECT/IMPORT/ for one-shot CapCut import.
 */
import { createRequire } from "module";
import { mkdirSync, copyFileSync, readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..", "..", "..");
const BRAND = join(ROOT, "brand");
const MASTER = join(__dirname, "..");
const IMPORT = join(MASTER, "IMPORT");
const require = createRequire(join(BRAND, "_build", "package.json"));
const sharp = require("sharp");

function ensure(dir) {
  mkdirSync(dir, { recursive: true });
}

async function svgFileToPng(svgPath, outPath, width, height) {
  // Normalise to UTF-8 XML; strip BOM if present
  let svg = readFileSync(svgPath, "utf8").replace(/^\uFEFF/, "");
  if (!svg.includes("encoding=")) {
    svg = svg.replace(
      /<svg\b/,
      '<?xml version="1.0" encoding="UTF-8"?>\n<svg'
    );
  }
  ensure(dirname(outPath));
  await sharp(Buffer.from(svg, "utf8"))
    .resize(width, height, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log("png ", outPath.replace(ROOT, "."));
}

async function svgStringToPng(svg, outPath, width, height) {
  ensure(dirname(outPath));
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log("png ", outPath.replace(ROOT, "."));
}

function copyDirPngs(src, dest) {
  if (!existsSync(src)) return;
  ensure(dest);
  for (const f of readdirSync(src)) {
    if (extname(f).toLowerCase() === ".png") {
      copyFileSync(join(src, f), join(dest, f));
      console.log("copy", join(dest, f).replace(ROOT, "."));
    }
  }
}

function slateSvg(label, w = 1920, h = 1080) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#121A21"/>
  <rect x="96" y="54" width="${w - 192}" height="${h - 108}" fill="none" stroke="#B8893A" stroke-width="2" stroke-dasharray="8 6"/>
  <text x="${w / 2}" y="${h / 2 - 20}" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="48" font-weight="600" fill="#FFFCF8">${label}</text>
  <text x="${w / 2}" y="${h / 2 + 40}" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="24" fill="#D8D2C8">REPLACE - script / images / VO</text>
</svg>`;
}

async function main() {
  console.log("FutureHer CapCut IMPORT pack →", IMPORT);
  ensure(IMPORT);

  // Logos
  copyDirPngs(join(BRAND, "01_logo", "png"), join(IMPORT, "logos"));

  // Motion frames
  const introDir = join(BRAND, "08_motion", "intro");
  const outroDir = join(BRAND, "08_motion", "outro");
  const ltDir = join(BRAND, "08_motion", "lower-thirds");
  const motionOut = join(IMPORT, "motion");

  if (existsSync(introDir)) {
    for (const f of readdirSync(introDir).filter((x) => x.endsWith(".svg"))) {
      await svgFileToPng(join(introDir, f), join(motionOut, "intro", basename(f, ".svg") + ".png"), 1920, 1080);
    }
  }
  if (existsSync(outroDir)) {
    for (const f of readdirSync(outroDir).filter((x) => x.endsWith(".svg"))) {
      await svgFileToPng(join(outroDir, f), join(motionOut, "outro", basename(f, ".svg") + ".png"), 1920, 1080);
    }
  }
  if (existsSync(ltDir)) {
    for (const f of readdirSync(ltDir).filter((x) => x.endsWith(".svg"))) {
      await svgFileToPng(join(ltDir, f), join(motionOut, "lower-thirds", basename(f, ".svg") + ".png"), 1920, 1080);
    }
  }

  // Overlays
  const overlayDir = join(MASTER, "OVERLAYS");
  const overlayOut = join(IMPORT, "overlays");
  const overlaySizes = {
    "FH_SafeArea_Longform_1920x1080.svg": [1920, 1080],
    "FH_SafeArea_Shorts_1080x1920.svg": [1080, 1920],
    "FH_Endscreen_Zones_1920x1080.svg": [1920, 1080],
    "FH_Thumbnail_Zones_1280x720.svg": [1280, 720],
  };
  for (const [file, [w, h]] of Object.entries(overlaySizes)) {
    const p = join(overlayDir, file);
    if (existsSync(p)) {
      await svgFileToPng(p, join(overlayOut, basename(file, ".svg") + ".png"), w, h);
    }
  }

  // Placeholder slates for timeline slots
  const slates = [
    ["PLACEHOLDER_HOOK_30s", 1920, 1080],
    ["PLACEHOLDER_STORY_90s", 1920, 1080],
    ["PLACEHOLDER_PROBLEM_120s", 1920, 1080],
    ["PLACEHOLDER_SKILL_120s", 1920, 1080],
    ["PLACEHOLDER_PSYCH_60s", 1920, 1080],
    ["PLACEHOLDER_ACTION_40s", 1920, 1080],
    ["PLACEHOLDER_PREVIEW_10s", 1920, 1080],
    ["PLACEHOLDER_SHORTS_HOOK", 1080, 1920],
  ];
  for (const [label, w, h] of slates) {
    await svgStringToPng(slateSvg(label, w, h), join(IMPORT, "slates", `${label}.png`), w, h);
  }

  // Manifest
  const manifest = {
    generated: new Date().toISOString(),
    master: "FH_TMPL_Longform_8min",
    import_into_capcut: IMPORT,
    steps: [
      "Install Satoshi font",
      "CapCut → New project 1920x1080 30fps → rename FH_TMPL_Longform_8min",
      "Import this IMPORT folder",
      "Follow ASSEMBLE_IN_CAPCUT.md",
    ],
  };
  writeFileSync(join(IMPORT, "MANIFEST.json"), JSON.stringify(manifest, null, 2));
  console.log("done →", IMPORT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
