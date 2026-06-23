import { fetchGitHubCandidateData } from "./githubClient";
import { buildGitHubInsightReport } from "./scoring";
import type { GitHubInsightReport, GitHubScoreOptions } from "./types";

export async function generateGitHubInsightReport(
  username: string,
  options: GitHubScoreOptions = {}
): Promise<GitHubInsightReport> {
  const data = await fetchGitHubCandidateData(username);
  return buildGitHubInsightReport(data, {
    excludeForks: true,
    ...options,
  });
}

export function emptyGitHubInsightReport(message: string): GitHubInsightReport {
  return {
    totalScore: 0,
    confidence: "LOW",
    summary: message,
    breakdown: {
      repoScore: 0,
      techMatchScore: 0,
      activityScore: 0,
      ossScore: 0,
      commitQualityScore: 0,
      accountMaturityScore: 0,
    },
    techAnalysis: {
      matched: [],
      missing: [],
      depth: {},
    },
    oss: {
      totalPRs: 0,
      mergedPRs: 0,
      topRepos: [],
    },
    projects: [],
    commits: [],
    activity: {
      lastActive: "",
      status: "LOW",
    },
    ownership: {
      ownedRepos: 0,
      contributedRepos: 0,
    },
    contributionMetrics: {
      commitsAuthored: 0,
      pullRequestsOpened: 0,
      pullRequestsMerged: 0,
      issuesOpened: 0,
      issuesClosed: 0,
      reviewComments: 0,
      issueComments: 0,
      repositoriesContributedTo: 0,
      followers: 0,
      stars: 0,
      forks: 0,
      languagesUsed: 0,
      recentActivity: 0,
      category: "Minimal Contributor",
    },
    warnings: [message],
  };
}
