import axios from "axios";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

type GitHubGraphQLRepo = {
  stargazerCount: number;
  forkCount: number;
  isFork: boolean;
  pushedAt: string | null;
  primaryLanguage: {
    name: string;
  } | null;
};

type GitHubGraphQLUser = {
  login: string;
  followers: {
    totalCount: number;
  };
  repositories: {
    nodes: GitHubGraphQLRepo[];
    totalCount: number;
  };
  createdAt: string;
};

export type GitHubGraphQLScore = {
  totalScore: number;
  profile: {
    username: string;
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

const cache = new Map<string, { data: GitHubGraphQLScore; expiry: number }>();

export async function scoreGitHubProfile(
  username: string
): Promise<GitHubGraphQLScore> {
  if (!username) throw new Error("Username is required");

  const cached = cache.get(username);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }

  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is required for GitHub GraphQL scoring");
  }

  try {
    const query = `
      query ($login: String!) {
        user(login: $login) {
          login
          followers {
            totalCount
          }
          repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
            nodes {
              stargazerCount
              forkCount
              isFork
              pushedAt
              primaryLanguage {
                name
              }
            }
            totalCount
          }
          createdAt
        }
      }
    `;

    const response = await axios.post<{
      data?: { user?: GitHubGraphQLUser | null };
      errors?: Array<{ message?: string }>;
    }>(
      GITHUB_GRAPHQL_URL,
      {
        query,
        variables: { login: username },
      },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (response.data.errors?.length) {
      throw new Error(response.data.errors[0]?.message ?? "GitHub GraphQL error");
    }

    const user = response.data.data?.user ?? null;

    if (!user) throw new Error("User not found");

    const repos = user.repositories.nodes;
    const accountAgeYears =
      (Date.now() - new Date(user.createdAt).getTime()) /
      (1000 * 60 * 60 * 24 * 365);

    let totalStars = 0;
    let totalForks = 0;
    let originalRepos = 0;
    let recentRepos = 0;

    const languages: Record<string, number> = {};
    const sixMonthsAgo = Date.now() - 1000 * 60 * 60 * 24 * 180;

    repos.forEach((repo) => {
      if (!repo.isFork) {
        originalRepos++;
        totalStars += repo.stargazerCount;
        totalForks += repo.forkCount;
      }

      if (repo.pushedAt && new Date(repo.pushedAt).getTime() > sixMonthsAgo) {
        recentRepos++;
      }

      const lang = repo.primaryLanguage?.name;
      if (lang) {
        languages[lang] = (languages[lang] || 0) + 1;
      }
    });

    const followerScore = Math.min(user.followers.totalCount * 2, 100);
    const starScore = Math.min(totalStars * 0.5, 100);
    const repoScore = originalRepos * 2;
    const activityScore = recentRepos * 3;
    const maturityScore = Math.min(accountAgeYears * 5, 50);
    const rawScore = Math.round(
      followerScore + starScore + repoScore + activityScore + maturityScore
    );

    const notes: string[] = [];

    if (recentRepos < 3) notes.push("Low recent activity");
    if (originalRepos < repos.length / 2) {
      notes.push("High number of forked repositories");
    }
    if (totalStars < 10) notes.push("Low open-source impact (stars)");
    if (Object.keys(languages).length === 1) {
      notes.push("Low language diversity");
    }

    const result: GitHubGraphQLScore = {
      totalScore: Math.min(rawScore, 100),
      profile: {
        username: user.login,
        publicRepos: user.repositories.totalCount,
        followers: user.followers.totalCount,
        accountAgeYears: Number(accountAgeYears.toFixed(1)),
      },
      languages,
      signals: {
        originalRepos,
        recentRepos,
        stars: totalStars,
        forks: totalForks,
      },
      notes,
    };

    cache.set(username, {
      data: result,
      expiry: Date.now() + CACHE_TTL,
    });

    return result;
  } catch (error: any) {
    console.error("GitHub GraphQL error:", error?.response?.data || error);
    throw new Error("Failed to fetch GitHub data");
  }
}
