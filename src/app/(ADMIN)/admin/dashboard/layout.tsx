import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
       
         <aside className="w-64 bg-[#111] border-r border-[#222] flex-shrink-0 overflow-y-auto scrollbar-hide">
          <AppSidebar />
        </aside>

        <div className="flex-1 flex flex-col bg-[#0a0a0a] w-full">

          <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-[#111]">{children}</main>
        </div>

        
      </div>
    </SidebarProvider>


  );
}


