import { type Metadata } from "next";

interface DashboardContentLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "DipoAI x LapiITB",
};

const DashboardContentLayout = ({ children }: DashboardContentLayoutProps) => {
  return (
    <div className="flex w-full">
      <div className="w-full rounded-3xl">{children}</div>
    </div>
  );
};

export default DashboardContentLayout;
