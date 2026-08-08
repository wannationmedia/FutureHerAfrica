# Canva Export Spec — Digital Products

**Master file:** `FH_PRODUCT_MASTER` (duplicate per product — never edit the master)  
**Engine output:** `launch/EPxxx/PRODUCT/` — paste-ready HTML + `CANVA_PASTE.txt`

---

## Page size

| Use | Size | Notes |
|---|---|---|
| Print / PDF | A4 (210 × 297 mm) | Default for all product types |
| Phone share | 1080 × 1920 | Optional second export from same copy |
| Cover mock for sales | 1080 × 1350 | Crop from A4 cover |

Margins: 16–18 mm. Write-in line spacing ≥ 8 mm.

---

## Brand lock

| Token | Value |
|---|---|
| Ink | `#121A21` |
| Stone | `#F3EFE8` |
| Ivory | `#FFFCF8` |
| Brass | `#B8893A` |
| Lagoon | `#2F6F6A` |
| Mist | `#D8D2C8` |
| Clay (Money accent alt) | `#C47B5B` |
| Display | Newsreader / Source Serif 4 |
| UI / body | Satoshi (Canva emergency: Plus Jakarta Sans) |

Pillar accent bar: **AI = Lagoon** · **Money = Brass**.

---

## Import order (every product)

1. Open duplicate of `FH_PRODUCT_MASTER`  
2. Rename: `FH_PROD_[EP]_[Slug]_v1`  
3. Paste from `CANVA_PASTE.txt` page by page  
4. Or print HTML pages → PDF → place as reference while rebuilding in Canva  
5. Replace QR SVGs with Canva QR elements pointing to the same URLs in `06_QR.html` / paste file  
6. Export PDF (high quality, embed fonts) → `06_Products/YYYY_Slug/`

---

## Filename

```
FH_Product_[Type]_[Slug]_v1.pdf
```

Example: `FH_Product_Workbook_task-layer-workbook_v1.pdf`

---

## QC before export

- [ ] All 8 page types present  
- [ ] No bracket placeholders (`[LINK]`, `TODO`, lorem)  
- [ ] SA examples present  
- [ ] QR destinations tested  
- [ ] Price + sales copy match `SALES_COPY.txt`  
- [ ] Email sequence matches `EMAIL_SEQUENCE.txt`
