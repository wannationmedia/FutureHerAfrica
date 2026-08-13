import fs from "fs";
import path from "path";

export const ROOT = "c:/Projects/FutureHer/launch";

const THUMB_CSS = `
  @import url("https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap");
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { min-height: 100vh; display: grid; place-items: center; background: #0B1014; font-family: "Satoshi", system-ui, sans-serif; }
  .frame { width: 1280px; height: 720px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; background: #121A21; }
  .visual { position: relative; background: radial-gradient(ellipse at 30% 20%, #2C3740 0%, transparent 55%), linear-gradient(180deg, #121A21 0%, #0B1014 100%); }
  .visual::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 60%, #F3EFE8 100%), linear-gradient(180deg, transparent 70%, rgba(11,16,20,.45) 100%); }
  .horizon { position: absolute; left: 48px; bottom: 72px; width: 180px; height: 36px; border: 3px solid #B8893A; border-top: none; border-radius: 0 0 180px 180px; opacity: .85; z-index: 2; }
  .monogram { position: absolute; top: 36px; left: 36px; width: 56px; height: 56px; border-radius: 14px; background: #1A232B; border: 1px solid #2C3740; color: #C9A05A; display: grid; place-items: center; font-weight: 700; font-size: 18px; z-index: 3; }
  .panel { background: linear-gradient(135deg, #F3EFE8 0%, #E8E0D4 100%); padding: 72px 64px 64px 56px; display: flex; flex-direction: column; justify-content: center; gap: 22px; }
  .pill { align-self: flex-start; background: #2F6F6A; color: #FFFCF8; font-size: 18px; font-weight: 500; letter-spacing: .04em; padding: 10px 18px; border-radius: 6px; }
  h1 { color: #121A21; font-size: 58px; line-height: 1.05; font-weight: 700; max-width: 11ch; }
  .rule { width: 96px; height: 3px; background: #B8893A; }
  .support { color: #3D4A55; font-size: 22px; font-weight: 500; letter-spacing: .06em; }
  .hint { margin-top: 24px; color: #8A929A; font: 500 14px/1.4 "Satoshi", system-ui, sans-serif; text-align: center; }
`;

const ACTION_CSS = `
  @import url("https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap");
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { min-height: 100vh; display: grid; place-items: center; background: #0B1014; font-family: "Satoshi", system-ui, sans-serif; }
  .card { width: 1280px; height: 720px; background: linear-gradient(135deg, #F3EFE8 0%, #E8E0D4 100%); padding: 80px 96px; display: flex; flex-direction: column; justify-content: center; gap: 28px; position: relative; }
  .eyebrow { color: #2F6F6A; font-size: 22px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; }
  h1 { color: #121A21; font-size: 52px; line-height: 1.1; font-weight: 700; max-width: 20ch; }
  .rule { width: 88px; height: 3px; background: #B8893A; }
  ol { color: #3D4A55; font-size: 26px; font-weight: 500; line-height: 1.45; padding-left: 36px; max-width: 30ch; }
  .brand { position: absolute; right: 64px; bottom: 48px; color: #6B7380; font-size: 20px; font-weight: 500; }
`;

const WORKSHEET_CSS = `
  @import url("https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap");
  :root { --ink:#121A21; --stone:#F3EFE8; --brass:#B8893A; --lagoon:#2F6F6A; --mist:#D8D2C8; --text2:#3D4A55; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: A4; margin: 0; }
  body { font-family: "Satoshi", system-ui, sans-serif; background: #1A232B; color: var(--ink); min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  .sheet { width: 210mm; min-height: 297mm; background: var(--stone); padding: 18mm 16mm; display: flex; flex-direction: column; gap: 14px; }
  header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--ink); padding-bottom: 12px; }
  .logo { font-weight: 700; font-size: 22px; } .logo span { color: var(--brass); }
  .meta { color: var(--lagoon); font-size: 12px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
  h1 { font-size: 28px; line-height: 1.15; margin-top: 4px; }
  .idea { background: #FFFCF8; border-left: 4px solid var(--brass); padding: 12px 14px; font-size: 15px; color: var(--text2); }
  h2 { font-size: 14px; letter-spacing: .08em; text-transform: uppercase; color: var(--lagoon); margin-top: 6px; }
  .steps { display: grid; gap: 10px; }
  .step { background: #FFFCF8; border: 1px solid var(--mist); padding: 12px 14px; display: grid; grid-template-columns: 42px 1fr; gap: 10px; }
  .num { width: 36px; height: 36px; border-radius: 8px; background: var(--ink); color: #FFFCF8; display: grid; place-items: center; font-weight: 700; font-size: 14px; }
  .step strong { display: block; font-size: 16px; margin-bottom: 4px; }
  .step p { font-size: 13px; color: var(--text2); line-height: 1.4; }
  table { width: 100%; border-collapse: collapse; background: #FFFCF8; font-size: 13px; }
  th, td { border: 1px solid var(--mist); padding: 10px 8px; text-align: left; }
  th { background: var(--ink); color: #FFFCF8; font-weight: 500; }
  .labels { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .label { background: #FFFCF8; border-top: 3px solid var(--brass); padding: 10px; font-size: 12px; color: var(--text2); }
  .label b { display: block; color: var(--ink); font-size: 14px; margin-bottom: 4px; }
  footer { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--mist); display: flex; justify-content: space-between; font-size: 11px; color: var(--text2); }
  @media print { body { background: white; padding: 0; } }
`;

export function splitLines(text) {
  const chunks = [];
  for (const para of text.trim().split("\n")) {
    const p0 = para.trim();
    if (!p0) continue;
    const parts = [];
    let buf = "";
    for (const ch of p0) {
      buf += ch;
      if (".?!:".includes(ch) && buf.length > 28) {
        parts.push(buf.trim());
        buf = "";
      }
    }
    if (buf.trim()) parts.push(buf.trim());
    for (const p of parts) {
      if (p.length <= 70) chunks.push(p);
      else {
        let line = "";
        for (const word of p.split(/\s+/)) {
          const trial = (line + " " + word).trim();
          if (trial.length > 62 && line) {
            chunks.push(line);
            line = word;
          } else line = trial;
        }
        if (line) chunks.push(line);
      }
    }
  }
  return chunks;
}

function ts(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  let ms = Math.round((sec - Math.floor(sec)) * 1000);
  if (ms >= 1000) ms = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

export function srtFromSections(sections) {
  const cues = [];
  let idx = 1;
  for (const [start, end, lines] of sections) {
    if (!lines.length) continue;
    const span = (end - start) / lines.length;
    lines.forEach((line, i) => {
      const a = start + i * span;
      let b = start + (i + 1) * span - 0.05;
      if (b <= a) b = a + 0.8;
      cues.push([idx++, a, b, line]);
    });
  }
  return cues.map(([i, a, b, line]) => `${i}\n${ts(a)} --> ${ts(b)}\n${line}\n`).join("\n");
}

export function worksheetHtml(ep) {
  const { worksheet } = ep;
  const steps = worksheet.steps
    .map((s, i) => `<div class="step"><div class="num">${String(i + 1).padStart(2, "0")}</div><div><strong>${s[0]}</strong><p>${s[1]}</p></div></div>`)
    .join("");
  const labels = worksheet.labels.map(([n, d]) => `<div class="label"><b>${n}</b>${d}</div>`).join("");
  const th = worksheet.tableHeaders.map((h) => `<th>${h}</th>`).join("");
  const rows = Array.from({ length: worksheet.tableRows }, () => `<tr>${worksheet.tableHeaders.map(() => "<td>&nbsp;</td>").join("")}</tr>`).join("");
  const rh = worksheet.runHeaders.map((h) => `<th>${h}</th>`).join("");
  const rd = worksheet.runHeaders.map(() => `<td style="height:64px"></td>`).join("");
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><title>${ep.framework} — One-Pager</title><style>${WORKSHEET_CSS}</style></head>
<body><article class="sheet">
<header><div><div class="logo">Future<span>Her</span></div><h1>${ep.framework}</h1></div>
<div class="meta">${ep.id} · ${ep.pillar} · Worksheet</div></header>
<p class="idea"><strong>Idea:</strong> ${ep.idea}</p>
<h2>Three steps</h2><div class="steps">${steps}</div>
<h2>Labels</h2><div class="labels">${labels}</div>
<h2>Fill this in</h2>
<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>
<h2>The one I will run today</h2>
<table><thead><tr>${rh}</tr></thead><tbody><tr>${rd}</tr></tbody></table>
<footer><span>futureher · Ready for what's next.</span><span>Print · fill · keep. Free with ${ep.id}.</span></footer>
</article></body></html>`;
}

function thumbHtml(ep) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><title>FH ${ep.id} Thumbnail 1280×720</title><style>${THUMB_CSS}</style></head>
<body><div><div class="frame" id="thumb"><div class="visual"><div class="monogram">FH</div><div class="horizon" aria-hidden="true"></div></div>
<div class="panel"><div class="pill">${ep.series}</div><h1>${ep.thumbText}</h1><div class="rule"></div><div class="support">${ep.thumbSupport}</div></div></div>
<p class="hint">Open at 100% zoom → screenshot the 1280×720 frame · or replace left panel with face photo</p></div></body></html>`;
}

function actionHtml(ep) {
  const items = ep.actionSteps.map((s) => `<li>${s}</li>`).join("\n");
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><title>FH ${ep.id} Action Card</title><style>${ACTION_CSS}</style></head>
<body><div class="card"><div class="eyebrow">Action today · under 30 min</div>
<h1>${ep.actionOverlay}</h1><div class="rule"></div><ol>${items}</ol>
<div class="brand">FutureHer — Ready for what's next.</div></div></body></html>`;
}

function projectJson(ep) {
  return JSON.stringify(
    {
      project: ep.projectName,
      template: ep.templateId,
      canvas: { width: 1920, height: 1080, fps: 30 },
      duration_target_sec: 505,
      grade: "FH_Grade_Horizon",
      accent: ep.accent,
      export: { filename: `${ep.projectName}_v1.mp4`, resolution: "1080p", codec: "H.264" },
      markers: [
        { id: "S1", timecode: "00:00:07:00", label: "Hook" },
        { id: "S2", timecode: "00:02:07:00", label: "Problem" },
        { id: "S3", timecode: "00:04:07:00", label: "Skill" },
        { id: "S4", timecode: "00:06:07:00", label: "Psychology" },
        { id: "S5", timecode: "00:07:07:00", label: "Action" },
      ],
      timeline: [
        { id: "INTRO", in: "00:00:00:00", out: "00:00:07:00", type: "compound", asset: "FH_TMPL_Intro_7s", text: [ep.series] },
        { id: "HOOK", in: "00:00:07:00", out: "00:00:37:00", type: "a_roll_b_roll", assets: ["BR01", "A_ROLL_HOOK"], overlays: [ep.hookOverlay] },
        { id: "STORY", in: "00:00:37:00", out: "00:02:07:00", type: "a_roll_b_roll", assets: ["BR03", "BR04", "BR05", "A_ROLL_STORY"], overlays: ep.storyOverlays },
        { id: "PROBLEM", in: "00:02:07:00", out: "00:04:07:00", type: "a_roll_graphics", assets: ["BR06", "AI01_optional", "A_ROLL_PROBLEM"], overlays: ep.problemOverlays },
        { id: "SKILL", in: "00:04:07:00", out: "00:06:07:00", type: "title_screen_demo", assets: ["AI02_diagram", "SR01_screen", "BR07", "A_ROLL_SKILL"], overlays: ep.skillOverlays },
        { id: "PSYCHOLOGY", in: "00:06:07:00", out: "00:07:07:00", type: "a_roll", assets: ["A_ROLL_PSYCH"], overlays: [ep.psychOverlay] },
        { id: "ACTION", in: "00:07:07:00", out: "00:07:47:00", type: "action_card", assets: ["AC01_action_card", "A_ROLL_ACTION"], overlays: [ep.actionOverlay], music_dip: true },
        { id: "CTA", in: "00:07:47:00", out: "00:08:07:00", type: "outro_slots", asset: "FH_TMPL_Outro_30s", text: { idea: ep.idea, skill: ep.skillLine, action: ep.actionLine, cta: ep.cta } },
        { id: "PREVIEW_END", in: "00:08:07:00", out: "00:08:25:00", type: "preview_end", overlays: [ep.previewOverlay], end_card: "FutureHer — Ready for what's next." },
      ],
      audio: {
        vo: `audio/${ep.id}_VO_v1.wav`,
        bed: ep.pillar === "Money" ? "Bed_B_money_warm" : "Bed_A_calm_ambient",
        bed_level_db: -26,
        action_card_bed_db: -32,
      },
      shorts_source_ranges: {
        S1: ["00:00:07:00", "00:00:35:00"],
        S2: ["00:02:07:00", "00:02:52:00"],
        S3: ["00:04:07:00", "00:05:12:00"],
        S4: ["00:06:07:00", "00:06:55:00"],
        S5: ["00:07:07:00", "00:07:42:00"],
      },
    },
    null,
    2
  );
}

function shortFile(s, ep) {
  return `SHORT ${s.code} · ${s.title}
Source: ${ep.id} · ${s.cut} · ~30s · 9:16
Publish: ${s.publish}
Role: ${s.role}

TITLE
${s.title}

────────────────────────────────────
0–3s · HOOK
ON-SCREEN: ${s.hookOs}
VO: ${s.hookVo}

3–10s · REFRAME
ON-SCREEN: ${s.reframeOs}
VO: ${s.reframeVo}

10–22s · VALUE
ON-SCREEN: ${s.valueOs}
VO: ${s.valueVo}

22–30s · ACTION
ON-SCREEN: ${s.actionOs}
VO: ${s.actionVo}

SIGN-OFF
ON-SCREEN / VO: One step today. A different future tomorrow.
CTA CARD (2s): Full lesson on FutureHer
────────────────────────────────────

DESCRIPTION
${s.title}. One step today. A different future tomorrow.
Full lesson on FutureHer.
${ep.hashtagsShort}

CAPCUT
Crop 9:16 · eyes upper third · burned captions · large type
Subtle zoom on hook + action line
Brand arc BR 12–18% · series pill: ${ep.series}
End CTA compound · palette only · premium transitions
`;
}

function w(file, content, written) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content.replace(/\r\n/g, "\n"), "utf8");
  written.push(file);
}

export function writeEpisode(ep) {
  const written = [];
  const base = path.join(ROOT, ep.id);
  const pub = path.join(base, "PUBLISH");
  const cap = path.join(pub, "06_CAPCUT_PROJECT");
  const shortsDir = path.join(pub, "15_SHORTS");

  const srtSections = [
    [7.0, 37.0, splitLines(ep.hook)],
    [37.0, 127.0, splitLines(ep.story)],
    [127.0, 247.0, splitLines(ep.problem)],
    [247.0, 367.0, splitLines(ep.skill)],
    [367.0, 427.0, splitLines(ep.psychology)],
    [427.0, 467.0, splitLines(ep.action)],
    [467.0, 487.0, splitLines(ep.community)],
    [487.0, 505.0, splitLines(ep.preview)],
  ];

  const shortFilesList = ep.shorts.map((s) => `      ${s.file}`).join("\n");

  w(
    path.join(pub, "00_INDEX.txt"),
    `FUTUREHER · ${ep.id} · PUBLISH PACK
Title: ${ep.title}
Slug: ${ep.slug}
Series: ${ep.series} · ${ep.topic} · ${ep.framework}

01  01_FINAL_SCRIPT.txt
02  02_VOICEOVER_SCRIPT.txt
03  03_STORYBOARD.txt
04  04_AI_IMAGE_PROMPTS.txt
05  05_BROLL_LIST.txt
06  06_CAPCUT_PROJECT/
      EDIT_BIBLE.txt
      PROJECT.json
      TEXT_OVERLAYS.txt
07  07_SUBTITLES_EN.srt
08  08_THUMBNAIL.png   ← export from ../thumbnail.html at 1280×720
09  09_DESCRIPTION.txt
10  10_CHAPTERS.txt
11  11_SEO.txt
12  12_HASHTAGS.txt
13  13_COMMUNITY_POST.txt
14  14_PINNED_COMMENT.txt
15  15_SHORTS/
      SHORTS_MASTER.txt
${shortFilesList}

EXPORT TARGET
${ep.projectName}_v1.mp4
`,
    written
  );

  w(
    path.join(pub, "01_FINAL_SCRIPT.txt"),
    `FUTUREHER · ${ep.id} · FINAL SCRIPT
Title: ${ep.title}
Series: ${ep.series} | Topic: ${ep.topic} | Framework: ${ep.framework}
Template: ${ep.template} | Target: 8:00 | Grade: FH_Grade_Horizon
Slug: ${ep.slug}

IDEA: ${ep.idea}
SKILL: ${ep.skillLine}
ACTION: ${ep.actionLine}
CTA: ${ep.cta}
PRODUCT: ${ep.product}
DOWNLOAD: ${ep.download}

═══════════════════════════════════════
COLD OPEN / INTRO (0:00–0:07)
═══════════════════════════════════════
VISUAL: FH_TMPL_Intro_7s + series pill ${ep.series}
VO: (none — bed only)

═══════════════════════════════════════
HOOK (0:07–0:37) [S1]
═══════════════════════════════════════
VISUAL: MCU A-roll or phone B-roll → face on punch
ON-SCREEN: ${ep.hookOverlay}

${ep.hook}

═══════════════════════════════════════
EVERYDAY SA STORY (0:37–2:07)
═══════════════════════════════════════
VISUAL: Soft SA daylight · phone · desk · notebook
CAPTIONS: ${ep.storyOverlays.join(" · ")}

${ep.story}

═══════════════════════════════════════
THE PROBLEM (2:07–4:07) [S2]
═══════════════════════════════════════
VISUAL: Calm B-roll · kinetic type · lower-thirds
ON-SCREEN: ${ep.problemOverlays[0]}

${ep.problem}

═══════════════════════════════════════
THE SKILL (4:07–6:07) [S3]
═══════════════════════════════════════
VISUAL: Title card ${ep.framework} · Pathway 01/02/03 · screen demo
ON-SCREEN: ${ep.skillShort}
DEMO: ${ep.demo}

${ep.skill}

═══════════════════════════════════════
PSYCHOLOGY (6:07–7:07) [S4]
═══════════════════════════════════════
VISUAL: Soft dissolve · minimal · A-roll
ON-SCREEN: ${ep.psychOverlay}

${ep.psychology}

═══════════════════════════════════════
ONE ACTION TODAY (7:07–7:47) [S5]
═══════════════════════════════════════
VISUAL: Full-screen ACTION CARD (hold 3s)
ON-SCREEN: ${ep.actionOverlay}

${ep.action}

═══════════════════════════════════════
COMMUNITY (7:47–8:07)
═══════════════════════════════════════
VISUAL: Outro slots Idea / Skill / Action / CTA

${ep.community}

═══════════════════════════════════════
PREVIEW + OUTRO (8:07–8:25)
═══════════════════════════════════════
VISUAL: Preview line → logo settle → end screen tiles

${ep.preview}

OUTRO LOCKED COPY
Idea: ${ep.idea}
Skill: ${ep.skillLine}
Action: ${ep.actionLine}
CTA: ${ep.cta}
END: FutureHer — Ready for what's next.

PRODUCT RECOMMENDATION
${ep.productBlurb}

PINNED QUESTION
${ep.pinned}
`,
    written
  );

  w(
    path.join(pub, "02_VOICEOVER_SCRIPT.txt"),
    `FUTUREHER · ${ep.id} · VOICE-OVER SCRIPT
Read calm. No hype. Pause where marked /
Teleprompter mode · ~8:00 · Template ${ep.template[0]}

---

[HOOK]

${ep.hook}

/

---

[STORY]

${ep.story}

/

---

[PROBLEM]

${ep.problem}

/

---

[SKILL]

${ep.skill}

/

---

[PSYCHOLOGY]

${ep.psychology}

/

---

[ACTION]

${ep.action}

/

---

[COMMUNITY]

${ep.community}

/

---

[PREVIEW]

${ep.preview}

/
`,
    written
  );

  w(
    path.join(pub, "03_STORYBOARD.txt"),
    `FUTUREHER · ${ep.id} · SCENE-BY-SCENE STORYBOARD
Aspect: 16:9 master · 1920×1080 · 30fps · FH_Grade_Horizon

SCENE 00 · INTRO · 0:00–0:07
SHOT: Brand intro compound
FRAME: Stone → Ink wash · brass horizon arc · FutureHer wordmark · pill “${ep.series}”
NOTES: Duplicate FH_TMPL_Intro_7s — do not rebuild.

SCENE 01 · HOOK · 0:07–0:37 [S1]
ON-SCREEN: ${ep.hookOverlay}
B-ROLL: BR01 · BR02
CAPTION STYLE: Satoshi Bold · Ivory on Ink bar · max 2 lines

SCENE 02 · SA STORY · 0:37–2:07
ON-SCREEN KEYWORDS: ${ep.storyOverlays.join(" · ")}
MOOD: Relatable, not anxious montage
B-ROLL: BR03 · BR04 · BR05

SCENE 03 · PROBLEM · 2:07–4:07 [S2]
GRAPHICS: ${ep.problemOverlays.join(" · ")}
FORBIDDEN: Shock faces · red alert UI · glitch · neon
B-ROLL: BR06 · AI01 optional

SCENE 04 · SKILL TITLE · 4:07–4:20
TEXT: ${ep.framework}
SUB: ${ep.skillShort}
HOLD: 2.5–3.5s
ASSET: AI02 framework diagram

SCENE 05–07 · SKILL STEPS · 4:20–6:07
DEMO: ${ep.demo}
ON-SCREEN: ${ep.skillOverlays.join(" · ")}
B-ROLL: BR07 · SR01

SCENE 08 · PSYCHOLOGY · 6:07–7:07 [S4]
ON-SCREEN: ${ep.psychOverlay}
PACE: Slower · fewer cuts · academy calm

SCENE 09 · ACTION · 7:07–7:47 [S5]
TEXT: ${ep.actionOverlay}
HOLD: Card 3s
ASSET: action_card.html → PNG

SCENE 10 · COMMUNITY · 7:47–8:07
Idea: ${ep.idea}
Skill: ${ep.skillLine}
Action: ${ep.actionLine}
CTA: ${ep.cta}

SCENE 11 · PREVIEW + END · 8:07–8:25
TEXT: ${ep.previewOverlay}
END: FutureHer — Ready for what's next.
`,
    written
  );

  w(
    path.join(pub, "04_AI_IMAGE_PROMPTS.txt"),
    `FUTUREHER · ${ep.id} · AI IMAGE PROMPTS
Max 3 stills in edit. Prefer own B-roll + screen record first.
Palette: Ink #121A21 · Stone #F3EFE8 · Brass #B8893A · Lagoon #2F6F6A · Ivory #FFFCF8

GLOBAL NEGATIVE (append to every prompt):
neon, cyberpunk, purple pink gradient, chrome, influencer aesthetic, girlboss pink, glitter, crown, butterfly, Venus symbol, kente costume tourism, crowded collage, watermark text, readable fake UI text, cartoon mascot, drop shadow glow, busy sticker pack, shock face, open mouth panic, poverty stereotype, sexualized imagery, celebrity likeness

────────────────────────────────────
AI01 · PROBLEM BEAT STILL
File: assets/AI01_${ep.id.toLowerCase()}_scene.jpg · 1920×1080
────────────────────────────────────
${ep.ai01}

────────────────────────────────────
AI02 · FRAMEWORK DIAGRAM
File: assets/AI02_${ep.id.toLowerCase()}_diagram.png · 1920×1080
────────────────────────────────────
${ep.ai02}

────────────────────────────────────
AI03 · THUMBNAIL FACE
File: assets/AI03_${ep.id.toLowerCase()}_thumb.jpg · 1280×720
────────────────────────────────────
South African woman mid-20s to mid-30s, calm confident expression, slight knowing smile, natural window light, lens eye contact, soft Stone/Ink grade, plain muted background, head-and-shoulders left third framing for YouTube thumbnail, no beauty filter plastic, no shock mouth, educational mentor presence, 1280x720 composition

────────────────────────────────────
AI04 · OBJECT / METAPHOR STILL
File: assets/AI04_${ep.id.toLowerCase()}_object.jpg · 1280×720
────────────────────────────────────
${ep.ai04}

GENERATION NOTES
- Midjourney / Flux / Ideogram OK
- Generate 4 variants each · pick calmest
- Remove any accidental text in post
- Grade toward Horizon before CapCut import
- License: keep prompts + seed in episode log
`,
    written
  );

  w(
    path.join(pub, "05_BROLL_LIST.txt"),
    `FUTUREHER · ${ep.id} · B-ROLL LIST
Priority: Own phone footage → screen record → CapCut stock (YT-safe) → AI still (max 3)
Folder: launch/${ep.id}/footage/broll/

ID     | SEC | DURATION | SHOT                                              | SOURCE        | USED IN
-------|-----|----------|---------------------------------------------------|---------------|----------------
BR01   | 01  | 6–8s     | ${ep.br01} | Own phone     | Hook
BR02   | 01  | 8–12s    | MCU host / A-roll punch line                      | A-roll        | Hook
BR03   | 02  | 5–7s     | ${ep.br03} | Own phone     | Story
BR04   | 02  | 6–8s     | Desk wide — soft SA daylight                      | Own phone     | Story
BR05   | 02  | 5–6s     | ${ep.br05} | Own phone     | Story
BR06   | 03  | 6–8s     | Calm focused work — no shock face                 | Own / stock   | Problem
BR07   | 05  | 10–15s   | Hands typing / writing — warm daylight            | Own / stock   | Skill
SR01   | 05  | 60–90s   | SCREEN: ${ep.demo} | Screen record | Skill
AC01   | 09  | still    | Action card PNG from action_card.html             | HTML export   | Action
AI01   | 03  | still    | Problem still (optional)                          | AI prompt 01  | Problem
AI02   | 04  | still    | Framework pathway diagram                         | AI prompt 02  | Skill title

SCREEN RECORD BEAT SHEET (SR01)
${ep.screenBeats}

STOCK SEARCH TERMS (CapCut / YT-safe only)
${ep.stockTerms}
AVOID: neon hacker, crying at computer, glam influencer office, poverty tourism, shock faces

MINIMUM SHOOT (20 min)
1. BR01  2. BR03  3. BR04  4. SR01  5. A-roll hook + psychology
`,
    written
  );

  w(
    path.join(cap, "EDIT_BIBLE.txt"),
    `FUTUREHER · ${ep.id} · CAPCUT PROJECT
Project name: ${ep.projectName}
Duplicate from: ${ep.templateId}
Canvas: 1920×1080 · 30fps · ~8:25
Grade: FH_Grade_Horizon · Accent: ${ep.accent}
Export: ${ep.projectName}_v1.mp4 (1080p H.264)

SETUP
1. Duplicate template — never edit master
2. Rename ${ep.projectName}
3. Import launch/${ep.id}/footage/ + thumbnail + action card PNG
4. Place VO on A1 · denoise · normalize
5. Auto captions → FH caption style → fix SA place names
6. Follow PROJECT.json slot order
7. Markers: S1@0:07 · S2@2:07 · S3@4:07 · S4@6:07 · S5@7:07
8. Export master → crop 9:16 for Shorts

TRACK MAP
V1 A-roll · V2 B-roll/AI · V3 screen/graphics · V4 intro/outro
A1 VO · A2 bed 12–18% · A3 soft ticks on steps

LOCKED TEXT (outro)
Idea: ${ep.idea}
Skill: ${ep.skillLine}
Action: ${ep.actionLine}
CTA: ${ep.cta}

QC BEFORE EXPORT
[ ] Intro ≤ 8s to value
[ ] Framework title holds ≥ 2.5s
[ ] Screen demo readable on phone
[ ] Action card holds 3s
[ ] Idea/Skill/Action filled
[ ] S1–S5 markers present
[ ] No shock faces / neon / false promises
`,
    written
  );

  w(path.join(cap, "PROJECT.json"), projectJson(ep), written);

  w(
    path.join(cap, "TEXT_OVERLAYS.txt"),
    `FUTUREHER · ${ep.id} · CAPCUT TEXT OVERLAYS
Paste into CapCut text slots. Style: Satoshi Bold/Medium.

HOOK
${ep.hookOverlay}

PROBLEM
${ep.problemOverlays.join("\n")}

SKILL
${ep.framework}
${ep.skillOverlays.join("\n")}

PSYCHOLOGY
${ep.psychOverlay}

ACTION CARD
${ep.actionOverlay}
${ep.actionSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

OUTRO
Idea: ${ep.idea}
Skill: ${ep.skillLine}
Action: ${ep.actionLine}
CTA: ${ep.cta}

PREVIEW
${ep.previewOverlay}

END
FutureHer — Ready for what's next.
`,
    written
  );

  w(path.join(pub, "07_SUBTITLES_EN.srt"), srtFromSections(srtSections), written);

  w(
    path.join(pub, "09_DESCRIPTION.txt"),
    `${ep.descOpen}

In this FutureHer lesson you'll get:
• One idea: ${ep.idea}
• One skill: ${ep.skillLine}
• One action today: ${ep.actionLine}

Free download — ${ep.download}: [CHALLENGE LINK]
Digital product — ${ep.product}: [LINK]
${ep.productBlurb}

Join The Forward Collective: [WHATSAPP / COMMUNITY LINK]
Forward Notes (newsletter): [NEWSLETTER LINK]
${ep.ctaExtra}

CHAPTERS
${ep.chapters}

${ep.toolsBlock}

Some links may be affiliate links. If you buy through them, FutureHer may earn a commission at no extra cost to you. I only recommend tools I'd teach anyway.

FutureHer — Ready for what's next.

${ep.hashtagsLong}
`,
    written
  );

  w(path.join(pub, "10_CHAPTERS.txt"), ep.chapters + "\n", written);

  w(
    path.join(pub, "11_SEO.txt"),
    `FUTUREHER · ${ep.id} · SEO PACK

PRIMARY TITLE
${ep.title}

ALT TITLES (A/B)
1. ${ep.alts[0]}
2. ${ep.alts[1]}
3. ${ep.alts[2]}

THUMBNAIL TEXT (on image — not title)
${ep.thumbText}
Series pill: ${ep.series}
Support: ${ep.thumbSupport}
File: PUBLISH/08_THUMBNAIL.png

SLUG
${ep.slug}

PRIMARY KEYWORD
${ep.primaryKw}

SECONDARY KEYWORDS
${ep.secondaryKw.join("\n")}

TAGS (YouTube — paste)
${ep.tags}

PLAYLIST
${ep.series}

CATEGORY
Education

LANGUAGE
English (South Africa)

CAPTIONS
Upload PUBLISH/07_SUBTITLES_EN.srt
Later: ${ep.langLater}

SEARCH INTENT
${ep.intent}

CLICK TEST
${ep.clickTest}

END SCREEN (last 20s)
Subscribe · next episode teaser / playlist · Forward Collective link

CARDS
0:45 Subscribe reminder
7:40 Community link

HANDLE
@FutureHerAfrica
`,
    written
  );

  w(
    path.join(pub, "12_HASHTAGS.txt"),
    `FUTUREHER · ${ep.id} · HASHTAGS

LONG-FORM (description end)
${ep.hashtagsLong}

SHORTS (1–2 max each)
S1: ${ep.hashtagsShort}
S2: ${ep.hashtagsShort}
S3: ${ep.hashtagsShort}
S4: ${ep.hashtagsShort}
S5: ${ep.hashtagsShort}

REELS / IG / TIKTOK
${ep.hashtagsShort}

LINKEDIN (optional — sparingly)
${ep.hashtagsLi}

DO NOT USE
#GirlBoss #Hustle #Grind #Manifest #PassiveIncome #Crypto
Tag stuffing / 30-hashtag blocks
`,
    written
  );

  w(
    path.join(pub, "13_COMMUNITY_POST.txt"),
    `FUTUREHER · ${ep.id} · COMMUNITY POSTS
Publish day of long-form (or +1h after public).

═══════════════════════════════════════
YOUTUBE COMMUNITY TAB
═══════════════════════════════════════
${ep.ytCommunity}

Watch: [VIDEO LINK]
Join The Forward Collective: [LINK]

═══════════════════════════════════════
WHATSAPP / FORWARD COLLECTIVE
═══════════════════════════════════════
${ep.waCommunity}

Watch: [VIDEO LINK]

Welcome forward.

═══════════════════════════════════════
INSTAGRAM / FACEBOOK (caption for S1 Reel)
═══════════════════════════════════════
${ep.igCommunity}

Full lesson on YouTube — FutureHer.
Link in bio.
${ep.hashtagsShort}

═══════════════════════════════════════
LINKEDIN
═══════════════════════════════════════
${ep.liCommunity}

Watch: [VIDEO LINK]
`,
    written
  );

  w(
    path.join(pub, "14_PINNED_COMMENT.txt"),
    `${ep.pinned}

Drop it below. I'll reply.
Join The Forward Collective here → [LINK]
Free worksheet — ${ep.download}: [LINK]
If you want the deeper pack — ${ep.product}: [LINK]
`,
    written
  );

  const rows = ep.shorts
    .map((s) => `${s.code} | ${s.file.padEnd(34)} | ${s.title.padEnd(42)} | ${s.cut.padEnd(12)} | ${s.publish}`)
    .join("\n");
  const exports = ep.shorts.map((s) => s.export).join("\n");

  w(
    path.join(shortsDir, "SHORTS_MASTER.txt"),
    `FUTUREHER · ${ep.id} · FIVE SHORTS MASTER
Aspect: 9:16 · Captions burned in · Brand arc BR 12–18% · Series pill top
Engine: operations/SHORTS/SHORTS_ENGINE.md
Formula: HOOK 0–3 · REFRAME 3–10 · VALUE 10–22 · ACTION 22–30
Sign-off (locked): One step today. A different future tomorrow.

#  | FILE                              | TITLE                                    | CUT        | PUBLISH
---|-----------------------------------|------------------------------------------|------------|----------------
${rows}

EXPORT NAMES
${exports}

QC
Every Short: formula beats · sister voice · one idea · one today-action · official sign-off · full-lesson CTA · phone caption check
`,
    written
  );

  for (const s of ep.shorts) {
    w(path.join(shortsDir, s.file), shortFile(s, ep), written);
  }

  // Root helpers
  w(path.join(base, "SCRIPT_VO.txt"), fs.readFileSync(path.join(pub, "02_VOICEOVER_SCRIPT.txt"), "utf8"), written);

  w(
    path.join(base, "CAPCUT_EDIT_SHEET.txt"),
    `FUTUREHER · ${ep.id} · CAPCUT EDIT SHEET
Template: ${ep.template} | Grade: FH_Grade_Horizon | Aspect: 16:9 master

COLOURS
Ink #121A21 | Stone #F3EFE8 | Brass #B8893A | Lagoon #2F6F6A | Ivory #FFFCF8

INTRO (6–8s)
Horizon arc + FutureHer wordmark + series pill "${ep.series}"

TIMELINE
00:00–00:30  HOOK [S1] — ${ep.hookOverlay}
00:30–02:00  STORY — ${ep.storyOverlays.join(" · ")}
02:00–04:00  PROBLEM [S2] — ${ep.problemOverlays.join(" · ")}
04:00–06:00  SKILL [S3] — ${ep.framework} · ${ep.skillShort}
             Screen: ${ep.demo}
06:00–07:00  PSYCHOLOGY [S4] — ${ep.psychOverlay}
07:00–07:40  ACTION [S5] — ${ep.actionOverlay} (hold 3s)
07:40–07:55  CTA — ${ep.cta}
07:55–08:05  PREVIEW — ${ep.previewOverlay}

Follow PUBLISH/06_CAPCUT_PROJECT/EDIT_BIBLE.txt and PROJECT.json.
`,
    written
  );

  w(
    path.join(base, "RUN_SHEET_24H.txt"),
    `FUTUREHER · 24-HOUR LAUNCH RUN SHEET
Episode: ${ep.id} — ${ep.title}

HOUR 0–1 · SETUP
[ ] CapCut + ${ep.templateId}
[ ] Quiet room + mic/phone for VO

HOUR 1–2 · RECORD VO
[ ] Open launch/${ep.id}/SCRIPT_VO.txt
[ ] Export → launch/${ep.id}/audio/${ep.id}_VO_v1.wav

HOUR 2–4 · VISUALS
[ ] thumbnail.html → PUBLISH/08_THUMBNAIL.png (1280×720)
[ ] Screen demo: ${ep.demo}
[ ] B-roll from 05_BROLL_LIST.txt
[ ] action_card.html → PNG

HOUR 4–7 · EDIT
[ ] CapCut per CAPCUT_EDIT_SHEET + PUBLISH/06_CAPCUT_PROJECT
[ ] Export ${ep.projectName}_v1.mp4

HOUR 7–8 · QC
[ ] Audio · captions · thumbnail · UPLOAD_PACK · no shock/neon/false promises

HOUR 8–9 · UPLOAD
[ ] UPLOAD_PACK fields · 07_SUBTITLES_EN.srt · pin comment · community post · schedule Shorts

HOUR 9–24 · DISTRIBUTE
[ ] WhatsApp · IG/FB S1 · LinkedIn · free worksheet ${ep.download} · soft ${ep.product}
`,
    written
  );

  w(
    path.join(base, "UPLOAD_PACK.txt"),
    `FUTUREHER · ${ep.id} · YOUTUBE UPLOAD PACK
Copy-paste ready. Fill links before publish.

CHANNEL HANDLE: @FutureHerAfrica
TEMPLATE: ${ep.template}
SERIES: ${ep.series}
SLUG: ${ep.slug}

PRIMARY TITLE
${ep.title}

ALT TITLES
1. ${ep.alts[0]}
2. ${ep.alts[1]}
3. ${ep.alts[2]}

THUMBNAIL TEXT (NOT the title)
${ep.thumbText}
Series pill: ${ep.series}
Support: ${ep.thumbSupport}
File: launch/${ep.id}/thumbnail.html → PUBLISH/08_THUMBNAIL.png

DESCRIPTION
(Use PUBLISH/09_DESCRIPTION.txt)

TAGS
${ep.tags}

CATEGORY: Education | Language: English | Captions: EN SRT
Visibility: Public (or Unlisted 1h QC → Public)
Comments: On | Made for kids: No | License: Standard YouTube

PINNED COMMENT
(Use PUBLISH/14_PINNED_COMMENT.txt)

END SCREEN / CARDS
Subscribe + next teaser + Forward Collective
Cards: Subscribe @ 0:45 · Community @ 7:40

CTA
${ep.cta}

DIGITAL PRODUCT
${ep.product}
${ep.productBlurb}

FREE WORKSHEET
${ep.download} (${ep.worksheetFile})

SHORTS TITLES
${ep.shorts.map((s) => `${s.code}: ${s.title}`).join("\n")}
`,
    written
  );

  w(
    path.join(base, "SHORTS_CUTS.txt"),
    `FUTUREHER · ${ep.id} · SHORTS CUT LIST
Source: ${ep.id} long-form | Aspect: 9:16 | Captions burned in
Sign-off (locked): One step today. A different future tomorrow.

${ep.shorts
  .map(
    (s) => `────────────────────────────────────
${s.code} · ${s.cut} · ~30s
Title: ${s.title}
Hook on screen: ${s.hookOs}
Action: ${s.actionOs}
End: One step today. A different future tomorrow.
CTA: Full lesson on FutureHer
`
  )
  .join("\n")}
`,
    written
  );

  w(path.join(base, "thumbnail.html"), thumbHtml(ep), written);
  w(path.join(base, "action_card.html"), actionHtml(ep), written);
  w(path.join(base, ep.worksheetFile), worksheetHtml(ep), written);

  return written;
}
