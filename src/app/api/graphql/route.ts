import { NextRequest, NextResponse } from "next/server";

import { getClientFingerprint, rateLimit, rateLimitResponse } from "@/lib/rateLimit";
import { scoreGitHubProfile } from "@/services/githubScore";

type GraphQLRequestBody = {
  query?: string;
  variables?: Record<string, unknown> | string | null;
  operationName?: string | null;
};

const schemaDescription = {
  data: {
    __schema: {
      queryType: { name: "Query" },
      fields: [
        {
          name: "githubScore",
          args: [{ name: "username", type: "String!" }],
        },
      ],
    },
  },
};

export async function GET(request: NextRequest) {
  const fingerprint = getClientFingerprint(request);
  const limit = await rateLimit({
    key: `crewcast:rl:graphql:get:${fingerprint.hash}`,
    limit: 20,
    windowSeconds: 60,
  });
  if (!limit.allowed) return rateLimitResponse(limit);

  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({
      message: "Crewcast GraphQL endpoint",
      usage: {
        method: "POST",
        body: {
          query:
            'query GitHubScore($username: String!) { githubScore(username: $username) { totalScore profile { username publicRepos followers accountAgeYears } languages signals { originalRepos recentRepos stars forks } notes } }',
          variables: { username: "iamsaikirann" },
        },
      },
    });
  }

  return executeGraphQLRequest({
    query,
    variables: request.nextUrl.searchParams.get("variables"),
    operationName: request.nextUrl.searchParams.get("operationName"),
  });
}

export async function POST(request: NextRequest) {
  const fingerprint = getClientFingerprint(request);
  const limit = await rateLimit({
    key: `crewcast:rl:graphql:post:${fingerprint.hash}`,
    limit: 30,
    windowSeconds: 60,
  });
  if (!limit.allowed) return rateLimitResponse(limit);

  const body = await readJsonBody(request);

  if (!body.query) {
    return graphQLError("GraphQL query is required.", 400);
  }

  return executeGraphQLRequest(body);
}

async function executeGraphQLRequest(body: GraphQLRequestBody) {
  const query = body.query?.trim() ?? "";
  if (query.length > 5000) {
    return graphQLError("Query is too large.", 413);
  }

  if (query.includes("__schema") || query.includes("__type")) {
    return NextResponse.json(schemaDescription);
  }

  if (!query.includes("githubScore")) {
    return graphQLError('Only the "githubScore" query is supported.', 400);
  }

  const username = getUsername(body);

  if (!username) {
    return graphQLError('Argument "username" is required.', 400);
  }
  if (!/^[a-z\d](?:[a-z\d-]{0,37})$/i.test(username)) {
    return graphQLError('Argument "username" is invalid.', 400);
  }

  try {
    const githubScore = await scoreGitHubProfile(username);
    return NextResponse.json({ data: { githubScore } });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch GitHub data";
    return graphQLError(message, 502);
  }
}

async function readJsonBody(request: NextRequest): Promise<GraphQLRequestBody> {
  const rawBody = await request.text();

  if (!rawBody.trim()) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawBody);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function getUsername(body: GraphQLRequestBody) {
  const variables = normalizeVariables(body.variables);
  const variableUsername =
    variables.username ?? variables.login ?? variables.githubUsername;

  if (typeof variableUsername === "string" && variableUsername.trim()) {
    return variableUsername.trim();
  }

  const inlineUsername = body.query?.match(
    /githubScore\s*\(\s*username\s*:\s*"([^"]+)"/
  )?.[1];

  return inlineUsername?.trim() || null;
}

function normalizeVariables(variables: GraphQLRequestBody["variables"]) {
  if (!variables) return {};

  if (typeof variables === "string") {
    try {
      const parsed = JSON.parse(variables);
      return typeof parsed === "object" && parsed !== null
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }

  return variables;
}

function graphQLError(message: string, status: number) {
  return NextResponse.json({ errors: [{ message }] }, { status });
}
