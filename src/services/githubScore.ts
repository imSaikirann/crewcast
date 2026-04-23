import { fetchGitHubCandidateData } from "@/features/github-intelligence/githubClient";
import { buildGitHubInsightReport } from "@/features/github-intelligence/scoring";
import type {
  GitHubInsightReport,
  GitHubScoreOptions,
} from "@/features/github-intelligence/types";

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
  insightReport: GitHubInsightReport;
};

export async function scoreGitHubProfile(
  username: string,
  options: GitHubScoreOptions = {}
): Promise<GitHubGraphQLScore> {
  if (!username) throw new Error("Username is required");

  const data = await fetchGitHubCandidateData(username);
  const insightReport = buildGitHubInsightReport(data, {
    excludeForks: true,
    ...options,
  });
  const ownedRepos = data.repositories.filter((repo) => !repo.isFork);
  const recentRepos = ownedRepos.filter((repo) => {
    const updatedAt = repo.pushedAt ?? repo.updatedAt;
    if (!updatedAt) return false;
    return Date.now() - new Date(updatedAt).getTime() <= 90 * 24 * 60 * 60 * 1000;
  });

  return {
    totalScore: insightReport.totalScore,
    profile: {
      username: data.profile.username,
      publicRepos: data.profile.publicRepos,
      followers: data.profile.followers,
      accountAgeYears: Number(
        (
          (Date.now() - new Date(data.profile.createdAt).getTime()) /
          (1000 * 60 * 60 * 24 * 365)
        ).toFixed(1)
      ),
    },
    languages: summarizeLanguages(data.repositories),
    signals: {
      originalRepos: ownedRepos.length,
      recentRepos: recentRepos.length,
      stars: ownedRepos.reduce((sum, repo) => sum + repo.stargazerCount, 0),
      forks: ownedRepos.reduce((sum, repo) => sum + repo.forkCount, 0),
    },
    notes: insightReport.warnings,
    insightReport,
  };
}

function summarizeLanguages(repositories: Array<{ languages: Record<string, number> }>) {
  const languages: Record<string, number> = {};

  for (const repo of repositories) {
    for (const [language, size] of Object.entries(repo.languages)) {
      languages[language] = (languages[language] ?? 0) + size;
    }
  }

  return languages;
}
