
export type SubmitApplicationInput = {
  publicFormId: string;
  origin: string;
  responses: Record<string, unknown>;
};

export type SubmitApplicationResult =
  | {
      ok: true;
      status: number;
      body: {
        success: true;
        id: string;
        trackingUrl: string;
        scoreStatus: "pending";
      };
    }
  | {
      ok: false;
      status: number;
      body: {
        error: string;
      };
    };

export  type FormFieldLike = {
  id?: string;
  label?: string;
  type?: string;
  required?: boolean;
};

export  type ResumeUpload = {
  url: string;
  name: string;
  size: number;
  type: string;
};