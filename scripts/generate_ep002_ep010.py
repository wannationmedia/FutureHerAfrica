# -*- coding: utf-8 -*-
"""Generate FutureHer EP002–EP010 publication packs (no placeholders)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(r"c:\Projects\FutureHer\launch")

# Shared HTML shells ---------------------------------------------------------

THUMB_CSS = """
  @import url("https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap");
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: #0B1014;
    font-family: "Satoshi", "Plus Jakarta Sans", system-ui, sans-serif;
  }
  .frame {
    width: 1280px;
    height: 720px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    background: #121A21;
    position: relative;
  }
  .visual {
    position: relative;
    background:
      radial-gradient(ellipse at 30% 20%, #2C3740 0%, transparent 55%),
      linear-gradient(180deg, #121A21 0%, #0B1014 100%);
  }
  .visual::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent 60%, #F3EFE8 100%),
      linear-gradient(180deg, transparent 70%, rgba(11,16,20,.45) 100%);
  }
  .horizon {
    position: absolute;
    left: 48px;
    bottom: 72px;
    width: 180px;
    height: 36px;
    border: 3px solid #B8893A;
    border-top: none;
    border-radius: 0 0 180px 180px;
    opacity: .85;
    z-index: 2;
  }
  .monogram {
    position: absolute;
    top: 36px;
    left: 36px;
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: #1A232B;
    border: 1px solid #2C3740;
    color: #C9A05A;
    display: grid;
    place-items: center;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: .04em;
    z-index: 3;
  }
  .panel {
    background: linear-gradient(135deg, #F3EFE8 0%, #E8E0D4 100%);
    padding: 72px 64px 64px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 22px;
  }
  .pill {
    align-self: flex-start;
    background: #2F6F6A;
    color: #FFFCF8;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: .04em;
    padding: 10px 18px;
    border-radius: 6px;
  }
  h1 {
    color: #121A21;
    font-size: 58px;
    line-height: 1.05;
    font-weight: 700;
    max-width: 11ch;
  }
  .rule { width: 96px; height: 3px; background: #B8893A; }
  .support {
    color: #3D4A55;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: .06em;
  }
  .hint {
    margin-top: 24px;
    color: #8A929A;
    font: 500 14px/1.4 "Satoshi", system-ui, sans-serif;
    text-align: center;
  }
"""

ACTION_CSS = """
  @import url("https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap");
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: #0B1014;
    font-family: "Satoshi", system-ui, sans-serif;
  }
  .card {
    width: 1280px;
    height: 720px;
    background: linear-gradient(135deg, #F3EFE8 0%, #E8E0D4 100%);
    padding: 80px 96px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 28px;
    position: relative;
  }
  .eyebrow {
    color: #2F6F6A;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  h1 {
    color: #121A21;
    font-size: 52px;
    line-height: 1.1;
    font-weight: 700;
    max-width: 20ch;
  }
  .rule { width: 88px; height: 3px; background: #B8893A; }
  ol {
    color: #3D4A55;
    font-size: 26px;
    font-weight: 500;
    line-height: 1.45;
    padding-left: 36px;
    max-width: 30ch;
  }
  .brand {
    position: absolute;
    right: 64px;
    bottom: 48px;
    color: #6B7380;
    font-size: 20px;
    font-weight: 500;
  }
"""

WORKSHEET_CSS = """
  @import url("https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap");
  :root {
    --ink: #121A21;
    --stone: #F3EFE8;
    --brass: #B8893A;
    --lagoon: #2F6F6A;
    --mist: #D8D2C8;
    --text2: #3D4A55;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: A4; margin: 0; }
  body {
    font-family: "Satoshi", system-ui, sans-serif;
    background: #1A232B;
    color: var(--ink);
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
  }
  .sheet {
    width: 210mm;
    min-height: 297mm;
    background: var(--stone);
    padding: 18mm 16mm;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid var(--ink);
    padding-bottom: 12px;
  }
  .logo { font-weight: 700; font-size: 22px; letter-spacing: .02em; }
  .logo span { color: var(--brass); }
  .meta { color: var(--lagoon); font-size: 12px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
  h1 { font-size: 28px; line-height: 1.15; margin-top: 4px; }
  .idea {
    background: #FFFCF8;
    border-left: 4px solid var(--brass);
    padding: 12px 14px;
    font-size: 15px;
    color: var(--text2);
  }
  h2 { font-size: 14px; letter-spacing: .08em; text-transform: uppercase; color: var(--lagoon); margin-top: 6px; }
  .steps { display: grid; gap: 10px; }
  .step {
    background: #FFFCF8;
    border: 1px solid var(--mist);
    padding: 12px 14px;
    display: grid;
    grid-template-columns: 42px 1fr;
    gap: 10px;
    align-items: start;
  }
  .num {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--ink); color: #FFFCF8;
    display: grid; place-items: center;
    font-weight: 700; font-size: 14px;
  }
  .step strong { display: block; font-size: 16px; margin-bottom: 4px; }
  .step p { font-size: 13px; color: var(--text2); line-height: 1.4; }
  table {
    width: 100%;
    border-collapse: collapse;
    background: #FFFCF8;
    font-size: 13px;
  }
  th, td {
    border: 1px solid var(--mist);
    padding: 10px 8px;
    text-align: left;
  }
  th { background: var(--ink); color: #FFFCF8; font-weight: 500; }
  .labels { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .label {
    background: #FFFCF8;
    border-top: 3px solid var(--brass);
    padding: 10px;
    font-size: 12px;
    color: var(--text2);
  }
  .label b { display: block; color: var(--ink); font-size: 14px; margin-bottom: 4px; }
  footer {
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid var(--mist);
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--text2);
  }
  @media print {
    body { background: white; padding: 0; }
    .sheet { box-shadow: none; }
  }
"""


def thumb_html(ep: str, series: str, headline: str, support: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>FH {ep} Thumbnail 1280×720</title>
<style>{THUMB_CSS}</style>
</head>
<body>
  <div>
    <div class="frame" id="thumb">
      <div class="visual">
        <div class="monogram">FH</div>
        <div class="horizon" aria-hidden="true"></div>
      </div>
      <div class="panel">
        <div class="pill">{series}</div>
        <h1>{headline}</h1>
        <div class="rule"></div>
        <div class="support">{support}</div>
      </div>
    </div>
    <p class="hint">Open at 100% zoom → screenshot the 1280×720 frame · or replace left panel with face photo</p>
  </div>
</body>
</html>
"""


def action_html(title: str, steps: list[str]) -> str:
    items = "\n".join(f"      <li>{s}</li>" for s in steps)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>FH Action Card</title>
<style>{ACTION_CSS}</style>
</head>
<body>
  <div class="card">
    <div class="eyebrow">Action today · under 30 min</div>
    <h1>{title}</h1>
    <div class="rule"></div>
    <ol>
{items}
    </ol>
    <div class="brand">FutureHer — Ready for what's next.</div>
  </div>
</body>
</html>
"""


def worksheet_html(
    ep: str,
    pillar: str,
    framework: str,
    idea: str,
    steps: list[tuple[str, str]],
    labels: list[tuple[str, str]],
    table_headers: list[str],
    table_rows: int,
    run_headers: list[str],
    footer_note: str,
) -> str:
    step_html = "".join(
        f'<div class="step"><div class="num">{i:02d}</div><div><strong>{n}</strong><p>{d}</p></div></div>'
        for i, (n, d) in enumerate(steps, 1)
    )
    label_html = "".join(f'<div class="label"><b>{n}</b>{d}</div>' for n, d in labels)
    th = "".join(f"<th>{h}</th>" for h in table_headers)
    rows = "".join(
        "<tr>" + "".join("<td>&nbsp;</td>" for _ in table_headers) + "</tr>"
        for _ in range(table_rows)
    )
    rh = "".join(f"<th>{h}</th>" for h in run_headers)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>{framework} — One-Pager</title>
<style>{WORKSHEET_CSS}</style>
</head>
<body>
  <article class="sheet">
    <header>
      <div>
        <div class="logo">Future<span>Her</span></div>
        <h1>{framework}</h1>
      </div>
      <div class="meta">{ep} · {pillar} · Worksheet</div>
    </header>

    <p class="idea"><strong>Idea:</strong> {idea}</p>

    <h2>Three steps</h2>
    <div class="steps">{step_html}</div>

    <h2>Labels</h2>
    <div class="labels">{label_html}</div>

    <h2>Fill this in</h2>
    <table>
      <thead><tr>{th}</tr></thead>
      <tbody>{rows}</tbody>
    </table>

    <h2>The one I will run today</h2>
    <table>
      <thead><tr>{rh}</tr></thead>
      <tbody><tr>{''.join('<td style="height:64px"></td>' for _ in run_headers)}</tr></tbody>
    </table>

    <footer>
      <span>futureher · Ready for what's next.</span>
      <span>{footer_note}</span>
    </footer>
  </article>
</body>
</html>
"""


def srt_from_sections(sections: list[tuple[float, float, list[str]]]) -> str:
    """Build SRT from (start_sec, end_sec, lines) chunks with even spacing."""
    cues = []
    idx = 1
    for start, end, lines in sections:
        if not lines:
            continue
        span = (end - start) / max(len(lines), 1)
        for i, line in enumerate(lines):
            a = start + i * span
            b = start + (i + 1) * span - 0.05
            if b <= a:
                b = a + 0.8
            cues.append((idx, a, b, line))
            idx += 1

    def ts(sec: float) -> str:
        h = int(sec // 3600)
        m = int((sec % 3600) // 60)
        s = int(sec % 60)
        ms = int(round((sec - int(sec)) * 1000))
        if ms >= 1000:
            s += 1
            ms = 0
        return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

    out = []
    for i, a, b, line in cues:
        out.append(f"{i}\n{ts(a)} --> {ts(b)}\n{line}\n")
    return "\n".join(out)


def project_json(ep: dict) -> str:
    accent = ep["accent"]
    series = ep["series"]
    data = {
        "project": ep["project_name"],
        "template": ep["template_id"],
        "canvas": {"width": 1920, "height": 1080, "fps": 30},
        "duration_target_sec": 505,
        "grade": "FH_Grade_Horizon",
        "accent": accent,
        "export": {
            "filename": f"{ep['project_name']}_v1.mp4",
            "resolution": "1080p",
            "codec": "H.264",
        },
        "markers": [
            {"id": "S1", "timecode": "00:00:07:00", "label": "Hook"},
            {"id": "S2", "timecode": "00:02:07:00", "label": "Problem"},
            {"id": "S3", "timecode": "00:04:07:00", "label": "Skill"},
            {"id": "S4", "timecode": "00:06:07:00", "label": "Psychology"},
            {"id": "S5", "timecode": "00:07:07:00", "label": "Action"},
        ],
        "timeline": [
            {
                "id": "INTRO",
                "in": "00:00:00:00",
                "out": "00:00:07:00",
                "type": "compound",
                "asset": "FH_TMPL_Intro_7s",
                "text": [series],
            },
            {
                "id": "HOOK",
                "in": "00:00:07:00",
                "out": "00:00:37:00",
                "type": "a_roll_b_roll",
                "assets": ["BR01", "A_ROLL_HOOK"],
                "overlays": [ep["hook_overlay"]],
            },
            {
                "id": "STORY",
                "in": "00:00:37:00",
                "out": "00:02:07:00",
                "type": "a_roll_b_roll",
                "assets": ["BR03", "BR04", "BR05", "A_ROLL_STORY"],
                "overlays": ep["story_overlays"],
            },
            {
                "id": "PROBLEM",
                "in": "00:02:07:00",
                "out": "00:04:07:00",
                "type": "a_roll_graphics",
                "assets": ["BR06", "AI01_optional", "A_ROLL_PROBLEM"],
                "overlays": ep["problem_overlays"],
            },
            {
                "id": "SKILL",
                "in": "00:04:07:00",
                "out": "00:06:07:00",
                "type": "title_screen_demo",
                "assets": ["AI02_diagram", "SR01_screen", "BR07", "A_ROLL_SKILL"],
                "overlays": ep["skill_overlays"],
            },
            {
                "id": "PSYCHOLOGY",
                "in": "00:06:07:00",
                "out": "00:07:07:00",
                "type": "a_roll",
                "assets": ["A_ROLL_PSYCH"],
                "overlays": [ep["psych_overlay"]],
            },
            {
                "id": "ACTION",
                "in": "00:07:07:00",
                "out": "00:07:47:00",
                "type": "action_card",
                "assets": ["AC01_action_card", "A_ROLL_ACTION"],
                "overlays": [ep["action_overlay"]],
                "music_dip": True,
            },
            {
                "id": "CTA",
                "in": "00:07:47:00",
                "out": "00:08:07:00",
                "type": "outro_slots",
                "asset": "FH_TMPL_Outro_30s",
                "text": {
                    "idea": ep["idea"],
                    "skill": ep["skill_line"],
                    "action": ep["action_line"],
                    "cta": ep["cta"],
                },
            },
            {
                "id": "PREVIEW_END",
                "in": "00:08:07:00",
                "out": "00:08:25:00",
                "type": "preview_end",
                "overlays": [ep["preview_overlay"]],
                "end_card": "FutureHer — Ready for what's next.",
            },
        ],
        "audio": {
            "vo": f"audio/{ep['id']}_VO_v1.wav",
            "bed": "Bed_A_calm_ambient" if ep["pillar"] == "AI" else "Bed_B_money_warm",
            "bed_level_db": -26,
            "action_card_bed_db": -32,
        },
        "shorts_source_ranges": {
            "S1": ["00:00:07:00", "00:00:35:00"],
            "S2": ["00:02:07:00", "00:02:52:00"],
            "S3": ["00:04:07:00", "00:05:12:00"],
            "S4": ["00:06:07:00", "00:06:55:00"],
            "S5": ["00:07:07:00", "00:07:42:00"],
        },
    }
    return json.dumps(data, indent=2)


def short_file(s: dict, ep_id: str, series: str) -> str:
    return f"""SHORT {s['code']} · {s['title']}
Source: {ep_id} · {s['cut']} · ~30s · 9:16
Publish: {s['publish']}
Role: {s['role']}

TITLE
{s['title']}

────────────────────────────────────
0–3s · HOOK
ON-SCREEN: {s['hook_os']}
VO: {s['hook_vo']}

3–10s · REFRAME
ON-SCREEN: {s['reframe_os']}
VO: {s['reframe_vo']}

10–22s · VALUE
ON-SCREEN: {s['value_os']}
VO: {s['value_vo']}

22–30s · ACTION
ON-SCREEN: {s['action_os']}
VO: {s['action_vo']}

SIGN-OFF
ON-SCREEN / VO: One step today. A different future tomorrow.
CTA CARD (2s): Full lesson on FutureHer
────────────────────────────────────

DESCRIPTION
{s['title']}. One step today. A different future tomorrow.
Full lesson on FutureHer.
{s['hashtags']}

CAPCUT
Crop 9:16 · eyes upper third · burned captions · large type
Subtle zoom on hook + action line
Brand arc BR 12–18% · series pill: {series}
End CTA compound · palette only · premium transitions
"""


def write_episode(ep: dict) -> list[str]:
    base = ROOT / ep["id"]
    pub = base / "PUBLISH"
    cap = pub / "06_CAPCUT_PROJECT"
    shorts = pub / "15_SHORTS"
    for d in (base, pub, cap, shorts):
        d.mkdir(parents=True, exist_ok=True)

    written: list[str] = []

    def w(path: Path, content: str):
        path.write_text(content.replace("\r\n", "\n"), encoding="utf-8")
        written.append(str(path))

    # INDEX
    short_files = "\n".join(f"      {s['file']}" for s in ep["shorts"])
    w(
        pub / "00_INDEX.txt",
        f"""FUTUREHER · {ep['id']} · PUBLISH PACK
Title: {ep['title']}
Slug: {ep['slug']}
Series: {ep['series']} · {ep['topic']} · {ep['framework']}

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
{short_files}

EXPORT TARGET
{ep['project_name']}_v1.mp4
""",
    )

    # FINAL SCRIPT
    w(
        pub / "01_FINAL_SCRIPT.txt",
        f"""FUTUREHER · {ep['id']} · FINAL SCRIPT
Title: {ep['title']}
Series: {ep['series']} | Topic: {ep['topic']} | Framework: {ep['framework']}
Template: {ep['template']} | Target: 8:00 | Grade: FH_Grade_Horizon
Slug: {ep['slug']}

IDEA: {ep['idea']}
SKILL: {ep['skill_line']}
ACTION: {ep['action_line']}
CTA: {ep['cta']}
PRODUCT: {ep['product']}
DOWNLOAD: {ep['download']}

═══════════════════════════════════════
COLD OPEN / INTRO (0:00–0:07)
═══════════════════════════════════════
VISUAL: FH_TMPL_Intro_7s + series pill {ep['series']}
VO: (none — bed only)

═══════════════════════════════════════
HOOK (0:07–0:37) [S1]
═══════════════════════════════════════
VISUAL: MCU A-roll or phone B-roll → face on punch
ON-SCREEN: {ep['hook_overlay']}

{ep['hook']}

═══════════════════════════════════════
EVERYDAY SA STORY (0:37–2:07)
═══════════════════════════════════════
VISUAL: Soft SA daylight · phone · desk · notebook
CAPTIONS: {' · '.join(ep['story_overlays'])}

{ep['story']}

═══════════════════════════════════════
THE PROBLEM (2:07–4:07) [S2]
═══════════════════════════════════════
VISUAL: Calm B-roll · kinetic type · lower-thirds
ON-SCREEN: {ep['problem_overlays'][0]}

{ep['problem']}

═══════════════════════════════════════
THE SKILL (4:07–6:07) [S3]
═══════════════════════════════════════
VISUAL: Title card {ep['framework']} · Pathway 01/02/03 · screen demo
ON-SCREEN: {ep['skill_short']}
DEMO: {ep['demo']}

{ep['skill']}

═══════════════════════════════════════
PSYCHOLOGY (6:07–7:07) [S4]
═══════════════════════════════════════
VISUAL: Soft dissolve · minimal · A-roll
ON-SCREEN: {ep['psych_overlay']}

{ep['psychology']}

═══════════════════════════════════════
ONE ACTION TODAY (7:07–7:47) [S5]
═══════════════════════════════════════
VISUAL: Full-screen ACTION CARD (hold 3s)
ON-SCREEN: {ep['action_overlay']}

{ep['action']}

═══════════════════════════════════════
COMMUNITY (7:47–8:07)
═══════════════════════════════════════
VISUAL: Outro slots Idea / Skill / Action / CTA

{ep['community']}

═══════════════════════════════════════
PREVIEW + OUTRO (8:07–8:25)
═══════════════════════════════════════
VISUAL: Preview line → logo settle → end screen tiles

{ep['preview']}

OUTRO LOCKED COPY
Idea: {ep['idea']}
Skill: {ep['skill_line']}
Action: {ep['action_line']}
CTA: {ep['cta']}
END: FutureHer — Ready for what's next.

PRODUCT RECOMMENDATION
{ep['product_blurb']}

PINNED QUESTION
{ep['pinned']}
""",
    )

    # VO
    w(
        pub / "02_VOICEOVER_SCRIPT.txt",
        f"""FUTUREHER · {ep['id']} · VOICE-OVER SCRIPT
Read calm. No hype. Pause where marked /
Teleprompter mode · ~8:00 · Template {ep['template'][0]}

---

[HOOK]

{ep['hook']}

/

---

[STORY]

{ep['story']}

/

---

[PROBLEM]

{ep['problem']}

/

---

[SKILL]

{ep['skill']}

/

---

[PSYCHOLOGY]

{ep['psychology']}

/

---

[ACTION]

{ep['action']}

/

---

[COMMUNITY]

{ep['community']}

/

---

[PREVIEW]

{ep['preview']}

/
""",
    )

    # Storyboard
    w(
        pub / "03_STORYBOARD.txt",
        f"""FUTUREHER · {ep['id']} · SCENE-BY-SCENE STORYBOARD
Aspect: 16:9 master · 1920×1080 · 30fps · FH_Grade_Horizon

SCENE 00 · INTRO · 0:00–0:07
SHOT: Brand intro compound
FRAME: Stone → Ink wash · brass horizon arc draws · FutureHer wordmark · Lagoon pill “{ep['series']}”
MOTION: Arc ease-out · wordmark fade · hold · dissolve
AUDIO: Bed under 12% · soft whoosh optional
NOTES: Do not rebuild. Duplicate FH_TMPL_Intro_7s.

SCENE 01 · HOOK · 0:07–0:37 [S1]
SHOT A: Phone / desk B-roll matching story world
SHOT B: MCU host, soft window light, eye contact
CUT: Hard cut to face on punch
ON-SCREEN: {ep['hook_overlay']}
CAPTION STYLE: Satoshi Bold · Ivory on Ink bar · max 2 lines
B-ROLL: BR01 · BR02

SCENE 02 · SA STORY · 0:37–2:07
SHOTS: Desk daylight · phone hands · notebook night soft lamp
CUTS: Dissolve 300ms between inserts; return to A-roll for truth lines
ON-SCREEN KEYWORDS: {' · '.join(ep['story_overlays'])}
MOOD: Relatable, not anxious montage
B-ROLL: BR03 · BR04 · BR05

SCENE 03 · PROBLEM · 2:07–4:07 [S2]
SHOT A: A-roll MCU
SHOT B: Calm focused work B-roll — never shock face
GRAPHICS: {', '.join(ep['problem_overlays'])}
HOLD: 2.5s on each graphic beat
FORBIDDEN: Shock faces · red alert UI · glitch effects · neon
B-ROLL: BR06 · AI01 optional

SCENE 04 · SKILL TITLE · 4:07–4:20
SHOT: Full title card
TEXT: {ep['framework']}
SUB: {ep['skill_short']}
MOTION: Fade in · hold 2.5–3.5s · dissolve to steps
ASSET: AI02 framework diagram OR CapCut Pathway graphic

SCENE 05–07 · SKILL STEPS · 4:20–6:07
SHOT: Screen record primary + A-roll cutaways
DEMO: {ep['demo']}
ON-SCREEN: {', '.join(ep['skill_overlays'])}
B-ROLL: BR07 · SR01

SCENE 08 · PSYCHOLOGY · 6:07–7:07 [S4]
SHOT: A-roll only · soft dissolve in
ON-SCREEN: {ep['psych_overlay']}
PACE: Slower · fewer cuts
MOOD: Academy calm

SCENE 09 · ACTION · 7:07–7:47 [S5]
SHOT: Full-screen action card (Stone panel)
TEXT: {ep['action_overlay']}
HOLD: Card 3s cold · then VO over card / A-roll
ASSET: action_card.html → PNG insert
MUSIC: Dip to ~8% under card

SCENE 10 · COMMUNITY · 7:47–8:07
SHOT: Outro compound slots
TEXT LOCKED:
  Idea: {ep['idea']}
  Skill: {ep['skill_line']}
  Action: {ep['action_line']}
  CTA: {ep['cta']}

SCENE 11 · PREVIEW + END · 8:07–8:25
SHOT: Preview line on Ink field
TEXT: {ep['preview_overlay']}
END: FutureHer — Ready for what's next.
""",
    )

    # AI prompts
    w(
        pub / "04_AI_IMAGE_PROMPTS.txt",
        f"""FUTUREHER · {ep['id']} · AI IMAGE PROMPTS
Max 3 stills in edit. Prefer own B-roll + screen record first.
Palette: Ink #121A21 · Stone #F3EFE8 · Brass #B8893A · Lagoon #2F6F6A · Ivory #FFFCF8

GLOBAL NEGATIVE (append to every prompt):
neon, cyberpunk, purple pink gradient, chrome, influencer aesthetic, girlboss pink, glitter, crown, butterfly, Venus symbol, kente costume tourism, crowded collage, watermark text, readable fake UI text, cartoon mascot, drop shadow glow, busy sticker pack, shock face, open mouth panic, poverty stereotype, sexualized imagery, celebrity likeness

────────────────────────────────────
AI01 · PROBLEM BEAT STILL
File: assets/AI01_{ep['id'].lower()}_scene.jpg · 1920×1080
────────────────────────────────────
{ep['ai01']}

────────────────────────────────────
AI02 · FRAMEWORK DIAGRAM
File: assets/AI02_{ep['id'].lower()}_diagram.png · 1920×1080
────────────────────────────────────
{ep['ai02']}

────────────────────────────────────
AI03 · THUMBNAIL FACE (left panel alternative)
File: assets/AI03_{ep['id'].lower()}_thumb.jpg · 1280×720
────────────────────────────────────
South African woman mid-20s to mid-30s, calm confident expression, slight knowing smile, natural window light, lens eye contact, soft Stone/Ink grade, plain muted background, head-and-shoulders left third framing for YouTube thumbnail, no beauty filter plastic, no shock mouth, educational mentor presence, 1280x720 composition

────────────────────────────────────
AI04 · OBJECT / METAPHOR STILL
File: assets/AI04_{ep['id'].lower()}_object.jpg · 1280×720
────────────────────────────────────
{ep['ai04']}

GENERATION NOTES
- Midjourney / Flux / Ideogram OK
- Generate 4 variants each · pick calmest
- Remove any accidental text in post
- Grade toward Horizon before CapCut import
- License: keep prompts + seed in episode log
""",
    )

    # B-roll
    w(
        pub / "05_BROLL_LIST.txt",
        f"""FUTUREHER · {ep['id']} · B-ROLL LIST
Priority: Own phone footage → screen record → CapCut stock (YT-safe) → AI still (max 3)
Folder: launch/{ep['id']}/footage/broll/

ID     | SEC | DURATION | SHOT                                              | SOURCE        | USED IN
-------|-----|----------|---------------------------------------------------|---------------|----------------
BR01   | 01  | 6–8s     | {ep['br01']}                                      | Own phone     | Hook
BR02   | 01  | 8–12s    | MCU host / A-roll punch line                      | A-roll        | Hook
BR03   | 02  | 5–7s     | {ep['br03']}                                      | Own phone     | Story
BR04   | 02  | 6–8s     | Desk wide — soft SA daylight                      | Own phone     | Story
BR05   | 02  | 5–6s     | {ep['br05']}                                      | Own phone     | Story
BR06   | 03  | 6–8s     | Calm focused work — no shock face                 | Own / stock   | Problem
BR07   | 05  | 10–15s   | Hands typing / writing — warm daylight            | Own / stock   | Skill
SR01   | 05  | 60–90s   | SCREEN: {ep['demo']}                              | Screen record | Skill (primary)
AC01   | 09  | still    | Action card PNG from action_card.html             | HTML export   | Action
AI01   | 03  | still    | Problem still (optional)                          | AI prompt 01  | Problem
AI02   | 04  | still    | Framework pathway diagram                         | AI prompt 02  | Skill title

SCREEN RECORD BEAT SHEET (SR01)
{ep['screen_beats']}

STOCK SEARCH TERMS (CapCut / YT-safe only)
{ep['stock_terms']}
AVOID: neon hacker, crying at computer, glam influencer office, poverty tourism, shock faces

AUDIO B-ROLL / ROOM TONE
- 10s quiet room tone for gaps
- Soft tick OK on framework steps only

MINIMUM SHOOT (if timeboxed to 20 min)
1. BR01
2. BR03
3. BR04
4. SR01 full screen demo
5. A-roll VO / face for hook + psychology
""",
    )

    # CapCut
    w(
        cap / "EDIT_BIBLE.txt",
        f"""FUTUREHER · {ep['id']} · CAPCUT PROJECT
Project name: {ep['project_name']}
Duplicate from: {ep['template_id']}
Canvas: 1920×1080 · 30fps · ~8:25
Grade: FH_Grade_Horizon · Accent: {ep['accent']}
Export: {ep['project_name']}_v1.mp4 (1080p H.264)

SETUP
1. Duplicate template — never edit master
2. Rename {ep['project_name']}
3. Import folder launch/{ep['id']}/footage/ + thumbnail + action card PNG
4. Place VO on A1 · denoise · normalize
5. Auto captions → apply FH caption style → fix SA place names
6. Follow PROJECT.json slot order
7. Markers: S1@0:07 · S2@2:07 · S3@4:07 · S4@6:07 · S5@7:07
8. Export master → duplicate timeline → crop 9:16 for Shorts per 15_SHORTS

TRACK MAP
V1  A-roll / host
V2  B-roll + AI stills
V3  Screen record + graphics / action card
V4  Intro / outro compounds (locked)
A1  Voice-over
A2  Music bed (12–18% under VO · dip on action card)
A3  Soft ticks (steps only)

LOCKED TEXT (outro)
Idea: {ep['idea']}
Skill: {ep['skill_line']}
Action: {ep['action_line']}
CTA: {ep['cta']}

CAPTIONS
Font: Satoshi Bold / Medium
Colour: Ivory on Ink bar OR Ink on Stone
Max 2 lines · never karaoke rainbow
Keyword underline Lagoon rare (framework name only)

TRANSITIONS
Dissolve 280–400ms default
Hard cut only on punch lines
No bounce · no meme zooms · max +5% punch ×3

QC BEFORE EXPORT
[ ] Intro ≤ 8s to value
[ ] Framework title holds ≥ 2.5s
[ ] Screen demo readable on phone
[ ] Action card holds 3s
[ ] Idea/Skill/Action filled
[ ] S1–S5 markers present
[ ] Loudness comfortable on phone speaker
[ ] No shock faces / neon / false promises
[ ] Product recommendation only in description/community soft — not hard sell in VO
""",
    )
    w(cap / "PROJECT.json", project_json(ep))
    w(
        cap / "TEXT_OVERLAYS.txt",
        f"""FUTUREHER · {ep['id']} · CAPCUT TEXT OVERLAYS
Paste into CapCut text slots. Style: Satoshi Bold/Medium.

HOOK
{ep['hook_overlay']}

PROBLEM
{chr(10).join(ep['problem_overlays'])}

SKILL
{ep['framework']}
{chr(10).join(ep['skill_overlays'])}

PSYCHOLOGY
{ep['psych_overlay']}

ACTION CARD
{ep['action_overlay']}
{chr(10).join(f'{i}. {s}' for i, s in enumerate(ep['action_steps'], 1))}

OUTRO
Idea: {ep['idea']}
Skill: {ep['skill_line']}
Action: {ep['action_line']}
CTA: {ep['cta']}

PREVIEW
{ep['preview_overlay']}

END
FutureHer — Ready for what's next.
""",
    )

    # SRT
    w(pub / "07_SUBTITLES_EN.srt", srt_from_sections(ep["srt_sections"]))

    # Description
    w(
        pub / "09_DESCRIPTION.txt",
        f"""{ep['desc_open']}

In this FutureHer lesson you'll get:
• One idea: {ep['idea']}
• One skill: {ep['skill_line']}
• One action today: {ep['action_line']}

Free download — {ep['download']}: [CHALLENGE LINK]
Digital product — {ep['product']}: [LINK]
{ep['product_blurb']}

Join The Forward Collective: [WHATSAPP / COMMUNITY LINK]
Forward Notes (newsletter): [NEWSLETTER LINK]
{ep['cta_extra']}

CHAPTERS
{ep['chapters']}

{ep['tools_block']}

Some links may be affiliate links. If you buy through them, FutureHer may earn a commission at no extra cost to you. I only recommend tools I'd teach anyway.

FutureHer — Ready for what's next.

{ep['hashtags_long']}
""",
    )

    w(pub / "10_CHAPTERS.txt", ep["chapters"] + "\n")

    w(
        pub / "11_SEO.txt",
        f"""FUTUREHER · {ep['id']} · SEO PACK

PRIMARY TITLE
{ep['title']}

ALT TITLES (A/B)
1. {ep['alts'][0]}
2. {ep['alts'][1]}
3. {ep['alts'][2]}

THUMBNAIL TEXT (on image — not title)
{ep['thumb_text']}
Series pill: {ep['series']}
Support: {ep['thumb_support']}
File: PUBLISH/08_THUMBNAIL.png

SLUG
{ep['slug']}

PRIMARY KEYWORD
{ep['primary_kw']}

SECONDARY KEYWORDS
{chr(10).join(ep['secondary_kw'])}

TAGS (YouTube — paste)
{ep['tags']}

PLAYLIST
{ep['series']}

CATEGORY
Education

LANGUAGE
English (South Africa)

CAPTIONS
Upload PUBLISH/07_SUBTITLES_EN.srt
Later: {ep['lang_later']}

SEARCH INTENT
{ep['intent']}

CLICK TEST
{ep['click_test']}

END SCREEN (last 20s)
Subscribe · next episode teaser / playlist · Forward Collective link

CARDS
0:45 Subscribe reminder
7:40 Community link

HANDLE
@FutureHerAfrica
""",
    )

    w(
        pub / "12_HASHTAGS.txt",
        f"""FUTUREHER · {ep['id']} · HASHTAGS

LONG-FORM (description end)
{ep['hashtags_long']}

SHORTS (1–2 max each)
S1: {ep['hashtags_short']}
S2: {ep['hashtags_short']}
S3: {ep['hashtags_short']}
S4: {ep['hashtags_short']}
S5: {ep['hashtags_short']}

REELS / IG / TIKTOK
{ep['hashtags_short']}

LINKEDIN (optional — sparingly)
{ep['hashtags_li']}

DO NOT USE
#GirlBoss #Hustle #Grind #Manifest #PassiveIncome #Crypto
Tag stuffing / 30-hashtag blocks
""",
    )

    w(
        pub / "13_COMMUNITY_POST.txt",
        f"""FUTUREHER · {ep['id']} · COMMUNITY POSTS
Publish day of long-form (or +1h after public).

═══════════════════════════════════════
YOUTUBE COMMUNITY TAB
═══════════════════════════════════════
{ep['yt_community']}

Watch: [VIDEO LINK]
Join The Forward Collective: [LINK]

═══════════════════════════════════════
WHATSAPP / FORWARD COLLECTIVE
═══════════════════════════════════════
{ep['wa_community']}

Watch: [VIDEO LINK]

Welcome forward.

═══════════════════════════════════════
INSTAGRAM / FACEBOOK (caption for S1 Reel)
═══════════════════════════════════════
{ep['ig_community']}

Full lesson on YouTube — FutureHer.
Link in bio.
{ep['hashtags_short']}

═══════════════════════════════════════
LINKEDIN
═══════════════════════════════════════
{ep['li_community']}

Watch: [VIDEO LINK]
""",
    )

    w(
        pub / "14_PINNED_COMMENT.txt",
        f"""{ep['pinned']}

Drop it below. I'll reply.
Join The Forward Collective here → [LINK]
Free worksheet — {ep['download']}: [LINK]
If you want the deeper pack — {ep['product']}: [LINK]
""",
    )

    # Shorts master + files
    rows = "\n".join(
        f"{s['code']} | {s['file']:<34} | {s['title']:<42} | {s['cut']:<12} | {s['publish']}"
        for s in ep["shorts"]
    )
    exports = "\n".join(s["export"] for s in ep["shorts"])
    w(
        shorts / "SHORTS_MASTER.txt",
        f"""FUTUREHER · {ep['id']} · FIVE SHORTS MASTER
Aspect: 9:16 · Captions burned in · Brand arc BR 12–18% · Series pill top
Engine: operations/SHORTS/SHORTS_ENGINE.md
Formula: HOOK 0–3 · REFRAME 3–10 · VALUE 10–22 · ACTION 22–30
Sign-off (locked): One step today. A different future tomorrow.

#  | FILE                              | TITLE                                    | CUT        | PUBLISH
---|-----------------------------------|------------------------------------------|------------|----------------
{rows}

EXPORT NAMES
{exports}

QC
Every Short: formula beats · sister voice · one idea · one today-action · official sign-off · full-lesson CTA · phone caption check
""",
    )
    for s in ep["shorts"]:
        w(shorts / s["file"], short_file(s, ep["id"], ep["series"]))

    # Root helpers
    w(base / "SCRIPT_VO.txt", (pub / "02_VOICEOVER_SCRIPT.txt").read_text(encoding="utf-8"))
    w(
        base / "CAPCUT_EDIT_SHEET.txt",
        f"""FUTUREHER · {ep['id']} · CAPCUT EDIT SHEET
Template: {ep['template']} | Grade: FH_Grade_Horizon | Aspect: 16:9 master

COLOURS
Ink #121A21 | Stone #F3EFE8 | Brass #B8893A | Lagoon #2F6F6A | Ivory #FFFCF8

INTRO (6–8s)
Horizon arc draw + FutureHer wordmark + series pill "{ep['series']}"

TIMELINE
00:00–00:30  HOOK [S1]
  Caption: {ep['hook_overlay']}

00:30–02:00  STORY
  Caption keywords: {' · '.join(ep['story_overlays'])}

02:00–04:00  PROBLEM [S2]
  Lower-thirds: {', '.join(ep['problem_overlays'])}

04:00–06:00  SKILL [S3]
  Title card: {ep['framework']}
  Steps: {ep['skill_short']}
  Screen record: {ep['demo']}

06:00–07:00  PSYCHOLOGY [S4]
  Caption: {ep['psych_overlay']}

07:00–07:40  ACTION [S5]
  Full-screen ACTION CARD: {ep['action_overlay']}
  Hold 3s.

07:40–07:55  CTA
  Idea / Skill / Action / {ep['cta']}

07:55–08:05  PREVIEW + OUTRO
  Text: {ep['preview_overlay']}
  Logo settle. End.

Follow PUBLISH/06_CAPCUT_PROJECT/EDIT_BIBLE.txt and PROJECT.json.
""",
    )
    w(
        base / "RUN_SHEET_24H.txt",
        f"""FUTUREHER · 24-HOUR LAUNCH RUN SHEET
Episode: {ep['id']} — {ep['title']}

HOUR 0–1 · SETUP
[ ] CapCut desktop + {ep['template_id']} notes open
[ ] Quiet room + phone OR mic ready for VO

HOUR 1–2 · RECORD VO
[ ] Open launch/{ep['id']}/SCRIPT_VO.txt
[ ] Record full VO calm pace
[ ] Export → launch/{ep['id']}/audio/{ep['id']}_VO_v1.wav

HOUR 2–4 · VISUALS
[ ] Open thumbnail.html → export 1280×720 → PUBLISH/08_THUMBNAIL.png
[ ] Capture screen demo: {ep['demo']}
[ ] Pull 4–6 B-roll clips from 05_BROLL_LIST.txt
[ ] Export action_card.html → PNG

HOUR 4–7 · EDIT
[ ] CapCut: follow CAPCUT_EDIT_SHEET.txt + PUBLISH/06_CAPCUT_PROJECT
[ ] Drop VO → captions → framework card + action card
[ ] Export {ep['project_name']}_v1.mp4

HOUR 7–8 · QC
[ ] Audio clear
[ ] Captions accurate
[ ] Thumbnail readable at stamp size
[ ] Title + description from UPLOAD_PACK.txt
[ ] Action under 30 minutes clear
[ ] No shock faces / neon / false promises

HOUR 8–9 · UPLOAD
[ ] Paste UPLOAD_PACK.txt
[ ] Upload 07_SUBTITLES_EN.srt
[ ] Pin 14_PINNED_COMMENT.txt
[ ] Community post from 13_COMMUNITY_POST.txt
[ ] Schedule five Shorts from 15_SHORTS

HOUR 9–24 · DISTRIBUTE
[ ] WhatsApp Forward Collective
[ ] IG/FB S1 Reel
[ ] LinkedIn post
[ ] Attach free worksheet {ep['download']}
[ ] Soft mention {ep['product']} in pinned/community only
""",
    )
    w(
        base / "UPLOAD_PACK.txt",
        f"""FUTUREHER · {ep['id']} · YOUTUBE UPLOAD PACK
Copy-paste ready. Fill links before publish.

CHANNEL HANDLE: @FutureHerAfrica
TEMPLATE: {ep['template']}
SERIES: {ep['series']}
SLUG: {ep['slug']}

═══════════════════════════════════════
PRIMARY TITLE
═══════════════════════════════════════
{ep['title']}

ALT TITLES
1. {ep['alts'][0]}
2. {ep['alts'][1]}
3. {ep['alts'][2]}

═══════════════════════════════════════
THUMBNAIL TEXT (on image — NOT the title)
═══════════════════════════════════════
{ep['thumb_text']}
Series pill: {ep['series']}
Support: {ep['thumb_support']}
File: launch/{ep['id']}/thumbnail.html → PUBLISH/08_THUMBNAIL.png

═══════════════════════════════════════
DESCRIPTION
═══════════════════════════════════════
(Use PUBLISH/09_DESCRIPTION.txt)

═══════════════════════════════════════
TAGS
═══════════════════════════════════════
{ep['tags']}

═══════════════════════════════════════
CATEGORY / VISIBILITY
═══════════════════════════════════════
Category: Education
Language: English
Captions: Upload EN SRT
Visibility: Public (or Unlisted 1h QC → Public)
Comments: On
Made for kids: No
License: Standard YouTube

═══════════════════════════════════════
PINNED COMMENT
═══════════════════════════════════════
(Use PUBLISH/14_PINNED_COMMENT.txt)

═══════════════════════════════════════
END SCREEN / CARDS
═══════════════════════════════════════
End screen (last 20s): Subscribe + next teaser + Forward Collective
Cards: Subscribe @ 0:45 · Community @ 7:40

═══════════════════════════════════════
CTA
═══════════════════════════════════════
{ep['cta']}

═══════════════════════════════════════
DIGITAL PRODUCT
═══════════════════════════════════════
{ep['product']}
{ep['product_blurb']}

═══════════════════════════════════════
FREE WORKSHEET
═══════════════════════════════════════
{ep['download']} ({ep['worksheet_file']})

═══════════════════════════════════════
SHORTS TITLES
═══════════════════════════════════════
{chr(10).join(f"{s['code']}: {s['title']}" for s in ep["shorts"])}
""",
    )
    cuts = "\n".join(
        f"""────────────────────────────────────
{s['code']} · {s['cut']} · ~30s
Title: {s['title']}
Hook on screen: {s['hook_os']}
Action: {s['action_os']}
End: One step today. A different future tomorrow.
CTA: Full lesson on FutureHer
"""
        for s in ep["shorts"]
    )
    w(
        base / "SHORTS_CUTS.txt",
        f"""FUTUREHER · {ep['id']} · SHORTS CUT LIST
Source: {ep['id']} long-form | Aspect: 9:16 | Captions burned in
Engine: operations/SHORTS/SHORTS_ENGINE.md
Sign-off (locked): One step today. A different future tomorrow.

RULES
Rewrite to formula — do not ship raw long-form paste.
HOOK ≤ 3s. One idea. One today-action. Brand arc bottom-right 12–18%. Series pill top.
End every Short: official sign-off → Full lesson on FutureHer.

{cuts}
""",
    )

    w(base / "thumbnail.html", thumb_html(ep["id"], ep["series"], ep["thumb_text"], ep["thumb_support"]))
    w(base / "action_card.html", action_html(ep["action_overlay"], ep["action_steps"]))
    w(base / ep["worksheet_file"], ep["worksheet_html"])

    return written


# ---------------------------------------------------------------------------
# Episode content
# ---------------------------------------------------------------------------

def split_lines(text: str) -> list[str]:
    """Split prose into subtitle-sized lines."""
    chunks: list[str] = []
    for para in text.strip().split("\n"):
        para = para.strip()
        if not para:
            continue
        # Prefer sentence splits
        parts = []
        buf = ""
        for ch in para:
            buf += ch
            if ch in ".?!:" and len(buf) > 28:
                parts.append(buf.strip())
                buf = ""
        if buf.strip():
            parts.append(buf.strip())
        for p in parts:
            if len(p) <= 70:
                chunks.append(p)
            else:
                words = p.split()
                line = ""
                for word in words:
                    trial = (line + " " + word).strip()
                    if len(trial) > 62 and line:
                        chunks.append(line)
                        line = word
                    else:
                        line = trial
                if line:
                    chunks.append(line)
    return chunks


EPISODES: list[dict] = []


def add(ep: dict):
    # Build SRT sections from script blocks
    ep["srt_sections"] = [
        (7.0, 37.0, split_lines(ep["hook"])),
        (37.0, 127.0, split_lines(ep["story"])),
        (127.0, 247.0, split_lines(ep["problem"])),
        (247.0, 367.0, split_lines(ep["skill"])),
        (367.0, 427.0, split_lines(ep["psychology"])),
        (427.0, 467.0, split_lines(ep["action"])),
        (467.0, 487.0, split_lines(ep["community"])),
        (487.0, 505.0, split_lines(ep["preview"])),
    ]
    EPISODES.append(ep)


# ============================ EP002 ========================================
add(
    {
        "id": "EP002",
        "title": "Stop downloading every AI app — pick one you can trust",
        "alts": [
            "I don't know which AI tool to trust — use this checklist",
            "One AI tool is enough (ignore the circus)",
            "The calm way to choose an AI assistant",
        ],
        "slug": "ep002-ai-tool-trust-stack",
        "topic": "T002",
        "framework": "THE TRUST STACK",
        "series": "FutureHer · AI",
        "pillar": "AI",
        "template": "A Educational",
        "template_id": "FH_TMPL_A_Educational",
        "project_name": "FH_EP002_AI_TrustStack",
        "accent": "#2F6F6A",
        "idea": "Trust is a checklist — not a download frenzy",
        "skill_line": "The Trust Stack — Need · Safety · Stick",
        "skill_short": "Need · Safety · Stick",
        "action_line": "Pick one tool. Write three safety rules. Stick for 30 days.",
        "cta": "Subscribe for tool-refresh episodes",
        "cta_extra": "This month's challenge — one primary AI tool for 30 days: [CHALLENGE LINK]",
        "product": "Trusted Tools One-Sheet",
        "product_blurb": "If you want a living list you can refresh each quarter — without chasing every new app — the Trusted Tools One-Sheet keeps your Need · Safety · Stick decisions in one calm place.",
        "download": "AI Tool Trust Checklist",
        "worksheet_file": "AI_TOOL_TRUST_CHECKLIST_worksheet.html",
        "thumb_text": "One tool. Ignore the circus.",
        "thumb_support": "Need · Safety · Stick",
        "hook_overlay": "One tool is enough.",
        "story_overlays": ["WhatsApp", "eight apps", "none used", "more behind"],
        "problem_overlays": [
            "Downloads ≠ progress",
            "Need",
            "Safety",
            "Stick",
            "Trust is a checklist",
        ],
        "skill_overlays": [
            "THE TRUST STACK",
            "01 Need",
            "02 Safety",
            "03 Stick",
            "Need · Safety · Stick",
        ],
        "psych_overlay": "Choice fatigue feels like failure.",
        "action_overlay": "Pick one. Write three rules. Stick 30 days.",
        "action_steps": [
            "Name the one job you need AI for",
            "Write three safety rules for that tool",
            "Delete or mute the rest for 30 days",
        ],
        "preview_overlay": "Next — phone-only AI that still works",
        "demo": "Trust Stack notes → safety rules → pick ChatGPT or Gemini as primary",
        "primary_kw": "which AI tool to trust",
        "secondary_kw": [
            "best AI tool for beginners",
            "ChatGPT vs Gemini",
            "AI tools South Africa",
            "AI safety checklist",
            "AI for women",
            "FutureHer",
        ],
        "tags": "which AI tool to trust, AI tools for beginners, ChatGPT vs Gemini, AI safety checklist, FutureHer, AI for women, AI at work South Africa, Trusted Tools, AI fluency, pick one AI tool",
        "intent": "Comparison → Informational → Micro decision",
        "click_test": "Busy woman sees: stop app circus → one trust method → choose today",
        "lang_later": "ZU / NSO",
        "hashtags_long": "#FutureHer #AIForWomen #SouthAfrica",
        "hashtags_short": "#FutureHer #AIForWomen",
        "hashtags_li": "#FutureHer #AIatWork #SouthAfrica",
        "chapters": """0:00 One tool is enough
0:30 Eight apps, zero progress
2:00 Why downloads feel like catching up
4:00 The Trust Stack (Need · Safety · Stick)
6:00 Choice fatigue isn't failure
7:00 Your 30-day tool decision
7:40 Subscribe for tool refreshes
7:55 Next: phone-only AI""",
        "desc_open": "If your phone is full of AI apps you never open, you're not behind — you're overloaded.",
        "tools_block": """Tools mentioned:
- One primary assistant you already have (ChatGPT / Gemini / Copilot) — pick one, ignore the circus
- Optional upgrade later only if Need + Safety + Stick still hold

Digital product: Trusted Tools One-Sheet (refreshable quarterly)""",
        "hook": """If your downloads folder looks like an AI app store —
and you still feel behind —
you're not failing at the future.

You're collecting tools instead of choosing one.

Today: one idea, one skill, one action.
Not motivation. A trust decision you can live with.""",
        "story": """Picture this.
It's a Tuesday afternoon in Johannesburg — or a quiet evening in Polokwane —
and your WhatsApp group drops eight AI tools in forty minutes.

Someone says "this one writes emails."
Someone else says "this one makes videos."
Someone sends a screenshot with fifty tabs open.

You install three.
You open none.
That night you feel more behind than before you started.

I've watched excellent women do this —
teachers, admin officers, freelancers, bank staff —
treating every new app like homework they failed.

Here's the quiet truth:
more logos on your phone is not progress.
Progress is one tool you actually trust on a real workday.""",
        "problem": """The problem isn't that there are many AI tools.
The problem is we confuse downloading with learning.

Every new app restarts the anxiety:
"Which one is safe? Which one is best? What if I choose wrong?"

So let's separate three things that get mixed up:

One — Novelty sells urgency.
Two — Your work needs one primary assistant first.
Three — Trust is built with rules — not with screenshots.

Free can be fine. Paid can be fine.
What matters is whether the tool matches a real Need,
passes a Safety check,
and is simple enough that you'll Stick with it.

If you keep switching every week,
you never build fluency —
you build fatigue.""",
        "skill": """Here's the skill.
Framework name: THE TRUST STACK

Step 1 — Need.
Write one sentence: "I need AI to help me with ___."
Not ten jobs. One.
Examples: "first drafts of client emails."
"summarising meeting notes."
"rewriting a report outline."

Step 2 — Safety.
For that tool, write three non-negotiables:
Never paste passwords or OTPs.
Never paste private client files without permission.
Always edit facts before you send.

If a tool asks for access you don't understand — pause.
If you can't explain where your data goes in one plain sentence — pause.

Step 3 — Stick.
Choose one primary assistant for thirty days.
Mute the rest.
Use it on real tasks until your hands know the path.

That is the Trust Stack.
Need. Safety. Stick.
You stop collecting the circus —
and you start practising with one calm tool.""",
        "psychology": """Quick psychology — not as a diagnosis, as a tool.

Your brain treats endless options as threat.
More choices feel like more chances to be wrong.
So you delay, download, and never decide.

A closed choice lowers the threat.
When you pick one tool and three rules,
your nervous system gets evidence:
"I can work with this."

Choice fatigue feels like failure.
It isn't.
It's a signal to shrink the menu.""",
        "action": """Your action today — under thirty minutes:

1. Write the one job you need AI for this month.
2. Open the AI tool you already have — ChatGPT, Gemini, or Copilot — and write three safety rules in Notes.
3. Delete or mute the unused AI apps for thirty days.

When you're done, you will not have "mastered AI."
You will have made a FutureHer trust decision:
one idea, one skill, one action.""",
        "community": """If this helped, subscribe to FutureHer —
I refresh tool guidance when it actually matters,
not every time an app launches.

And join The Forward Collective if you want company while you practise.""",
        "preview": """Next time: you only have a phone —
can you still use AI properly?
Yes. And I'll show you the Phone Flow.""",
        "pinned": "Which one AI tool are you choosing as your primary — and what's your first safety rule?",
        "yt_community": """If your phone is full of AI apps you never open, you're not behind — you're overloaded.

New lesson is live:
Stop downloading every AI app — pick one you can trust

You'll leave with The Trust Stack:
Need · Safety · Stick

Question for you:
Which one tool becomes your primary for 30 days?""",
        "wa_community": """The AI app circus is loud again.

Today's FutureHer lesson is calm:
Stop downloading every AI app — pick one you can trust

One idea. One skill. One action under 30 minutes.

Reply with the one tool you're sticking with.""",
        "ig_community": """One tool is enough.
Ignore the circus.

Full lesson on YouTube — FutureHer.""",
        "li_community": """Capable women aren't failing at AI.
They're drowning in tool lists.

In this FutureHer lesson I teach The Trust Stack:
Need · Safety · Stick.

Pick one primary assistant.
Write three safety rules.
Practise for thirty days.

Fluency comes from repetition — not from another download.""",
        "ai01": "Editorial still, calm premium educational media aesthetic, South African contemporary desk, young Black woman mid-20s to mid-30s looking at phone with only one app icon conceptually suggested but UI unreadable/blurred, soft morning window light, focused not anxious, shallow depth of field, colour grade ink #121A21 stone #F3EFE8 brass #B8893A muted lagoon accent, no text, no watermark, no neon, one clear subject, Horizon academy mood, 16:9",
        "ai02": "Flat editorial diagram three connected nodes in a calm horizontal pathway, empty label spaces for NEED SAFETY STICK, Ink #121A21 strokes on Stone #F3EFE8 field, Lagoon #2F6F6A accent nodes, round line caps, tiny brass #B8893A horizon arc micro top centre, teaching framework style, no characters, no 3D, no robot icons, FutureHer icon language, SVG-ready clarity, 16:9",
        "ai04": "Single clean desk teaching metaphor: phone face-up with blurred home screen, small notebook with three short handwritten rule lines (illegible soft blur), brass pen, South African home office daylight, Stone field #F3EFE8, Brass accent detail, shallow DOF, one subject cluster only, no collage, no neon, editorial still for education brand",
        "br01": "Phone home screen — many blurred app icons, slow scroll",
        "br03": "WhatsApp group blur — tool links unreadable",
        "br05": "Night desk — phone with unused apps, soft lamp",
        "screen_beats": """1. Notes title: My Trust Stack
2. Need: one sentence job for AI
3. Safety: three rules typed
4. Stick: circle ChatGPT or Gemini as Primary · 30 days
5. Optional: uninstall/mute list of other AI apps""",
        "stock_terms": """- woman phone natural light african
- hands writing notebook desk
- calm desk window morning
- phone hands indoor daylight""",
        "shorts": [
            {
                "code": "S1",
                "file": "S1_One_Tool_Is_Enough.txt",
                "title": "One AI tool is enough",
                "cut": "0:07–0:35",
                "publish": "Day 0 +2h",
                "role": "Emotional hook · Benchmark Short",
                "export": "FH_EP002_S1_OneTool.mp4",
                "hook_os": "One tool is enough.",
                "hook_vo": "One tool is enough.",
                "reframe_os": "Downloads ≠ progress",
                "reframe_vo": "If your phone is full of AI apps you never open — you're not behind. You're overloaded.",
                "value_os": "Need · Safety · Stick",
                "value_vo": "Trust isn't another download. It's Need, Safety, and Stick — one primary assistant you can live with.",
                "action_os": "Name one job for AI",
                "action_vo": "Open Notes. Write one sentence: I need AI to help me with ___. That's your Need.",
                "hashtags": "#FutureHer #AIForWomen",
            },
            {
                "code": "S2",
                "file": "S2_Free_Vs_Paid_Truth.txt",
                "title": "Free vs paid AI — the calm truth",
                "cut": "2:07–2:52",
                "publish": "Day 1 evening",
                "role": "Problem reframe",
                "export": "FH_EP002_S2_FreeVsPaid.mp4",
                "hook_os": "Free can be fine.",
                "hook_vo": "Free can be fine. Paid can be fine.",
                "reframe_os": "Wrong question: best app",
                "reframe_vo": "The question isn't which logo is trending. It's which tool matches a real Need and passes Safety.",
                "value_os": "Trust is a checklist",
                "value_vo": "If you can't explain where your data goes in one plain sentence — pause. That's trust, not fear.",
                "action_os": "Write one safety rule",
                "action_vo": "Write this rule now: never paste passwords or OTPs into AI. Keep it.",
                "hashtags": "#FutureHer #AIForWomen",
            },
            {
                "code": "S3",
                "file": "S3_Trust_Stack_60s.txt",
                "title": "The Trust Stack in 60 seconds",
                "cut": "4:07–5:12",
                "publish": "Day 0 +6h",
                "role": "Skill cutdown",
                "export": "FH_EP002_S3_TrustStack.mp4",
                "hook_os": "Stop collecting apps.",
                "hook_vo": "Stop collecting apps.",
                "reframe_os": "Pick a primary",
                "reframe_vo": "You don't need eight assistants. You need one primary tool for thirty days.",
                "value_os": "Need · Safety · Stick",
                "value_vo": "Need: one job. Safety: three rules. Stick: mute the rest and practise.",
                "action_os": "Choose your primary today",
                "action_vo": "Circle ChatGPT, Gemini, or Copilot in Notes. Write Primary — 30 days.",
                "hashtags": "#FutureHer #AIForWomen",
            },
            {
                "code": "S4",
                "file": "S4_Never_Paste_Passwords.txt",
                "title": "Never paste passwords into AI",
                "cut": "4:50–5:40",
                "publish": "Day 2",
                "role": "Safety beat",
                "export": "FH_EP002_S4_NoPasswords.mp4",
                "hook_os": "Never paste passwords.",
                "hook_vo": "Never paste passwords.",
                "reframe_os": "Safety is not paranoia",
                "reframe_vo": "A safety rule isn't you being difficult. It's you staying employable and calm.",
                "value_os": "Three non-negotiables",
                "value_vo": "No passwords. No private client files without permission. Always edit facts before you send.",
                "action_os": "Save three rules in Notes",
                "action_vo": "Type those three rules under Safety in your Trust Stack. Keep them forever.",
                "hashtags": "#FutureHer #AIForWomen",
            },
            {
                "code": "S5",
                "file": "S5_Good_Enough_Stack.txt",
                "title": "Your good-enough AI stack",
                "cut": "7:07–7:42",
                "publish": "Day 1",
                "role": "Action Short",
                "export": "FH_EP002_S5_GoodEnough.mp4",
                "hook_os": "Good enough beats perfect.",
                "hook_vo": "Good enough beats perfect.",
                "reframe_os": "30 days with one tool",
                "reframe_vo": "Fluency comes from repetition. Not from chasing every launch.",
                "value_os": "Stick for 30 days",
                "value_vo": "Pick one. Write three rules. Mute the circus. Practise on real tasks.",
                "action_os": "Mute unused AI apps",
                "action_vo": "Right now — mute or delete the AI apps you haven't opened this week.",
                "hashtags": "#FutureHer #AIForWomen",
            },
        ],
    }
)

# Continue in part 2 - remaining episodes will be appended via second write
print("Base definitions loaded; episodes defined so far:", len(EPISODES))
