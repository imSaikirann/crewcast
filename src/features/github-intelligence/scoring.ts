import { displayTech, normalizeTech, normalizeTechStack } from "./tech";
import type {
  GitHubCandidateData,
  GitHubInsightReport,
  GitHubRepositorySignal,
  GitHubScoreOptions,
  SignalStatus,
} from "./types";

const WEIGHTS = {
  techMatchScore: 0.35,
  activityScore: 0.25,
  repoScore: 0.25,
  ossScore: 0.15,
};

const LOW_QUALITY_COMMIT_MESSAGES = new Set([
  "fix",
  "update",
  "updates",
  "typo",
  "wip",
  "changes",
  "misc",
  "test",
]);

export function buildGitHubInsightReport(
  data: GitHubCandidateData,
  options: GitHubScoreOptions = {}
): GitHubInsightReport {
  const repos = options.excludeForks
    ? data.repositories.filter((repo) => !repo.isFork)
    : data.repositories;
  const ownedRepos = data.repositories.filter((repo) => !repo.isFork);
  const recentRepos = ownedRepos.filter((repo) => isRecent(repo.pushedAt ?? repo.updatedAt, 90));
  const languageDepth = calculateLanguageDepth(repos);
  const techAnalysis = analyzeTechStack(languageDepth, options.requiredTechStack ?? []);
  const repoScore = scoreRepositories(ownedRepos, recentRepos);
  const activityScore = scoreActivity(recentRepos, ownedRepos);
  const oss = analyzeOss(data);
  const ossScore = scoreOss(oss.totalPRs, oss.mergedPRs, oss.topRepos.length);
  const totalScore = clampScore(
    repoScore * WEIGHTS.repoScore +
      techAnalysis.matchScore * WEIGHTS.techMatchScore +
      activityScore * WEIGHTS.activityScore +
      ossScore * WEIGHTS.ossScore
  );
  const projects = selectProjectHighlights(ownedRepos, techAnalysis.matched);
  const commits = selectMeaningfulCommits(ownedRepos);
  const warnings = buildWarnings(data.repositories, ownedRepos, recentRepos);
  const activityStatus = statusFromScore(activityScore);
  const contributedRepos = new Set(
    data.pullRequests
      .filter((pr) => pr.owner.toLowerCase() !== data.username.toLowerCase())
      .map((pr) => pr.repository)
  );

  return {
    totalScore,
    confidence: calculateConfidence({
      ownedRepos: ownedRepos.length,
      recentRepos: recentRepos.length,
      commits: commits.length,
      techMatches: techAnalysis.matched.length,
      prs: oss.totalPRs,
    }),
    summary: buildSummary({
      totalScore,
      matchedTech: techAnalysis.matched,
      missingTech: techAnalysis.missing,
      activityStatus,
      ossRepos: oss.topRepos.length,
    }),
    breakdown: {
      repoScore,
      techMatchScore: techAnalysis.matchScore,
      activityScore,
      ossScore,
    },
    techAnalysis: {
      matched: techAnalysis.matched,
      missing: techAnalysis.missing,
      depth: techAnalysis.depth,
    },
    oss,
    projects,
    commits,
    activity: {
      lastActive: findLastActive(data.repositories),
      status: activityStatus,
    },
    ownership: {
      ownedRepos: ownedRepos.length,
      contributedRepos: contributedRepos.size,
    },
    warnings,
  };
}

function calculateLanguageDepth(repos: GitHubRepositorySignal[]) {
  const depth: Record<string, number> = {};

  for (const repo of repos) {
    const recencyMultiplier = isRecent(repo.pushedAt ?? repo.updatedAt, 90)
      ? 1.5
      : isRecent(repo.pushedAt ?? repo.updatedAt, 365)
        ? 1
        : 0.5;

    for (const [language, bytes] of Object.entries(repo.languages)) {
      const normalized = normalizeTech(language);
      if (!normalized) continue;
      depth[normalized] = (depth[normalized] ?? 0) + bytes * recencyMultiplier;
    }
  }

  return depth;
}

function analyzeTechStack(languageDepth: Record<string, number>, requiredTech: string[]) {
  const required = normalizeTechStack(requiredTech);
  const available = Object.keys(languageDepth);

  if (!required.length) {
    return {
      matched: available.map(displayTech),
      missing: [],
      depth: toDepthLabels(languageDepth),
      matchScore: available.length ? 75 : 0,
    };
  }

  const matched = required.filter((tech) => available.includes(tech));
  const missing = required.filter((tech) => !available.includes(tech));
  const coverageScore = (matched.length / required.length) * 100;
  const depthBonus = matched.reduce((sum, tech) => {
    const label = depthLabel(languageDepth[tech] ?? 0);
    return sum + (label === "HIGH" ? 10 : label === "MEDIUM" ? 5 : 0);
  }, 0);

  return {
    matched: matched.map(displayTech),
    missing: missing.map(displayTech),
    depth: toDepthLabels(languageDepth),
    matchScore: clampScore(coverageScore + depthBonus / Math.max(required.length, 1)),
  };
}

function scoreRepositories(ownedRepos: GitHubRepositorySignal[], recentRepos: GitHubRepositorySignal[]) {
  if (!ownedRepos.length) return 0;

  const nonEmptyRepos = ownedRepos.filter((repo) => !repo.isEmpty && repo.diskUsage > 0);
  const repoVolume = Math.min(nonEmptyRepos.length * 8, 35);
  const recency = Math.min(recentRepos.length * 12, 30);
  const stars = Math.min(
    ownedRepos.reduce((sum, repo) => sum + repo.stargazerCount, 0) * 2,
    15
  );
  const commitVolume = Math.min(
    ownedRepos.reduce((sum, repo) => sum + repo.commitsLast90Days, 0) * 0.5,
    20
  );

  return clampScore(repoVolume + recency + stars + commitVolume);
}

function scoreActivity(recentRepos: GitHubRepositorySignal[], ownedRepos: GitHubRepositorySignal[]) {
  const commitsLast90 = ownedRepos.reduce((sum, repo) => sum + repo.commitsLast90Days, 0);
  const activeRepoScore = Math.min(recentRepos.length * 18, 45);
  const commitScore = Math.min(commitsLast90 * 0.8, 45);
  const consistencyScore = recentRepos.length >= 3 && commitsLast90 >= 12 ? 10 : 0;

  return clampScore(activeRepoScore + commitScore + consistencyScore);
}

function analyzeOss(data: GitHubCandidateData) {
  const externalPRs = data.pullRequests.filter(
    (pr) => pr.owner.toLowerCase() !== data.username.toLowerCase()
  );
  const mergedPRs = externalPRs.filter((pr) => pr.merged);
  const repoCounts = new Map<string, number>();

  for (const pr of externalPRs) {
    repoCounts.set(pr.repository, (repoCounts.get(pr.repository) ?? 0) + 1);
  }

  return {
    totalPRs: externalPRs.length,
    mergedPRs: mergedPRs.length,
    topRepos: Array.from(repoCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([repo]) => repo),
  };
}

function scoreOss(totalPRs: number, mergedPRs: number, contributedRepos: number) {
  return clampScore(
    Math.min(totalPRs * 8, 40) +
      Math.min(mergedPRs * 12, 45) +
      Math.min(contributedRepos * 5, 15)
  );
}

function selectProjectHighlights(
  repos: GitHubRepositorySignal[],
  matchedTech: string[]
): GitHubInsightReport["projects"] {
  const matched = new Set(matchedTech.map((tech) => normalizeTech(tech)));

  return repos
    .filter((repo) => !repo.isEmpty)
    .map((repo) => ({
      repo,
      score:
        repo.commitsLast90Days * 2 +
        repo.stargazerCount * 3 +
        (isRecent(repo.pushedAt ?? repo.updatedAt, 90) ? 25 : 0) +
        Object.keys(repo.languages).filter((language) =>
          matched.has(normalizeTech(language))
        ).length *
          20,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ repo }) => ({
      name: repo.name,
      description: repo.description || "No public description provided.",
      tech: Object.keys(repo.languages).slice(0, 5),
      lastUpdated: repo.pushedAt ?? repo.updatedAt ?? "",
      commits: repo.commitsLast90Days,
      contributors: repo.contributors,
    }));
}

function selectMeaningfulCommits(repos: GitHubRepositorySignal[]) {
  return repos
    .flatMap((repo) => repo.recentCommitMessages)
    .map((message) => message.trim())
    .filter((message) => {
      const normalized = message.toLowerCase();
      return (
        normalized.length > 8 &&
        !LOW_QUALITY_COMMIT_MESSAGES.has(normalized) &&
        !/^fix(e[sd])?$/i.test(message) &&
        !/^update[sd]?$/i.test(message)
      );
    })
    .slice(0, 5);
}

function buildWarnings(
  allRepos: GitHubRepositorySignal[],
  ownedRepos: GitHubRepositorySignal[],
  recentRepos: GitHubRepositorySignal[]
) {
  const warnings: string[] = [];
  const emptyRepos = ownedRepos.filter((repo) => repo.isEmpty || repo.diskUsage <= 0);
  const totalCommits = ownedRepos.reduce((sum, repo) => sum + repo.commitsLast90Days, 0);

  if (allRepos.length > 0 && ownedRepos.length === 0) warnings.push("Only forked repositories were found.");
  if (recentRepos.length === 0) warnings.push("No owned repositories updated in the last 90 days.");
  if (emptyRepos.length >= Math.max(3, ownedRepos.length / 2)) warnings.push("Many owned repositories appear empty or very small.");
  if (totalCommits < 3) warnings.push("Very low recent commit volume across owned repositories.");

  return warnings;
}

function calculateConfidence({
  ownedRepos,
  recentRepos,
  commits,
  techMatches,
  prs,
}: {
  ownedRepos: number;
  recentRepos: number;
  commits: number;
  techMatches: number;
  prs: number;
}) {
  const evidence =
    Math.min(ownedRepos, 5) +
    Math.min(recentRepos, 4) +
    Math.min(commits, 5) +
    Math.min(techMatches, 4) +
    Math.min(prs, 3);

  if (evidence >= 12) return "HIGH";
  if (evidence >= 6) return "MEDIUM";
  return "LOW";
}

function buildSummary({
  totalScore,
  matchedTech,
  missingTech,
  activityStatus,
  ossRepos,
}: {
  totalScore: number;
  matchedTech: string[];
  missingTech: string[];
  activityStatus: SignalStatus;
  ossRepos: number;
}) {
  const strength =
    totalScore >= 80 ? "Strong" : totalScore >= 60 ? "Promising" : "Limited";
  const focus = matchedTech.length
    ? `${matchedTech.slice(0, 3).join(", ")}-focused developer`
    : "developer with limited role-specific public language evidence";
  const activity =
    activityStatus === "HIGH"
      ? "active recent work"
      : activityStatus === "MEDIUM"
        ? "some recent activity"
        : "low recent activity";
  const oss = ossRepos > 0 ? " and external OSS contributions" : "";
  const gap = missingTech.length
    ? `, but limited public evidence for ${missingTech.slice(0, 3).join(", ")}`
    : "";

  return `${strength} ${focus} with ${activity}${oss}${gap}.`;
}

function toDepthLabels(languageDepth: Record<string, number>) {
  return Object.fromEntries(
    Object.entries(languageDepth).map(([language, value]) => [
      displayTech(language),
      depthLabel(value),
    ])
  );
}

function depthLabel(value: number): SignalStatus {
  if (value >= 500_000) return "HIGH";
  if (value >= 75_000) return "MEDIUM";
  return "LOW";
}

function statusFromScore(score: number): SignalStatus {
  if (score >= 70) return "HIGH";
  if (score >= 35) return "MEDIUM";
  return "LOW";
}

function findLastActive(repos: GitHubRepositorySignal[]) {
  const timestamps = repos
    .map((repo) => repo.pushedAt ?? repo.updatedAt)
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return timestamps[0] ?? "";
}

function isRecent(value: string | null, days: number) {
  if (!value) return false;
  return Date.now() - new Date(value).getTime() <= days * 24 * 60 * 60 * 1000;
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
