"use client";

import { Button } from "@/components/ui";
import { cn } from "@/utils";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UpdateDatasetsLayoutProps = {
  children: React.ReactNode;
};

enableReactComponents();

export const UpdateDatasetsLayout = ({
  children,
}: UpdateDatasetsLayoutProps) => {
  const pathname = usePathname();
  const currentStep = pathname.split("/")[4];

  const checkActiveStep = (step: number) => {
    if (Number(currentStep) >= step) {
      return "!bg-brand-700 text-white";
    } else {
      return "!bg-gray-200 text-gray-500";
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div>
        <Link href="/dashboard/datasets">
          <Button
            variant="outline"
            className="flex w-max items-center gap-2 text-sm font-semibold"
          >
            <IconArrowLeft size={20} /> Back to list
          </Button>
        </Link>
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-bold">Update Datasets</span>
        <span className="text-sm text-gray-500">
          Please fill the form below to update datasets.
        </span>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default UpdateDatasetsLayout;
