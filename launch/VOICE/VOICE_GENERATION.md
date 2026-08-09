# FutureHerAfrica — Voice Generation

**Authority:** `FUTUREHERAFRICA_VOICE_SYSTEM.md` · `PROVIDER_CAPABILITY_MATRIX.md` · `VOICE_PROFILES.json`  
**Engine:** `scripts/voice/generate_voice.mjs`

## Commands

From repository root:

```bash
npm run voice:ep001 -- --languages=en,zu
npm run voice:ep001 -- --languages=en,nso,ve,ts,zu
npm run voice:episode -- EP002 --languages=en,zu
```

Unsupported languages are refused. The engine never substitutes English, another African language, or a male voice.

## Partial stack (verified)

| Language | Provider | Voice ID |
|---|---|---|
| EN | Azure AI Speech | `en-ZA-LeahNeural` |
| ZU | Azure AI Speech | `zu-ZA-ThandoNeural` |

## Required environment variables

```
AZURE_SPEECH_KEY=
AZURE_SPEECH_REGION=
FHA_VOICE_EN_VOICE_ID=en-ZA-LeahNeural
FHA_VOICE_ZU_VOICE_ID=zu-ZA-ThandoNeural
```

Copy names from `.env.example`. Never commit secrets.

## Scripts

| Language | Source file |
|---|---|
| EN | `launch/EP00N/SCRIPT_VO.txt` |
| NSO | `launch/EP00N/SCRIPT_VO_NSO.txt` |
| VE | `launch/EP00N/SCRIPT_VO_VE.txt` |
| TS | `launch/EP00N/SCRIPT_VO_TS.txt` |
| ZU | `launch/EP00N/SCRIPT_VO_ZU.txt` |

Localized scripts must be approved language-specific reads. Missing scripts fail closed. Do not blind machine-translate.

## Outputs

```
launch/EP00N/audio/
  EP00N_VO_EN_v1.wav
  EP00N_VO_ZU_v1.wav
  VOICE_MANIFEST.json
  VOICE_QC_REPORT.md
```

EP001 also writes legacy EN alias `EP001_VO_v1.wav` when EN succeeds.

## Credential gate

If Azure credentials are missing, the command exits non-zero, writes a blocked QC report, and does **not** create WAV files.
