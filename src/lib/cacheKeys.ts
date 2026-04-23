export const cacheKeys = {
  adminOverview: "crewcast:admin:overview",

  domains: "crewcast:domains:list",

  publicDomains: "crewcast:public:domains",

  domainDefault: (domainId: string) =>
    `crewcast:domain:${domainId}:default`,

  job: (publicId: string) =>
    `crewcast:job:${publicId}`,

  recruiterJobs: (recruiterId: string) =>
    `crewcast:recruiter:${recruiterId}:jobs`,

  domainForms: (domainId: string) =>
    `crewcast:domain:${domainId}:forms`,

  jobApplications: (formId: string) =>
    `crewcast:job:${formId}:applications`,

  jobs:'crewcast:jobs'
};

export const cacheTtl = {
  adminOverview: 15,
  domains: 60,
  publicDomains: 60,
  domainDefault: 5 * 60,
  jobs: 30,
  publicJob: 60,
  recruiterJobs: 30,
  jobApplications: 30,
  githubIntel: 60 * 60,
} as const;
