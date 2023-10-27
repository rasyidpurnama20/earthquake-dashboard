"use client";

import { Button } from "@/components/ui";
import { cn } from "@/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AddDatasetsLayoutProps = {
  children: React.ReactNode;
};

export const AddDatasetsLayout = ({ children }: AddDatasetsLayoutProps) => {
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
        <span className="text-2xl font-bold">Add New Datasets</span>
        <span className="text-sm text-gray-500">
          Please fill the form below to add new datasets.
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <span
          className={cn(checkActiveStep(1), "rounded-full px-3 py-1 text-sm")}
        >
          Step 1
        </span>
        <div
          className={cn(checkActiveStep(2), "h-0.5 w-5 rounded-full bg-black")}
        ></div>
        <span
          className={cn(checkActiveStep(2), "rounded-full px-3 py-1 text-sm")}
        >
          Step 2
        </span>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default AddDatasetsLayout;
