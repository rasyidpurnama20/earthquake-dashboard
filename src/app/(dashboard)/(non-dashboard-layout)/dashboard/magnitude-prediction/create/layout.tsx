"use client";

import { Button } from "@/components/ui";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

type CreatePredictionLayoutProps = {
  children: React.ReactNode;
};

export default function CreatePredictionLayout({
  children,
}: CreatePredictionLayoutProps) {
  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="space-y-4 rounded-lg border p-6">
        <div>
          <Button variant="outline">
            <Link
              href="/dashboard/magnitude-prediction"
              className="flex w-max items-center gap-2 text-sm font-semibold"
            >
              <IconArrowLeft size={20} /> Back to list
            </Link>
          </Button>
        </div>

        <div className="flex flex-col">
          <span className="text-2xl font-bold">Create New Prediction</span>
          <span className="text-sm text-gray-500">
            Please fill the form below to create prediction.
          </span>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
