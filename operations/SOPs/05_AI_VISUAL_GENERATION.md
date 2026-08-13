# SOP 05 — AI Visual Generation

**Owner:** Founder  
**Cadence:** As needed (skip if A-roll + screen enough)  
**Estimated time:** 10–15 minutes  
**Host authority:** `brand/FUTUREHERAFRICA_AI_HOST_BIBLE.md` · `brand/FH_HOST_GENERATION_PROMPT.txt`  
**Prompts:** `brand/FH_AI_PRODUCTION_PROMPTS.md` · Studio §§6.6–6.8, §7.8

---

## Objective

Generate a small set of on-brand supporting visuals — and, when editorially needed, **canonical host** frames — without derailing the 4-hour week, inventing a new character, or creating copyright/deepfake risk.

---

## Two tracks

| Track | Max | Authority | Examples |
|---|---|---|---|
| **A — Non-host** | ≤ 3 stills / episode | Studio §6 + AI prompts §§5–9, 12–13 | Diagrams, desk objects, hands B-roll, atmospheres |
| **B — Canonical host** | Only slots that earn a frame | Host Bible + `FH_HOST_GENERATION_PROMPT.txt` | Talking-head, instructional, reaction, explanatory, thumbnail pose, Shorts frame, social / presentation face |

**Law:** ONE CANONICAL HOST · MANY SCENES · MANY EXPRESSIONS · SAME RECOGNIZABLE PERSON.  
**Law:** Host where she earns the frame — never AI wallpaper.

---

## When to use

**Non-host**

- Framework diagram  
- Abstract “future skills” metaphor  
- Missing B-roll for a concept (hands, objects, place)

**Host** (only if mentor presence helps)

- Talking-head / instructional / reaction / explanatory insert  
- Thumbnail pose  
- Shorts hook frame  
- Social or presentation face moment  

**Do not use AI for:** fake testimonials, fake bank screenshots, celebrity likenesses, “African poverty” stereotypes, random new women as “the host”.

**Do not force the host into:** technical diagrams · screen recordings · B-roll · demonstrations · charts · scenes where her presence adds no value.

---

## Step-by-step checklist

### Shared

- [ ] Open `templates/VISUAL_PLAN.md` — mark host vs non-host slots  
- [ ] Decide max **3** non-host AI visuals  
- [ ] Decide which host capability frames (if any) this episode actually needs  

### Track A — Non-host

- [ ] Write prompt using Brand Design Studio §6.6 skeleton (calm, editorial, locked palette, SA contemporary, no neon / no tribal costume)  
- [ ] Generate in ChatGPT image / CapCut AI / Canva AI  
- [ ] Reject cartoonish, sexualized, or stereotyped results  
- [ ] Export PNG → episode `04_visuals/` (or `04_Assets/ai-visuals/YYYYMMDD_Slug/`)  
- [ ] Log prompt text in a `.txt` beside files  

### Track B — Canonical host

- [ ] Start from `brand/FH_HOST_GENERATION_PROMPT.txt`  
- [ ] Attach EP001 reference: `launch/EP001/FH_EP001_Thumbnail.png` (or publish twin / source crop)  
- [ ] Fill `[SCENE] [POSE] [EXPRESSION] [WARDROBE] [BACKGROUND] [CAMERA] [LIGHTING]`  
- [ ] Append Host Bible negative prompt every time  
- [ ] Generate → **squint test** against EP001 (must be the same woman, not “similar”)  
- [ ] Fail → regenerate with reference — do not “fix” into a new face in post  
- [ ] Grade toward `FH_Grade_Horizon`  
- [ ] Name `FH_Host_[EpisodeOrUse]_[Descriptor]_[WxH]` → `04_visuals/host/`  
- [ ] Log seed + platform + reference filename  

### CapCut use

- [ ] Treat AI stills as B-roll / insert lane — never fake “real documentary footage” of people who don’t exist if it would mislead  
- [ ] Host inserts are digital mentor presence; keep diagrams and screen demos host-free  

---

## Episode host capability map (system must support)

| Visual | Generate when… |
|---|---|
| Talking-head | Hook / teaching presence cutaway needed |
| Instructional | Calm “here’s how” mentor insert |
| Reaction | Soft knowing look on a reframe |
| Explanatory | Thoughtful focus while idea lands (no diagram in the still) |
| Thumbnail pose | Face thumbnail layout |
| Shorts frame | Vertical host punch-in / cover |
| Social graphic | Mentor face on social when needed |
| Presentation visual | Deck Photo / Title face moment |

---

## Prompt skeletons

**Non-host**

```
Editorial flat 2D illustration for a premium African educational media brand.
Palette only: #121A21, #F3EFE8, #B8893A, #2F6F6A, #C48B78, #D8D2C8, #FFFCF8.
Thin clean lines, calm composition, generous whitespace, no neon, no glitter,
no tribal costume clichés, no text in the image, no logos.
Subject: [ONE IDEA]. Mood: intelligent, warm, practical, hopeful.
```

Negative: `neon, cyberpunk, chrome, influencer, pink glow, crowded collage, watermark, readable text, cartoon mascot`

**Host:** use `FH_HOST_GENERATION_PROMPT.txt` only — see also `FH_AI_PRODUCTION_PROMPTS.md` §4.

---

## AI tools used

| Tool | Use |
|---|---|
| ChatGPT (images) | Concept stills; host with EP001 upload + “same woman only” |
| Canva Free/Pro AI | Simple diagrams / covers |
| CapCut AI (if available) | Generative fill / stock-like clips sparingly |
| Midjourney / Flux / Ideogram | Host with character / image reference when available |

---

## Human review points

1. Could a viewer mistake this for a real person/event? If yes → label or don’t use.  
2. Does it look FutureHer — or generic AI sludge?  
3. Host face: EP001 squint test pass?  
4. Would removing the host hurt understanding? If no → don’t generate her for that beat.  

---

## Quality-control checklist

- [ ] ≤ 3 non-host visuals  
- [ ] Host only in justified slots  
- [ ] Brand colours / Horizon grade respected  
- [ ] No deceptive realism about people/money outcomes  
- [ ] No new character / random woman as host  
- [ ] Prompts archived for reuse  
- [ ] Time ≤ 15 minutes  

**Pass → CapCut edit insert as planned**
