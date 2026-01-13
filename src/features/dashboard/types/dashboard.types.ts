export type JobForm = {
  id: string;
  title: string;
  description: string;
  fieldsCount: number;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
  submissions: number;
  newSubmissions: number;
};
