import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import AppPage from "@/components/app/AppPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROLES } from "@/lib/constants/roles";
import FindPeopleScreen from "@/features/people/screens/FindPeopleScreen";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role === ROLES.ADMIN) {
    redirect("/admin");
  }

  return (
    <AppPage breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Find people" }]}>
      <FindPeopleScreen />
    </AppPage>
  );
}

