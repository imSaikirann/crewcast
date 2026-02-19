export const dynamic = "force-dynamic"

import Breadcrumbs from '@/components/common/Breadcrumbs'
import Form from '@/features/form-builder/pages/Form'


export default function page() {
  return (
    
  
   <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 mt-16 sm:mt-20">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Profile", href: "/dashboard/recruiter/profile" },
                  
                ]}
              />

   <Form/>
            </div>
   </div>
 
  
  )
}
