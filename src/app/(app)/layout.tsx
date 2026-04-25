import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import AppShell from "@/components/app/AppShell";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <AppShell>{children}</AppShell>;
}
