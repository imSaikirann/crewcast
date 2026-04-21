# Crewcast

Crewcast is a private hiring workflow product for engineering teams. It helps recruiters collect structured applications, score public GitHub evidence, compare candidates, track openings, and give candidates a clear application status instead of leaving them in a black box.

This repository is not open source at the moment. Do not publish, redistribute, or reuse code from this project without explicit permission from the owner.

## What It Solves

Traditional hiring tools often rely on resumes, keyword matching, and manual screening. Crewcast focuses on role-relevant evidence:

- Role-specific public application forms.
- Required GitHub profile capture for software roles.
- GitHub GraphQL scoring based on public profile and repository signals.
- Required tech stack comparison against GitHub language evidence.
- Recruiter dashboard for reviewing, filtering, and comparing candidates.
- Opening-based hiring progress such as `1/3 hired`.
- Automatic cleanup of remaining active candidates when a role is filled.
- Candidate-facing status tracking after submission.

## Core Workflows

### Recruiter Flow

1. Recruiter creates a job form for a domain.
2. Recruiter defines role metadata, required tech stack, salary, expiry date, and number of openings.
3. Candidate applications appear in the dashboard.
4. GitHub scoring runs in the background after submission.
5. Recruiter reviews candidates, compares up to three applications, and updates statuses.
6. When hired candidates reach the opening count, remaining active candidates are marked rejected.

### Candidate Flow

1. Candidate opens a public job form.
2. Candidate submits answers and a GitHub profile.
3. Submission returns immediately; GitHub scoring continues in the background.
4. Candidate receives a tracking link for application status.
5. Candidate can see whether the application is applied, shortlisted, interview, hired, rejected, or closed because the role is filled.

## Architecture

The project uses:

- Next.js App Router
- React
- TypeScript
- Prisma with MongoDB
- NextAuth
- TanStack Query
- Tailwind CSS
- GitHub GraphQL API

Important folders:

```txt
src/app
  Route handlers and app pages.

src/features
  Feature-owned UI, hooks, services, and business workflows.

src/components
  Shared app, UI, brand, landing, and marketing components.

src/lib
  Shared infrastructure, auth, cache keys, validators, Prisma, scoring adapters.

src/services
  External service integrations such as GitHub GraphQL scoring.

prisma
  Database schema and generated model source.
```

## Production Structure Guidelines

Use thin route handlers. Route files should parse request data, call a feature service, and map the result to an HTTP response.

Keep business logic in feature services. For example, public application submission lives in:

```txt
src/features/public-form/services/applicationSubmission.ts
```

Keep types close to the code that owns them. If a type is only used by one route, service, or component, keep it in the same file. Move it to a shared type file only when multiple modules need it.

Keep UI separate from workflow logic. Components should render state and call callbacks. API calls, persistence decisions, validation, and background work should live in hooks or services.



## GitHub Scoring

GitHub scoring uses GitHub GraphQL, not the REST `/users` and `/repos` endpoints.

Main files:

```txt
src/services/githubScore.ts
src/lib/githubScoring.ts
```

The scoring model combines:

- GitHub strength signals.
- Original repositories.
- Recent repository activity.
- Stars and forks.
- Account maturity.
- Language distribution.
- Match between job `techStack` and GitHub language evidence.

The final application score is stored in `ApplicationScore` after the application is created. Scoring is intentionally fire-and-forget so candidate submission is not blocked by external API latency.

## Application Submission

Public form submission route:

```txt
src/app/api/forms/[id]/submit/route.ts
```

Business workflow:

```txt
src/features/public-form/services/applicationSubmission.ts
```

The API returns after the application is created. It does not wait for GitHub scoring or cache invalidation.

Response shape:

```json
{
  "success": true,
  "id": "application-id",
  "trackingUrl": "https://app-url/application/status/application-id",
  "scoreStatus": "pending"
}
```

## Candidate Status Tracking

Public status page:

```txt
src/app/(public)/application/status/[token]/page.tsx
```

Current implementation uses the application id in the tracking URL. The schema also includes `trackingToken`, but the app should only switch to token-based tracking after Prisma Client and the database are fully regenerated and pushed.

Recommended migration steps:

```bash
npx prisma generate
npx prisma db push
```

Stop the dev server before running Prisma generate on Windows if the query engine DLL is locked.

## Openings And Hiring Progress

`RecruiterForm.openings` controls how many candidates can be hired for a role.

Examples:

- `0/3 hired`
- `1/3 hired`
- `3/3 hired`

When the final opening is filled, remaining active candidates are marked `REJECTED`. The candidate status page explains that the role is fully staffed.

Status update route:

```txt
src/app/api/recruiters/forms/[formId]/applications/[applicationId]/status/route.ts
```

## Environment Variables

Required values depend on the workflow being used:

```txt
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
GITHUB_TOKEN
```

`GITHUB_TOKEN` is required for GitHub GraphQL scoring.

Cache setup is environment-specific:

```txt
# Development
REDIS_URL=redis://localhost:6379

# Production
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

In development, Crewcast uses local Redis through `REDIS_URL`. In production, Crewcast uses Upstash Redis over REST. If the Upstash values are missing in production, cache operations are disabled instead of falling back to localhost.

## Local Development

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Push schema changes:

```bash
npx prisma db push
```

Run the app:

```bash
npm run dev
```

For local cache testing, run Redis locally and set:

```txt
REDIS_URL=redis://localhost:6379
```

Run TypeScript checks:

```bash
npx tsc --noEmit
```

Build:

```bash
npm run build
```

On this Windows workspace, `next build` may compile successfully and then fail with `spawn EPERM` when the sandbox blocks worker process creation. That is an environment permission issue, not necessarily an application compile error.

## Current Notes

- The app uses a fixed dark Crewcast theme.
- Dark mode toggle code has been removed.
- Candidate scoring runs asynchronously after submission.
- The public application status page is available after submission.
- The project is private and not intended for open-source distribution right now.
