import path from "node:path";

const EPISODE_MASTERS: Record<string, readonly string[]> = {
  ep001: ["launch", "EP001", "PUBLISH", "EP001_FutureHerAfrica_FINAL.mp4"],
};

export function resolveEpisodeMaster(code: string): string | null {
  const key = code.trim().toLowerCase().replace(/\.mp4$/i, "");
  const parts = EPISODE_MASTERS[key];
  if (!parts) return null;

  const launchRoot = path.resolve(process.cwd(), "launch");
  const filePath = path.resolve(process.cwd(), ...parts);
  const relative = path.relative(launchRoot, filePath);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }
  return filePath;
}
