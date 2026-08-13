# FutureHerAfrica — Logo Design System

**Document type:** Official logo system specification (candidate adoption track)  
**Brand name (locked):** `FutureHerAfrica`  
**System lineage:** Horizon (Modern African Contemporary)  
**Candidate codename:** **FHA-01 Ascend**  
**Status:** Controlled candidate — **not** production-adopted  
**Effective:** August 2026  
**AI host:** Unchanged — see `brand/FUTUREHERAFRICA_AI_HOST_BIBLE.md`

---

## 0. Authority & non-replacement law

| Asset class | Path | Status |
|---|---|---|
| **Approved production logos** | `brand/01_logo/svg/` · `png/` · `app/` · `favicon/` (`FH_Logo_*`) | **Preserve — do not delete, overwrite, or auto-replace** |
| **FHA-01 Ascend candidate pack** | `brand/01_logo/candidates/fha_v1/` (`FHA_Logo_*`) | Proposal only until explicit brand adoption |
| **Colour / type authority** | `brand/03_colour/` · Studio §4–5 · Satoshi | Reuse as-is |
| **AI host** | Host bible + generation prompt | Locked — not a brand mark |

**Rule:** Existing approved Horizon masters remain the live brand mark until a written adoption decision promotes FHA-01 (or a successor candidate) into `brand/01_logo/` production paths.

**Rebuild candidate pack:**

```bash
cd brand/_build && node generate-fha-logo-candidates.mjs
```

---

## 1. Brand positioning (logo must support)

| Priority | Role | Logo implication |
|---|---|---|
| **1 — Media first** | Broadcast-ready mark for YouTube, thumbs, motion | Clear silhouette at 16–32px; strong dark/light reverse |
| **2 — Community second** | Warm, human, collective presence | Soft geometry, no cold tech tropes; social avatar is the mark, not a face |
| **3 — Education third** | Academy calm and trust | Restrained Satoshi wordmark; premium spacing; no hustle graphics |

**Feel (required):** human · intelligent · modern · African · premium · warm · optimistic · forward-looking · timeless  

**Must not feel like:** an AI startup, influencer channel, NGO costume brand, or neon edtech.

---

## 2. Concept rationale — FHA-01 Ascend

### 2.1 Locked name

```
FutureHerAfrica
```

- One word · Title case with three capitals: **F**uture **H**er **A**frica  
- Never `FUTUREHERAFRICA` as the logo  
- Never space the mark (`Future Her Africa`) inside logo masters  
- Prose may say “Future Her Africa” only when grammar requires; product/brand lockup stays camel-joined

### 2.2 Symbol metaphor

**Ascend** is a single abstract mark that works **without** the wordmark.

| Signal | How the mark carries it |
|---|---|
| **F — Future** | Left upright + short top spur (abstract F structure) |
| **H — Her** | Twin uprights bridged by the rising arc (abstract H) |
| **A — Africa** | Open ascending silhouette / portal peak (abstract A / ascend) |
| **Horizon** | Rising open Brass stroke left → right (Horizon lineage) |
| **Forward movement** | Asymmetric rise; right stem slightly lower; micro-dot at tip |
| **Growth / potential** | Arc lifts above the uprights; micro-dot = next step / dawn |
| **Human** | Vertical presence (uprights) under a warm horizon — not a face |

**Continuity with approved Horizon:** The rising arc + micro-dot language is preserved so FHA-01 feels like an evolution, not a rebrand rupture. At favicon size the mark **collapses to arc + micro-dot** (proven Horizon small-size behaviour).

### 2.3 What the mark deliberately avoids

Robot imagery · AI brains · circuit boards · generic female silhouettes · Venus / gender symbols · crowns · lightbulbs · Africa maps · flags · tribal costume motifs · neon gradients · cyberpunk · influencer chrome · pink “Her” · sun emoji · smile-arc misuse.

---

## 3. Construction principles

### 3.1 Optical grid (symbol)

| Spec | Value |
|---|---|
| Optical field | Square |
| Construction grid | 100-unit field inside padding |
| Default padding | 18–22% of side (social / app use 20–22%) |
| Uprights | Parallel stems; round caps; Ink (or Ivory on dark) |
| Left spur | Short top bar from left stem — **must not** meet right stem |
| Right stem | Slightly shorter at top (forward asymmetry) |
| Arc | Single open quadratic stroke; round caps; Brass in colour versions |
| Arc motion | Rising left → right; peak optically above centre gap |
| Micro-dot | Filled circle at arc tip; ≈ 0.45–0.55× arc stroke |
| Soft-square radius | **16%** of side (avatars / app / favicon containers) |

### 3.2 Wordmark

| Spec | Value |
|---|---|
| Typeface | **Satoshi Medium** (outlined in masters) |
| Case | `FutureHerAfrica` |
| Tracking | ≈ −1% optical |
| Colour (light) | Ink `#121A21` |
| Colour (dark) | Ivory `#FFFCF8` |
| Rare | Brass `#B8893A` (awards / foil / merch only) |

### 3.3 Lockup geometry

| Lockup | Structure |
|---|---|
| **Primary** | Ascend mark centred above single-line wordmark |
| **Horizontal** | Mark left · wordmark right · vertical optical centre |
| **Stacked** | Mark above · `FutureHer` · `Africa` (two lines, centred) |
| **Wordmark** | Type only — nav / dense UI |
| **Symbol** | Mark only — must remain identifiable alone |

### 3.4 Clear space

Minimum clear space on all sides of any lockup = **cap-height of H** in that lockup’s wordmark (or equivalent optical unit of the symbol field when symbol-only).

Do not place type, UI chrome, host photography, or series pills inside clear space.

### 3.5 Minimum sizes

| Form | Digital min | Print min | Note |
|---|---|---|---|
| Primary / horizontal lockup | **140px** wide | **36mm** | Longer wordmark than legacy FutureHer |
| Stacked lockup | **96px** wide | **28mm** | |
| Symbol (full Ascend) | **40px** | **10mm** | |
| Symbol small (arc + dot only) | **16px** | **5mm** | Favicon / watermark micro |
| Wordmark only | **120px** wide | **30mm** | |

**Small-size law:** Below **40px**, drop uprights + F spur; use **arc + micro-dot** only (`FHA_Logo_Symbol_Small_*` / favicon).

---

## 4. Colour specifications

Reuse FutureHer Horizon tokens (`brand/03_colour/FH_Colour_Swatches.md`).

### 4.1 Logo colours

| Role | Name | HEX | Use in logo |
|---|---|---|---|
| Authority | Ink | `#121A21` | Stems, wordmark (light), dark fields |
| Warm field | Stone | `#F3EFE8` | Default light master backgrounds |
| Lift | Ivory | `#FFFCF8` | Wordmark/stems on dark; reverse |
| Action / horizon | Brass | `#B8893A` | Arc + micro-dot (colour versions) |
| Deep field | Night | `#0B1014` | Optional deeper dark (rare) |

### 4.2 Colour versions

| Version | Stems / word | Arc / dot | Field |
|---|---|---|---|
| Light (default) | Ink | Brass | Stone or transparent on light |
| Dark (default reverse) | Ivory | Brass | Ink or transparent on dark |
| Monochrome Ink | Ink | Ink | Stone / transparent |
| Monochrome Ivory | Ivory | Ivory | Ink / transparent |
| Brass solid (rare) | Brass | Brass | Light field / foil |

**Usage law reminder:** 70% Ink/Stone · Brass for arc/CTA emphasis · no purple-pink tech gradients · no Brass wordmark on Clay.

### 4.3 Contrast

- Ink on Stone / Ivory — default light  
- Ivory on Ink — default dark  
- Brass arc must remain visible on both; if Brass fails on a photo, switch to Mono Ivory/Ink panel behind the mark

---

## 5. Logo system inventory (candidate)

**Root:** `brand/01_logo/candidates/fha_v1/`

### 5.1 Required system map

| # | System role | Final candidate asset IDs |
|---|---|---|
| 1 | Primary FutureHerAfrica logo | `FHA_Logo_Primary_Light` · `FHA_Logo_Primary_Dark` · `FHA_Logo_Primary_Transparent_Ink` · `FHA_Logo_Primary_Transparent_Ivory` |
| 2 | Symbol-only mark | `FHA_Logo_Symbol_Colour` · `FHA_Logo_Symbol_Brass` · `FHA_Logo_Symbol_Ink` · `FHA_Logo_Symbol_Ivory` |
| 3 | Wordmark | `FHA_Logo_Wordmark_Ink` · `FHA_Logo_Wordmark_Ivory` · `FHA_Logo_Wordmark_Brass` |
| 4 | Horizontal lockup | `FHA_Logo_Horizontal_Light` · `FHA_Logo_Horizontal_Dark` · `FHA_Logo_Horizontal_Transparent_Ink` · `FHA_Logo_Horizontal_Transparent_Ivory` |
| 5 | Stacked lockup | `FHA_Logo_Stacked_Light` · `FHA_Logo_Stacked_Dark` · `FHA_Logo_Stacked_Transparent_Ink` |
| 6 | Monochrome | `FHA_Logo_Mono_Ink` · `FHA_Logo_Mono_Ivory` · `FHA_Logo_Mono_Transparent_Ink` · `FHA_Logo_Mono_Transparent_Ivory` |
| 7 | Light-background version | Prefer `*_Light` / `*_Transparent_Ink` on Stone/Ivory/Mist |
| 8 | Dark-background version | Prefer `*_Dark` / `*_Transparent_Ivory` on Ink/Night |
| 9 | Small-size / favicon | `favicon/FHA_Logo_Favicon.svg` · `_32.png` · `_16.png` · `FHA_Logo_Symbol_Small_Brass` · `FHA_Logo_Symbol_Small_Ivory` |
| 10 | Social profile | `social/FHA_Logo_Social_800` · `FHA_Logo_Social_1080` |

**Also in pack:** `app/FHA_Logo_AppIcon_1024` · review board `FHA_Logo_Candidate_Sheet` · pack `README.md`

### 5.2 Final candidate recommendation

| Decision | Value |
|---|---|
| **Final candidate** | **FHA-01 Ascend** |
| **Primary master (light)** | `candidates/fha_v1/svg/FHA_Logo_Primary_Light.svg` (+ `png/*_2x.png`) |
| **Primary master (dark)** | `candidates/fha_v1/svg/FHA_Logo_Primary_Dark.svg` |
| **Symbol master** | `candidates/fha_v1/svg/FHA_Logo_Symbol_Colour.svg` |
| **Default social** | `candidates/fha_v1/social/FHA_Logo_Social_800.png` |
| **Default favicon** | `candidates/fha_v1/favicon/FHA_Logo_Favicon.svg` |
| **Review board** | `candidates/fha_v1/FHA_Logo_Candidate_Sheet.png` |

Production `FH_Logo_*` masters remain live until adoption.

---

## 6. Incorrect usage

Do **not**:

1. Replace or delete approved `FH_Logo_*` files with candidate files without an adoption decision  
2. Use the AI host face as the logo or social avatar  
3. Recolour “Her” or “Africa” in Clay, pink, Lagoon, or rainbow  
4. Stretch, skew, rotate, or add drop shadows / neon glow as identity  
5. Turn the arc into a smile, sun disk, or closed circle  
6. Fill the mark with maps, flags, kente, or photo texture  
7. Place the tagline *Ready for what’s next.* inside logo master files  
8. Outline the wordmark as a stroke style  
9. Set Brass type on Clay  
10. Pair with cyberpunk / influencer chrome treatments  
11. Use full Ascend uprights below 40px (use small-size arc form)  
12. Crowdsource alternate “seasonal” logos

---

## 7. Platform usage

### 7.1 Social avatar

| Spec | Value |
|---|---|
| Asset | `FHA_Logo_Social_800.png` (upload) · `1080` for high-res archives |
| Container | Soft-square already in asset (16% radius); platforms may circle-crop — keep mark optically centred |
| Field | Ink |
| Mark | Ivory stems + Brass arc/dot |
| Never | Host photo as the permanent brand avatar; glitter; series-coloured backgrounds |

### 7.2 YouTube

| Surface | Asset / rule |
|---|---|
| Channel profile | `FHA_Logo_Social_800` (candidate) — today production may still use approved `14_youtube/profile/FH_Profile_800.png` until adoption |
| Banner | Keep wordmark / horizontal lockup in centre-safe; do not rebuild banner until adoption |
| Watermark | Prefer small arc form at 12–18% opacity; do not use full primary lockup as corner bug |
| End screen | Dark primary or mono ivory; leave tile clear space |

### 7.3 Thumbnail usage

| Rule | Detail |
|---|---|
| Placement | Corner monogram / symbol only — never full `FutureHerAfrica` wordmark competing with title |
| Size | Symbol ≈ 6–9% of thumb width |
| Colour | Ivory/Brass on dark panels; Ink/Brass on light panels |
| Host | Approved AI host may appear as **talent**, never as logo substitute |
| Series pill | Remains secondary; does not recolour the Ascend arc outside series rules |

### 7.4 Favicon usage

| Spec | Value |
|---|---|
| Master | `FHA_Logo_Favicon.svg` |
| Raster | 32 × 32 · 16 × 16 |
| Form | Soft-square Ink · Ivory arc · Brass micro-dot |
| Rule | No wordmark in favicon; no FH letterforms required in FHA-01 small form |

---

## 8. Relationship to approved Horizon system

| Topic | Guidance |
|---|---|
| Legacy wordmark | `FutureHer` remains in approved masters |
| Candidate wordmark | `FutureHerAfrica` |
| Arc language | Shared — intentional continuity |
| Monogram FH | Remains valid in approved pack; FHA-01 social uses Ascend mark instead of FH letters |
| Adoption | Requires explicit decision + cutover checklist (production paths, YouTube, watermarks, CapCut intros) |
| AI host bible | Still true: host is presence, **not** the brand mark |

---

## 9. Adoption checklist (do not execute until approved)

When/if FHA-01 is adopted:

- [ ] Archive note in `brand/01_logo/README.md` pointing to prior Horizon masters  
- [ ] Copy chosen `FHA_Logo_*` into production `01_logo/` with naming law decision  
- [ ] Update Studio §2 name lock to FutureHerAfrica  
- [ ] Refresh YouTube profile / banner / watermarks / CapCut intro wordmark  
- [ ] Keep AI host assets untouched  
- [ ] Do not delete historical `FH_Logo_*` without archive copy

---

## 10. QA gate (every public use of this candidate)

- [ ] Reads as media / academy — not AI startup  
- [ ] Symbol recognisable without wordmark  
- [ ] Clear space ≥ H cap-height  
- [ ] Correct light/dark or mono version for field  
- [ ] Small-size law respected  
- [ ] Palette only from Horizon tokens  
- [ ] Host face not used as logo  
- [ ] Approved production logos still untouched if candidate not yet adopted  

---

*Ready for what’s next.*  
*Candidate status: FHA-01 Ascend identified — documentation complete — stop for brand review.*
