"use client";

import { DatasetsFormUpdate1 } from "@/components/forms/datasets-form/update-1";
import { type DetailDatasetsResponse } from "@/lib/dto";
import { datasetsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function UpdateForm1({ params }: { params: { id: string } }) {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;

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
      <DatasetsFormUpdate1
        detailsData={detailDatasets?.data as DetailDatasetsResponse}
      />
    </div>
  );
}
