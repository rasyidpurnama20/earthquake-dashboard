"use client";

import { Sidebar } from "@/components";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex">
      <div className="w-56">
        <Sidebar />
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
