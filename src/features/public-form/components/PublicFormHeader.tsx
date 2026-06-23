import { Button } from "@/components/ui/button";
import { Share2, ShieldCheck, Globe, Linkedin } from "lucide-react";

export function PublicFormHeader({ recruiter }: { recruiter: any }) {
  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  if (!recruiter) return null;

  const isStealth = !recruiter.companyName;

  return (
    <div className="flex items-start justify-between pb-6 border-b">
      {/* Company block */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Hiring company
        </p>

        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold leading-none">
            {isStealth ? "Confidential Employer" : recruiter.companyName}
          </h2>

          {recruiter.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-green-700 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          )}
        </div>

        {/* Links or stealth note */}
        {!isStealth ? (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {recruiter.website && (
              <a
                href={recruiter.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition"
              >
                <Globe className="w-4 h-4" />
                Website
              </a>
            )}

            {recruiter.linkedinLink && (
              <a
                href={recruiter.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            This employer is verified but has chosen to remain confidential.
          </p>
        )}
      </div>

      {/* Share */}
      <Button
        variant="outline"
        size="icon"
        onClick={share}
        className="rounded-md"
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

