"use client";

import { DatasetsFormStep2 } from "@/components/forms/datasets-form/step-2";
import {
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { type DetailDatasetsResponse } from "@/lib/dto";
import { datasetsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Step2() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;
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
    queryKey: ["detailDatasets"],
    queryFn: async () =>
      await datasetsService.getDatasetsById({
        token: token as string,
        id: datasetsId as string,
      }),
    enabled: !!token,
  });

  return (
    <div>
      <div className="mb-4 flex flex-col space-y-2">
        <span className="text-sm font-medium">Datasets Preview</span>
        <div>
          {previewDatasets?.data.results ? (
            <ScrollArea className="relative h-[200px] w-full rounded-md border">
              <Table className="relative">
                <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>X</TableHead>
                    <TableHead>Y</TableHead>
                    <TableHead>Z</TableHead>
                    <TableHead>Tons</TableHead>
                    <TableHead>Area</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewDatasets.data.results.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.datetime}</TableCell>
                      <TableCell>{row.bound}</TableCell>
                      <TableCell>{row.k0}</TableCell>
                      <TableCell>{row.k1}</TableCell>
                      <TableCell>{row.k2}</TableCell>
                      <TableCell>{row.bound}</TableCell>
                      <TableCell>{row.bound}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
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
