import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const C = { ink: "#121A21", brass: "#B8893A", ivory: "#FFFCF8" };
const size = 1024;
const cx = 512;
const cy = 553;
const w = 634;
const sw = 85;
const endX = cx + w / 2;
const endY = cy - w * 0.22 * 0.65;

function arcPath(a, b, width) {
  const x0 = a - width / 2;
  const x1 = a + width / 2;
  const y0 = b + width * 0.22 * 0.35;
  const y1 = b - width * 0.22 * 0.65;
  const cpy = b - width * 0.22 * 1.05;
  return "M " + x0 + " " + y0 + " Q " + a + " " + cpy + " " + x1 + " " + y1;
}

const app =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="' +
  size +
  '" height="' +
  size +
  '" viewBox="0 0 ' +
  size +
  " " +
  size +
  '">' +
  '<rect width="' +
  size +
  '" height="' +
  size +
  '" fill="' +
  C.ink +
  '" rx="' +
  size * 0.16 +
  '"/>' +
  '<path d="' +
  arcPath(cx, cy, w) +
  '" stroke="' +
  C.ivory +
  '" stroke-width="' +
  sw +
  '" stroke-linecap="round" fill="none"/>' +
  '<circle cx="' +
  endX +
  '" cy="' +
  endY +
  '" r="' +
  sw * 0.45 +
  '" fill="' +
  C.brass +
  '"/>' +
  "</svg>";

writeFileSync("../01_logo/app/FH_Logo_AppIcon_1024.svg", app);
await sharp(Buffer.from(app)).png().toFile("../01_logo/app/FH_Logo_AppIcon_1024.png");

const sheet = readFileSync("../02_icons/FH_Icon_Pack_Sheet.svg");
await sharp(sheet).png().toFile("../02_icons/FH_Icon_Pack_Sheet.png");

console.log("done — prefer: node generate.mjs for full Sprint 1 rebuild");
