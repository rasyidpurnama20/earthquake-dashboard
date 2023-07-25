"use client";

import { DatasetsFormUpdate } from "@/components/forms/datasets-form/update";
import {
  type DetailDatasetsResponse,
  type ViewDatasetsResponse,
} from "@/lib/dto";
import { datasetsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Update({ params }: { params: { id: string } }) {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;

  const { data: previewDatasets } = useQuery({
    queryKey: ["previewDatasets", params.id],
    queryFn: async () =>
      await datasetsService.getDatasetsViewById({
        token: token as string,
        id: params.id,
      }),
    enabled: !!token,
  });

  const { data: detailDatasets } = useQuery({
    queryKey: ["detailDatasets", params.id],
    queryFn: async () =>
      await datasetsService.getDatasetsById({
        token: token as string,
        id: params.id,
      }),
    enabled: !!token,
  });

  return (
    <div>
      <DatasetsFormUpdate
        detailsData={detailDatasets?.data as DetailDatasetsResponse}
        previewData={previewDatasets?.data as ViewDatasetsResponse}
      />
    </div>
  );
}
