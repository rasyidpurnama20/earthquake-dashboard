"use client";

import { Button } from "@/components/ui";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type CreateTargetLayoutProps = {
  children: React.ReactNode;
};

export default function CreateTargetLayout({
  children,
}: CreateTargetLayoutProps) {
  const { id } = useParams();

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="space-y-4 rounded-lg border p-6">
        <div>
          <Link href={`/dashboard/magnitude-prediction/${id as string}/target`}>
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
    </div>
  );
}
