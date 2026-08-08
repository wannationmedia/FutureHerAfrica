import fs from "fs";
import path from "path";
import { qrSvg } from "./fh-qr.mjs";

export const ROOT = "c:/Projects/FutureHer/launch";

export const DEST = {
  youtube: "https://www.youtube.com/@FutureHerAfrica",
  community: "https://www.youtube.com/@FutureHerAfrica/community",
  playlists: "https://www.youtube.com/@FutureHerAfrica/playlists",
};

const PAGE_CSS = `
  @import url("https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Newsreader:wght@500;600&display=swap");
  :root {
    --ink:#121A21; --stone:#F3EFE8; --ivory:#FFFCF8; --brass:#B8893A;
    --lagoon:#2F6F6A; --mist:#D8D2C8; --text2:#3D4A55; --accent:var(--lagoon);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: A4; margin: 0; }
  body {
    font-family: "Satoshi", system-ui, sans-serif;
    background: #1A232B; color: var(--ink);
    min-height: 100vh; display: grid; place-items: center; padding: 20px; gap: 20px;
  }
  .sheet {
    width: 210mm; min-height: 297mm; background: var(--stone);
    padding: 16mm 15mm; display: flex; flex-direction: column; gap: 12px;
    position: relative; page-break-after: always;
  }
  .sheet.cover {
    background:
      radial-gradient(ellipse at 20% 10%, rgba(47,111,106,.12), transparent 50%),
      linear-gradient(165deg, #F3EFE8 0%, #E8E0D4 55%, #F3EFE8 100%);
    justify-content: space-between; padding: 18mm 16mm;
  }
  .eyebrow {
    font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
    color: var(--accent);
  }
  .pill {
    display: inline-block; background: var(--accent); color: #FFFCF8;
    font-size: 12px; font-weight: 500; letter-spacing: .06em;
    padding: 8px 14px; border-radius: 6px;
  }
  h1 {
    font-family: "Newsreader", "Source Serif 4", Georgia, serif;
    font-weight: 600; font-size: 36px; line-height: 1.12; max-width: 16ch;
  }
  h1.sm { font-size: 28px; max-width: 22ch; }
  h2 {
    font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
    color: var(--accent); font-weight: 500;
  }
  h3 { font-size: 18px; font-weight: 700; line-height: 1.25; }
  .rule { width: 72px; height: 3px; background: var(--brass); }
  .sub { font-size: 16px; color: var(--text2); line-height: 1.45; max-width: 36ch; }
  .body { font-size: 14px; color: var(--text2); line-height: 1.5; }
  .logo { font-weight: 700; font-size: 20px; }
  .logo span { color: var(--brass); }
  .horizon {
    width: 120px; height: 24px; border: 2.5px solid var(--brass);
    border-top: none; border-radius: 0 0 120px 120px; opacity: .85;
  }
  .foot {
    margin-top: auto; padding-top: 10px; border-top: 1px solid var(--mist);
    display: flex; justify-content: space-between; font-size: 11px; color: var(--text2);
  }
  .callout {
    background: var(--ivory); border-left: 4px solid var(--brass);
    padding: 12px 14px; font-size: 14px; color: var(--text2); line-height: 1.45;
  }
  .callout.lagoon { border-left-color: var(--lagoon); }
  .box {
    background: var(--ivory); border: 1px solid var(--mist); border-radius: 8px;
    padding: 12px 14px;
  }
  .lines { display: grid; gap: 10px; }
  .line {
    border-bottom: 0.5pt solid var(--mist); min-height: 8mm;
  }
  .checks { display: grid; gap: 8px; }
  .check {
    display: grid; grid-template-columns: 18px 1fr; gap: 10px; align-items: start;
    font-size: 13px; color: var(--text2); line-height: 1.4;
  }
  .check i {
    width: 16px; height: 16px; border: 1.5px solid var(--ink); border-radius: 3px;
    display: block; margin-top: 2px;
  }
  .steps { display: grid; gap: 10px; }
  .step {
    background: var(--ivory); border: 1px solid var(--mist); padding: 12px 14px;
    display: grid; grid-template-columns: 40px 1fr; gap: 10px;
  }
  .num {
    width: 34px; height: 34px; border-radius: 8px; background: var(--ink); color: #FFFCF8;
    display: grid; place-items: center; font-weight: 700; font-size: 13px;
  }
  table { width: 100%; border-collapse: collapse; background: var(--ivory); font-size: 12px; }
  th, td { border: 1px solid var(--mist); padding: 9px 8px; text-align: left; }
  th { background: var(--ink); color: #FFFCF8; font-weight: 500; }
  .toc { display: grid; gap: 8px; }
  .toc-row {
    display: flex; justify-content: space-between; gap: 12px;
    border-bottom: 1px dotted var(--mist); padding: 8px 0; font-size: 14px;
  }
  .toc-row span:last-child { color: var(--accent); font-weight: 500; }
  .qr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .qr-card {
    background: var(--ivory); border: 1px solid var(--mist); border-radius: 10px;
    padding: 14px; display: grid; gap: 8px; justify-items: center; text-align: center;
  }
  .qr-card svg { width: 150px; height: 150px; }
  .qr-card b { font-size: 13px; }
  .qr-card p { font-size: 11px; color: var(--text2); word-break: break-all; line-height: 1.35; }
  .script {
    background: var(--ivory); border-top: 3px solid var(--brass);
    padding: 12px 14px; font-size: 13px; color: var(--text2); line-height: 1.45;
  }
  .script b { display: block; color: var(--ink); margin-bottom: 4px; font-size: 14px; }
  .day-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .day {
    background: var(--ivory); border: 1px solid var(--mist); padding: 10px;
    font-size: 12px; color: var(--text2);
  }
  .day b { display: block; color: var(--ink); margin-bottom: 4px; font-size: 13px; }
  ul.bullets { padding-left: 18px; color: var(--text2); font-size: 14px; line-height: 1.55; }
  ul.bullets li { margin-bottom: 4px; }
  .accent-bar { height: 8px; background: var(--accent); border-radius: 0 0 4px 4px; margin: -16mm -15mm 8px; }
  @media print {
    body { background: white; padding: 0; display: block; }
    .sheet { box-shadow: none; margin: 0 auto; }
  }
`;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function foot(p, label) {
  return `<footer class="foot"><span>FutureHer · Ready for what's next.</span><span>${esc(p.name)} · ${esc(label)}</span></footer>`;
}

function wrap(p, title, inner) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" />
<title>${esc(title)}</title>
<style>${PAGE_CSS}</style>
<style>:root { --accent: ${p.accent}; }</style>
</head><body>${inner}</body></html>`;
}

function coverHtml(p) {
  return wrap(
    p,
    `${p.name} — Cover`,
    `<article class="sheet cover">
  <div>
    <div class="horizon" aria-hidden="true"></div>
    <div style="height:18px"></div>
    <div class="pill">${esc(p.series)}</div>
    <div style="height:22px"></div>
    <div class="eyebrow">FutureHer ${esc(p.type)}</div>
    <div style="height:10px"></div>
    <h1>${esc(p.name)}</h1>
    <div style="height:14px"></div>
    <div class="rule"></div>
    <div style="height:14px"></div>
    <p class="sub">${esc(p.subtitle)}</p>
  </div>
  <div>
    <div class="logo">Future<span>Her</span></div>
    <p class="body" style="margin-top:6px">Framework: ${esc(p.framework)} · ${esc(p.skillShort)}</p>
    <p class="body" style="margin-top:4px">${esc(p.epId)} companion · R${p.priceZar}</p>
    <p class="body" style="margin-top:10px;color:var(--accent)">Ready for what's next.</p>
  </div>
</article>`
  );
}

function brandingHtml(p) {
  const promises = p.promise.map((x) => `<li>${esc(x)}</li>`).join("");
  return wrap(
    p,
    `${p.name} — Branding`,
    `<article class="sheet">
  <div class="accent-bar"></div>
  <div class="eyebrow">Who this is for</div>
  <h1 class="sm">${esc(p.name)}</h1>
  <div class="rule"></div>
  <p class="body">${esc(p.whoFor)}</p>
  <div class="callout lagoon"><strong>Promise.</strong> You will leave with:</div>
  <ul class="bullets">${promises}</ul>
  <div class="box">
    <p class="body">${esc(p.brandingClose)}</p>
  </div>
  <p class="body">Paired free download with ${esc(p.epId)}: <strong>${esc(p.freeCompanion)}</strong></p>
  ${foot(p, "Branding")}
</article>`
  );
}

function contentsHtml(p) {
  const rows = p.contents
    .map((c) => `<div class="toc-row"><span>${esc(c.title)}</span><span>${esc(c.page)}</span></div>`)
    .join("");
  return wrap(
    p,
    `${p.name} — Contents`,
    `<article class="sheet">
  <div class="accent-bar"></div>
  <div class="eyebrow">Contents</div>
  <h1 class="sm">What's inside</h1>
  <div class="rule"></div>
  <p class="sub">Work through in order — or jump to the action sheet when you only have fifteen minutes.</p>
  <div class="toc">${rows}</div>
  ${foot(p, "Contents")}
</article>`
  );
}

function contentPageHtml(p, page, idx) {
  let blocks = "";
  if (page.teach) {
    blocks += `<div class="callout">${esc(page.teach)}</div>`;
  }
  if (page.steps?.length) {
    blocks += `<h2>Steps</h2><div class="steps">${page.steps
      .map(
        (s, i) =>
          `<div class="step"><div class="num">${String(i + 1).padStart(2, "0")}</div><div><strong>${esc(s[0])}</strong><p class="body">${esc(s[1])}</p></div></div>`
      )
      .join("")}</div>`;
  }
  if (page.prompts?.length) {
    blocks += `<h2>Write here</h2><div class="lines">${page.prompts
      .map((pr) => `<div><p class="body" style="margin-bottom:4px">${esc(pr)}</p><div class="line"></div><div class="line"></div></div>`)
      .join("")}</div>`;
  }
  if (page.checkboxes?.length) {
    blocks += `<h2>Check when done</h2><div class="checks">${page.checkboxes
      .map((c) => `<div class="check"><i></i><span>${esc(c)}</span></div>`)
      .join("")}</div>`;
  }
  if (page.scripts?.length) {
    blocks += `<h2>Copy blocks</h2>${page.scripts
      .map((s) => `<div class="script"><b>${esc(s.label)}</b>${esc(s.text)}</div>`)
      .join("")}`;
  }
  if (page.table) {
    const th = page.table.headers.map((h) => `<th>${esc(h)}</th>`).join("");
    const rows = Array.from({ length: page.table.rows }, () =>
      `<tr>${page.table.headers.map(() => "<td>&nbsp;</td>").join("")}</tr>`
    ).join("");
    blocks += `<h2>${esc(page.table.title || "Fill this in")}</h2><table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`;
  }
  if (page.days?.length) {
    blocks += `<h2>Days</h2><div class="day-grid">${page.days
      .map((d) => `<div class="day"><b>${esc(d.label)}</b>${esc(d.task)}</div>`)
      .join("")}</div>`;
  }
  if (page.note) {
    blocks += `<p class="body">${esc(page.note)}</p>`;
  }
  return wrap(
    p,
    `${p.name} — ${page.title}`,
    `<article class="sheet">
  <div class="accent-bar"></div>
  <div class="eyebrow">Page ${idx + 4} · ${esc(p.type)}</div>
  <h1 class="sm">${esc(page.title)}</h1>
  <div class="rule"></div>
  ${blocks}
  ${foot(p, page.title)}
</article>`
  );
}

function actionHtml(p) {
  const steps = p.actions
    .map(
      (a, i) => `<div class="step">
      <div class="num">${String(i + 1).padStart(2, "0")}</div>
      <div>
        <strong>${esc(a.action)}</strong>
        <p class="body">${esc(a.detail)} · <em>${esc(a.minutes)}</em></p>
        <div class="check" style="margin-top:8px"><i></i><span>Done</span></div>
      </div>
    </div>`
    )
    .join("");
  return wrap(
    p,
    `${p.name} — Action sheets`,
    `<article class="sheet">
  <div class="accent-bar"></div>
  <div class="eyebrow">Action sheets · max 7</div>
  <h1 class="sm">Do these. Then stop.</h1>
  <div class="rule"></div>
  <p class="sub">Timeboxed actions from ${esc(p.framework)}. Finish what fits today — reopen tomorrow.</p>
  <div class="steps">${steps}</div>
  ${foot(p, "Actions")}
</article>`
  );
}

async function qrHtml(p) {
  const cards = [];
  for (const q of p.qr) {
    const svg = await qrSvg(q.url, { sizePx: 150 });
    cards.push(`<div class="qr-card">
      ${svg}
      <b>${esc(q.label)}</b>
      <p>${esc(q.note)}</p>
      <p>${esc(q.url)}</p>
    </div>`);
  }
  return wrap(
    p,
    `${p.name} — QR codes`,
    `<article class="sheet">
  <div class="accent-bar"></div>
  <div class="eyebrow">Stay connected</div>
  <h1 class="sm">Scan. Practise. Return.</h1>
  <div class="rule"></div>
  <p class="sub">Tested destinations for ${esc(p.epId)}. Open on your phone — no passwords required.</p>
  <div class="qr-grid">${cards.join("")}</div>
  ${foot(p, "QR")}
</article>`
  );
}

function upsellHtml(p) {
  const items = p.upsell.items
    .map((it) => `<li><strong>${esc(it.name)}</strong> — ${esc(it.line)}</li>`)
    .join("");
  return wrap(
    p,
    `${p.name} — Upsell`,
    `<article class="sheet">
  <div class="accent-bar"></div>
  <div class="eyebrow">When you're ready</div>
  <h1 class="sm">${esc(p.upsell.headline)}</h1>
  <div class="rule"></div>
  <ul class="bullets">${items}</ul>
  <div class="callout">${esc(p.upsell.close)}</div>
  <p class="body">No pressure. Readiness compounds.</p>
  ${foot(p, "Next step")}
</article>`
  );
}

function thankYouHtml(p) {
  return wrap(
    p,
    `${p.name} — Thank you`,
    `<article class="sheet cover">
  <div>
    <div class="horizon" aria-hidden="true"></div>
    <div style="height:24px"></div>
    <div class="eyebrow">Thank you</div>
    <div style="height:12px"></div>
    <h1>Thank you for investing in your future self.</h1>
    <div style="height:14px"></div>
    <div class="rule"></div>
    <div style="height:14px"></div>
    <p class="sub">${esc(p.thankYou.body)}</p>
  </div>
  <div>
    <p class="body">${esc(p.thankYou.signoff)}</p>
    <p class="body" style="margin-top:8px">YouTube: ${DEST.youtube}</p>
    <p class="body" style="margin-top:4px">Community: ${DEST.community}</p>
    <p class="body" style="margin-top:14px;color:var(--accent)">You're welcome forward.</p>
    <div class="logo" style="margin-top:10px">Future<span>Her</span></div>
  </div>
</article>`
  );
}

function salesCopy(p) {
  const bullets = p.sales.bullets.map((b) => `• ${b}`).join("\n");
  return `FUTUREHER · SALES COPY · ${p.epId}
Product: ${p.name}
Type: ${p.type}
Price: R${p.priceZar}
Framework: ${p.framework}
Episode: ${p.episodeTitle}

═══════════════════════════════════════
HEADLINE
═══════════════════════════════════════
${p.sales.headline}

═══════════════════════════════════════
SUBHEAD
═══════════════════════════════════════
${p.sales.subhead}

═══════════════════════════════════════
BULLETS
═══════════════════════════════════════
${bullets}

═══════════════════════════════════════
OBJECTION HANDLE
═══════════════════════════════════════
${p.sales.objection}

═══════════════════════════════════════
PRICE LINE
═══════════════════════════════════════
${p.sales.priceLine}

═══════════════════════════════════════
CTA
═══════════════════════════════════════
${p.sales.cta}

═══════════════════════════════════════
SOFT CLOSE
═══════════════════════════════════════
${p.sales.softClose}

═══════════════════════════════════════
SHORT BLURB (description / pinned)
═══════════════════════════════════════
${p.sales.blurb}

═══════════════════════════════════════
PAYMENT NOTE
═══════════════════════════════════════
Price in ZAR. Accept via Paystack / Yoco / PayFast when checkout is live.
Until then: soft-launch fulfilment via Forward Collective + Drive delivery after payment confirmation.
`;
}

function emailSequence(p) {
  return p.emails
    .map(
      (e, i) => `────────────────────────────────────
EMAIL ${i + 1} · DAY ${e.day}
Subject: ${e.subject}
Preview: ${e.preview}

${e.body}

Ready for what's next.
— FutureHer
${DEST.youtube}
`
    )
    .join("\n");
}

function canvaPaste(p) {
  const pages = p.pages
    .map(
      (page, i) => `── PAGE ${i + 4}: ${page.title} ──
Teach: ${page.teach || "—"}
${(page.prompts || []).map((x, n) => `Prompt ${n + 1}: ${x}`).join("\n")}
${(page.checkboxes || []).map((x) => `☐ ${x}`).join("\n")}
${(page.scripts || []).map((s) => `[${s.label}] ${s.text}`).join("\n")}
`
    )
    .join("\n");

  return `FUTUREHER · CANVA PASTE · ${p.epId}
Master: FH_PRODUCT_MASTER → duplicate as FH_PROD_${p.epId}_${p.slug}_v1
Size: A4 · Accent: ${p.accent} · Type: ${p.type}

── PAGE 1: COVER ──
Series pill: ${p.series}
Eyebrow: FutureHer ${p.type}
Title: ${p.name}
Subtitle: ${p.subtitle}
Footer line: ${p.framework} · ${p.skillShort}
Price mark: R${p.priceZar}
Tagline: Ready for what's next.

── PAGE 2: BRANDING ──
Who: ${p.whoFor}
Promise:
${p.promise.map((x) => `• ${x}`).join("\n")}
Close: ${p.brandingClose}

── PAGE 3: CONTENTS ──
${p.contents.map((c) => `${c.page}  ${c.title}`).join("\n")}

${pages}
── ACTION SHEETS ──
${p.actions.map((a, i) => `${i + 1}. ${a.action} (${a.minutes}) — ${a.detail}`).join("\n")}

── QR DESTINATIONS ──
${p.qr.map((q) => `${q.label}: ${q.url}`).join("\n")}

── UPSELL ──
${p.upsell.headline}
${p.upsell.items.map((it) => `• ${it.name} — ${it.line}`).join("\n")}
${p.upsell.close}

── THANK YOU ──
${p.thankYou.body}
${p.thankYou.signoff}
`;
}

function indexTxt(p, files) {
  return `FUTUREHER · ${p.epId} · DIGITAL PRODUCT PACK
Name: ${p.name}
Type: ${p.type}
Slug: ${p.slug}
Price: R${p.priceZar}
Framework: ${p.framework}
Canva master: FH_PRODUCT_MASTER → FH_PROD_${p.epId}_${p.slug}_v1

FILES
${files.map((f, i) => `${String(i + 1).padStart(2, "0")}  ${f}`).join("\n")}

ASSEMBLY
1. Open HTML pages in Chrome → Print → Save as PDF (A4) for proof
2. Duplicate Canva FH_PRODUCT_MASTER
3. Paste from CANVA_PASTE.txt
4. Rebuild QR in Canva from URLs on the QR HTML page
5. Export FH_Product_${p.type.replace(/\s+/g, "")}_${p.slug}_v1.pdf
6. Soft-launch with SALES_COPY.txt + EMAIL_SEQUENCE.txt

QC
[ ] No placeholders
[ ] SA examples present
[ ] QR tested
[ ] Actions ≤ 7
[ ] Soft upsell only
`;
}

export async function writeProduct(p) {
  const dir = path.join(ROOT, p.epId, "PRODUCT");
  const pagesDir = path.join(dir, "pages");
  fs.mkdirSync(pagesDir, { recursive: true });

  const written = [];
  const write = (rel, content) => {
    const full = path.join(dir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content, "utf8");
    written.push(rel.replace(/\\/g, "/"));
  };

  write("pages/01_COVER.html", coverHtml(p));
  write("pages/02_BRANDING.html", brandingHtml(p));
  write("pages/03_CONTENTS.html", contentsHtml(p));
  p.pages.forEach((page, i) => {
    const n = String(i + 4).padStart(2, "0");
    const slug = page.title
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, 40);
    write(`pages/${n}_${slug}.html`, contentPageHtml(p, page, i));
  });
  const actionN = String(4 + p.pages.length).padStart(2, "0");
  const qrN = String(5 + p.pages.length).padStart(2, "0");
  const upN = String(6 + p.pages.length).padStart(2, "0");
  const tyN = String(7 + p.pages.length).padStart(2, "0");
  write(`pages/${actionN}_ACTION_SHEETS.html`, actionHtml(p));
  write(`pages/${qrN}_QR.html`, await qrHtml(p));
  write(`pages/${upN}_UPSELL.html`, upsellHtml(p));
  write(`pages/${tyN}_THANK_YOU.html`, thankYouHtml(p));

  write("SALES_COPY.txt", salesCopy(p));
  write("EMAIL_SEQUENCE.txt", `FUTUREHER · EMAIL SEQUENCE · ${p.epId}\nProduct: ${p.name}\n\n` + emailSequence(p));
  write("CANVA_PASTE.txt", canvaPaste(p));
  write("PRODUCT_BRIEF.txt", `Working title: ${p.name}
Type: ${p.type}
Pillar / accent: ${p.pillar} / ${p.accent}
Outcome: ${p.subtitle}
Source episode: ${p.epId} — ${p.episodeTitle}
Framework: ${p.framework}
Price (ZAR): R${p.priceZar}
Soft launch: Forward Collective + YouTube Community
Free companion: ${p.freeCompanion}
`);

  const files = written.slice();
  write("00_INDEX.txt", indexTxt(p, files.filter((f) => f !== "00_INDEX.txt").concat("00_INDEX.txt")));
  return written;
}
