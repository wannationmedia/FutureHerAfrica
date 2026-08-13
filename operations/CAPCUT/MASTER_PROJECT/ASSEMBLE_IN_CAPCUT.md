# Assemble CapCut Master — Setup Day (3–4 hours)

**Output binary:** CapCut project `FH_TMPL_Longform_8min`  
**Drive home:** `FutureHer/01_Templates/CapCut/`  
**Source of truth:** `MASTER_PROJECT.json`  
**Rule after lock:** Duplicate forever. Never edit the master weekly.

This package is production-ready. CapCut cannot store open project files in git — you assemble once in CapCut Pro from these locked specs.

---

## 0) Before CapCut (20 min)

- [ ] Install **Satoshi** (+ Newsreader optional) — see `PRESETS/fonts.json`
- [ ] Confirm logo PNGs exist: `brand/01_logo/png/`
- [ ] Run motion PNG export (repo root):

```bash
node operations/CAPCUT/MASTER_PROJECT/scripts/export_import_pack.mjs
```

- [ ] Open folder `IMPORT/` created by the script — this is your CapCut media bin
- [ ] Create Drive folder `01_Templates/CapCut/`

---

## 1) New project shell (5 min)

- [ ] CapCut → New project  
- [ ] Canvas **1920×1080 · 30 fps**  
- [ ] Rename project **`FH_TMPL_Longform_8min`**  
- [ ] Import entire `IMPORT/` folder  
- [ ] Save brand colours from `PRESETS/colours.json` into CapCut colour favourites  

---

## 2) Opening animation — `FH_TMPL_Intro_7s` (25 min)

Build per `brand/09_capcut/FH_TMPL_Intro_7s_BUILD.md` **or** screen-record `brand/09_capcut/FH_TMPL_Intro_Preview.html`.

- [ ] Stone → Ink wash 0.00–0.40  
- [ ] Horizon arc + Brass tip dot  
- [ ] Wordmark Ivory / Satoshi Semibold 72  
- [ ] Tagline: *Ready for what’s next.*  
- [ ] Soft mallet sting (~1.2s) — **no whoosh**  
- [ ] Export compound / nest as `FH_TMPL_Intro_7s`  
- [ ] Optional: duplicate trim → `FH_TMPL_Intro_Shorts_2s`  

---

## 3) Ending animation — `FH_TMPL_Outro_30s` (30 min)

Build per `brand/09_capcut/FH_TMPL_Outro_30s_BUILD.md`.

- [ ] IDEA / SKILL / ACTION slots with placeholder copy  
- [ ] CTA row: Subscribe + Forward Collective  
- [ ] Hold: wordmark + *Welcome forward.*  
- [ ] Nest endscreen guide from `OVERLAYS/FH_Endscreen_Zones_*` (disable on export)  
- [ ] Save compound `FH_TMPL_Outro_30s` + `FH_TMPL_Endscreen`  

---

## 4) Caption + auto-caption presets (20 min)

- [ ] Drop 30s sample VO → **Auto captions** (`PRESETS/auto_captions.json`)  
- [ ] Style → `PRESETS/captions.json` → save favourite **`FH_TMPL_Captions_Style`**  
- [ ] Apply to all · screenshot settings for archive  
- [ ] Delete sample VO (keep style favourite)  

---

## 5) Brand fonts, colours, grade (10 min)

- [ ] Default text font = Satoshi  
- [ ] Colour swatches saved  
- [ ] Adjustment layer `FH_Grade_Horizon` from `PRESETS/grade.json` · ≤30% · favourite  

---

## 6) Motion + camera zoom + transitions (20 min)

- [ ] Favourite transitions from `PRESETS/transitions.json` (`FH_TR_*`)  
- [ ] Build zoom keyframe favourites from `PRESETS/camera_zoom.json` (`FH_ZOOM_*`)  
- [ ] Build motion fades from `PRESETS/motion.json` (`FH_MOT_*`)  
- [ ] Set default transition = `FH_TR_Dissolve_300`  

---

## 7) Sound FX + music libraries (25 min)

- [ ] Favourite beds per `LIBRARIES/music_beds.md`  
- [ ] Favourite ≤8 SFX per `LIBRARIES/sfx.md`  
- [ ] Log exact CapCut track names → `brand/16_audio/beds-approved.md`  
- [ ] Place Bed A on music track at **−26 dB** for full length  
- [ ] Intro sting inside intro compound  

---

## 8) Safe areas (10 min)

- [ ] Import overlays from `OVERLAYS/` (PNG from export script)  
- [ ] Place on guide track @ 40% opacity  
- [ ] **Disable / mute guide track before any export**  
- [ ] Keep compounds named `FH_GUIDE_Safe_Long` / `FH_GUIDE_Safe_Shorts`  

---

## 9) Master timeline slots + markers (35 min)

Lay solid colour / slate placeholders for each replaceable block (Ink `#121A21` + white label text):

| Slot | Duration | Label on slate |
|---|---|---|
| Intro | 7s | Locked compound |
| Hook | 30s | REPLACE · script / images / VO |
| Story | 90s | REPLACE |
| Problem | 120s | REPLACE |
| Skill | 120s | REPLACE · + empty screen-record lane |
| Psychology | 60s | REPLACE |
| Action | 40s | REPLACE · action card text |
| CTA | 20s | Locked CTA pack |
| Preview | 10s | REPLACE |
| Outro | 30s | Locked · Idea/Skill/Action text slots |

- [ ] Nest intro at head · outro + endscreen at tail  
- [ ] Nest lower thirds pack (`COMPOUNDS/lower_thirds.md`) off-timeline or opacity 0 examples  
- [ ] Nest CTA pack (`COMPOUNDS/cta_pack.md`) in CTA block  
- [ ] Add **all markers** from `MARKERS/timeline_markers.json`  
- [ ] Confirm `THUMB_FRAME` + `ENDSCREEN` + `S1`–`S5` exist  

---

## 10) Export presets (10 min)

Save CapCut export presets from `PRESETS/export.json`:

- [ ] `FH_YT_1080p`  
- [ ] `FH_Shorts_1080x1920`  
- [ ] `FH_REEL_01..03` naming convention noted  
- [ ] Intro/outro compound exports if used as linked media  

---

## 11) Shorts master (25 min)

- [ ] New project **1080×1920 · 30fps** → `FH_TMPL_Shorts_9x16`  
- [ ] Hook text style · series pill · scaled captions · CTA_04 end  
- [ ] Safe-area Shorts overlay on guide track  
- [ ] Sign-off locked: *One step today. A different future tomorrow.*  
- [ ] Export preset `FH_Shorts_1080x1920`  
- [ ] Lock master  

---

## 12) Thumbnail master (15 min)

- [ ] Project or compound `FH_TMPL_Thumbnail_1280x720`  
- [ ] Zones from overlay · face + title + pill + FH mark  
- [ ] Lock  

---

## 13) Duplicate series masters A–E (30 min)

From locked `FH_TMPL_Longform_8min`:

- [ ] Duplicate → `FH_TMPL_A_Educational` (Lagoon accents)  
- [ ] Duplicate → `FH_TMPL_B_Money` (Brass)  
- [ ] Duplicate → `FH_TMPL_C_Career` (Ink)  
- [ ] Duplicate → `FH_TMPL_D_Relationships` (Clay)  
- [ ] Duplicate → `FH_TMPL_E_Stories` (Mist + Brass · slower dissolves)  
- [ ] Tint series markers / keyword caption accent per `PRESETS/colours.json`  
- [ ] **Lock all six masters** (base + A–E)  

---

## 14) Lock + smoke test (15 min)

- [ ] Duplicate base → `FH_REHEARSAL_Dummy`  
- [ ] Drop any test VO + 3 images into Hook/Story/Skill  
- [ ] Auto captions → apply style  
- [ ] Fill Idea / Skill / Action  
- [ ] Export `FH_YT_1080p`  
- [ ] Confirm ≤4 hours weekly path is real  
- [ ] Delete or archive rehearsal — **do not overwrite masters**  

---

## Done when

You can start every FutureHer episode by:

1. **Duplicate** the correct A–E master  
2. Replace only **script · images · voice-over**  
3. Fill Idea / Skill / Action text  
4. Auto-caption → export  

Everything else already exists inside the CapCut project.
