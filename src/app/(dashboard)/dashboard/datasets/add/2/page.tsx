"use client";

import CSVTable from "@/components/csv-table";
import { DatasetsFormStep2 } from "@/components/forms/datasets-form/step-2";
import { datasetsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Step2() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;
  const searchParams = useSearchParams();
  const datasetsId = searchParams.get("datasetsId");

  console.log(datasetsId);

  const { data } = useQuery({
    queryKey: ["datasets", "file"],
    queryFn: async () =>
      await datasetsService.getDatasetsById({
        token: token as string,
        id: datasetsId as string,
      }),
    enabled: !!token,
  });

  console.log(data?.data);

  return (
    <div>
      <div className="mb-4 flex flex-col space-y-2">
        <span className="text-sm font-medium">Datasets Preview</span>
        <div>
          {data?.data.file ? (
            <CSVTable url={data.data.file} />
          ) : (
            <div className="flex h-[200px] w-full items-center justify-center rounded border">
              <span className="text-sm text-destructive">
                Can&apos;t show CSV preview
              </span>
            </div>
          )}
        </div>
      </div>

      <DatasetsFormStep2
        startDate={data?.data.start_date as string}
        endDate={data?.data.end_date as string}
      />
    </div>
  );
}
