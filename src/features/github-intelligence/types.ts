export type Confidence = "LOW" | "MEDIUM" | "HIGH";
export type SignalStatus = "LOW" | "MEDIUM" | "HIGH";

export type GitHubInsightReport = {
  totalScore: number;
  confidence: Confidence;
  summary: string;
  breakdown: {
    repoScore: number;
    techMatchScore: number;
    activityScore: number;
    ossScore: number;
  };
  techAnalysis: {
    matched: string[];
    missing: string[];
    depth: Record<string, SignalStatus>;
  };
  oss: {
    totalPRs: number;
    mergedPRs: number;
    topRepos: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    lastUpdated: string;
    commits: number;
    contributors: number;
  }>;
  commits: string[];
  activity: {
    lastActive: string;
    status: SignalStatus;
  };
  ownership: {
    ownedRepos: number;
    contributedRepos: number;
  };
  contributionMetrics: {
    commitsAuthored: number;
    pullRequestsOpened: number;
    pullRequestsMerged: number;
    issuesOpened: number;
    issuesClosed: number;
    reviewComments: number;
    issueComments: number;
    repositoriesContributedTo: number;
    followers: number;
    stars: number;
    forks: number;
    languagesUsed: number;
    recentActivity: number;
    category: string;
  };
  warnings: string[];
};

export type GitHubRepositorySignal = {
  name: string;
  nameWithOwner: string;
  owner: string;
  description: string;
  url: string;
  isFork: boolean;
  isArchived: boolean;
  isEmpty: boolean;
  pushedAt: string | null;
  updatedAt: string | null;
  stargazerCount: number;
  forkCount: number;
  diskUsage: number;
  languages: Record<string, number>;
  totalCommits: number;
  commitsLast90Days: number;
  recentCommitMessages: string[];
  contributors: number;
};

export type GitHubPullRequestSignal = {
  title: string;
  merged: boolean;
  repository: string;
  owner: string;
  createdAt: string;
};

export type GitHubCandidateData = {
  username: string;
  profile: {
    username: string;
    name: string | null;
    bio: string | null;
    publicRepos: number;
    followers: number;
    createdAt: string;
  };
  repositories: GitHubRepositorySignal[];
  pullRequests: GitHubPullRequestSignal[];
  collaboration: {
    pullRequestsOpened: number;
    pullRequestsMerged: number;
    issuesOpened: number;
    issuesClosed: number;
    reviewComments: number;
    issueComments: number;
  };
  fetchedAt: string;
};

export type GitHubScoreOptions = {
  requiredTechStack?: string[];
  excludeForks?: boolean;
};
