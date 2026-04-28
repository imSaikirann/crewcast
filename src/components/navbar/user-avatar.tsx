import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserLike = { name?: string | null; image?: string | null } | undefined;

export function UserAvatar({
  user,
  className,
}: {
  user: UserLike;
  className?: string;
}) {
  const initial = user?.name?.[0]?.toUpperCase() ?? "U";
  return (
    <Avatar className={cn("size-7 rounded-md", className)}>
      {user?.image && <AvatarImage src={user.image} alt={user?.name ?? "user"} />}
      <AvatarFallback className="rounded-md bg-muted text-[10px] font-bold">
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}