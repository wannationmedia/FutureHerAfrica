import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  futureHerDbWarning: boolean | undefined;
};

function resolveAppDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url || url.includes("<PASSWORD>")) return null;
  if (/wannation/i.test(url)) {
    if (!globalForPrisma.futureHerDbWarning) {
      globalForPrisma.futureHerDbWarning = true;
      console.warn(
        "[futureher] DATABASE_URL points at a WANNATION database. Public app will use the static catalog instead."
      );
    }
    return null;
  }
  return url;
}

const appDatabaseUrl = resolveAppDatabaseUrl();

export function getPrisma(): PrismaClient | null {
  if (!appDatabaseUrl) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      datasources: { db: { url: appDatabaseUrl } },
    });
  }
  return globalForPrisma.prisma;
}
