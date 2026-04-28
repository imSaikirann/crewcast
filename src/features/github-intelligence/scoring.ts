import { displayTech, normalizeTech, normalizeTechStack } from "./tech";
import type {
  GitHubCandidateData,
  GitHubInsightReport,
  GitHubRepositorySignal,
  GitHubScoreOptions,
  SignalStatus,
} from "./types";

const WEIGHTS = {
  commits: 0.15,
  pullRequestsOpened: 0.15,
  pullRequestsMerged: 0.1,
  issuesOpened: 0.1,
  reviewComments: 0.1,
  repositoriesContributedTo: 0.1,
  followers: 0.1,
  starsForks: 0.1,
  languageDiversity: 0.05,
  recentActivity: 0.05,
};

const NORMALIZATION = {
  commits: 500,
  pullRequestsOpened: 100,
  pullRequestsMerged: 100,
  issuesOpened: 100,
  reviewComments: 100,
  repositoriesContributedTo: 100,
  followers: 100,
  starsForks: 500,
  languages: 10,
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
  const oss = analyzeOss(data);
  const contributionMetrics = buildContributionMetrics(data, ownedRepos, oss.topRepos.length);
  const metricScores = scoreContributionMetrics(contributionMetrics);
  const repoScore = scoreMetricGroup([
    metricScores.commits,
    metricScores.repositoriesContributedTo,
    metricScores.starsForks,
  ]);
  const activityScore = metricScores.recentActivity;
  const ossScore = scoreMetricGroup([
    metricScores.pullRequestsOpened,
    metricScores.pullRequestsMerged,
    metricScores.issuesOpened,
    metricScores.reviewComments,
  ]);
  const languageDiversityScore = metricScores.languageDiversity;
  const totalScore = clampScore(
    metricScores.commits * WEIGHTS.commits +
      metricScores.pullRequestsOpened * WEIGHTS.pullRequestsOpened +
      metricScores.pullRequestsMerged * WEIGHTS.pullRequestsMerged +
      metricScores.issuesOpened * WEIGHTS.issuesOpened +
      metricScores.reviewComments * WEIGHTS.reviewComments +
      metricScores.repositoriesContributedTo * WEIGHTS.repositoriesContributedTo +
      metricScores.followers * WEIGHTS.followers +
      metricScores.starsForks * WEIGHTS.starsForks +
      metricScores.languageDiversity * WEIGHTS.languageDiversity +
      metricScores.recentActivity * WEIGHTS.recentActivity
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
      category: contributionMetrics.category,
    }),
    breakdown: {
      repoScore,
      techMatchScore: languageDiversityScore,
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
    contributionMetrics,
    warnings,
  };
}

function buildContributionMetrics(
  data: GitHubCandidateData,
  ownedRepos: GitHubRepositorySignal[],
  externalContributionRepos: number
): GitHubInsightReport["contributionMetrics"] {
  const stars = ownedRepos.reduce((sum, repo) => sum + repo.stargazerCount, 0);
  const forks = ownedRepos.reduce((sum, repo) => sum + repo.forkCount, 0);
  const languagesUsed = new Set(
    ownedRepos.flatMap((repo) => Object.keys(repo.languages).filter(Boolean))
  ).size;
  const recentActivity = isRecent(findLastActive(ownedRepos), 30) ? 1 : 0;
  const commitsAuthored = ownedRepos.reduce((sum, repo) => sum + repo.totalCommits, 0);
  const pullRequestsOpened =
    data.collaboration?.pullRequestsOpened ?? data.pullRequests.length;
  const pullRequestsMerged =
    data.collaboration?.pullRequestsMerged ??
    data.pullRequests.filter((pr) => pr.merged).length;
  const issuesOpened = data.collaboration?.issuesOpened ?? 0;
  const issuesClosed = data.collaboration?.issuesClosed ?? 0;
  const reviewComments = data.collaboration?.reviewComments ?? 0;
  const issueComments = data.collaboration?.issueComments ?? 0;
  const repositoriesContributedTo = ownedRepos.length + externalContributionRepos;

  return {
    commitsAuthored,
    pullRequestsOpened,
    pullRequestsMerged,
    issuesOpened,
    issuesClosed,
    reviewComments,
    issueComments,
    repositoriesContributedTo,
    followers: data.profile.followers,
    stars,
    forks,
    languagesUsed,
    recentActivity,
    category: categoryFromScore(
      calculateContributionScore({
        commitsAuthored,
        pullRequestsOpened,
        pullRequestsMerged,
        issuesOpened,
        reviewComments,
        repositoriesContributedTo,
        followers: data.profile.followers,
        stars,
        forks,
        languagesUsed,
        recentActivity,
      })
    ),
  };
}

function scoreContributionMetrics(metrics: GitHubInsightReport["contributionMetrics"]) {
  return {
    commits: normalizeMetric(metrics.commitsAuthored, NORMALIZATION.commits),
    pullRequestsOpened: normalizeMetric(
      metrics.pullRequestsOpened,
      NORMALIZATION.pullRequestsOpened
    ),
    pullRequestsMerged: normalizeMetric(
      metrics.pullRequestsMerged,
      NORMALIZATION.pullRequestsMerged
    ),
    issuesOpened: normalizeMetric(metrics.issuesOpened, NORMALIZATION.issuesOpened),
    reviewComments: normalizeMetric(metrics.reviewComments, NORMALIZATION.reviewComments),
    repositoriesContributedTo: normalizeMetric(
      metrics.repositoriesContributedTo,
      NORMALIZATION.repositoriesContributedTo
    ),
    followers: normalizeMetric(metrics.followers, NORMALIZATION.followers),
    starsForks: normalizeMetric(metrics.stars + metrics.forks, NORMALIZATION.starsForks),
    languageDiversity: normalizeMetric(metrics.languagesUsed, NORMALIZATION.languages),
    recentActivity: metrics.recentActivity * 100,
  };
}

function calculateContributionScore(metrics: {
  commitsAuthored: number;
  pullRequestsOpened: number;
  pullRequestsMerged: number;
  issuesOpened: number;
  reviewComments: number;
  repositoriesContributedTo: number;
  followers: number;
  stars: number;
  forks: number;
  languagesUsed: number;
  recentActivity: number;
}) {
  const scores = scoreContributionMetrics({
    ...metrics,
    issuesClosed: 0,
    issueComments: 0,
    category: "",
  });

  return (
    scores.commits * WEIGHTS.commits +
    scores.pullRequestsOpened * WEIGHTS.pullRequestsOpened +
    scores.pullRequestsMerged * WEIGHTS.pullRequestsMerged +
    scores.issuesOpened * WEIGHTS.issuesOpened +
    scores.reviewComments * WEIGHTS.reviewComments +
    scores.repositoriesContributedTo * WEIGHTS.repositoriesContributedTo +
    scores.followers * WEIGHTS.followers +
    scores.starsForks * WEIGHTS.starsForks +
    scores.languageDiversity * WEIGHTS.languageDiversity +
    scores.recentActivity * WEIGHTS.recentActivity
  );
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
  category,
}: {
  totalScore: number;
  matchedTech: string[];
  missingTech: string[];
  activityStatus: SignalStatus;
  ossRepos: number;
  category: string;
}) {
  const strength = category;
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

function normalizeMetric(value: number, fullScoreAt: number) {
  if (fullScoreAt <= 0) return 0;
  return Math.min(value / fullScoreAt, 1) * 100;
}

function scoreMetricGroup(scores: number[]) {
  if (!scores.length) return 0;
  return clampScore(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function categoryFromScore(score: number) {
  if (score >= 80) return "Exceptional Contributor";
  if (score >= 60) return "Strong Contributor";
  if (score >= 40) return "Moderate Contributor";
  if (score >= 20) return "Developing Contributor";
  return "Minimal Contributor";
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
