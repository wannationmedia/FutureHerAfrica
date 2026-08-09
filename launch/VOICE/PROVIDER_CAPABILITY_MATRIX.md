# FutureHerAfrica — TTS Provider Capability Matrix

**Status:** FINAL DISCOVERY AUDIT · PARTIAL ENGINE APPROVED  
**Date:** 2026-08-09  
**Scope:** Text-to-Speech only (Speech-to-Text does **not** count)  
**Canonical languages:** EN · NSO · VE · TS · ZU  
**Voice rule:** Female African editorial presenter · Male prohibited  

Status vocabulary:

| Status | Meaning |
|---|---|
| **VERIFIED** | Documented TTS + female voice + commercial path + production-viable |
| **PARTIAL** | Usable for some languages only |
| **EXPERIMENTAL** | Technically interesting; not production-cleared |
| **COMMERCIAL-LICENSE-UNCLEAR** | Capability may exist; rights not clear enough to ship |
| **NOT-SUPPORTED** | No verified TTS for the language |
| **BLOCKED** | Route cannot proceed (missing rights, consent, reference audio, or language model) |

This audit does **not** claim audio was generated.

---

## Final language decision

| Language | Code | Status | Provider / route | Voice ID | Notes |
|---|---|---|---|---|---|
| English (South Africa) | EN | **VERIFIED** | Azure AI Speech | `en-ZA-LeahNeural` | Female · commercial prebuilt neural |
| isiZulu | ZU | **VERIFIED** | Azure AI Speech | `zu-ZA-ThandoNeural` | Female · commercial prebuilt neural |
| Sepedi | NSO | **NOT-SUPPORTED** | — | — | No verified commercial female TTS |
| Tshivenda | VE | **NOT-SUPPORTED** | — | — | No verified commercial female TTS |
| Xitsonga | TS | **NOT-SUPPORTED** | — | — | No verified commercial female TTS |

**Commercial multilingual solution for all five:** **NOT FOUND.**  
**Partial production stack:** **EN + ZU via Azure** — approved for engine implementation.

---

## Cloud / commercial providers (prior audit retained)

| Provider | EN SA♀ | NSO♀ | VE♀ | TS♀ | ZU♀ | Stack status |
|---|---|---|---|---|---|---|
| Azure AI Speech | VERIFIED (`en-ZA-LeahNeural`) | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED | VERIFIED (`zu-ZA-ThandoNeural`) | **PARTIAL** |
| Amazon Polly | VERIFIED (`Ayanda`) | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED | **PARTIAL** (EN only) |
| Google Cloud TTS | NOT-SUPPORTED (`en-ZA` absent) | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED |
| ElevenLabs TTS | PARTIAL (English; no locked `en-ZA` ID) | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED for FHA stack |
| Lelapa Vulavula | NOT-SUPPORTED (TTS ♲) | NOT-SUPPORTED (TTS ♲) | NOT-SUPPORTED | NOT-SUPPORTED | NOT-SUPPORTED (TTS ♲) | NOT-SUPPORTED |
| Vambo AI | BLOCKED / not ready | BLOCKED / not ready | BLOCKED / not ready | BLOCKED / not ready | BLOCKED / not ready | NOT-SUPPORTED |

Sources: Azure language-support TTS table · Polly voicelist · Google voices catalogue · ElevenLabs models language list · Lelapa language-support · Vambo language pages.

---

## Open-model / modern multilingual investigation

### TTS.ai

| Field | Finding |
|---|---|
| LANGUAGE / CODES | Hosted wrappers for Kokoro, Chatterbox, CosyVoice2, Piper, etc. Documented languages are major world languages — **no Sepedi / Tshivenda / Xitsonga** in official multilingual pages or model language arrays inspected |
| TTS SUPPORT | YES (platform API) |
| FEMALE VOICE | YES for supported languages |
| MULTILINGUAL | YES within hosted model limits |
| VOICE CLONING | YES (`/v1/tts/clone/` — chatterbox / cosyvoice2 / gpt-sovits) |
| API / BATCH / WAV | YES · batch endpoint · WAV supported |
| COMMERCIAL RIGHTS | Paid platform claims commercial rights on generated audio; underlying model licenses still apply |
| QUALITY / VIABILITY | Production API for supported languages only |
| NSO/VE/TS | **NOT-SUPPORTED** |
| CUSTOM VOICE ROUTE | Requires reference audio + target language supported by chosen model → **BLOCKED** for NSO/VE/TS (language unsupported) and for FHA presenter (no authorized reference WAV in repo) |

### CosyVoice 2 (FunAudioLLM / Alibaba)

| Field | Finding |
|---|---|
| LANGUAGES | Chinese, English, Japanese, Korean, German, Spanish, French, Italian, Russian (+ Chinese dialects) |
| NSO/VE/TS/ZU | **NOT-SUPPORTED** |
| FEMALE / CLONING | Zero-shot cloning with reference audio |
| LICENSE | Apache-2.0 (code/weights per project docs) → commercially permissive for supported languages |
| REFERENCE AUDIO | Required for presenter locking |
| PRODUCTION VIABILITY | EXPERIMENTAL for FHA brand English; **NOT-SUPPORTED** for missing SA languages |
| CUSTOM ROUTE | Cross-lingual cloning only among supported languages → cannot invent Sepedi/Venda/Tsonga synthesis |

### GPT-SoVITS

| Field | Finding |
|---|---|
| LANGUAGES | Official cross-lingual set: Chinese, English, Japanese, Korean, Cantonese |
| NSO/VE/TS/ZU | **NOT-SUPPORTED** |
| LICENSE | MIT (project) |
| REFERENCE AUDIO | Required (≈5s zero-shot / more for few-shot) |
| PRODUCTION VIABILITY | EXPERIMENTAL tooling · not a managed SA-language stack |
| CUSTOM ROUTE | **BLOCKED** for NSO/VE/TS — model does not synthesize those languages |

### Chatterbox (Resemble AI)

| Field | Finding |
|---|---|
| LANGUAGES | Official Multilingual list includes ar, da, de, el, en, es, fi, fr, he, hi, it, ja, ko, ms, nl, no, pl, pt, ru, sv, **sw**, tr, zh — **no nso/ve/ts/zu** |
| LICENSE | MIT |
| CLONING / API | Zero-shot cloning · open-source + Resemble cloud |
| WAV / BATCH | Local generation can write WAV; cloud API available on Resemble |
| NSO/VE/TS | **NOT-SUPPORTED** |
| CUSTOM ROUTE | **BLOCKED** for missing languages even with reference audio |

### XTTS v2 (Coqui)

| Field | Finding |
|---|---|
| LANGUAGES | 17 languages (en, es, fr, de, it, pt, pl, tr, ru, nl, cs, ar, zh-cn, ja, hu, ko, hi) — **no nso/ve/ts/zu** |
| LICENSE | Weights under Coqui Public Model License (**non-commercial**) |
| COMMERCIAL RIGHTS | **COMMERCIAL-LICENSE-UNCLEAR / effectively blocked** — Coqui shutdown; no commercial license path |
| NSO/VE/TS | **NOT-SUPPORTED** |
| CUSTOM ROUTE | **BLOCKED** (language + license) |

### Meta MMS-TTS

| Field | Finding |
|---|---|
| TS | Research checkpoint `tso` listed in MMS TTS language HTML |
| NSO / VE / ZU | Not verified present in that language table for this audit |
| LICENSE | **CC-BY-NC 4.0** — commercial use forbidden by maintainer |
| FEMALE PRESENTER | Not guaranteed |
| STATUS | EXPERIMENTAL + **BLOCKED** for commercial FutureHerAfrica publish |

### Azure Personal Voice / Professional Voice (custom adaptation)

| Field | Finding |
|---|---|
| PERSONAL VOICE LOCALES | Official personal-voice locale table includes `zu-ZA` and many world locales — **does not list `nso-*`, `ve-*`, or `ts-*`** ([language-support § Personal voice](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts)) |
| PROFESSIONAL VOICE | Custom voice training locales also omit NSO/VE/TS |
| REFERENCE AUDIO | Required (personal: short human sample + verbal consent; professional: large consented studio set) |
| ACCESS | Limited Access / registration / approved use cases |
| REPO ASSETS | **No authorized presenter reference WAV exists** (host assets are visual images only) |
| STATUS FOR NSO/VE/TS | **NOT-SUPPORTED** (locale absent) |
| STATUS FOR ONE-PRESENTER FAMILY | **BLOCKED** — missing authorized reference audio + consent; Personal Voice use-cases are restricted |

---

## Custom / adapted one-presenter route

Objective:

```
ONE FUTUREHERAFRICA FEMALE PRESENTER
        ↓
EN · NSO · VE · TS · ZU
```

| Requirement | Result |
|---|---|
| Language model must synthesize target language | Fail for NSO/VE/TS on every audited cloning system |
| Cross-lingual clone without language support | Invalid — do not assume |
| Reference audio required by cloning systems | Yes |
| Authorized reference audio in repository | **None** (0 WAV/MP3 narrator assets found) |
| Approved host visual used as voice reference | **No** — images are not voice |
| Ask founder to record | **Forbidden by brief** |
| Fabricate reference audio | **Forbidden** |
| Commercial + consent clearance | Not available |

**Custom/adapted voice route for NSO · VE · TS: BLOCKED.**

---

## Separation of claims

| Layer | EN | ZU | NSO | VE | TS |
|---|---|---|---|---|---|
| TECHNICALLY POSSIBLE (standard TTS) | YES | YES | NO | NO | NO* |
| COMMERCIALLY CLEARED | YES (Azure) | YES (Azure) | NO | NO | NO |
| PRODUCTION READY | YES (with Azure creds) | YES (with Azure creds) | NO | NO | NO |
| QUALITY ACCEPTABLE (editorial SA♀) | YES (Leah) | YES (Thando; native locale) | — | — | — |

\*MMS research `tso` exists but is non-commercial and not an editorial female brand voice.

---

## Engine architecture decision

```
FutureHerAfrica Voice Engine
        |
        +-- EN → Azure adapter (VERIFIED)
        +-- ZU → Azure adapter (VERIFIED)
        +-- NSO → Unsupported adapter (NOT-SUPPORTED · hard fail)
        +-- VE → Unsupported adapter (NOT-SUPPORTED · hard fail)
        +-- TS → Unsupported adapter (NOT-SUPPORTED · hard fail)
```

Rules:

- Reject unsupported languages cleanly  
- Never silently substitute English or another African language  
- Never silently substitute a male voice  
- Never generate placeholder audio  
- Generate only when credentials exist  

Implementation path: `scripts/voice/` · commands `npm run voice:ep001` / `npm run voice:episode`.

---

## Credentials required (partial stack)

```
AZURE_SPEECH_KEY=
AZURE_SPEECH_REGION=
FHA_VOICE_EN_VOICE_ID=en-ZA-LeahNeural
FHA_VOICE_ZU_VOICE_ID=zu-ZA-ThandoNeural
```

Optional later: Polly EN alternate credentials — not required for the Azure partial stack.

---

## Remaining blocker (full five-language stack)

**No audited system — commercial cloud, African specialist API, or commercially cleared open model — currently provides female Text-to-Speech for Sepedi, Tshivenda, and Xitsonga.**

Watch list (do not treat as ready): Lelapa Vulavula TTS · Vambo AI TTS · future Azure/Polly/Google locale additions that explicitly publish female voices for those languages.

---

*Discovery complete. Partial EN+ZU Azure engine approved. Full multilingual requirement retained and unmet.*
