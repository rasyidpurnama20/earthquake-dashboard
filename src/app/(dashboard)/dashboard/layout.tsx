export const metadata = {
  title: "Dashboard",
  description: "AutoML",
};

interface DashboardContentLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardContentLayout({
  children,
}: DashboardContentLayoutProps) {
  return (
    <div className="flex">
      <div className="min-h-[calc(100vh-48px)] w-full rounded-3xl border">
        {children}
      </div>
    </div>
  );
}
