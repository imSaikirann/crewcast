import axios, { AxiosError } from "axios";

import { cacheTtl } from "@/lib/cacheKeys";
import { cacheGet, cacheSet } from "@/lib/redis";

import type {
  GitHubCandidateData,
  GitHubPullRequestSignal,
  GitHubRepositorySignal,
} from "./types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const RECENT_COMMIT_DAYS = 90;

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

type RepoNode = {
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  isFork: boolean;
  isArchived: boolean;
  isEmpty: boolean;
  pushedAt: string | null;
  updatedAt: string | null;
  stargazerCount: number;
  forkCount: number;
  diskUsage: number | null;
  owner: { login: string };
  languages: {
    edges: Array<{
      size: number;
      node: { name: string };
    }>;
  };
  defaultBranchRef: {
    target:
      | {
          history?: {
            totalCount: number;
            nodes: Array<{
              messageHeadline: string;
              committedDate: string;
            }>;
          };
        }
      | Record<string, never>;
  } | null;
  mentionableUsers: {
    totalCount: number;
  };
};

type PullRequestNode = {
  title: string;
  merged: boolean;
  createdAt: string;
  repository: {
    nameWithOwner: string;
    owner: {
      login: string;
    };
  };
};

type CandidateQuery = {
  user: {
    login: string;
    name: string | null;
    bio: string | null;
    followers: { totalCount: number };
    repositories: {
      totalCount: number;
      nodes: RepoNode[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
    createdAt: string;
  } | null;
  search: {
    nodes: PullRequestNode[];
  };
};

export async function fetchGitHubCandidateData(
  username: string
): Promise<GitHubCandidateData> {
  const login = normalizeUsername(username);
  if (!login) throw new Error("A valid GitHub username is required.");

  const cacheKey = `crewcast:github-intel:${login}`;
  const cached = await cacheGet<string>(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached) as GitHubCandidateData;
    } catch {
      // Ignore corrupt cache and refetch.
    }
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is required for GitHub intelligence.");

  try {
    const data = await fetchGitHubCandidateDataGraphQL(login, token);
    await cacheSet(cacheKey, JSON.stringify(data), cacheTtl.githubIntel);
    return data;
  } catch (error) {
    console.warn("GitHub GraphQL intelligence failed; falling back to REST.", {
      username: login,
      reason: getErrorSummary(error),
    });
    const data = await fetchGitHubCandidateDataRest(login, token);
    await cacheSet(cacheKey, JSON.stringify(data), cacheTtl.githubIntel);
    return data;
  }
}

function getErrorSummary(error: unknown) {
  if (error instanceof AxiosError) {
    return {
      status: error.response?.status,
      code: error.code,
      message: error.message,
    };
  }

  return error instanceof Error ? error.message : String(error);
}

async function fetchGitHubCandidateDataGraphQL(
  login: string,
  token: string
): Promise<GitHubCandidateData> {
  const since = new Date(Date.now() - RECENT_COMMIT_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const repositories: GitHubRepositorySignal[] = [];
  let cursor: string | null = null;
  let profile: GitHubCandidateData["profile"] | null = null;

  for (let page = 0; page < 3; page++) {
    const response: CandidateQuery = await githubGraphQL<CandidateQuery>({
      token,
      query: CANDIDATE_QUERY,
      variables: {
        login,
        repoCursor: cursor,
        since,
        prQuery: `author:${login} type:pr`,
      },
    });

    if (!response.user) throw new Error("GitHub user was not found.");

    profile ??= {
      username: response.user.login,
      name: response.user.name,
      bio: response.user.bio,
      publicRepos: response.user.repositories.totalCount,
      followers: response.user.followers.totalCount,
      createdAt: response.user.createdAt,
    };

    repositories.push(...response.user.repositories.nodes.map(mapRepository));

    if (!response.user.repositories.pageInfo.hasNextPage) {
      return buildCandidateData(login, profile, repositories, response.search.nodes);
    }

    cursor = response.user.repositories.pageInfo.endCursor;
  }

  const fallbackResponse: CandidateQuery = await githubGraphQL<CandidateQuery>({
    token,
    query: CANDIDATE_QUERY,
    variables: {
      login,
      repoCursor: cursor,
      since,
      prQuery: `author:${login} type:pr`,
    },
  });

  if (!profile && fallbackResponse.user) {
    profile = {
      username: fallbackResponse.user.login,
      name: fallbackResponse.user.name,
      bio: fallbackResponse.user.bio,
      publicRepos: fallbackResponse.user.repositories.totalCount,
      followers: fallbackResponse.user.followers.totalCount,
      createdAt: fallbackResponse.user.createdAt,
    };
  }

  if (!profile) throw new Error("GitHub user was not found.");

  return buildCandidateData(login, profile, repositories, fallbackResponse.search.nodes);
}

async function githubGraphQL<T>({
  token,
  query,
  variables,
}: {
  token: string;
  query: string;
  variables: Record<string, unknown>;
}) {
  try {
    const response = await axios.post<GraphQLResponse<T>>(
      GITHUB_GRAPHQL_URL,
      { query, variables },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 12_000,
      }
    );

    const remaining = Number(response.headers["x-ratelimit-remaining"] ?? 1);
    if (remaining <= 0) {
      const reset = response.headers["x-ratelimit-reset"];
      throw new Error(`GitHub rate limit exceeded. Resets at ${reset ?? "unknown"}.`);
    }

    if (response.data.errors?.length) {
      throw new Error(response.data.errors[0]?.message ?? "GitHub GraphQL error");
    }

    if (!response.data.data) throw new Error("GitHub returned an empty response.");
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const remaining = error.response?.headers?.["x-ratelimit-remaining"];
      if (remaining === "0") {
        throw new Error("GitHub rate limit exceeded. Please retry later.");
      }
    }

    throw error;
  }
}

function buildCandidateData(
  username: string,
  profile: GitHubCandidateData["profile"],
  repositories: GitHubRepositorySignal[],
  pullRequestNodes: PullRequestNode[]
): GitHubCandidateData {
  return {
    username,
    profile,
    repositories,
    pullRequests: pullRequestNodes.map(mapPullRequest),
    fetchedAt: new Date().toISOString(),
  };
}

function mapRepository(repo: RepoNode): GitHubRepositorySignal {
  const commitHistory =
    repo.defaultBranchRef?.target && "history" in repo.defaultBranchRef.target
      ? repo.defaultBranchRef.target.history
      : null;

  return {
    name: repo.name,
    nameWithOwner: repo.nameWithOwner,
    owner: repo.owner.login,
    description: repo.description ?? "",
    url: repo.url,
    isFork: repo.isFork,
    isArchived: repo.isArchived,
    isEmpty: repo.isEmpty,
    pushedAt: repo.pushedAt,
    updatedAt: repo.updatedAt,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    diskUsage: repo.diskUsage ?? 0,
    languages: Object.fromEntries(
      repo.languages.edges.map((edge) => [edge.node.name, edge.size])
    ),
    commitsLast90Days: commitHistory?.totalCount ?? 0,
    recentCommitMessages:
      commitHistory?.nodes.map((commit) => commit.messageHeadline) ?? [],
    contributors: repo.mentionableUsers.totalCount,
  };
}

function mapPullRequest(node: PullRequestNode): GitHubPullRequestSignal {
  return {
    title: node.title,
    merged: node.merged,
    repository: node.repository.nameWithOwner,
    owner: node.repository.owner.login,
    createdAt: node.createdAt,
  };
}

type RestUser = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
};

type RestRepo = {
  name: string;
  full_name: string;
  owner: { login: string };
  description: string | null;
  html_url: string;
  fork: boolean;
  archived: boolean;
  pushed_at: string | null;
  updated_at: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
};

type RestCommit = {
  commit: {
    message: string;
  };
};

type RestPullRequestSearchItem = {
  title: string;
  pull_request?: {
    merged_at?: string | null;
  };
  repository_url: string;
  created_at: string;
};

async function fetchGitHubCandidateDataRest(
  login: string,
  token: string
): Promise<GitHubCandidateData> {
  const headers = buildRestHeaders(token);
  const publicHeaders = buildRestHeaders();
  const requestHeaders = await selectWorkingRestHeaders(login, headers, publicHeaders);
  const since = new Date(Date.now() - RECENT_COMMIT_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const [userResponse, repoResponse, prResponse] = await Promise.all([
    axios.get<RestUser>(`https://api.github.com/users/${login}`, {
      headers: requestHeaders,
      timeout: 12_000,
    }),
    axios.get<RestRepo[]>(`https://api.github.com/users/${login}/repos`, {
      headers: requestHeaders,
      timeout: 12_000,
      params: {
        per_page: 100,
        sort: "updated",
        direction: "desc",
      },
    }),
    axios
      .get<{ items: RestPullRequestSearchItem[] }>("https://api.github.com/search/issues", {
        headers: requestHeaders,
        timeout: 12_000,
        params: {
          q: `author:${login} type:pr`,
          per_page: 50,
        },
      })
      .catch(() => ({ data: { items: [] } })),
  ]);

  const enrichedRepos = await Promise.all(
    repoResponse.data.slice(0, 50).map(async (repo) => {
      const [languages, commits] = await Promise.all([
        axios
          .get<Record<string, number>>(`https://api.github.com/repos/${repo.full_name}/languages`, {
            headers: requestHeaders,
            timeout: 12_000,
          })
          .then((response) => response.data)
          .catch(() => ({})),
        axios
          .get<RestCommit[]>(`https://api.github.com/repos/${repo.full_name}/commits`, {
            headers: requestHeaders,
            timeout: 12_000,
            params: {
              since,
              per_page: 20,
            },
          })
          .then((response) => response.data)
          .catch(() => []),
      ]);

      return mapRestRepository(repo, languages, commits);
    })
  );

  return {
    username: login,
    profile: {
      username: userResponse.data.login,
      name: userResponse.data.name,
      bio: userResponse.data.bio,
      publicRepos: userResponse.data.public_repos,
      followers: userResponse.data.followers,
      createdAt: userResponse.data.created_at,
    },
    repositories: enrichedRepos,
    pullRequests: prResponse.data.items.map((item) => mapRestPullRequest(item)),
    fetchedAt: new Date().toISOString(),
  };
}

function buildRestHeaders(token?: string) {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function selectWorkingRestHeaders(
  login: string,
  authHeaders: ReturnType<typeof buildRestHeaders>,
  publicHeaders: ReturnType<typeof buildRestHeaders>
) {
  try {
    await axios.get<RestUser>(`https://api.github.com/users/${login}`, {
      headers: authHeaders,
      timeout: 12_000,
    });
    return authHeaders;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      console.warn("GitHub REST token auth failed; retrying public API without token.");
      return publicHeaders;
    }

    throw error;
  }
}

function mapRestRepository(
  repo: RestRepo,
  languages: Record<string, number>,
  commits: RestCommit[]
): GitHubRepositorySignal {
  return {
    name: repo.name,
    nameWithOwner: repo.full_name,
    owner: repo.owner.login,
    description: repo.description ?? "",
    url: repo.html_url,
    isFork: repo.fork,
    isArchived: repo.archived,
    isEmpty: repo.size <= 0,
    pushedAt: repo.pushed_at,
    updatedAt: repo.updated_at,
    stargazerCount: repo.stargazers_count,
    forkCount: repo.forks_count,
    diskUsage: repo.size,
    languages,
    commitsLast90Days: commits.length,
    recentCommitMessages: commits.map((commit) => commit.commit.message.split("\n")[0]),
    contributors: 1,
  };
}

function mapRestPullRequest(item: RestPullRequestSearchItem): GitHubPullRequestSignal {
  const repoFullName = item.repository_url.split("/repos/")[1] ?? "";
  const owner = repoFullName.split("/")[0] ?? "";

  return {
    title: item.title,
    merged: Boolean(item.pull_request?.merged_at),
    repository: repoFullName,
    owner,
    createdAt: item.created_at,
  };
}

function normalizeUsername(username: string) {
  const raw = username.trim();
  const match = raw.match(/github\.com\/([A-Za-z0-9-]+)/i);
  const login = match?.[1] ?? raw.replace(/^@/, "");
  return /^[A-Za-z0-9-]{1,39}$/.test(login) ? login : null;
}

const CANDIDATE_QUERY = `
  query CandidateGitHubIntel(
    $login: String!
    $repoCursor: String
    $since: GitTimestamp!
    $prQuery: String!
  ) {
    user(login: $login) {
      login
      name
      bio
      followers {
        totalCount
      }
      repositories(
        first: 50
        after: $repoCursor
        orderBy: { field: UPDATED_AT, direction: DESC }
        privacy: PUBLIC
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          nameWithOwner
          description
          url
          isFork
          isArchived
          isEmpty
          pushedAt
          updatedAt
          stargazerCount
          forkCount
          diskUsage
          owner {
            login
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
              }
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 20, since: $since) {
                  totalCount
                  nodes {
                    messageHeadline
                    committedDate
                  }
                }
              }
            }
          }
          mentionableUsers(first: 1) {
            totalCount
          }
        }
      }
      createdAt
    }
    search(query: $prQuery, type: ISSUE, first: 50) {
      nodes {
        ... on PullRequest {
          title
          merged
          createdAt
          repository {
            nameWithOwner
            owner {
              login
            }
          }
        }
      }
    }
  }
`;
