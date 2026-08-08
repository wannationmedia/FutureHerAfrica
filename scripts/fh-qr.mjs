import QRCode from "qrcode";

/** SVG QR for print / Canva reference. */
export async function qrSvg(text, { sizePx = 220, color = "#121A21", bg = "#FFFCF8" } = {}) {
  return QRCode.toString(text, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    width: sizePx,
    color: { dark: color, light: bg },
  });
}
