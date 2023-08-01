"use client";

import { DatasetsFormUpdate2 } from "@/components/forms/datasets-form/update-2";
import {
  type DetailDatasetsResponse,
  type ViewDatasetsResponse,
} from "@/lib/dto";
import { datasetsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function UpdateForm2({ params }: { params: { id: string } }) {
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

  if (typeof window === "undefined") return null;

  return (
    <div>
      <DatasetsFormUpdate2
        detailsData={detailDatasets?.data as DetailDatasetsResponse}
        previewData={previewDatasets?.data as ViewDatasetsResponse}
      />
    </div>
  );
}
