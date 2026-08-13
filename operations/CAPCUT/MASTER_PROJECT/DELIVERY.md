# Sprint 5 — CapCut Master Project Delivery

**Master:** `FH_TMPL_Longform_8min`  
**Kit path:** `operations/CAPCUT/MASTER_PROJECT/`  
**IMPORT pack:** `IMPORT/` (generated — logos, motion PNGs, overlays, slates)

## Requirement map

| Asked for | Delivered |
|---|---|
| Opening animation | Intro compound specs + frames + HTML preview + IMPORT PNGs |
| Ending animation | Outro compound specs + frames + HTML preview + IMPORT PNGs |
| Caption presets | `PRESETS/captions.json` |
| Brand fonts | `PRESETS/fonts.json` |
| Brand colours | `PRESETS/colours.json` |
| Motion presets | `PRESETS/motion.json` |
| Camera zoom presets | `PRESETS/camera_zoom.json` |
| Transition presets | `PRESETS/transitions.json` |
| Sound effect library | `LIBRARIES/sfx.md` |
| Background music library | `LIBRARIES/music_beds.md` |
| Safe areas | `OVERLAYS/` + PNGs in IMPORT |
| Export presets | `PRESETS/export.json` |
| Auto-caption settings | `PRESETS/auto_captions.json` |
| Thumbnail frame markers | `MARKERS/thumbnail_frame.md` · marker `THUMB_FRAME` |
| End-screen markers | `MARKERS/endscreen.md` · marker `ENDSCREEN` |
| Replace only script / images / VO | `REPLACE_ONLY.md` + slate placeholders |

## CapCut binary note

CapCut does not store open, portable project files in git. The production binary is created once in CapCut Pro by following `ASSEMBLE_IN_CAPCUT.md`, then saved to Drive `FutureHer/01_Templates/CapCut/`.

Until that Setup Day session is run, this kit is the complete master — zero design decisions left.

## Activate

```bash
node operations/CAPCUT/MASTER_PROJECT/scripts/export_import_pack.mjs
```

Open `ASSEMBLE_IN_CAPCUT.md` → lock masters → weekly use `REPLACE_ONLY.md`.
