# EP001 — Production Runbook

**Channel:** FutureHerAfrica · `@FutureHerAfrica`  
**Episode:** AI won't replace you — but ignoring this will  
**Slug:** `ep001-ai-wont-replace-you-task-layer`  
**Mode:** Founder media production (linear)  
**Date:** 2026-08-09  

**Verified repo state (do not re-audit brand):**  
LOCAL BRAND STATUS: PASS · HOST STATUS: PASS · LOCAL VISUAL STATUS: PASS · CHANNEL SETUP STATUS: FOUNDER VERIFIED · EP001 ASSET STATUS: FAIL (media pending)

**Hard rules:** Do not rebuild the brand. Do not regenerate the approved host. Do not modify EP002–EP010. Do not create duplicate assets. Do not attempt YouTube HTTP/API verification.

**Nothing in this runbook claims VO, footage, CapCut export, Shorts, or upload have already been completed.**

---

## PHASE 1 — VO

**Voice authority:** `launch/VOICE/FUTUREHERAFRICA_VOICE_SYSTEM.md`  
**Option B:** female African AI/narrator **voice direction** — not a person named Brian/Byron.  
**Male voice:** PROHIBITED.

```
VOICE GENDER: FEMALE
VOICE CULTURAL DIRECTION: AFRICAN
PRIMARY LANGUAGE: ENGLISH
HOST: EXISTING APPROVED FEMALE AI HOST (do not change)
```

### Script source (use this — do not rebuild)

1. Primary read: `launch/EP001/SCRIPT_VO.txt`  
2. Pack twin: `launch/EP001/PUBLISH/02_VOICEOVER_SCRIPT.txt`  

Read calm. No hype. Pause where marked `/`.

### Recording / narration requirements

- **Female African** voice only (performer or configured female African TTS — never male)
- Authentically African · intelligent · articulate · contemporary · confident · warm but authoritative · natural not robotic
- Complements the approved female AI host — does not replace her
- One continuous take preferred (or clean section takes you can stitch)
- Quiet room · phone/USB mic or approved TTS render · no music under the read
- Clear South African English · mentor pace · breath pauses at `/`
- Do not rewrite the script during record
- Do not use Brian, Byron, or any male narrator

### Localization architecture (same visuals later)

EN master first. Same visual edit later supports localized female narration in canonical order: **NSO → VE → TS → ZU** (Foundation Manual §9). Do not mix languages inside one narration file.

### Required audio format

- WAV preferred (PCM) · mono or stereo · 44.1 kHz or 48 kHz  
- If phone only records M4A/MP3, convert to WAV before CapCut import when possible

### Filename + destination

| Field | Value |
|---|---|
| Filename | `EP001_VO_v1.wav` (= EN master) |
| Destination | `launch/EP001/audio/EP001_VO_v1.wav` |

Drop instructions also in `launch/EP001/audio/README.txt`.  
Later language files: `EP001_VO_NSO_v1.wav` · `EP001_VO_VE_v1.wav` · `EP001_VO_TS_v1.wav` · `EP001_VO_ZU_v1.wav`.

**TTS note:** No voice-provider configuration or voice ID is currently in the repository. Do not claim synthetic audio was generated until a configured system writes a real file.

**Phase 1 done when:** the EN WAV exists at that path.

---

## PHASE 2 — SCREEN / B-ROLL

**Master list:** `launch/EP001/PUBLISH/05_BROLL_LIST.txt`  
**Capture checklist:** `launch/EP001/footage/CAPTURE_MANIFEST.txt`  
**Destination root:** `launch/EP001/footage/broll/`

### Required shots (minimum before CapCut export)

| ID | Shot | Duration | Founder capture? | Existing asset? | Save as |
|---|---|---|---|---|---|
| **SR01** | Screen: 5 tasks → ASSIST/OWN/HYBRID → AI draft → human edit | 60–90s | **YES — required** | No | `footage/broll/SR01_task_layer_screen.mp4` |
| **BR01** | Phone vertical scroll — AI/news headlines blurred | 6–8s | **YES — required** | No | `footage/broll/BR01_phone_scroll.mp4` |
| **BR03** | WhatsApp/group chat UI fully blurred | 5–7s | **YES — required** | No | `footage/broll/BR03_whatsapp_blur.mp4` |
| **BR04** | Desk wide — soft SA daylight, notebook + laptop | 6–8s | **YES — required** | No | `footage/broll/BR04_desk_daylight.mp4` |
| **AR01** | A-roll face — hook + psychology coverage (MCU) | as needed | **YES — required** | Host still exists for thumb only — not A-roll replacement | `footage/broll/AR01_host_aroll.mp4` |

### Optional upgrade shots (capture if time)

| ID | Shot | Founder capture? | Existing / fallback |
|---|---|---|---|
| BR02 | MCU host punch-line coverage | YES | Can reuse AR01 if punch covered |
| BR05 | Night desk lamp + blurred job listing scroll | YES | Skip if timeboxed |
| BR06 | Calm hands on laptop | YES or CapCut YT-safe stock | Stock OK |
| BR07 | Hands typing — warm daylight | YES or CapCut YT-safe stock | Stock OK |

### Existing assets already ready (do not regenerate)

| ID | Use | Path |
|---|---|---|
| **AC01** | Action card insert (still) | `launch/EP001/PUBLISH/AC01_ACTION_CARD.png` |
| **TH01** | Custom thumbnail (upload + edit ref) | `launch/EP001/PUBLISH/08_THUMBNAIL.png` |
| Host lock | Approved host for thumb consistency only | `launch/EP001/FH_EP001_Thumbnail.png` |

### Optional AI stills (only if B-roll gap; max 3 in edit)

Prompts ready in `PUBLISH/04_AI_IMAGE_PROMPTS.txt` → drop into `launch/EP001/assets/`  
Prefer own B-roll first. Do not invent a new host face.

### SR01 beat sheet (record in this order)

1. Blank notes — title “This week’s tasks”  
2. Type/paste 5 tasks  
3. Label ASSIST / OWN / HYBRID  
4. AI prompt: polite client email Tuesday 10:00 · warm professional · South African English  
5. Paste draft → edit 2–3 lines (highlight)  
6. End on edited paragraph  

Blur all real names, contacts, and private data.

### 20-minute minimum shoot order

1. BR01 → 2. BR03 → 3. BR04 → 4. SR01 → 5. AR01  

**Phase 2 done when:** SR01 + BR01 + BR03 + BR04 + AR01 exist under `footage/broll/` and VO is in `audio/`.

---

## PHASE 3 — MASTER EDIT

### Canonical CapCut project / template

| Field | Value |
|---|---|
| Duplicate from | **FH_TMPL_A_Educational** (never edit the master template) |
| Rename project | `FH_EP001_AI_TaskLayer` |
| Bible | `launch/EP001/PUBLISH/06_CAPCUT_PROJECT/EDIT_BIBLE.txt` |
| Slot order | `launch/EP001/PUBLISH/06_CAPCUT_PROJECT/PROJECT.json` |
| Overlays | `launch/EP001/PUBLISH/06_CAPCUT_PROJECT/TEXT_OVERLAYS.txt` |
| Edit sheet | `launch/EP001/CAPCUT_EDIT_SHEET.txt` |
| Canvas | 1920×1080 · 30fps · ~8:25 |
| Grade | FH_Grade_Horizon · Accent Lagoon `#2F6F6A` |

### Import

- `launch/EP001/audio/EP001_VO_v1.wav` → **A1**  
- `launch/EP001/footage/` (broll + SR01 + A-roll)  
- `PUBLISH/08_THUMBNAIL.png` · `PUBLISH/AC01_ACTION_CARD.png`  
- Optional `assets/` stills only if used  

### Required intro

- Duration: **6–8s** (≤ 8s to value)  
- Horizon arc + **FutureHerAfrica** wordmark + series pill **FutureHerAfrica · AI**  
- Build refs: `brand/09_capcut/FH_TMPL_Intro_7s_BUILD.md` · frames `brand/08_motion/intro/`  
- Soft whoosh only if already in master template; silence OK  

### Required host footage

- Prefer founder **AR01** A-roll for hook + psychology  
- Approved AI host still remains the thumbnail/identity lock — **do not regenerate a new host**  
- Track map: **V1** A-roll/host · **V2** B-roll/AI stills · **V3** screen + graphics/action card · **V4** intro/outro  

### B-roll placement (timeline)

| Time | Section | Visual |
|---|---|---|
| 00:00–00:30 | HOOK [S1] | BR01 → cut to AR01 on “you're not dramatic” |
| 00:30–02:00 | STORY | BR03 · BR04 · notebook/daylight |
| 02:00–04:00 | PROBLEM [S2] | Calm laptop / BR06 stock OK · lower-thirds |
| 04:00–06:00 | SKILL [S3] | Task Layer title · **SR01** primary |
| 06:00–07:00 | PSYCHOLOGY [S4] | Soft dissolve · minimal · AR01 if needed |
| 07:00–07:40 | ACTION [S5] | Full-screen **AC01** hold **3s** |
| 07:40–07:55 | CTA | Idea / Skill / Action / Forward Collective |
| 07:55–08:05 | Preview + outro | “Next — which AI tools to trust” · logo settle |

Markers: **S1@0:07 · S2@2:07 · S3@4:07 · S4@6:07 · S5@7:07**

### Captions

1. Auto-caption from VO → apply FH caption style  
2. Fix against `PUBLISH/07_SUBTITLES_EN.srt` (upload source of truth for YouTube)  
3. Satoshi Bold/Medium · Ivory on Ink bar **or** Ink on Stone · max 2 lines · no karaoke rainbow  
4. Keyword underline Lagoon rare (framework name only)  

### Music / audio

- VO on **A1** · denoise · normalize  
- Music bed on **A2** at **12–18%** under VO · dip on action card · slight outro lift  
- Use CapCut **commercial-safe** soft pad/mallet only (`brand/16_audio/beds-approved.md` still EMPTY — pick safe CapCut bed and note the track name)  
- Soft ticks on Map/Label/Run only (**A3**) · no trademark WhatsApp notification SFX  

### Watermark

- Source: `brand/15_watermarks/FH_Logo_Watermark_FH_16pct.png`  
- Placement: bottom-right · ~4% margin · never cover faces or captions · do not animate  

### Outro

- Locked Idea / Skill / Action / CTA text in EDIT_BIBLE  
- Build refs: `brand/09_capcut/FH_TMPL_Outro_30s_BUILD.md` · frames `brand/08_motion/outro/`  
- End screen space last ~20s for YouTube tiles  

### Export specification

| Spec | Value |
|---|---|
| Aspect | **16:9** |
| Resolution | 1080p (or 4K) H.264 |
| Target length | ~8:00–8:25 |
| Filename | `FH_EP001_AI_TaskLayer_v1.mp4` |
| Destination | `launch/EP001/exports/FH_EP001_AI_TaskLayer_v1.mp4` |

**Phase 3 done when:** that master MP4 exists at the export path.

---

## PHASE 4 — SHORTS (S1–S5)

**System:** `PUBLISH/15_SHORTS/SHORTS_MASTER.txt` · `operations/SHORTS/SHORTS_ENGINE.md`  
**Method:** Duplicate master timeline → crop **9:16** from S markers · burned captions · brand arc BR 12–18% · series pill top  
**Destination:** `launch/EP001/exports/`  
**Locked sign-off:** One step today. A different future tomorrow.  
**CTA (all):** Full lesson on FutureHerAfrica (+ Collective link on S5 / descriptions)

### S1 — You're not dramatic for fearing AI

| Field | Value |
|---|---|
| Source timecode | **0:07–0:35** |
| Script | `PUBLISH/15_SHORTS/S1_Youre_Not_Dramatic.txt` |
| Crop | 9:16 · eyes upper third |
| Captions | Burned · large type · “You're not dramatic.” |
| CTA | Full lesson on FutureHerAfrica |
| Export | `FH_EP001_S1_NotDramatic.mp4` |
| Destination | `launch/EP001/exports/FH_EP001_S1_NotDramatic.mp4` |

### S2 — Fear isn't a forecast

| Field | Value |
|---|---|
| Source timecode | **2:07–2:52** |
| Script | `PUBLISH/15_SHORTS/S2_Fear_Not_Forecast.txt` |
| Crop | 9:16 · eyes upper third |
| Captions | Burned · “Fear ≠ forecast” |
| CTA | Full lesson on FutureHerAfrica |
| Export | `FH_EP001_S2_FearNotForecast.mp4` |
| Destination | `launch/EP001/exports/FH_EP001_S2_FearNotForecast.mp4` |

### S3 — You don't need to master AI this week

| Field | Value |
|---|---|
| Source timecode | **4:07–5:12** |
| Script | `PUBLISH/15_SHORTS/S3_Task_Layer_60s.txt` |
| Crop | 9:16 · keep screen/framework readable |
| Captions | Burned · “Map · Label · Run one” |
| CTA | Full lesson on FutureHerAfrica |
| Export | `FH_EP001_S3_TaskLayer.mp4` |
| Destination | `launch/EP001/exports/FH_EP001_S3_TaskLayer.mp4` |

### S4 — Vague fear keeps you stuck

| Field | Value |
|---|---|
| Source timecode | **6:07–6:55** |
| Script | `PUBLISH/15_SHORTS/S4_Vague_Fear.txt` |
| Crop | 9:16 · calm face-safe |
| Captions | Burned · “Fear is data.” |
| CTA | Full lesson on FutureHerAfrica |
| Export | `FH_EP001_S4_VagueFear.mp4` |
| Destination | `launch/EP001/exports/FH_EP001_S4_VagueFear.mp4` |

### S5 — Map 5 tasks. Run 1 with AI.

| Field | Value |
|---|---|
| Source timecode | **7:07–7:42** |
| Script | `PUBLISH/15_SHORTS/S5_Map_5_Run_1.txt` |
| Crop | 9:16 · action card readable |
| Captions | Burned · “Start your five-task list now” |
| CTA | Full lesson on FutureHerAfrica · Collective → `https://www.youtube.com/@FutureHerAfrica/community` |
| Export | `FH_EP001_S5_Map5Run1.mp4` |
| Destination | `launch/EP001/exports/FH_EP001_S5_Map5Run1.mp4` |

**Phase 4 done when:** all five Shorts MP4s exist in `exports/`.

---

## PHASE 5 — QC (binary)

Mark each **PASS** or **FAIL**. Any FAIL blocks Public.

| Check | PASS / FAIL |
|---|---|
| Voice — calm, clear, matches script | |
| Sync — VO aligned to picture | |
| Framing — 16:9 master safe; faces not clipped | |
| Captions — readable, ≤2 lines, correct names | |
| Branding — FutureHerAfrica · AI series pill / locked sign-off | |
| Logo — Horizon mark only; no redesign | |
| Host consistency — same approved host identity; no new face | |
| Audio — VO clear on phone; bed 12–18%; no clipping | |
| Thumbnail — `PUBLISH/08_THUMBNAIL.png` matches content | |
| CTA — Forward Collective / subscribe present | |
| 16:9 master — `exports/FH_EP001_AI_TaskLayer_v1.mp4` exists | |
| 9:16 Shorts — S1–S5 export files exist | |
| File existence — VO WAV + required broll/SR01/AR01 present | |

Also run human items in `PUBLISH/16_PRE_PUBLISH_GATE.txt` after export.

**Phase 5 done when:** every row above is PASS.

---

## PHASE 6 — YOUTUBE (UNLISTED QC)

Use existing upload pack — do not invent new copy.

| Field | Value |
|---|---|
| Channel name | **FutureHerAfrica** |
| Handle | **@FutureHerAfrica** |
| Upload pack | `launch/EP001/UPLOAD_PACK.txt` |
| Title | AI won't replace you — but ignoring this will |
| Thumbnail | `PUBLISH/08_THUMBNAIL.png` |
| Description | Paste `PUBLISH/09_DESCRIPTION.txt` |
| Captions file | Upload `PUBLISH/07_SUBTITLES_EN.srt` |
| Chapters | `PUBLISH/10_CHAPTERS.txt` |
| Tags / SEO | `UPLOAD_PACK.txt` + `PUBLISH/11_SEO.txt` |
| Hashtags | `PUBLISH/12_HASHTAGS.txt` |
| Pinned comment | `PUBLISH/14_PINNED_COMMENT.txt` (after Public or when ready) |
| Community post | `PUBLISH/13_COMMUNITY_POST.txt` (after Public) |
| Playlist | FutureHerAfrica · AI |
| Category | Education |
| **Visibility** | **UNLISTED** for initial QC |
| After Unlisted QC PASS | Public · pin · Community · schedule Shorts per SHORTS_MASTER |

End screen (last 20s): Subscribe · AI playlist · Forward Collective  
Cards: Subscribe @ 0:45 · Community @ 7:40  

Do **not** link to third-party `youtube.com/@FutureHer`.

**Phase 6 done when:** Unlisted upload is live for phone QC (Public only after Phase 5 PASS).

---

## FOUNDER ACTION NOW

1. Record VO → save as `launch/EP001/audio/EP001_VO_v1.wav` from `SCRIPT_VO.txt`.  
2. Capture minimum media → `footage/broll/`: **SR01, BR01, BR03, BR04, AR01**.  
3. CapCut: duplicate **FH_TMPL_A_Educational** → edit per EDIT_BIBLE → export `exports/FH_EP001_AI_TaskLayer_v1.mp4`.  
4. Cut Shorts S1–S5 → QC binary checklist → upload **Unlisted** with `UPLOAD_PACK.txt` to FutureHerAfrica / `@FutureHerAfrica`.

---

## CURSOR ACTION COMPLETE

1. Audited EP001 publish state and confirmed media production is the remaining blocker.  
2. Created this linear runbook at `launch/EP001/PRODUCTION/EP001_PRODUCTION_RUNBOOK.md`.  
3. Pointed every phase to existing canonical pack paths (no brand rebuild, no new host, no EP002–EP010 changes, no YouTube HTTP/API verification, no production completion claims).

---

*Stop. Media not recorded. Master not exported. Episode not uploaded.*
