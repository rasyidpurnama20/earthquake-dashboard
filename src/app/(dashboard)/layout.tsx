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

      <main className="flex-1 md:py-6 md:pr-6">{children}</main>
    </div>
  );
}
