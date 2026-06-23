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

/**
 * Top-level scoring pillars for the final candidate score (0-100).
 * Each pillar is computed independently as a 0-100 sub-score, then combined
 * with these weights. Weights sum to 1.0.
 *
 * - oss:            Open-source contributions (external PRs/issues). Highest weight.
 * - techMatch:      Overlap between the job's required tech and the candidate's
 *                   actual repository languages (with depth bonus).
 * - activity:       Commit volume + recency of real coding work.
 * - impact:         Stars/forks on owned repos, using tiered thresholds so a repo
 *                   that crosses a popularity bar (10/50/100/500 stars) ranks higher.
 * - commitQuality:  Ratio of meaningful commit messages vs low-effort ones.
 * - accountMaturity: Account age, with diminishing returns past ~5 years.
 * - influence:      Followers (minor signal).
 */
const PILLAR_WEIGHTS = {
  oss: 0.24,
  techMatch: 0.2,
  activity: 0.18,
  impact: 0.15,
  commitQuality: 0.1,
  accountMaturity: 0.08,
  influence: 0.05,
};

/**
 * Star tiers: a repository earns escalating credit once it crosses a popularity
 * threshold. This rewards "a repo with real traction" far more than many repos
 * with a couple of stars each.
 */
const STAR_TIERS: Array<{ min: number; points: number }> = [
  { min: 500, points: 40 },
  { min: 100, points: 25 },
  { min: 50, points: 15 },
  { min: 10, points: 7 },
  { min: 1, points: 2 },
];

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
  const contributedRepos = new Set(
    data.pullRequests
      .filter((pr) => pr.owner.toLowerCase() !== data.username.toLowerCase())
      .map((pr) => pr.repository)
  );
  const contributionMetrics = buildContributionMetrics(data, ownedRepos, contributedRepos.size);

  // --- Top-level pillar scores (each 0-100) ---
  const ossScore = scoreOssContribution(oss, contributionMetrics, contributedRepos.size);
  const impactScore = scoreImpactSignal(ownedRepos);
  const activityScore = scoreCodeActivity(ownedRepos);
  const commitQualityScore = scoreCommitQuality(ownedRepos);
  const techMatchScore = techAnalysis.matchScore;
  const accountMaturityScore = scoreAccountMaturity(data.profile.createdAt);
  const followersScore = normalizeMetric(data.profile.followers, 200);

  const totalScore = clampScore(
    ossScore * PILLAR_WEIGHTS.oss +
      techMatchScore * PILLAR_WEIGHTS.techMatch +
      activityScore * PILLAR_WEIGHTS.activity +
      impactScore * PILLAR_WEIGHTS.impact +
      commitQualityScore * PILLAR_WEIGHTS.commitQuality +
      accountMaturityScore * PILLAR_WEIGHTS.accountMaturity +
      followersScore * PILLAR_WEIGHTS.influence
  );

  // Keep the displayed contributor category consistent with the final score.
  contributionMetrics.category = categoryFromScore(totalScore);

  const projects = selectProjectHighlights(ownedRepos, techAnalysis.matched);
  const commits = selectMeaningfulCommits(ownedRepos);
  const warnings = buildWarnings(data.repositories, ownedRepos, recentRepos, {
    accountMaturityScore,
    commitQualityScore,
    hasRequiredTech: (options.requiredTechStack ?? []).length > 0,
    missingTech: techAnalysis.missing,
  });
  const activityStatus = statusFromScore(activityScore);

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
      repoScore: impactScore,
      techMatchScore,
      activityScore,
      ossScore,
      commitQualityScore,
      accountMaturityScore,
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

// === Pillar scoring (final candidate score) ===

/**
 * Open-source contribution pillar. Rewards external pull requests (merged most),
 * issues opened, and the number of distinct external repositories contributed to.
 */
function scoreOssContribution(
  oss: { totalPRs: number; mergedPRs: number },
  metrics: GitHubInsightReport["contributionMetrics"],
  externalRepoCount: number
) {
  const prOpened = normalizeMetric(oss.totalPRs, 50);
  const prMerged = normalizeMetric(oss.mergedPRs, 25);
  const issues = normalizeMetric(metrics.issuesOpened, 40);
  const externalRepos = normalizeMetric(externalRepoCount, 6);

  return clampScore(
    prMerged * 0.4 + prOpened * 0.25 + externalRepos * 0.2 + issues * 0.15
  );
}

/**
 * Impact pillar based on stars and forks of OWNED repositories. Uses tiered
 * thresholds (STAR_TIERS) so a repository that crosses a real popularity bar
 * is worth far more than many lightly-starred repositories, plus a smaller
 * linear component for overall stars + forks volume.
 */
function scoreImpactSignal(ownedRepos: GitHubRepositorySignal[]) {
  let tierPoints = 0;
  for (const repo of ownedRepos) {
    const tier = STAR_TIERS.find((entry) => repo.stargazerCount >= entry.min);
    if (tier) tierPoints += tier.points;
  }
  const tierScore = Math.min(tierPoints, 100);

  const totalStars = ownedRepos.reduce((sum, repo) => sum + repo.stargazerCount, 0);
  const totalForks = ownedRepos.reduce((sum, repo) => sum + repo.forkCount, 0);
  const volumeScore = normalizeMetric(totalStars + totalForks, 300);

  return clampScore(tierScore * 0.7 + volumeScore * 0.3);
}

/**
 * Code activity pillar. Combines total commit volume, recent (90-day) commit
 * volume, and how recently the candidate was last active in owned repositories.
 */
function scoreCodeActivity(ownedRepos: GitHubRepositorySignal[]) {
  const totalCommits = ownedRepos.reduce((sum, repo) => sum + repo.totalCommits, 0);
  const recentCommits = ownedRepos.reduce((sum, repo) => sum + repo.commitsLast90Days, 0);
  const volumeScore = normalizeMetric(totalCommits, 500);
  const recentScore = normalizeMetric(recentCommits, 100);

  const lastActive = findLastActive(ownedRepos);
  const recencyScore = isRecent(lastActive, 30)
    ? 100
    : isRecent(lastActive, 90)
      ? 70
      : isRecent(lastActive, 365)
        ? 40
        : 10;

  return clampScore(volumeScore * 0.4 + recentScore * 0.3 + recencyScore * 0.3);
}

/**
 * Commit-quality pillar. Measures the ratio of meaningful commit messages to
 * low-effort ones across owned repositories, scaled by how many messages were
 * sampled (more evidence => more confidence).
 */
function scoreCommitQuality(ownedRepos: GitHubRepositorySignal[]) {
  const messages = ownedRepos
    .flatMap((repo) => repo.recentCommitMessages)
    .map((message) => message.trim())
    .filter(Boolean);

  if (messages.length === 0) return 0;

  const meaningful = messages.filter(isMeaningfulCommitMessage).length;
  const ratio = meaningful / messages.length;
  const volumeFactor = Math.min(messages.length / 20, 1);

  return clampScore(ratio * 100 * (0.5 + 0.5 * volumeFactor));
}

/**
 * Account-maturity pillar. Account age in years with diminishing returns:
 * roughly 5+ years of history reaches the full score.
 */
function scoreAccountMaturity(createdAt: string) {
  const created = new Date(createdAt).getTime();
  if (!Number.isFinite(created)) return 0;

  const years = (Date.now() - created) / (365.25 * 24 * 60 * 60 * 1000);
  if (years <= 0) return 0;

  return clampScore(Math.min(years / 5, 1) * 100);
}

/** Shared predicate: is a commit message descriptive rather than low-effort? */
function isMeaningfulCommitMessage(message: string) {
  const normalized = message.trim().toLowerCase();
  return (
    normalized.length > 8 &&
    !LOW_QUALITY_COMMIT_MESSAGES.has(normalized) &&
    !/^fix(e[sd])?$/i.test(message) &&
    !/^update[sd]?$/i.test(message)
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
    .filter(isMeaningfulCommitMessage)
    .slice(0, 5);
}

function buildWarnings(
  allRepos: GitHubRepositorySignal[],
  ownedRepos: GitHubRepositorySignal[],
  recentRepos: GitHubRepositorySignal[],
  context: {
    accountMaturityScore: number;
    commitQualityScore: number;
    hasRequiredTech: boolean;
    missingTech: string[];
  }
) {
  const warnings: string[] = [];
  const emptyRepos = ownedRepos.filter((repo) => repo.isEmpty || repo.diskUsage <= 0);
  const totalCommits = ownedRepos.reduce((sum, repo) => sum + repo.commitsLast90Days, 0);

  if (allRepos.length > 0 && ownedRepos.length === 0) warnings.push("Only forked repositories were found.");
  if (recentRepos.length === 0) warnings.push("No owned repositories updated in the last 90 days.");
  if (emptyRepos.length >= Math.max(3, ownedRepos.length / 2)) warnings.push("Many owned repositories appear empty or very small.");
  if (totalCommits < 3) warnings.push("Very low recent commit volume across owned repositories.");
  if (context.accountMaturityScore <= 20) warnings.push("GitHub account is relatively new.");
  if (ownedRepos.length > 0 && context.commitQualityScore <= 30) warnings.push("Commit messages are mostly low-effort (e.g. \"fix\", \"update\").");
  if (context.hasRequiredTech && context.missingTech.length > 0) warnings.push(`No public language evidence for required tech: ${context.missingTech.slice(0, 3).join(", ")}.`);

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
