# FutureHer Operating System

**Phase:** 2 — Company Operating System  
**Document status:** Master operations manual (v2.0)  
**Operator model:** One founder · ≤ 4 focused hours/week · parallel tech company  
**Authority:** Think COO / Head of Operations  
**Constitutional authority:** `FUTUREHER_FOUNDATION_MANUAL.md` (Phase 4 — master reference for every decision)  
**Related strategy:** `FUTUREHER_FOUNDATION_MANUAL.md` · `FUTUREHER_FOUNDING_STRATEGY.md` · `FUTUREHER_COMMUNITY_MEDIA_STRATEGY.md` · `FUTUREHER_PRODUCTION_SYSTEM.md` · `FUTUREHER_CONTENT_INTELLIGENCE.md` · `FUTUREHER_VIDEO_PRODUCTION_ENGINE.md` · `FUTUREHER_GROWTH_PLAYBOOK.md` · `FUTUREHER_BRAND_DESIGN_STUDIO.md` · `FUTUREHER_BRAND_GUIDELINES.md`

---

## 0. Purpose

This manual is how FutureHer runs as a company — not how a YouTube channel “tries harder.”

Every process is designed so a founder with limited time can ship **premium educational media** for South African (and eventually African) women with:

| Principle | Operating meaning |
|---|---|
| Automation | Defaults, presets, schedules, ChatGPT prompts — not reinventing |
| Simplicity | One happy path. No optional side quests mid-week |
| Repeatability | Templates decide 80% of look, pace, and packaging |
| Low cost | Free / already-owned tools unless ROI ≥ 2 hours/month |
| High quality | Quality gates, not endless polish |
| Scalability | Systems that a VA or editor can later inherit unchanged |

**Editorial promise (unchanged):** FutureHer does not create noise. FutureHer creates readiness.

---

## 1. Golden Rules

1. If it can be automated — **automate it**.  
2. If it can be templated — **template it**.  
3. If it can be reused — **never recreate it**.  
4. Never create unnecessary work.  
5. Cut scope before inventing process.  
6. Founder time is the scarcest resource — protect it like capital.

---

## 2. Tool Stack (Company Standard)

### 2.1 Primary tools (design the company around these)

| Job | Tool | Notes |
|---|---|---|
| Research, briefs, scripts, recycling drafts | **ChatGPT** | Use prompt packs in `/operations` |
| Ops docs, SOPs, product text, code helpers | **Cursor** | This repo is the company OS |
| Video edit, captions, templates, VO cleanup | **CapCut Pro** | Already owned — primary editor |
| Thumbnails, product covers, simple graphics | **Canva Free/Pro** | Free first; Pro only if thumbnail speed bottlenecks |
| Files + episode archive | **Google Drive** | Mirror folder structure in §5 |
| Briefs, scripts, SOPs copies | **Google Docs** | Duplicate blanks — never overwrite masters |
| Trackers, Problem Bank, analytics log | **Google Sheets** | One ops workbook |
| Publish, schedule, SEO fields, analytics | **YouTube Studio** | Channel OS |

### 2.2 Allowed free adjuncts

| Job | Tool |
|---|---|
| Meta Reels / FB schedule | Meta Business Suite |
| Newsletter (early) | Beehiiv Free / Buttondown Free / Gmail BCC |
| Community closeness | WhatsApp Communities |
| Screen record | CapCut / Windows Game Bar |
| Fonts | Fontshare (Satoshi) + Google Fonts (Newsreader/Fraunces) |

### 2.3 Do not buy yet

Descript · ElevenLabs as default voice · Adobe suite · TubeBuddy/vidIQ paid · stock subscription farms · “AI social agencies”

**Buy later only if** the tool returns ≥ 2 hours every month **and** quality jumps (e.g. USB mic when audio is the #1 retention leak).

---

## 3. The 4-Hour Operating Week

### 3.1 One master → full distribution

From **one** 8-minute master script / episode:

| Output | Count |
|---|---|
| YouTube long-form | 1 |
| YouTube Shorts | 5 |
| Instagram Reels | 3 |
| Facebook Reels | 3 |
| LinkedIn article | 1 |
| Blog article | 1 |
| Newsletter (Forward Notes) | 1 |
| X posts | 5 |
| Threads posts | 5 |
| Community post pack | 1 set |

Atomization SOP: `operations/RECYCLING/ONE_SCRIPT_MANY_OUTPUTS.md`

### 3.2 Hard time budget (240 minutes)

| Block | Min | Output |
|---|---|---|
| Decide + brief | 15 | Episode brief |
| Research + fact check | 25 | ≤ 5 facts + sources |
| Script | 30 | Script + Shorts markers |
| Voice / film | 40 | A-roll |
| CapCut long-form | 45 | Master export |
| Shorts + Reels | 40 | 5 + 3 |
| Thumbnail | 10 | 1280×720 |
| SEO + upload + schedule | 20 | Week queued |
| Community + recycle paste | 15 | Pack written |
| **Total** | **240** | Week packaged |

Analytics, affiliates, sponsorships, and digital products run on **monthly/quarterly** cadences — not inside the weekly 4 hours (see §8).

### 3.3 Publish skeleton (scheduled, not live)

| Day | Publish |
|---|---|
| Mon | Long-form + Community intention |
| Tue–Sat | 1 Short/day |
| Wed / Fri | Reels (best of Shorts) |
| Midweek | Community question |
| Fri | Forward Wins |
| Sun | Soft next-episode preview |

---

## 4. Document Map (where everything lives)

```
FutureHer/
├── FUTUREHER_FOUNDATION_MANUAL.md          ← CONSTITUTION (Phase 4 master reference)
├── FUTUREHER_BRAND_DESIGN_STUDIO.md        ← CREATIVE CONSTITUTION (Phase 6)
├── FUTUREHER_FOUNDING_STRATEGY.md          ← brand + business strategy
├── FUTUREHER_COMMUNITY_MEDIA_STRATEGY.md   ← community architecture
├── FUTUREHER_PRODUCTION_SYSTEM.md          ← Phase 1 production OS (still valid)
├── FUTUREHER_OPERATING_SYSTEM.md           ← THIS FILE (Phase 2 master)
├── FUTUREHER_CONTENT_INTELLIGENCE.md       ← editorial brain / topic systems
├── FUTUREHER_VIDEO_PRODUCTION_ENGINE.md    ← idea→publish pipeline
├── FUTUREHER_GROWTH_PLAYBOOK.md            ← audience growth engine
├── FUTUREHER_BRAND_GUIDELINES.md           ← messaging + name clearance
├── brand/                                  ← asset library + tokens
├── templates/                              ← weekly fill-in blanks
└── operations/
    ├── SOPs/                               ← 15 professional SOPs
    ├── CAPCUT/                             ← Templates A–E specs
    ├── UPLOAD/                             ← titles, descriptions, tags…
    ├── RECYCLING/                          ← one script → many outputs
    ├── PRODUCTS/                           ← digital product system
    ├── REVENUE/                            ← affiliate + sponsorship
    └── QC/                                 ← pre-publish quality gate
```

---

## 5. Company Folder Structure (Google Drive)

Create once. Never improvise paths weekly.

```
FutureHer/
├── 00_Brand/
├── 01_Templates/
│   ├── CapCut/          ← masters A–E (duplicate only)
│   ├── Canva/
│   ├── Upload_Packs/
│   └── Products/
├── 02_Problem_Bank/
├── 03_Episodes/YYYY/YYYYMMDD_Slug/
├── 04_Assets/           ← B-roll, AI visuals library, music notes
├── 05_SOPs/             ← PDF/print of this OS (optional)
├── 06_Products/
├── 07_Partners/         ← affiliate + sponsor dossiers
└── 08_Analytics/
```

---

## 6. CapCut Template System (A–E)

Founder replaces **script + visuals only**. Everything else is locked.

| Template | Series feel | Accent | Master name |
|---|---|---|---|
| **A Educational** | AI / Systems / Digital skills | Lagoon | `FH_TMPL_A_Educational` |
| **B Money** | Money / fintech education | Brass | `FH_TMPL_B_Money` |
| **C Career** | Careers / promotion / LinkedIn | Ink | `FH_TMPL_C_Career` |
| **D Relationships** | Communication / confidence / presence (Soft Power = content pillar, not series name) | Clay | `FH_TMPL_D_Relationships` |
| **E Stories** | Narrative / SA story-led lessons | Mist + Brass | `FH_TMPL_E_Stories` |

Each includes: intro · outro · brand animation · captions · fonts · colours · music · transitions · zooms · lower thirds · CTA screen.

Full build specs: `operations/CAPCUT/TEMPLATE_LIBRARY.md`

---

## 7. SOP Index (15)

| # | SOP | File | Weekly? | Timebox |
|---|---|---|---|---|
| 01 | Research | `operations/SOPs/01_RESEARCH.md` | Yes | 20 min |
| 02 | Script Writing | `operations/SOPs/02_SCRIPT_WRITING.md` | Yes | 30 min |
| 03 | Fact Checking | `operations/SOPs/03_FACT_CHECKING.md` | Yes | 5–10 min |
| 04 | Voice-over Production | `operations/SOPs/04_VOICEOVER_PRODUCTION.md` | Yes | 40 min |
| 05 | AI Visual Generation | `operations/SOPs/05_AI_VISUAL_GENERATION.md` | As needed | 10–15 min |
| 06 | Stock Footage Selection | `operations/SOPs/06_STOCK_FOOTAGE_SELECTION.md` | As needed | 10 min |
| 07 | CapCut Editing | `operations/SOPs/07_CAPCUT_EDITING.md` | Yes | 85 min |
| 08 | Thumbnail Creation | `operations/SOPs/08_THUMBNAIL_CREATION.md` | Yes | 10 min |
| 09 | SEO Optimisation | `operations/SOPs/09_SEO_OPTIMISATION.md` | Yes | 10 min |
| 10 | Upload Workflow | `operations/SOPs/10_UPLOAD_WORKFLOW.md` | Yes | 15–20 min |
| 11 | Community Posts | `operations/SOPs/11_COMMUNITY_POSTS.md` | Yes | 15 min |
| 12 | Analytics Review | `operations/SOPs/12_ANALYTICS_REVIEW.md` | Monthly | 30 min |
| 13 | Digital Product Creation | `operations/SOPs/13_DIGITAL_PRODUCT_CREATION.md` | Monthly/qtr | 2–4 h |
| 14 | Affiliate Integration | `operations/SOPs/14_AFFILIATE_INTEGRATION.md` | As earned | 20–40 min |
| 15 | Sponsorship Workflow | `operations/SOPs/15_SPONSORSHIP_WORKFLOW.md` | As earned | variable |

---

## 8. Cadence Outside the Weekly 4 Hours

| Cadence | Action | Budget |
|---|---|---|
| Friday | Problem Bank top 10 | 15 min |
| Batch day | Full production week | ≤ 4 h |
| Publish days | Paste community + glance comments | 2–5 min/day |
| Monthly | Analytics review + CTA link refresh | 30 min |
| Monthly/qtr | One digital product or product refresh | 2–4 h |
| As earned | Affiliate add / sponsor deliverable | per SOP |
| Quarterly | Template redesign **or** one deep-cut — not both | 2–4 h |

---

## 9. Quality Control (non-negotiable)

Before any publish, pass `operations/QC/PRE_PUBLISH_QUALITY_GATE.md`:

- Accuracy · Clarity · South African relevance · Accessibility  
- Professional language · Ethical recommendations · Brand consistency  
- Copyright compliance · YouTube policy compliance  

Fail any gate → fix that item only. Do not reopen creative direction.

---

## 10. Revenue Ops (protect trust)

| Stream | Rule |
|---|---|
| Affiliates | Teach first. Recommend sparingly. Always disclose. |
| Sponsors | Premium, few, deep. Audience dignity > fee. |
| Digital products | Same structure every time (cover → TOC → workbook → action → QR → upsell → thank-you). |
| Ads | Fuel, not identity. |

See `operations/REVENUE/` and product system in `operations/PRODUCTS/`.

---

## 11. Setup Day (one-time, before Week 1 at scale)

~4 hours once:

1. Create Drive folder tree (§5)  
2. Build CapCut Templates A–E per `operations/CAPCUT/`  
3. Save YouTube Studio defaults + playlists  
4. Copy upload pack into Drive  
5. Create Sheets: Problem Bank · Episode Tracker · Analytics Log · Partner Log  
6. Run one dummy episode end-to-end using `templates/WEEKLY_RUN_SHEET.md`  
7. Pin this OS + weekly run sheet  

After Setup Day, weekly work is: **fill → film → replace → export → schedule → paste**.

---

## 12. Definition of Done (weekly)

- [ ] 1 long-form scheduled  
- [ ] 5 Shorts scheduled  
- [ ] 3 IG + 3 FB Reels scheduled (same 3 files OK)  
- [ ] Thumbnail + SEO pack complete  
- [ ] Community pack written  
- [ ] Recycling pack drafted (LinkedIn / blog / newsletter / X / Threads) — schedule or park  
- [ ] Tracker = `PACKAGED`  
- [ ] Active production ≤ 4 hours  

---

## 13. Failure Modes

| Failure | Fix |
|---|---|
| Editing > 45 min long-form | You are designing — revert to template |
| Research spiral | Cap at 5 facts; teach from experience |
| Tool FOMO | Re-read §2.3 |
| Missed week | Shorts-only from last markers; never triple long-form catch-up |
| Quality anxiety | Consistency is the premium signal |

---

## Document control

| Field | Value |
|---|---|
| Version | 2.0 |
| Owner | Founder (COO seat) |
| Review trigger | After 12 published weeks, or weekly time > 5h twice |

---

*FutureHer Operating System — one founder, two companies, zero chaos.*
