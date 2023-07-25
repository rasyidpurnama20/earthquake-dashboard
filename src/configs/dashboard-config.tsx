import { IconBrain, IconDashboard, IconDatabase } from "@tabler/icons-react";

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
        title: "Magnitude Prediction",
        path: "/dashboard/magnitude-prediction",
        icon: <IconBrain size={20} stroke={1.5} />,
      },
    ],
  },
];
