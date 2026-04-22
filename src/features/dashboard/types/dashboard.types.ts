export type JobForm = {
  id: string;
  publicId: string;
  title: string;
  description: string;
  fieldsCount: number;
  isActive: boolean;
  status: string;
  roleType: string;
  createdAt: string;
  expiresAt: string;
  submissions: number;
  openings: number;
  hiredCount: number;
  newSubmissions: number;
  views: number;
  domainTitle?: string;
};

export type DashboardRecruiter = {
  companyName: string;
  companyEmail: string;
  verified: boolean;
  plan: string;
  formLimit: number;
  totalFormsLimit: number;
};
