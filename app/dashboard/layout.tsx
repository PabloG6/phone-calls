import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader></DashboardHeader>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
