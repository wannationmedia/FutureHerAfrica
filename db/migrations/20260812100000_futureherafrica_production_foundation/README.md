# Migration: `20260812100000_futureherafrica_production_foundation`

Adds FutureHerAfrica production management tables to local PostgreSQL `wannation_os`.

- Stores metadata, workflow state, asset references, versions, approvals, publishing records
- Does **not** store media binaries
- Non-destructive (`CREATE IF NOT EXISTS` / additive enums)

Apply with:

```bash
npm run db:migrate
```
