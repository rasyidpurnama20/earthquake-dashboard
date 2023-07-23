import { IconDashboard, IconDatabase, IconInfinity } from "@tabler/icons-react";

export const DashboardConfig = [
  {
    title: "Dashboard",
    subMenu: [
      {
        title: "Feature Analysis",
        path: "/dashboard/feature-analysis",
        icon: <IconDashboard size={20} stroke={1.5} />,
      },
    ],
  },

  {
    title: "Management",
    subMenu: [
      {
        title: "Datasets",
        path: "/dashboard/datasets",
        icon: <IconDatabase size={20} stroke={1.5} />,
      },
      {
        title: "Pipeline",
        path: "/dashboard/pipeline",
        icon: <IconInfinity size={20} stroke={1.5} />,
      },
    ],
  },
];
