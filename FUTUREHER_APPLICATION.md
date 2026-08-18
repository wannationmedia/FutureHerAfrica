# FutureHer Application (Phase B1)

Public Next.js application added around the existing FutureHer production/content system.

## Local development

```bash
npm install
npm run dev
```

Required scripts: `npm run dev`, `npm run build`, `npm run start`.

Existing voice and production-desk scripts are preserved:

- `npm run voice:ep001` / `npm run voice:episode`
- `npm run db:migrate` / `npm run db:seed:ep001` / `npm run db:validate:ep001`

## Environment

Copy `.env.example` to `.env`. Never commit secrets.

| Variable | Required for | Notes |
|---|---|---|
| `DATABASE_URL` | Prisma / public catalog overlay | Must point at a dedicated `futureher` database. **Must not** point at `wannation_os`. |
| `FHA_PRODUCTION_DATABASE_URL` | Handmade SQL desk (`db/`) | Optional. Separate from the web app. |
| `AZURE_SPEECH_KEY` / `AZURE_SPEECH_REGION` | Voice tooling only | Not used by the public site. |

The public B1 site renders from the static episode catalog when `DATABASE_URL` is unset, invalid, or points at a WANNATION database.

## Database boundary (owner approval required)

Local PostgreSQL 17 is running (`postgresql-x64-17`). Passwordless local login is not available.

B1 does **not** create the `futureher` database, user, or migrations against a live server until FutureHer-specific credentials are approved.

When approved:

1. Create database `futureher` and a FutureHer-specific role.
2. Set `DATABASE_URL=postgresql://futureher:<PASSWORD>@localhost:5432/futureher`
3. Run `npx prisma migrate deploy`
4. Run `npm run db:seed:app`

Do not run Prisma or handmade SQL against `wannation_os`.

## Vercel

Do not deploy until local production build, environment, and database decisions are confirmed.

Vercel env:

- `DATABASE_URL` — optional for first preview if the static catalog is acceptable; required once Prisma is the live catalog.

Build command: `prisma generate && next build` (no migrate during build).

## YouTube

Channel: `https://www.youtube.com/@FutureHerAfrica`

Episode and playlist identifiers are stored as metadata. Video files are not hosted in the application. YouTube Data API is not required for B1.
