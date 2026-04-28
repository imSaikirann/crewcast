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
const GRAPHQL_REPOS_PER_PAGE = 20;

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
          recentHistory?: {
            totalCount: number;
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
    id: string;
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
  pullRequestSearch: {
    issueCount: number;
    nodes: PullRequestNode[];
  };
  mergedPullRequestSearch: {
    issueCount: number;
  };
  issueSearch: {
    issueCount: number;
  };
  closedIssueSearch: {
    issueCount: number;
  };
};

type UserIdQuery = {
  user: {
    id: string;
  } | null;
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
    const data = await fetchGitHubCandidateDataRest(login, token);
    await cacheSet(cacheKey, JSON.stringify(data), cacheTtl.githubIntel);
    return data;
  } catch (error) {
    console.warn("GitHub REST intelligence failed; falling back to GraphQL.", {
      username: login,
      reason: getErrorSummary(error),
    });
    const data = await fetchGitHubCandidateDataGraphQL(login, token);
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
  const author = await githubGraphQL<UserIdQuery>({
    token,
    query: USER_ID_QUERY,
    variables: { login },
  });

  if (!author.user) throw new Error("GitHub user was not found.");

  const repositories: GitHubRepositorySignal[] = [];
  let cursor: string | null = null;
  let profile: GitHubCandidateData["profile"] | null = null;

  for (let page = 0; page < 3; page++) {
    const response: CandidateQuery = await githubGraphQL<CandidateQuery>({
      token,
      query: CANDIDATE_QUERY,
      variables: {
        login,
        authorId: author.user.id,
        repoCursor: cursor,
        repoLimit: GRAPHQL_REPOS_PER_PAGE,
        since,
        prQuery: `author:${login} type:pr`,
        mergedPrQuery: `author:${login} type:pr is:merged`,
        issueQuery: `author:${login} type:issue`,
        closedIssueQuery: `author:${login} type:issue is:closed`,
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
      return buildCandidateData(login, profile, repositories, {
        pullRequestNodes: response.pullRequestSearch.nodes,
        pullRequestsOpened: response.pullRequestSearch.issueCount,
        pullRequestsMerged: response.mergedPullRequestSearch.issueCount,
        issuesOpened: response.issueSearch.issueCount,
        issuesClosed: response.closedIssueSearch.issueCount,
      });
    }

    cursor = response.user.repositories.pageInfo.endCursor;
  }

  const fallbackResponse: CandidateQuery = await githubGraphQL<CandidateQuery>({
    token,
    query: CANDIDATE_QUERY,
    variables: {
      login,
      authorId: author.user.id,
      repoCursor: cursor,
      repoLimit: GRAPHQL_REPOS_PER_PAGE,
      since,
      prQuery: `author:${login} type:pr`,
      mergedPrQuery: `author:${login} type:pr is:merged`,
      issueQuery: `author:${login} type:issue`,
      closedIssueQuery: `author:${login} type:issue is:closed`,
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

  return buildCandidateData(login, profile, repositories, {
    pullRequestNodes: fallbackResponse.pullRequestSearch.nodes,
    pullRequestsOpened: fallbackResponse.pullRequestSearch.issueCount,
    pullRequestsMerged: fallbackResponse.mergedPullRequestSearch.issueCount,
    issuesOpened: fallbackResponse.issueSearch.issueCount,
    issuesClosed: fallbackResponse.closedIssueSearch.issueCount,
  });
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
  collaboration: {
    pullRequestNodes: PullRequestNode[];
    pullRequestsOpened: number;
    pullRequestsMerged: number;
    issuesOpened: number;
    issuesClosed: number;
  }
): GitHubCandidateData {
  return {
    username,
    profile,
    repositories,
    pullRequests: collaboration.pullRequestNodes.map(mapPullRequest),
    collaboration: {
      pullRequestsOpened: collaboration.pullRequestsOpened,
      pullRequestsMerged: collaboration.pullRequestsMerged,
      issuesOpened: collaboration.issuesOpened,
      issuesClosed: collaboration.issuesClosed,
      reviewComments: 0,
      issueComments: 0,
    },
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
    totalCommits: commitHistory?.totalCount ?? 0,
    commitsLast90Days: repo.defaultBranchRef?.target && "recentHistory" in repo.defaultBranchRef.target
      ? repo.defaultBranchRef.target.recentHistory?.totalCount ?? 0
      : 0,
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

type RestCommitSignal = {
  totalCommits: number;
  recentCommits: RestCommit[];
};

type RestPullRequestSearchItem = {
  title: string;
  pull_request?: {
    merged_at?: string | null;
  };
  repository_url: string;
  created_at: string;
};

type RestIssueSearchResponse = {
  total_count: number;
  items: RestPullRequestSearchItem[];
};

async function fetchGitHubCandidateDataRest(
  login: string,
  token: string
): Promise<GitHubCandidateData> {
  const headers = buildRestHeaders(token);
  const publicHeaders = buildRestHeaders();
  const requestHeaders = await selectWorkingRestHeaders(login, headers, publicHeaders);
  const since = new Date(Date.now() - RECENT_COMMIT_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const search = (q: string, perPage = 1) =>
    axios
      .get<RestIssueSearchResponse>("https://api.github.com/search/issues", {
        headers: requestHeaders,
        timeout: 12_000,
        params: {
          q,
          per_page: perPage,
        },
      })
      .catch(() => ({ data: { total_count: 0, items: [] } }));

  const [
    userResponse,
    repoResponse,
    prResponse,
    mergedPrResponse,
    issueResponse,
    closedIssueResponse,
  ] = await Promise.all([
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
    search(`author:${login} type:pr`, 50),
    search(`author:${login} type:pr is:merged`),
    search(`author:${login} type:issue`),
    search(`author:${login} type:issue is:closed`),
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
        fetchRestCommitSignal(repo.full_name, login, since, requestHeaders),
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
    collaboration: {
      pullRequestsOpened: prResponse.data.total_count,
      pullRequestsMerged: mergedPrResponse.data.total_count,
      issuesOpened: issueResponse.data.total_count,
      issuesClosed: closedIssueResponse.data.total_count,
      reviewComments: 0,
      issueComments: 0,
    },
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchRestCommitSignal(
  repoFullName: string,
  login: string,
  since: string,
  headers: ReturnType<typeof buildRestHeaders>
): Promise<RestCommitSignal> {
  const [totalResponse, recentResponse] = await Promise.all([
    axios
      .get<RestCommit[]>(`https://api.github.com/repos/${repoFullName}/commits`, {
        headers,
        timeout: 12_000,
        params: {
          author: login,
          per_page: 1,
        },
      })
      .catch(() => null),
    axios
      .get<RestCommit[]>(`https://api.github.com/repos/${repoFullName}/commits`, {
        headers,
        timeout: 12_000,
        params: {
          author: login,
          since,
          per_page: 20,
        },
      })
      .catch(() => null),
  ]);

  return {
    totalCommits: totalResponse ? getRestTotalCount(totalResponse) : 0,
    recentCommits: recentResponse?.data ?? [],
  };
}

function getRestTotalCount(response: { data: unknown[]; headers: Record<string, unknown> }) {
  const link = String(response.headers.link ?? "");
  const lastPage = link.match(/[?&]page=(\d+)>;\s*rel="last"/)?.[1];
  if (lastPage) return Number(lastPage);
  return response.data.length;
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
  commits: RestCommitSignal
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
    totalCommits: commits.totalCommits,
    commitsLast90Days: commits.recentCommits.length,
    recentCommitMessages: commits.recentCommits.map((commit) => commit.commit.message.split("\n")[0]),
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
    $authorId: ID!
    $repoCursor: String
    $repoLimit: Int!
    $since: GitTimestamp!
    $prQuery: String!
    $mergedPrQuery: String!
    $issueQuery: String!
    $closedIssueQuery: String!
  ) {
    user(login: $login) {
      id
      login
      name
      bio
      followers {
        totalCount
      }
      repositories(
        first: $repoLimit
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
                history(first: 20, author: { id: $authorId }) {
                  totalCount
                  nodes {
                    messageHeadline
                    committedDate
                  }
                }
                recentHistory: history(first: 1, since: $since, author: { id: $authorId }) {
                  totalCount
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
    pullRequestSearch: search(query: $prQuery, type: ISSUE, first: 50) {
      issueCount
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
    mergedPullRequestSearch: search(query: $mergedPrQuery, type: ISSUE, first: 1) {
      issueCount
    }
    issueSearch: search(query: $issueQuery, type: ISSUE, first: 1) {
      issueCount
    }
    closedIssueSearch: search(query: $closedIssueQuery, type: ISSUE, first: 1) {
      issueCount
    }
  }
`;

const USER_ID_QUERY = `
  query GitHubUserId($login: String!) {
    user(login: $login) {
      id
    }
  }
`;
