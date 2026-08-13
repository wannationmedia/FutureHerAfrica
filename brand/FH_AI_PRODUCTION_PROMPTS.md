# FutureHer · AI Production Prompts

**System:** Horizon · Authority: `FUTUREHER_BRAND_DESIGN_STUDIO.md`  
**Host authority:** `brand/FUTUREHERAFRICA_AI_HOST_BIBLE.md` · template `brand/FH_HOST_GENERATION_PROMPT.txt`  
**Colours (always cite):** Ink `#121A21` · Stone `#F3EFE8` · Brass `#B8893A` · Lagoon `#2F6F6A` · Clay `#C48B78` · Mist `#D8D2C8` · Ivory `#FFFCF8` · Night `#0B1014`

**Global negative (append to every *non-host* image prompt):**  
`neon, cyberpunk, purple pink gradient, chrome, influencer aesthetic, girlboss pink, glitter, crown, butterfly, Venus symbol, kente costume tourism, crowded collage, watermark text, readable fake UI text, cartoon mascot, drop shadow glow, busy sticker pack`

**Host negative:** Always use the mandatory block in the Host Bible / `FH_HOST_GENERATION_PROMPT.txt` (includes identity-drift bans).

---

## Split law (read first)

| Generation track | When | Authority |
|---|---|---|
| **Canonical host** | Mentor face / talking-head / reaction / thumbnail pose / Shorts host frame / social or deck face | Host Bible + `FH_HOST_GENERATION_PROMPT.txt` + EP001 reference |
| **Non-host** | Diagrams, objects, hands B-roll, atmospheres, covers without a face | This file §§1–3, 5–14 + Studio §6 |

**ONE CANONICAL HOST · MANY SCENES · MANY EXPRESSIONS · SAME RECOGNIZABLE PERSON.**  
Do not invent a new woman. Do not force the host into diagrams, screen UI, charts, demos, or pure B-roll.

**Canonical reference (attach whenever the platform allows):**  
1. `launch/EP001/FH_EP001_Thumbnail.png`  
2. `launch/EP001/PUBLISH/08_THUMBNAIL.png`  
3. `launch/EP001/FH_EP001_Thumbnail_source_1536x1024.png`

---

## 1. Logo refinement (vector / Midjourney / Ideogram — reference only)

Use generated SVG masters as ground truth. Only use AI to explore if redesigning.

```
Minimal brand logo lockup for educational media company "FutureHer", geometric sans-serif wordmark TitleCase FutureHer, single rising open horizon arc above the word in muted brass #B8893A, wordmark ink #121A21 on warm stone #F3EFE8, Scandinavian air + African modern academy, flat vector, no icon faces, no sun emoji, generous clear space, production logo sheet
```

---

## 2. YouTube banner atmosphere (optional photo layer ≤30% opacity)

```
Abstract soft South African morning light over a calm desk edge, shallow depth of field, warm stone and ink tones, no faces, no text, no logos, premium education brand atmosphere, quiet optimism, 2560x1440 composition with empty centre band for logo, cinematic grade muted brass highlights
```

---

## 3. Profile / app icon alternate (Horizon)

```
App icon soft-square, corner radius 16%, solid ink #121A21 background, single ivory rising horizon arc stroke centred, one small brass micro-dot at rising tip, no text, no photo, flat vector, 1024x1024, premium African modern academy brand
```

---

## 4. Canonical host — episode capability prompts

**Do not use a generic “South African woman” prompt.** Always start from `FH_HOST_GENERATION_PROMPT.txt`, attach an EP001 reference, fill the variable blocks, append the host negative prompt, then squint-test against EP001.

Fill once per needed frame:

| Variable | Guidance |
|---|---|
| `[SCENE]` | Narrative beat |
| `[POSE]` | Head-and-shoulders / three-quarter / seated teach — face readable |
| `[EXPRESSION]` | Calm confidence / knowing smile / soft smile / thoughtful focus |
| `[WARDROBE]` | Horizon-adjacent; professional but not corporate |
| `[BACKGROUND]` | Quiet contemporary SA / African context |
| `[CAMERA]` | Eye-level preferred; size/aspect for use |
| `[LIGHTING]` | Soft natural / warm-neutral editorial → `FH_Grade_Horizon` |

### 4.1 Host talking-head visual

```
[SCENE] Calm educational talking-head insert for a FutureHer lesson
[POSE] Head-and-shoulders, slight body angle, face to lens, medium close-up
[EXPRESSION] Calm confident soft closed-lip smile, direct warm eye contact
[WARDROBE] Clean cream or Horizon-adjacent blouse; optional small gold hoops
[BACKGROUND] Soft-focus contemporary South African home office / calm interior
[CAMERA] Eye-level 50mm feel, shallow DOF, 1920x1080 safe
[LIGHTING] Soft window light, warm-neutral, protect natural skin texture, Horizon grade
```

### 4.2 Host instructional visual

```
[SCENE] Mentor explaining one practical step at a desk
[POSE] Seated three-quarter at desk, hands lightly engaged with notebook or phone edge, face clear
[EXPRESSION] Thoughtful focus with approachable soft smile
[WARDROBE] Smart-casual Horizon colours (Ink / Stone / Ivory / Lagoon accent OK)
[BACKGROUND] Quiet desk, soft SA daylight, uncluttered
[CAMERA] Eye-level medium shot, 1920x1080
[LIGHTING] Soft natural side light, editorial, Horizon grade
```

### 4.3 Host reaction visual

```
[SCENE] Soft knowing reaction on a reframe beat
[POSE] Tight MCU, face primary, minimal gesture
[EXPRESSION] Slight knowing closed-lip smile — never shock-mouth
[WARDROBE] Same host wardrobe family as episode
[BACKGROUND] Soft blur interior
[CAMERA] Eye-level close-up, 1920x1080 or 1080x1920 vertical crop-safe
[LIGHTING] Soft daylight catchlight, Horizon grade
```

### 4.4 Host explanatory visual

```
[SCENE] Explanatory mentor moment while a framework idea lands (host only — no diagram in image)
[POSE] Head-and-shoulders or seated teach, calm open posture
[EXPRESSION] Thoughtful focus, intelligent calm
[WARDROBE] Professional but not corporate
[BACKGROUND] Quiet academy-adjacent SA interior
[CAMERA] Eye-level MCU, 1920x1080
[LIGHTING] Soft editorial daylight, Horizon grade
```

### 4.5 Host thumbnail pose

```
[SCENE] Calm educational YouTube thumbnail portrait for FutureHer
[POSE] Head-and-shoulders, body slightly angled, face to lens, left-half framing
[EXPRESSION] Calm confident slight knowing closed-lip smile, direct eye contact
[WARDROBE] Cream off-white or episode wardrobe; optional small gold hoop earrings
[BACKGROUND] Soft-focus contemporary interior, muted walls
[CAMERA] Eye-level medium close-up, shallow DOF, 1280x720 thumbnail safe crop
[LIGHTING] Soft natural side window light, warm-neutral, Horizon grade
```

Composite text/series pill in CapCut/Canva template — do not bake titles into the generate.

### 4.6 Host Shorts frame

```
[SCENE] Vertical Shorts hook / mentor presence frame
[POSE] MCU, eyes in upper third, face clear in centre-safe 80%
[EXPRESSION] Approachable soft smile or thoughtful focus (expression band only)
[WARDROBE] Same host identity wardrobe
[BACKGROUND] Soft contemporary SA interior, quiet
[CAMERA] 9:16 1080x1920, eye-level
[LIGHTING] Soft daylight, Horizon grade
```

### 4.7 Host social graphic (face plate)

```
[SCENE] Mentor face plate for FutureHer social teach/quote cover
[POSE] Head-and-shoulders, clean negative space on one side for type overlay
[EXPRESSION] Calm confident soft smile
[WARDROBE] Horizon-adjacent
[BACKGROUND] Soft Stone/Ink-friendly blur — leave room for text
[CAMERA] 1080x1080 or 1080x1350 safe
[LIGHTING] Soft editorial, Horizon grade
```

### 4.8 Host presentation visual

```
[SCENE] Presentation opener / Photo slide mentor presence
[POSE] Three-quarter or head-and-shoulders, composed teaching stance
[EXPRESSION] Calm intelligent mentor presence
[WARDROBE] Professional but not corporate
[BACKGROUND] Quiet contemporary SA / academy-adjacent space
[CAMERA] 1920x1080 full-bleed photo safe
[LIGHTING] Soft daylight, Horizon grade
```

**After every host generate:** squint test vs EP001 · grade `FH_Grade_Horizon` · log seed + platform + reference filename · name `FH_Host_[EpisodeOrUse]_[Descriptor]_[WxH]`.

---

## 5. Thumbnail object / desk still

```
Single clean desk object teaching metaphor (notebook, phone, laptop edge), South African home office daylight, Stone field #F3EFE8, Brass accent detail, shallow DOF, one subject only, no collage, no neon, editorial product still for education thumbnail
```

---

## 6. B-roll — AI / digital skills

```
Hands typing on laptop in warm South African daylight interior, Lagoon #2F6F6A subtle accent in clothing or mug, calm focus, no face required, phone-first educational B-roll, Horizon grade soft contrast, no neon screens
```

---

## 7. B-roll — Money

```
Hands reviewing simple budget notebook and phone calculator, Brass #B8893A accent pen, calm practical money lesson atmosphere, South African home table, honest not luxurious, soft natural light
```

---

## 8. B-roll — Career (non-host environment / movement)

Prefer hands, place, and detail. If a full face is required for brand continuity, use **§4 host** — do not cast a random career-stock woman as the recurring host.

```
Calm purposeful walk outdoors soft South African light, professional casual attire Ink and Stone palette, documentary education brand atmosphere, no fashion editorial exaggeration, no celebrity likeness — use only if not implying a new recurring host identity
```

---

## 9. Illustration — framework diagram

```
Flat editorial diagram three connected nodes labelled spaces empty, Ink strokes on Stone, Lagoon accent nodes, round line caps, teaching framework style, no characters, no 3D, FutureHer icon language, SVG-ready clarity
```

**Never place the host inside diagram art.**

---

## 10. CapCut intro motion brief (Runway / Kling — optional)

```
7 second brand intro: soft dissolve from warm stone wash to deep ink field, single brass line draws a rising horizon arc left to right with ease-out, tiny brass dot appears at tip, ivory sans-serif wordmark FutureHer fades in, mist tagline Ready for what's next fades, hold, dissolve out. No particles, no spin, no bounce, premium academy motion
```

---

## 11. CapCut outro hold

```
Static end card dark ink background, brass rising arc, ivory FutureHer wordmark, mist text Welcome forward, empty lower third for YouTube end screen tiles, calm premium education brand, no subscribe spam graphics
```

---

## 12. Social quote card background

```
Subtle Horizon Wash gradient Stone to soft warm taupe, empty centre for quote text, faint brass arc micro top centre, no photos, no stickers, premium workbook cover feel
```

(Face quote covers: generate host via §4.7, then overlay type in template.)

---

## 13. Ebook cover hero

```
Stone field background, small brass horizon arc top centre, large empty title area middle, soft African contemporary academy publication cover, no fake 3D book, no collage, Newsreader-friendly space, series pill area top left empty
```

(Optional host cover: §4.8 / Host Bible — not required on every title.)

---

## 14. Community avatar — Forward Collective

```
Soft-square icon, Stone background, three connected geometric nodes Community symbol in Ink stroke, tiny brass arc micro above, no faces, FutureHer community mark, flat vector
```

---

## Prompt skeleton — non-host (locked — Studio §6.6 / §6.8)

```
[Subject], [SA/African context], [Horizon lighting], palette Ink #121A21 Stone #F3EFE8 Brass #B8893A [series accent if needed], calm intelligent practical, editorial education brand, [composition], no text overlays
```

Negative: `neon, cyberpunk, chrome, influencer, pink glow, crowded collage, watermark, readable text, cartoon mascot`

## Prompt skeleton — host

Use `brand/FH_HOST_GENERATION_PROMPT.txt` only. Do not freestyle a new face prompt.
