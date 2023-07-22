"use client";

import { Sidebar } from "@/components";
import { observer } from "@legendapp/state/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = observer(
  ({ children }: DashboardLayoutProps) => {
    return (
      <div className="flex">
        <Sidebar />

        <main className="flex-1">{children}</main>
      </div>
    );
  }
);

export default DashboardLayout;
