import axios, { AxiosError } from "axios";

import { cacheTtl } from "@/lib/cacheKeys";
import { cacheGet, cacheSet } from "@/lib/redis";

import type {
  DeveloperLanguage,
  DeveloperProfile,
  DeveloperRepo,
  FindPeopleResponse,
  PeopleSort,
} from "../types";

const GITHUB_API = "https://api.github.com";
const RECENT_COMMIT_DAYS = 90;
const ENRICH_CONCURRENCY = 4;
const REQUEST_TIMEOUT_MS = 12_000;

export type FindGithubPeopleOptions = {
  languages: string[];
  location: string;
  minFollowers: number;
  sort: PeopleSort;
  page: number;
  perPage: number;
};

type SearchUserItem = {
  login: string;
  avatar_url: string;
  html_url: string;
};

type SearchUsersResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: SearchUserItem[];
};

type UserDetail = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  email: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  hireable: boolean | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
};

type UserRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

type PublicEvent = {
  type: string;
  created_at: string;
  payload?: {
    size?: number;
    commits?: unknown[];
  };
};

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  } as const;
}

function quoteQualifier(value: string) {
  return /[^a-z0-9.\-]/i.test(value) ? `"${value}"` : value;
}

export function buildSearchQuery(opts: FindGithubPeopleOptions): string {
  const parts: string[] = ["type:user"];

  for (const language of opts.languages) {
    const trimmed = language.trim();
    if (trimmed) parts.push(`language:${quoteQualifier(trimmed)}`);
  }

  const location = opts.location.trim();
  if (location) parts.push(`location:${quoteQualifier(location)}`);

  if (opts.minFollowers > 0) parts.push(`followers:>=${opts.minFollowers}`);

  return parts.join(" ");
}

async function pMap<T, R>(
  items: T[],
  mapper: (item: T, index: number) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await mapper(items[index], index);
    }
  }

  const workerCount = Math.min(Math.max(concurrency, 1), items.length || 1);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return results;
}

async function searchUsers(
  query: string,
  sort: PeopleSort,
  page: number,
  perPage: number,
  token: string
): Promise<SearchUsersResponse> {
  const { data } = await axios.get<SearchUsersResponse>(
    `${GITHUB_API}/search/users`,
    {
      params: { q: query, sort, order: "desc", per_page: perPage, page },
      headers: authHeaders(token),
      timeout: REQUEST_TIMEOUT_MS,
    }
  );
  return data;
}

async function fetchJson<T>(url: string, token: string): Promise<T> {
  const { data } = await axios.get<T>(url, {
    headers: authHeaders(token),
    timeout: REQUEST_TIMEOUT_MS,
  });
  return data;
}

function aggregateRepos(repos: UserRepo[]): {
  languages: DeveloperLanguage[];
  topRepos: DeveloperRepo[];
  totalStars: number;
} {
  const languageCounts = new Map<string, number>();
  let totalStars = 0;

  for (const repo of repos) {
    if (repo.fork) continue;
    totalStars += repo.stargazers_count || 0;
    if (repo.language) {
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }
  }

  const languages = Array.from(languageCounts.entries())
    .map(([name, count]) => ({ name, repos: count }))
    .sort((a, b) => b.repos - a.repos)
    .slice(0, 6);

  const topRepos = repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 3)
    .map((repo) => ({
      name: repo.name,
      htmlUrl: repo.html_url,
      stars: repo.stargazers_count || 0,
      language: repo.language,
      description: repo.description,
    }));

  return { languages, topRepos, totalStars };
}

function countRecentCommits(events: PublicEvent[]): number {
  const cutoff = Date.now() - RECENT_COMMIT_DAYS * 24 * 60 * 60 * 1000;
  let commits = 0;

  for (const event of events) {
    if (event.type !== "PushEvent") continue;
    if (new Date(event.created_at).getTime() < cutoff) continue;
    commits += event.payload?.commits?.length ?? event.payload?.size ?? 0;
  }

  return commits;
}

function computeScore(profile: {
  followers: number;
  totalStars: number;
  recentCommits: number;
  publicRepos: number;
}): number {
  return (
    profile.followers * 2 +
    profile.totalStars * 3 +
    profile.recentCommits +
    profile.publicRepos
  );
}

function createFallbackProfile(item: SearchUserItem): DeveloperProfile {
  return {
    login: item.login,
    name: null,
    avatarUrl: item.avatar_url,
    htmlUrl: item.html_url,
    bio: null,
    email: null,
    location: null,
    company: null,
    blog: null,
    twitterUsername: null,
    hireable: null,
    followers: 0,
    following: 0,
    publicRepos: 0,
    totalStars: 0,
    recentCommits: 0,
    languages: [],
    topRepos: [],
    score: 0,
    rank: 0,
    joinedYear: null,
  };
}

async function enrichUser(
  item: SearchUserItem,
  token: string
): Promise<DeveloperProfile> {
  const login = item.login;
  const cacheKey = `crewcast:people:user:${login.toLowerCase()}`;

  const cached = await cacheGet<string>(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached) as DeveloperProfile;
    } catch {
      // Ignore corrupt cache and refetch.
    }
  }

  const [detailResult, reposResult, eventsResult] = await Promise.allSettled([
    fetchJson<UserDetail>(`${GITHUB_API}/users/${login}`, token),
    fetchJson<UserRepo[]>(
      `${GITHUB_API}/users/${login}/repos?per_page=100&sort=pushed&type=owner`,
      token
    ),
    fetchJson<PublicEvent[]>(
      `${GITHUB_API}/users/${login}/events/public?per_page=100`,
      token
    ),
  ]);

  if (detailResult.status !== "fulfilled") {
    return createFallbackProfile(item);
  }

  const detail = detailResult.value;
  const repos = reposResult.status === "fulfilled" ? reposResult.value : [];
  const events = eventsResult.status === "fulfilled" ? eventsResult.value : [];

  const { languages, topRepos, totalStars } = aggregateRepos(repos);
  const recentCommits = countRecentCommits(events);

  const joinedYear = detail.created_at
    ? new Date(detail.created_at).getFullYear()
    : null;

  const score = computeScore({
    followers: detail.followers,
    totalStars,
    recentCommits,
    publicRepos: detail.public_repos,
  });

  const profile: DeveloperProfile = {
    login: detail.login,
    name: detail.name,
    avatarUrl: detail.avatar_url || item.avatar_url,
    htmlUrl: detail.html_url || item.html_url,
    bio: detail.bio,
    email: detail.email,
    location: detail.location,
    company: detail.company,
    blog: detail.blog || null,
    twitterUsername: detail.twitter_username,
    hireable: detail.hireable,
    followers: detail.followers,
    following: detail.following,
    publicRepos: detail.public_repos,
    totalStars,
    recentCommits,
    languages,
    topRepos,
    score,
    rank: 0,
    joinedYear,
  };

  await cacheSet(cacheKey, JSON.stringify(profile), cacheTtl.githubIntel);

  return profile;
}

export async function findGithubPeople(
  opts: FindGithubPeopleOptions
): Promise<FindPeopleResponse> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN is not configured.");
  }

  const query = buildSearchQuery(opts);

  let search: SearchUsersResponse;
  try {
    search = await searchUsers(query, opts.sort, opts.page, opts.perPage, token);
  } catch (error) {
    throw mapGithubError(error);
  }

  const items = search.items ?? [];

  const developers = await pMap(
    items,
    (item) => enrichUser(item, token),
    ENRICH_CONCURRENCY
  );

  developers.sort((a, b) => b.score - a.score);
  developers.forEach((developer, index) => {
    developer.rank = (opts.page - 1) * opts.perPage + index + 1;
  });

  const totalCount = search.total_count ?? developers.length;
  const hasMore = opts.page * opts.perPage < totalCount;

  return {
    developers,
    totalCount,
    query,
    page: opts.page,
    hasMore,
    warnings:
      developers.some(
        (developer) =>
          developer.followers === 0 &&
          developer.publicRepos === 0 &&
          developer.totalStars === 0 &&
          developer.topRepos.length === 0
      ) && items.length > 0
        ? [
            "Some GitHub profiles could not be fully enriched, so basic profile cards are shown.",
          ]
        : undefined,
  };
}

function mapGithubError(error: unknown): Error {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    if (status === 401) {
      return new Error("GitHub authentication failed. Check GITHUB_TOKEN.");
    }
    if (status === 403 || status === 429) {
      return new Error("GitHub rate limit reached. Please try again shortly.");
    }
    if (status === 422) {
      return new Error("GitHub could not process that search query.");
    }
  }
  return error instanceof Error ? error : new Error("GitHub search failed.");
}
