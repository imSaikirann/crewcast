export type PeopleSort = "followers" | "repositories" | "joined";

export interface PeopleFilters {
  languages: string[];
  location: string;
  minFollowers: number;
  sort: PeopleSort;
  page: number;
}

export interface DeveloperLanguage {
  name: string;
  repos: number;
}

export interface DeveloperRepo {
  name: string;
  htmlUrl: string;
  stars: number;
  language: string | null;
  description: string | null;
}

export interface DeveloperProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
  email: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitterUsername: string | null;
  hireable: boolean | null;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  recentCommits: number;
  languages: DeveloperLanguage[];
  topRepos: DeveloperRepo[];
  score: number;
  rank: number;
  joinedYear: number | null;
}

export interface FindPeopleResponse {
  developers: DeveloperProfile[];
  totalCount: number;
  query: string;
  page: number;
  hasMore: boolean;
  warnings?: string[];
}
