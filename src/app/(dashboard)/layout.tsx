import { Sidebar } from "@/components";

export const metadata = {
  title: "Dashboard",
  description: "AutoML",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 md:py-6 md:pr-6">
        <div className="min-h-[calc(100vh-48px)] rounded-3xl border">
          {children}
        </div>
      </main>
    </div>
  );
}
