import { HugeIcon } from "@/utils/hugeicons";
import { Recruiter } from "../types/recruiter";

export default function ProfileCard({ recruiter }: any) {
  return (
    <div className="rounded-xl border bg-background p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <HugeIcon name="office-building" className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold">Company Details</p>
          <p className="text-xs text-muted-foreground">Profile Information</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <HugeIcon name="mail" className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs mb-0.5">Email</p>
            <p className="wrap-break-word">{recruiter.companyEmail}</p>
          </div>
        </div>

        {recruiter.website && (
          <div className="flex items-start gap-3">
            <HugeIcon name="global" className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs mb-0.5">Website</p>
              <a 
                href={recruiter.website.startsWith('http') ? recruiter.website : `https://${recruiter.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline wrap-break-word"
              >
                {recruiter.website}
              </a>
            </div>
          </div>
        )}

        {recruiter.linkedinLink && (
          <div className="flex items-start gap-3">
            <HugeIcon name="link" className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs mb-0.5">LinkedIn</p>
              <a 
                href={recruiter.linkedinLink.startsWith('http') ? recruiter.linkedinLink : `https://${recruiter.linkedinLink}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline wrap-break-word"
              >
                {recruiter.linkedinLink}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
