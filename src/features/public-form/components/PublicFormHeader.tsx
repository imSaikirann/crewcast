import { Button } from "@/components/ui/button";
import { Share2, ShieldCheck } from "lucide-react";

export function PublicFormHeader({ recruiter }: any) {
  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="flex items-center justify-between pb-6 border-b">
      
      {/* Company Identity */}
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Hiring company
        </p>

        <div className="flex items-center gap-2">
          <p className="text-base font-semibold">
            {recruiter.companyName}
          </p>

          {recruiter.verified && (
            <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              Verified
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={share}
          className="rounded-full"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
