export type JobForm = {
  id: string;
  publicId: string;
  title: string;
  description: string;
  fieldsCount: number;
  isActive: boolean;
  status: string;
  createdAt: string;
  expiresAt: string;
  submissions: number;
  newSubmissions: number;
  views: number;
};
