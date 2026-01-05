export const cacheKeys = {
  job: (publicId: string) =>
    `crewcast:job:${publicId}`,

  recruiterJobs: (recruiterId: string) =>
    `crewcast:recruiter:${recruiterId}:jobs`,

  domainForms: (domainId: string) =>
    `crewcast:domain:${domainId}:forms`,

  jobApplicants: (publicId: string) =>
    `crewcast:job:${publicId}:applicants`,
};
