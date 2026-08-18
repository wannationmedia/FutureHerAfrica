export const YOUTUBE_CHANNEL = {
  handle: "FutureHerAfrica",
  displayName: "FutureHerAfrica",
  url: "https://www.youtube.com/@FutureHerAfrica",
  communityUrl: "https://www.youtube.com/@FutureHerAfrica/community",
  playlistsUrl: "https://www.youtube.com/@FutureHerAfrica/playlists",
} as const;

export const SERIES = {
  AI: {
    lockup: "FutureHer · AI",
    pill: "AI",
    token: "ai",
  },
  MONEY: {
    lockup: "FutureHer · Money",
    pill: "MONEY",
    token: "money",
  },
} as const;

export type SeriesKey = keyof typeof SERIES;

export type PublishStatus =
  | "NOT_STARTED"
  | "DRAFT"
  | "SCHEDULED"
  | "PUBLISHED"
  | "UNLISTED"
  | "PRIVATE"
  | "FAILED"
  | "REMOVED";

export type EpisodeStatus =
  | "IDEA"
  | "BRIEF"
  | "RESEARCHED"
  | "CLAIMS_CLEARED"
  | "SCRIPTED"
  | "RECORDED"
  | "VISUALS_READY"
  | "EDITED"
  | "PACKAGED"
  | "SCHEDULED"
  | "PUBLISHED"
  | "REVIEWED";

export type CatalogEpisode = {
  code: string;
  episodeNumber: number;
  title: string;
  slug: string;
  synopsis: string;
  description: string;
  series: SeriesKey;
  thumbnailPath: string | null;
  youtubeVideoId: string | null;
  status: EpisodeStatus;
  publishStatus: PublishStatus;
  primaryLanguage: "en";
};

export type CatalogPlaylist = {
  slug: string;
  title: string;
  description: string;
  series: SeriesKey;
  youtubePlaylistId: string | null;
  episodeCodes: string[];
};

export type CatalogShow = {
  slug: string;
  name: string;
  description: string;
  primaryLanguage: "en";
  youtubeHandle: string;
};

export type CatalogSeason = {
  seasonNumber: number;
  slug: string;
  title: string;
  description: string;
};

export const SHOW: CatalogShow = {
  slug: "futureherafrica",
  name: "FutureHerAfrica",
  description:
    "FutureHerAfrica teaches South African women how to get ready for what's next — AI, careers, money, and digital skills — without the noise.",
  primaryLanguage: "en",
  youtubeHandle: YOUTUBE_CHANNEL.handle,
};

export const SEASON: CatalogSeason = {
  seasonNumber: 1,
  slug: "season-1",
  title: "Season 1",
  description:
    "Launch season: AI fluency and money systems lessons from the FutureHerAfrica episode packs.",
};

export const EPISODES: CatalogEpisode[] = [
  {
    code: "EP001",
    episodeNumber: 1,
    title: "AI won't replace you — but ignoring this will",
    slug: "ep001-ai-wont-replace-you-task-layer",
    synopsis:
      "You're not dramatic for fearing AI. You're reading the room. Map the work, label the tasks, and run one with AI — without giving away your worth.",
    description:
      "One idea: AI pressures tasks — not your whole worth.\nOne skill: The Task Layer (Map · Label · Run one).\nOne action today: List 5 work tasks, assist 1 with AI, edit in your voice.",
    series: "AI",
    thumbnailPath: "/media/episodes/ep001.png",
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP002",
    episodeNumber: 2,
    title: "Stop downloading every AI app — pick one you can trust",
    slug: "ep002-ai-tool-trust-stack",
    synopsis:
      "If your phone is full of AI apps you never open, you're not behind — you're overloaded. Trust is a checklist, not a download frenzy.",
    description:
      "One idea: Trust is a checklist — not a download frenzy.\nOne skill: The Trust Stack — Need · Safety · Stick.\nOne action today: Pick one tool. Write three safety rules. Stick for 30 days.",
    series: "AI",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP003",
    episodeNumber: 3,
    title: "You only have a phone? You can still use AI",
    slug: "ep003-phone-first-ai-flow",
    synopsis:
      "You don't need a laptop to start AI. You need a phone flow you can finish between stop-start moments.",
    description:
      "One idea: A smartphone is a full AI classroom if you have a system.\nOne skill: The Phone Flow — Capture · Prompt · Save.\nOne action today: Finish one AI task entirely on your phone in under 30 minutes.",
    series: "AI",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP004",
    episodeNumber: 4,
    title: "How to use AI without sounding fake",
    slug: "ep004-human-edit-loop",
    synopsis:
      "If AI makes you sound like a press release, the fix isn't quitting AI — it's a human edit loop.",
    description:
      "One idea: AI draft ≠ your voice until you edit.\nOne skill: The Human Edit Loop — Draft · Strip · Stamp.\nOne action today: Strip the buzzwords. Stamp your story. Send in your voice.",
    series: "AI",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP005",
    episodeNumber: 5,
    title: "What AI can and cannot do at your job",
    slug: "ep005-ai-work-map-boundaries",
    synopsis:
      "If your manager said “use AI more” and gave you zero rules, you don't need panic — you need a Work Map.",
    description:
      "One idea: Clarity beats permission anxiety — map what AI may touch.\nOne skill: The Work Map — Automate · Assist · Avoid.\nOne action today: Map eight duties. Run one Assist task today.",
    series: "AI",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP006",
    episodeNumber: 6,
    title: "Prompting basics that still work in 5 years",
    slug: "ep006-rtcce-forever-prompts",
    synopsis:
      "If ChatGPT gives you fluff, you don't need secret prompt hacks — you need clear instructions that will still work in five years.",
    description:
      "One idea: Good prompts are clear instructions — not magic words.\nOne skill: RTCCE — Role · Task · Context · Constraints · Example.\nOne action today: Rewrite one failed prompt with RTCCE and save the winner.",
    series: "AI",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP007",
    episodeNumber: 7,
    title: "Fact-check AI before it embarrasses you",
    slug: "ep007-verify-before-you-send",
    synopsis:
      "AI can sound sure and still be wrong. Before you send, run Source · Number · Name.",
    description:
      "One idea: Fluency is not proof — verify before you share.\nOne skill: VERIFY — Source · Number · Name.\nOne action today: Verify sources, numbers, and names before you send.",
    series: "AI",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP008",
    episodeNumber: 8,
    title: "My salary disappears before month-end — here's the map",
    slug: "ep008-payday-map-salary",
    synopsis:
      "If your salary vanishes before month-end, you don't need a personality transplant — you need a Payday Map.",
    description:
      "One idea: Disappearing salary is a map problem — not a character flaw.\nOne skill: The Payday Map — Fixed · Flexible · Forward.\nOne action today: Give every rand a job before the month spends it for you.",
    series: "MONEY",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP009",
    episodeNumber: 9,
    title: "How to start saving when it feels impossible",
    slug: "ep009-micro-save-system",
    synopsis:
      "If saving feels impossible, shrink the goal to a floor you can keep — then protect it like it matters, because it does.",
    description:
      "One idea: Saving starts at a floor you can keep — not an ideal you abandon.\nOne skill: The Micro-Save — Floor · Automate · Protect.\nOne action today: Set a tiny floor. Move it. Protect it for 30 days.",
    series: "MONEY",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
  {
    code: "EP010",
    episodeNumber: 10,
    title: "Needs, wants, and the purchases that pressure you",
    slug: "ep010-kind-no-money-boundaries",
    synopsis:
      "If people make you feel guilty for saying no to spending, you need a pause rule and a Kind No — not a harder heart.",
    description:
      "One idea: Social pressure is not a financial obligation — pause before you spend to please.\nOne skill: The Kind No — Pause · Values · Script.\nOne action today: Pause 24 hours. Spend on values — or decline kindly.",
    series: "MONEY",
    thumbnailPath: null,
    youtubeVideoId: null,
    status: "PACKAGED",
    publishStatus: "DRAFT",
    primaryLanguage: "en",
  },
];

export const PLAYLISTS: CatalogPlaylist[] = [
  {
    slug: "ai",
    title: "FutureHer · AI",
    description:
      "Calm AI fluency: tasks, tools, phones, voice, workplace boundaries, prompts, and verification.",
    series: "AI",
    youtubePlaylistId: null,
    episodeCodes: ["EP001", "EP002", "EP003", "EP004", "EP005", "EP006", "EP007"],
  },
  {
    slug: "money",
    title: "FutureHer · Money",
    description:
      "Money systems with dignity: mapping a payday, micro-saving, and kind boundaries.",
    series: "MONEY",
    youtubePlaylistId: null,
    episodeCodes: ["EP008", "EP009", "EP010"],
  },
];

export function episodeBySlug(slug: string) {
  return EPISODES.find((episode) => episode.slug === slug) ?? null;
}

export function episodeByCode(code: string) {
  return EPISODES.find((episode) => episode.code === code) ?? null;
}

export function featuredEpisode() {
  return EPISODES[0];
}

const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_PLAYLIST_ID_PATTERN = /^[A-Za-z0-9_-]{10,64}$/;

export function isValidYouTubeVideoId(videoId: string | null | undefined): videoId is string {
  return typeof videoId === "string" && YOUTUBE_VIDEO_ID_PATTERN.test(videoId);
}

export function isValidYouTubePlaylistId(
  playlistId: string | null | undefined
): playlistId is string {
  return typeof playlistId === "string" && YOUTUBE_PLAYLIST_ID_PATTERN.test(playlistId);
}

export function youtubeWatchUrl(videoId: string) {
  if (!isValidYouTubeVideoId(videoId)) {
    throw new Error("Invalid YouTube video identifier.");
  }
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

export function youtubeEmbedUrl(videoId: string) {
  if (!isValidYouTubeVideoId(videoId)) {
    throw new Error("Invalid YouTube video identifier.");
  }
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
}

export function youtubeThumbnailUrl(videoId: string) {
  if (!isValidYouTubeVideoId(videoId)) {
    throw new Error("Invalid YouTube video identifier.");
  }
  return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
}

export function playlistWatchUrl(playlistId: string) {
  if (!isValidYouTubePlaylistId(playlistId)) {
    throw new Error("Invalid YouTube playlist identifier.");
  }
  return `https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`;
}

export function publishLabel(status: PublishStatus) {
  switch (status) {
    case "PUBLISHED":
      return "Published";
    case "UNLISTED":
      return "Unlisted";
    case "SCHEDULED":
      return "Scheduled";
    case "DRAFT":
      return "Prepared";
    case "PRIVATE":
      return "Private";
    default:
      return "In production";
  }
}
