"use client";

import { Button } from "@/components/ui";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

type CreateTargetLayoutProps = {
  children: React.ReactNode;
};

enableReactComponents();

export const CreateTargetLayout = ({ children }: CreateTargetLayoutProps) => {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div>
        <Link href="/dashboard/magnitude-prediction">
          <Button
            variant="outline"
            className="flex w-max items-center gap-2 text-sm font-semibold"
          >
            <IconArrowLeft size={20} /> Back to list
          </Button>
        </Link>
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-bold">Create New Target</span>
        <span className="text-sm text-gray-500">
          Please fill the form below to create target.
        </span>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default CreateTargetLayout;
