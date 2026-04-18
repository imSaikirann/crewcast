export const dynamic = "force-dynamic"

import Breadcrumbs from '@/components/common/Breadcrumbs'
import Form from '@/features/form-builder/pages/Form'


export default function page() {
  return (
    
  
   <div className="min-h-screen">
            <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                items={[
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "New form" },
                  
                ]}
              />

   <Form/>
            </div>
   </div>
 
  
  )
}
