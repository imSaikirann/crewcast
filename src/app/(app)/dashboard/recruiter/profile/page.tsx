import Breadcrumbs from "@/components/common/Breadcrumbs";

import RecruiterProfilePage from "@/features/recruiter/pages/RecruiterProfilePage";

export default function Page() {
  return(
    <div className="min-h-screen bg-background font-mono">
          <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 mt-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Profile", href: "/dashboard/recruiter/profile" },
                
              ]}
            />
    
            <RecruiterProfilePage/>
          </div>
        </div>
  )
}

