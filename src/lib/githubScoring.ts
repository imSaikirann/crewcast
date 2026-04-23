import { scoreGitHubProfile as scoreGitHubProfileWithGraphQL } from "@/services/githubScore";
import type { GitHubInsightReport } from "@/features/github-intelligence/types";

export type GitHubScore = {
  totalScore: number;
  breakdown: {
    github: number;
    skillsMatch: {
      score: number;
      percentage: number;
      required: string[];
      matched: string[];
      missing: string[];
      extra: string[];
    };
    profile: {
      username: string | null;
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
};

type ScoreOptions = {
  requiredTechStack?: string[];
};

const GITHUB_FIELD_HINTS = ["github", "git hub", "github username", "github profile"];

export function extractGitHubUsername(
  responses: Record<string, unknown>,
  fields: unknown
) {
  const fieldList = Array.isArray(fields) ? fields : [];
  const githubField = fieldList.find((field: any) => {
    const label = String(field?.label ?? "").toLowerCase();
    const id = String(field?.id ?? "").toLowerCase();
    return GITHUB_FIELD_HINTS.some((hint) => label.includes(hint) || id.includes(hint.replace(" ", "")));
  }) as any;

  const candidates = [
    githubField ? responses[githubField.id] : null,
    responses.github,
    responses.githubUsername,
    responses.github_username,
    responses.githubProfile,
    responses.github_url,
  ];

  for (const candidate of candidates) {
    const username = normalizeGitHubUsername(candidate);
    if (username) return username;
  }

  return null;
}

export function hasGitHubField(fields: unknown) {
  return Array.isArray(fields) && fields.some((field: any) => {
    const label = String(field?.label ?? "").toLowerCase();
    const id = String(field?.id ?? "").toLowerCase();
    return GITHUB_FIELD_HINTS.some((hint) => label.includes(hint) || id.includes(hint.replace(" ", "")));
  });
}

export async function scoreGitHubProfile(
  username: string | null,
  options: ScoreOptions = {}
): Promise<GitHubScore> {
  if (!username) {
    return emptyScore("No GitHub profile was provided.");
  }

  try {
    const graphQLScore = await scoreGitHubProfileWithGraphQL(username, {
      requiredTechStack: options.requiredTechStack,
    });
    const skillsMatch = calculateSkillsMatch(
      options.requiredTechStack,
      graphQLScore.languages
    );
    const totalScore = graphQLScore.totalScore;
    const notes = [...graphQLScore.notes];

    if (skillsMatch.required.length > 0) {
      if (skillsMatch.missing.length > 0) {
        notes.push(
          `Missing required GitHub language signals: ${skillsMatch.missing.join(", ")}`
        );
      }
      if (skillsMatch.matched.length > 0) {
        notes.push(
          `Matched required skills from GitHub: ${skillsMatch.matched.join(", ")}`
        );
      }
    }

    return {
      totalScore,
      breakdown: {
        github: graphQLScore.totalScore,
        skillsMatch,
        profile: graphQLScore.profile,
        languages: graphQLScore.languages,
        signals: graphQLScore.signals,
        notes,
        insightReport: graphQLScore.insightReport,
      },
    };
  } catch (error) {
    console.error("GitHub scoring failed:", {
      username,
      error,
    });
    throw error;
  }
}

function calculateSkillsMatch(
  requiredTechStack: string[] | undefined,
  languages: Record<string, number>
) {
  const required = normalizeUnique(requiredTechStack ?? []);
  const githubSkills = normalizeUnique(Object.keys(languages));

  if (required.length === 0) {
    return {
      score: 55,
      percentage: 100,
      required,
      matched: [],
      missing: [],
      extra: githubSkills,
    };
  }

  const matched = required.filter((skill) =>
    githubSkills.some((githubSkill) => skillsMatch(skill, githubSkill))
  );
  const missing = required.filter((skill) => !matched.includes(skill));
  const extra = githubSkills.filter(
    (githubSkill) =>
      !required.some((requiredSkill) => skillsMatch(requiredSkill, githubSkill))
  );
  const percentage = Math.round((matched.length / required.length) * 100);

  return {
    score: Math.round(percentage * 0.55),
    percentage,
    required,
    matched,
    missing,
    extra,
  };
}

function normalizeUnique(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((value) => normalizeSkillName(value))
        .filter((value): value is string => Boolean(value))
    )
  );
}

function normalizeSkillName(value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  return SKILL_ALIASES[normalized] ?? normalized;
}

function skillsMatch(requiredSkill: string, githubSkill: string) {
  return requiredSkill === githubSkill;
}

const SKILL_ALIASES: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  node: "javascript",
  "node.js": "javascript",
  nodejs: "javascript",
  reactjs: "javascript",
  react: "javascript",
  next: "typescript",
  "next.js": "typescript",
  nextjs: "typescript",
  vue: "javascript",
  "vue.js": "javascript",
  angular: "typescript",
  py: "python",
  golang: "go",
  postgres: "sql",
  postgresql: "sql",
  mysql: "sql",
  mongodb: "javascript",
  mongo: "javascript",
  tailwind: "css",
  "tailwind css": "css",
  html5: "html",
  css3: "css",
  csharp: "c#",
  dotnet: "c#",
  ".net": "c#",
};

function normalizeGitHubUsername(value: unknown) {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw) return null;

  const match = raw.match(/github\.com\/([A-Za-z0-9-]+)/i);
  const username = match?.[1] ?? raw.replace(/^@/, "");
  return /^[A-Za-z0-9-]{1,39}$/.test(username) ? username : null;
}

function emptyScore(note: string): GitHubScore {
  return {
    totalScore: 0,
    breakdown: {
      github: 0,
      skillsMatch: {
        score: 0,
        percentage: 0,
        required: [],
        matched: [],
        missing: [],
        extra: [],
      },
      profile: {
        username: null,
        publicRepos: 0,
        followers: 0,
        accountAgeYears: 0,
      },
      languages: {},
      signals: {
        originalRepos: 0,
        recentRepos: 0,
        stars: 0,
        forks: 0,
      },
      notes: [note],
      insightReport: {
        totalScore: 0,
        confidence: "LOW",
        summary: note,
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
        warnings: [note],
      },
    },
  };
}
