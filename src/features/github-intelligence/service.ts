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
    warnings: [message],
  };
}
