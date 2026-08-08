# SOP 13 — Digital Product Creation

**Owner:** Founder  
**Cadence:** Every episode (Digital Product Engine) + monthly refresh outside the weekly 4h when needed  
**Estimated time:** 30–60 minutes assembly after engine generate (2–4h only if designing a new Canva master)

---

## Objective

Ship digital products with an **identical structure every time** so creation is assembly — not invention.  
Every episode generates one publication-ready product pack.

---

## Inputs

- Episode framework (from episode factory / curriculum)  
- Product data: `scripts/products-001-005.mjs` + `scripts/products-006-010.mjs`  
- Structure master: `operations/PRODUCTS/DIGITAL_PRODUCT_TEMPLATE.md`  
- Types: `operations/PRODUCTS/PRODUCT_TYPES.md`  
- Canva spec: `operations/PRODUCTS/CANVA_EXPORT_SPEC.md`  
- Canva product master: `FH_PRODUCT_MASTER`

## Output

`launch/EPxxx/PRODUCT/` containing:

- `pages/` — Canva-ready A4 HTML (Cover → Thank-you)  
- `CANVA_PASTE.txt` — layer text for Canva  
- `SALES_COPY.txt` — publication-ready sales  
- `EMAIL_SEQUENCE.txt` — 5-email sequence  
- `PRODUCT_BRIEF.txt` + `00_INDEX.txt`  
- PDF export after Canva assembly → `06_Products/YYYY_Slug/`

---

## Step-by-step checklist

### A) Generate (engine)

- [ ] Update or add product object in `scripts/products-*.mjs` (no placeholders)  
- [ ] Run: `node scripts/generate-products.mjs`  
- [ ] Confirm `launch/EPxxx/PRODUCT/00_INDEX.txt` lists all files  

### B) Assemble (Canva)

- [ ] Duplicate `FH_PRODUCT_MASTER` → `FH_PROD_[EP]_[Slug]_v1`  
- [ ] Paste from `CANVA_PASTE.txt` (or print HTML → PDF as proof)  
- [ ] Fill **Cover · Branding · Contents · Practice pages · Action sheets · QR · Upsell · Thank-you**  
- [ ] Rebuild QR in Canva using URLs from `pages/*_QR.html`  
- [ ] Export PDF → `06_Products/YYYY_Slug/`  

### C) Launch

- [ ] Soft launch with `SALES_COPY.txt` + `EMAIL_SEQUENCE.txt`  
- [ ] Price in ZAR; payment via Paystack / Yoco / PayFast when checkout is live  
- [ ] Soft launch to Forward Collective / YouTube Community before public push  
- [ ] Log in Product Tracker  

---

## AI tools used

| Tool | Use |
|---|---|
| Cursor / Digital Product Engine | Full pack generation (pages, sales, email) |
| ChatGPT | Optional polish only — never invent new IP |
| Canva | Layout assembly from master |

---

## Human review points

1. Could she finish the core action in one sitting?  
2. Does this create readiness — or just PDF clutter?  
3. Are all destinations real URLs (no `[LINK]` placeholders)?  

---

## Quality-control checklist

- [ ] All 8 structure elements present  
- [ ] Brand colours/fonts correct (Ink / Stone / Brass / Lagoon · Satoshi + Newsreader)  
- [ ] SA examples inside  
- [ ] No copyrighted third-party pages pasted  
- [ ] Ethical claims only  
- [ ] QR codes tested  
- [ ] Sales + email sequence match the product  

**Pass → soft launch**
