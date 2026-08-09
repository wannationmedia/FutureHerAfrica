# FutureHerAfrica — Voice System

**Status:** LOCKED architecture · PROVIDER AUDIT COMPLETE  
**Date:** 2026-08-09  
**Channel:** FutureHerAfrica · `@FutureHerAfrica`  
**Companion host:** Approved female AI host — `brand/FUTUREHERAFRICA_AI_HOST_BIBLE.md`  
**Language authority:** `FUTUREHER_FOUNDATION_MANUAL.md` §9 · `FUTUREHER_BRAND_GUIDELINES.md` §10  
**Tone authority:** Brand Guidelines §10.4–10.5  
**Provider authority:** `launch/VOICE/PROVIDER_CAPABILITY_MATRIX.md`  

This is the reusable FutureHerAfrica Voice Specification.  
It is a **direction and architecture lock** — not a claim that synthetic audio has been generated.

---

## Status lock (mandatory)

```
VOICE GENDER: FEMALE
VOICE CULTURAL DIRECTION: AFRICAN
PRIMARY LANGUAGE: ENGLISH
LOCALIZATION: 4 additional approved African-language versions
HOST: EXISTING APPROVED FEMALE AI HOST
OPTION B: VOICE DIRECTION ONLY — NOT BRIAN/BYRON
MALE VOICE: PROHIBITED
```

---

## Correction — Option B

**Option B** means the previously discussed **female African AI/narrator voice direction**.  
It is **not** a person’s name.

| Forbidden misread | Rule |
|---|---|
| Brian | Do not use |
| Byron | Do not use |
| Any male narrator | Prohibited |
| Any male host | Prohibited |

Note: `FUTUREHER_VIDEO_PRODUCTION_ENGINE.md` §11 also uses the label “Option B — Split” for a **batch-day schedule**. That schedule term is unrelated to narrator identity and must never be interpreted as a male voice.

---

## Canonical female voice characteristics

FutureHerAfrica uses a **female African AI/narrator voice** that complements the already-approved female AI host.

The voice must feel:

- authentically African  
- female  
- intelligent  
- articulate  
- contemporary  
- confident  
- warm but authoritative  
- natural rather than robotic  
- suitable for editorial journalism, technology, culture, and future-focused storytelling  
- fluent in English  
- internationally understandable without losing African identity  

### English voice direction (primary)

- Clear **South African English** (production language)  
- Mentor cadence: brilliant, calm, respects her time  
- Direct with care — not soft-focus wellness; not radio-ad hype  
- Local first, globally intelligible  
- Natural rhythm; short sentences; breathable pauses  
- No forced “performative accent”; no caricature  

### Tone

Mentor who has done the reading. Ready, clear, practical, forward.  
Psychology supports the lesson — never becomes the headline.

### Pacing

- Calm enough to rewatch at 1.0×  
- Pause at script `/` marks  
- No rush-to-hype · no breathless influencer energy  
- Hold framework names (e.g. Task Layer) so captions can breathe  

### Editorial authority

- Educational media / academy presence  
- States limits honestly (especially AI)  
- No shame hooks · no fake scarcity · no hustle lexicon  

### Emotional range (allowed)

| Allowed | Not allowed |
|---|---|
| Calm confidence | Panic / shock energy |
| Warm knowing | Condescension |
| Soft urgency on action | Hype / girlboss |
| Steady reassurance | Therapy-substitute drama |

### Prohibited characteristics

- Male voice of any kind  
- Robotic / flat TTS artefacts left unedited  
- US radio announcer or influencer cadence  
- Childish, flirtatious, or sexualized delivery  
- Shame, mockery, or “wake up sheeple” tone  
- Fake American/British affectation that erases African identity  
- Mixing languages randomly inside one narration track  

### Voice consistency requirements

- Same female African direction across episodes and Shorts  
- Same host identity on screen (approved female AI host — do not replace)  
- Narration complements the host; it does not invent a second on-screen woman  
- Once a provider voice ID is approved, reuse it — do not shop new personalities per episode  

### Episode reuse requirements

1. Produce **EN master** narration first.  
2. Keep the **same approved visual edit** for localization versions.  
3. Swap **narration + captions/subtitles** per language — do not rebuild the visual package.  
4. Do not mix languages inside one VO file.  
5. Localized scripts must sound natural — not word-for-word literal when that breaks speech.  
6. Each language version uses an appropriate **female African** narration style for that language.  

---

## Localization architecture

**Authority:** Foundation Manual §9.2–9.3 (canonical language tags — do not invent names).

### Primary

| Code | Language | Role |
|---|---|---|
| `EN` | English | Primary production language · master VO |

### Four additional approved African-language versions

Rollout order follows Foundation Manual Limpopo-first, then national scale:

| Order | Code | Language | Strategic role |
|---|---|---|---|
| 1 | `NSO` | Sepedi | Limpopo gravity |
| 2 | `VE` | Tshivenda | Limpopo gravity |
| 3 | `TS` | Xitsonga | Limpopo gravity |
| 4 | `ZU` | isiZulu | National scale |

### Later system languages (documented; not in the EP001 four)

| Code | Language | Role |
|---|---|---|
| `SS` | siSwati | National / regional scale |
| `AF` | Afrikaans | National access layer where demand warrants |
| `XH` | isiXhosa | National scale after ZU demand proven |

### How localization works with visuals

```
Same CapCut visual master (16:9 / 9:16 crops)
        ├── EN narration  + EN captions/SRT
        ├── NSO narration + NSO captions/SRT
        ├── VE narration  + VE captions/SRT
        ├── TS narration  + TS captions/SRT
        └── ZU narration  + ZU captions/SRT
```

- One visual production → multiple localized voice versions  
- Prefer platform subtitle tracks for L2 access when full dub is not yet ready  
- Full dubbed remakes only for flagship topics with proven demand (Foundation §9.3)  

### File naming (when audio exists)

```
EP[NNN]_VO_EN_v1.wav
EP[NNN]_VO_NSO_v1.wav
EP[NNN]_VO_VE_v1.wav
EP[NNN]_VO_TS_v1.wav
EP[NNN]_VO_ZU_v1.wav
```

EP001 English working filename remains `launch/EP001/audio/EP001_VO_v1.wav` (= EN master).  
Additional language files use the pattern above beside it when produced.

---

## Pronunciation rules

- Prefer natural SA English pronunciation for place names already in scripts (e.g. Johannesburg, Polokwane).  
- Framework names stay clear and stable in EN (e.g. **Task Layer**, **Map · Label · Run**).  
- Brand: **FutureHerAfrica** — one continuous brand name; do not say “Future Her” as two casual words.  
- Handle spoken only when needed: “at FutureHerAfrica”.  
- In localized versions, keep brand name **FutureHerAfrica** unless a language-specific community practice already approved — do not invent alternate brand pronunciations.  
- Never force caricatured “accent acting.”  

---

## Host relationship (locked)

| Element | Rule |
|---|---|
| On-screen host | Existing approved **female** FutureHerAfrica AI host only |
| Narrator | Female African voice architecture (this document) |
| Host redesign | Forbidden |
| Male host | Forbidden |
| Male narrator | Forbidden |

Authority: `brand/FUTUREHERAFRICA_AI_HOST_BIBLE.md` · `launch/EP001/FH_EP001_Thumbnail.png`

---

## Verified provider architecture (2026-08-09)

**Authority:** `launch/VOICE/PROVIDER_CAPABILITY_MATRIX.md`  
Provider selection follows **current official TTS documentation only**.  
Speech-to-Text support does **not** qualify a language.

### Identity framing

```
FUTUREHERAFRICA FEMALE VOICE FAMILY
= one canonical presenter identity
+ language-specific implementations (may use different providers)
```

Do **not** pretend different synthetic engines are literally the same person.  
Do **not** use male voices as fallbacks.  
Do **not** silently substitute another language.

### Verified commercial TTS (available now)

| Code | Language | Provider | Voice ID | Gender |
|---|---|---|---|---|
| EN | English (South Africa) | Microsoft Azure AI Speech | `en-ZA-LeahNeural` | Female |
| ZU | isiZulu | Microsoft Azure AI Speech | `zu-ZA-ThandoNeural` | Female |

Approved EN alternate: Amazon Polly `Ayanda` (`en-ZA`, female; Neural / Generative).

### Not available for commercial production (current audit)

| Code | Language | Status |
|---|---|---|
| NSO | Sepedi | No verified commercial female TTS |
| VE | Tshivenda | No verified commercial female TTS |
| TS | Xitsonga | No verified commercial female TTS |

Google Cloud TTS is **not** the FutureHerAfrica primary multilingual provider — its current catalogue lacks `en-ZA`, `nso-*`, `ve-*`, `ts-*`, and `zu-ZA` TTS voices.

### Architecture decision

- **EN + ZU:** one-provider path possible → Azure AI Speech.  
- **Full EN + NSO + VE + TS + ZU:** multi-provider is allowed, but **still insufficient today** — NSO / VE / TS remain blocked.  
- When additional commercial female voices appear, attach them to the Voice Family via the consistency layer (pacing, pitch, energy, pronunciation, pauses, editorial restraint, loudness normalization).

### Credentials required before any synthetic generation

Partial engine (EN + ZU only):

- Azure AI Speech resource  
- `AZURE_SPEECH_KEY`  
- `AZURE_SPEECH_REGION`  
- optional voice overrides: `FHA_VOICE_EN_VOICE_ID` · `FHA_VOICE_ZU_VOICE_ID`

Full five-language engine: **blocked** until commercial female TTS exists for NSO · VE · TS.

### Production engine (implemented)

Reusable abstraction: `scripts/voice/`  

```
npm run voice:ep001 -- --languages=en,zu
npm run voice:ep001 -- --languages=en,nso,ve,ts,zu
npm run voice:episode -- EP002 --languages=en,zu
```

Profiles: `launch/VOICE/VOICE_PROFILES.json`  
Runbook: `launch/VOICE/VOICE_GENERATION.md`  

NSO / VE / TS adapters exist and **fail closed** (NOT-SUPPORTED). No placeholder audio.

---

## Generation capability gate

Before any claim that VO audio was generated:

1. Confirm provider capability matrix still lists that language as commercially available  
2. Inspect for configured credentials + female African voice ID for that locale  
3. Inspect for TTS scripts / audio utilities  
4. Confirm output WAV written to disk with non-zero size and duration  

**Current repository inspection (2026-08-09):**

| Item | Result |
|---|---|
| Provider capability audit | **Complete** → `PROVIDER_CAPABILITY_MATRIX.md` |
| Full five-language commercial stack | **Not available** |
| Partial stack (EN + ZU) | **Engine implemented** · credentials **required** |
| Voice provider secrets in repo | **Not found** (names only in `.env.example`) |
| TTS production utility | **Implemented** → `scripts/voice/` |
| EP001 audio WAVs | **Not present** until credentials succeed |
| Approved synthetic voice reference file | **Not present** |

**Therefore:** no synthetic VO has been generated. Do not pretend audio exists.  
Do not create placeholder WAVs.  
Do not ask the founder to self-record as a substitute for the missing NSO / VE / TS commercial TTS stack.

---

## EP001 application

- Use this Voice System for EP001 EN master.  
- Do **not** rebuild `SCRIPT_VO.txt`.  
- Do **not** alter the approved host or brand identity.  
- Do **not** use Brian, Byron, or any male voice.  
- Localization versions (NSO / VE / TS / ZU) remain architected for the same visual master.  
- Generate localized audio only when that language has a verified commercial female TTS voice **and** an approved language-specific script.

Production path: `launch/EP001/PRODUCTION/EP001_PRODUCTION_RUNBOOK.md` Phase 1.

---

*Voice architecture locked. Provider audit complete. Full multilingual synthetic production gated. Male voice prohibited.*
