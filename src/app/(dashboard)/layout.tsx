"use client";

import { Sidebar } from "@/components";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex">
      <div className="flex w-full max-w-[240px] flex-1">
        <Sidebar />
      </div>

      <main className="flex w-full flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
