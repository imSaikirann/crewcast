import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Spinner } from "@/components/ui/spinner";

export function GoogleButton({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="h-11 w-full gap-2.5 rounded-md text-[13px] font-bold tracking-[0.02em]"
      data-testid="login-google-button"
    >
      {loading ? (
        <>
          <Spinner />
          Redirecting to Google…
        </>
      ) : (
        <>
          <GoogleIcon />
          Continue with Google
        </>
      )}
    </Button>
  );
}