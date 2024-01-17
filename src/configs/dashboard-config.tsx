import {
  IconBrain,
  IconBrandAppleArcade,
  IconChartAreaLine,
  IconDatabase,
  IconGitMerge,
  IconReport,
  IconReportAnalytics,
  IconServerCog,
} from "@tabler/icons-react";

export const DashboardConfig = [
  {
    title: "Dashboard",
    subMenu: [
      {
        title: "Playground",
        path: "/dashboard/playground",
        icon: <IconBrandAppleArcade size={20} stroke={1.5} />,
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
      {
        title: "Visualization",
        path: "/dashboard/visualization",
        icon: <IconChartAreaLine size={20} stroke={1.5} />,
      },
      {
        title: "Pipeline",
        path: "/dashboard/pipeline",
        icon: <IconGitMerge size={20} stroke={1.5} />,
      },
      {
        title: "Stream Data Handler",
        path: "/dashboard/stream-data-handler",
        icon: <IconServerCog size={20} stroke={1.5} />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <IconReportAnalytics size={20} stroke={1.5} />,
      },
      {
        title: "Automatic Reports",
        path: "/dashboard/automatic-reports",
        icon: <IconReport size={20} stroke={1.5} />,
      },
    ],
  },
];
