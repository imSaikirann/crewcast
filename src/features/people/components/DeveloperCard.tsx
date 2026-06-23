"use client";

import {
  GitCommitHorizontal,
  GitFork,
  Link as LinkIcon,
  Mail,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { DeveloperProfile } from "../types";

type DeveloperCardProps = {
  developer: DeveloperProfile;
};

function rankTier(rank: number): { label: string; className: string } {
  if (rank <= 3) {
    return {
      label: "Elite contributor",
      className: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    };
  }
  if (rank <= 6) {
    return {
      label: "Strong contributor",
      className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    };
  }
  return {
    label: "Active contributor",
    className: "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  };
}

function formatCount(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  return String(value);
}

function initials(name: string | null, login: string): string {
  const source = (name || login).trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

function buildMailto(developer: DeveloperProfile): string {
  const subject = encodeURIComponent("Opportunity via Crewcast");
  const body = encodeURIComponent(
    `Hi ${developer.name || developer.login},\n\n` +
      `I came across your open-source work on GitHub (${developer.htmlUrl}) and would love to connect about an opportunity.\n\n` +
      `Best regards,`
  );
  return `mailto:${developer.email}?subject=${subject}&body=${body}`;
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  const tier = rankTier(developer.rank);
  const stats: { icon: typeof Users; label: string; value: string }[] = [
    { icon: Users, label: "Followers", value: formatCount(developer.followers) },
    { icon: Star, label: "Stars", value: formatCount(developer.totalStars) },
    {
      icon: GitCommitHorizontal,
      label: "Commits (90d)",
      value: formatCount(developer.recentCommits),
    },
    { icon: GitFork, label: "Repos", value: formatCount(developer.publicRepos) },
  ];

  return (
    <article className="flex flex-col rounded-xl border bg-card/80 p-5 shadow-xs transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="lg" className="size-12 border">
            <AvatarImage
              src={developer.avatarUrl}
              alt={developer.name || developer.login}
              loading="lazy"
            />
            <AvatarFallback>{initials(developer.name, developer.login)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <a
              href={developer.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate font-semibold hover:underline"
            >
              {developer.name || developer.login}
            </a>
            <p className="truncate text-xs text-muted-foreground">@{developer.login}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="text-sm font-bold text-muted-foreground">#{developer.rank}</span>
          <Badge variant="outline" className={cn("text-[10px]", tier.className)}>
            {tier.label}
          </Badge>
        </div>
      </div>

      {developer.bio && (
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{developer.bio}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {developer.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {developer.location}
          </span>
        )}
        {developer.company && (
          <span className="inline-flex items-center gap-1 truncate">
            <Users className="size-3.5" />
            {developer.company}
          </span>
        )}
        {developer.blog && (
          <a
            href={developer.blog.startsWith("http") ? developer.blog : `https://${developer.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <LinkIcon className="size-3.5" />
            Website
          </a>
        )}
      </div>

      {developer.languages.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {developer.languages.map((language) => (
            <Badge key={language.name} variant="secondary" className="text-[11px]">
              {language.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-4 grid grid-cols-4 gap-2 rounded-lg border bg-background/60 p-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <stat.icon className="size-4 text-muted-foreground" />
            <span className="mt-1 text-sm font-semibold">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {developer.topRepos.length > 0 && (
        <div className="mt-4 space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Top repositories
          </p>
          {developer.topRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 rounded-md px-2 py-1 text-xs hover:bg-accent"
            >
              <span className="truncate font-medium">{repo.name}</span>
              <span className="inline-flex shrink-0 items-center gap-1 text-muted-foreground">
                <Star className="size-3" />
                {formatCount(repo.stars)}
              </span>
            </a>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center gap-2 pt-4">
        {developer.email ? (
          <Button asChild size="sm" className="flex-1">
            <a href={buildMailto(developer)}>
              <Mail className="size-4" />
              Contact
            </a>
          </Button>
        ) : (
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="flex-1"
            title="This developer has no public email â€” reach out via GitHub"
          >
            <a href={developer.htmlUrl} target="_blank" rel="noopener noreferrer">
              <Mail className="size-4" />
              No public email
            </a>
          </Button>
        )}
        <Button asChild size="sm" variant="outline">
          <a href={developer.htmlUrl} target="_blank" rel="noopener noreferrer">
            <LinkIcon className="size-4" />
            Profile
          </a>
        </Button>
      </div>
    </article>
  );
}

