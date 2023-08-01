"use client";

import {
  DataTable,
  viewBlastingDatasetsPreviewColumns,
  viewCatalogDatasetsPreviewColumns,
  viewMuckingDatasetsPreviewColumns,
} from "@/components";
import { DatasetsFormStep2 } from "@/components/forms/datasets-form/step-2";
import { type DetailDatasetsResponse } from "@/lib/dto";
import { datasetsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Step2() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const searchParams = useSearchParams();
  const datasetsId = searchParams.get("datasetsId");

  const { data: previewDatasets } = useQuery({
    queryKey: ["previewDatasets"],
    queryFn: async () =>
      await datasetsService.getDatasetsViewById({
        token: token as string,
        id: datasetsId as string,
      }),
    enabled: !!token,
  });

  const { data: detailDatasets } = useQuery({
    queryKey: ["detailDatasets", datasetsId],
    queryFn: async () =>
      await datasetsService.getDatasetsById({
        token: token as string,
        id: datasetsId as string,
      }),
    enabled: !!token && !!datasetsId,
  });

  if (typeof window === "undefined") return null;

  return (
    <div>
      <div className="mb-4 flex flex-col space-y-2">
        <span className="text-sm font-medium">Datasets Preview</span>
        <div>
          {previewDatasets?.data.results ? (
            <DataTable
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              columns={
                detailDatasets?.data.type === 1
                  ? viewMuckingDatasetsPreviewColumns
                  : detailDatasets?.data.type === 2
                  ? viewBlastingDatasetsPreviewColumns
                  : viewCatalogDatasetsPreviewColumns
              }
              data={previewDatasets?.data.results}
              filter={false}
            />
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
        data={detailDatasets?.data as DetailDatasetsResponse}
        startDate={detailDatasets?.data.start_date as string}
        endDate={detailDatasets?.data.end_date as string}
      />
    </div>
  );
}
