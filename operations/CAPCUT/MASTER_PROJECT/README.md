# CapCut Master Project — Sprint 5

**Master name:** `FH_TMPL_Longform_8min`  
**Status:** Production-ready blueprint + CapCut IMPORT pack  
**Weekly rule:** Duplicate → replace **script · images · voice-over** only

CapCut project binaries live on Drive (`FutureHer/01_Templates/CapCut/`). This folder is the complete, decision-free build kit.

---

## What’s included

| Requirement | Location |
|---|---|
| Opening animation | Intro build + `IMPORT/motion/intro/` · `brand/09_capcut/` |
| Ending animation | Outro build + `IMPORT/motion/outro/` |
| Caption presets | `PRESETS/captions.json` |
| Brand fonts | `PRESETS/fonts.json` |
| Brand colours | `PRESETS/colours.json` |
| Motion presets | `PRESETS/motion.json` |
| Camera zoom presets | `PRESETS/camera_zoom.json` |
| Transition presets | `PRESETS/transitions.json` |
| Sound effect library | `LIBRARIES/sfx.md` |
| Background music library | `LIBRARIES/music_beds.md` |
| Safe areas | `OVERLAYS/` + `PRESETS/safe_areas.json` |
| Export presets | `PRESETS/export.json` |
| Auto-caption settings | `PRESETS/auto_captions.json` |
| Thumbnail frame markers | `MARKERS/thumbnail_frame.md` + marker `THUMB_FRAME` |
| End-screen markers | `MARKERS/endscreen.md` + marker `ENDSCREEN` |
| Full timeline blueprint | `MASTER_PROJECT.json` |
| Assemble once in CapCut | `ASSEMBLE_IN_CAPCUT.md` |
| Weekly card | `REPLACE_ONLY.md` |

---

## Quick start

```bash
# From repo root (requires brand/_build deps — sharp already installed there)
node operations/CAPCUT/MASTER_PROJECT/scripts/export_import_pack.mjs
```

Then open **`ASSEMBLE_IN_CAPCUT.md`** and build `FH_TMPL_Longform_8min` in CapCut Pro (3–4 hours once).

After lock, every episode:

1. Duplicate correct series master A–E  
2. Replace script / images / VO  
3. Fill Idea · Skill · Action  
4. Auto captions → export  

---

## Series masters

Duplicate base → specialise accents (specs in parent folder):

- `FH_TMPL_A_Educational` · Lagoon  
- `FH_TMPL_B_Money` · Brass  
- `FH_TMPL_C_Career` · Ink  
- `FH_TMPL_D_Relationships` · Clay  
- `FH_TMPL_E_Stories` · Mist + Brass  
- `FH_TMPL_Shorts_9x16` · vertical twin  
