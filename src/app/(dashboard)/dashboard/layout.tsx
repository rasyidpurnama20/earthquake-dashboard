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
      <div className="w-full rounded-3xl">{children}</div>
    </div>
  );
}
