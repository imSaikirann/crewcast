import Breadcrumbs from "@/components/common/Breadcrumbs";
import ApplicationsView from "@/features/submissions/components/ApplicationsView";
import ApplicationTable from "@/features/submissions/components/ApplicationTable";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  // This is your real API later:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/recruiter/forms/${publicId}/applications`);
  // const data = await res.json();

  // For now using your provided data
  const data = [
    {
      id: "695e7536a117129bf238d1f5",
      fullName: "Sai Kiran Neelakantam",
      email: "neelakantamsaikiran3@gmail.com",
      createdAt: "2026-01-07T15:01:10.705Z",
      responses: {
        full_name: "Sai Kiran Neelakantam",
        email: "neelakantamsaikiran3@gmail.com",
        phone: "+916303798093",
        github: "https://bdkcjsndc",
        linkedin: "https://www.linkedin.com/in/loynix-studio",
        years_experience: "3",
        current_company: "ss",
        notice_period: "15 Days",
        expected_salary: "2220000",
        why_join: "fvdc dv v",
      },
      status: "APPLIED",
      scores: [],
    },
    {
      id: "695e2eb1c70b0d4adcee960a",
      fullName: "Sai Kiran Neelakantam",
      email: "neelakantamsaikiran2@gmail.com",
      createdAt: "2026-01-07T10:00:17.727Z",
      responses: {
        full_name: "Sai Kiran Neelakantam",
        email: "neelakantamsaikiran2@gmail.com",
        phone: "+916303798093",
        github: "https://bdkcjsndc",
        linkedin: "https://www.linkedin.com/in/loynix-studio",
        years_experience: "444",
        current_company: "444",
        notice_period: "30 Days",
        expected_salary: "4444",
        why_join: "444",
      },
      status: "APPLIED",
      scores: [],
    },
    {
      id: "695e2de31a2b53e786cbff16",
      fullName: "Sai Kiran Neelakantam",
      email: "neelakantamsaikiran1@gmail.com",
      createdAt: "2026-01-07T09:56:51.818Z",
      responses: {
        full_name: "Sai Kiran Neelakantam",
        email: "neelakantamsaikiran1@gmail.com",
        phone: "+916303798093",
        github: "https://bdkcjsndc",
        linkedin: "https://www.linkedin.com/in/loynix-studio",
        years_experience: "31",
        current_company: "ss",
        notice_period: "15 Days",
        expected_salary: "4444",
        why_join: "44444",
      },
      status: "APPLIED",
      scores: [],
    },
  ];

  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 mt-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Submissions", href: `/dashboard/submissions/${publicId}` },
            
          ]}
        />

        <ApplicationsView data={data} />
      </div>
    </div>
  );
}
