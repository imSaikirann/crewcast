type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  name: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string | null;
  updated_at: string | null;
};

export type GitHubScore = {
  totalScore: number;
  breakdown: {
    github: number;
    profile: {
      username: string | null;
      publicRepos: number;
      followers: number;
      accountAgeYears: number;
    };
    languages: Record<string, number>;
    signals: {
      originalRepos: number;
      recentRepos: number;
      stars: number;
      forks: number;
    };
    notes: string[];
  };
};

const GITHUB_FIELD_HINTS = ["github", "git hub", "github username", "github profile"];

export function extractGitHubUsername(
  responses: Record<string, unknown>,
  fields: unknown
) {
  const fieldList = Array.isArray(fields) ? fields : [];
  const githubField = fieldList.find((field: any) => {
    const label = String(field?.label ?? "").toLowerCase();
    const id = String(field?.id ?? "").toLowerCase();
    return GITHUB_FIELD_HINTS.some((hint) => label.includes(hint) || id.includes(hint.replace(" ", "")));
  }) as any;

  const candidates = [
    githubField ? responses[githubField.id] : null,
    responses.github,
    responses.githubUsername,
    responses.github_username,
    responses.githubProfile,
    responses.github_url,
  ];

  for (const candidate of candidates) {
    const username = normalizeGitHubUsername(candidate);
    if (username) return username;
  }

  return null;
}

export function hasGitHubField(fields: unknown) {
  return Array.isArray(fields) && fields.some((field: any) => {
    const label = String(field?.label ?? "").toLowerCase();
    const id = String(field?.id ?? "").toLowerCase();
    return GITHUB_FIELD_HINTS.some((hint) => label.includes(hint) || id.includes(hint.replace(" ", "")));
  });
}

export async function scoreGitHubProfile(username: string | null): Promise<GitHubScore> {
  if (!username) {
    return emptyScore("No GitHub profile was provided.");
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      return emptyScore(`GitHub user "${username}" could not be found.`);
    }

    const user = (await userRes.json()) as GitHubUser;
    const repos = reposRes.ok ? ((await reposRes.json()) as GitHubRepo[]) : [];
    const originalRepos = repos.filter((repo) => !repo.fork);
    const now = Date.now();
    const sixMonthsMs = 1000 * 60 * 60 * 24 * 183;
    const recentRepos = originalRepos.filter((repo) => {
      const date = repo.pushed_at || repo.updated_at;
      return date ? now - new Date(date).getTime() <= sixMonthsMs : false;
    });

    const stars = originalRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const forks = originalRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages = originalRepos.reduce<Record<string, number>>((acc, repo) => {
      if (!repo.language) return acc;
      acc[repo.language] = (acc[repo.language] ?? 0) + 1;
      return acc;
    }, {});

    const accountAgeYears = Math.max(
      0,
      (now - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
    );

    const repoScore = Math.min(originalRepos.length * 2, 25);
    const activityScore = Math.min(recentRepos.length * 5, 25);
    const impactScore = Math.min(stars * 1.5 + forks * 2 + user.followers, 25);
    const breadthScore = Math.min(Object.keys(languages).length * 4, 15);
    const maturityScore = Math.min(accountAgeYears * 2, 10);
    const totalScore = Math.round(repoScore + activityScore + impactScore + breadthScore + maturityScore);

    return {
      totalScore: Math.min(totalScore, 100),
      breakdown: {
        github: Math.min(totalScore, 100),
        profile: {
          username: user.login,
          publicRepos: user.public_repos,
          followers: user.followers,
          accountAgeYears: Number(accountAgeYears.toFixed(1)),
        },
        languages,
        signals: {
          originalRepos: originalRepos.length,
          recentRepos: recentRepos.length,
          stars,
          forks,
        },
        notes: reposRes.ok
          ? []
          : ["GitHub repositories could not be fetched, so the score is based on profile data only."],
      },
    };
  } catch {
    return emptyScore("GitHub scoring is temporarily unavailable.");
  }
}

function normalizeGitHubUsername(value: unknown) {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw) return null;

  const match = raw.match(/github\.com\/([A-Za-z0-9-]+)/i);
  const username = match?.[1] ?? raw.replace(/^@/, "");
  return /^[A-Za-z0-9-]{1,39}$/.test(username) ? username : null;
}

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function emptyScore(note: string): GitHubScore {
  return {
    totalScore: 0,
    breakdown: {
      github: 0,
      profile: {
        username: null,
        publicRepos: 0,
        followers: 0,
        accountAgeYears: 0,
      },
      languages: {},
      signals: {
        originalRepos: 0,
        recentRepos: 0,
        stars: 0,
        forks: 0,
      },
      notes: [note],
    },
  };
}
