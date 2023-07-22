"use client";

import { Button, Skeleton } from "@/components/ui";
import { datasetsFormState } from "@/store/datasets-form-store";
import { formatDate } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step3() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setLoading(true);
    datasetsFormState.set({
      step: 1,
      data: {
        fileName: "",
        type: "",
        cave: "",
        file: undefined,
        selectedStartDate: "" as unknown as Date,
        selectedEndDate: "" as unknown as Date,
      },
    });
    router.push("/dashboard/datasets");
  };

  return (
    <div className="flex flex-col space-y-4">
      <span className="text-xl font-bold">Recap</span>

      <div className="flex space-x-6">
        <div>
          <ul>
            <li className="text-sm font-bold">File Name</li>
            <li className="text-sm font-bold">Type</li>
            <li className="text-sm font-bold">Cave</li>
            <li className="text-sm font-bold">Start Date</li>
            <li className="text-sm font-bold">End Date</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="text-sm">
              {datasetsFormState.data.fileName.get() ? (
                datasetsFormState.data.fileName.get()
              ) : (
                <Skeleton className="h-2 w-5" />
              )}
            </li>
            <li className="text-sm">
              {datasetsFormState.data.type.get() ? (
                datasetsFormState.data.type.get()
              ) : (
                <Skeleton className="h-2 w-5" />
              )}
            </li>
            <li className="text-sm">
              {datasetsFormState.data.cave.get() ? (
                datasetsFormState.data.cave.get()
              ) : (
                <Skeleton className="h-2 w-5" />
              )}
            </li>
            <li className="text-sm">
              {datasetsFormState.data.selectedStartDate.get() ? (
                formatDate(
                  datasetsFormState.data.selectedStartDate.get() as unknown as string
                )
              ) : (
                <Skeleton className="h-2 w-5" />
              )}
            </li>
            <li className="text-sm">
              {datasetsFormState.data.selectedEndDate.get() ? (
                formatDate(
                  datasetsFormState.data.selectedEndDate.get() as unknown as string
                )
              ) : (
                <Skeleton className="h-2 w-5" />
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          loading={loading}
          size="sm"
          variant="outline"
          onClick={() => {
            router.push("/dashboard/datasets/add/2");
            datasetsFormState.step.set(2);
          }}
          type="button"
        >
          Back
        </Button>
        <Button size="sm" loading={loading} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
