"use client";

import { DataTable } from "@/components";
import { pipelinesColumns } from "@/components/tables/pipelines";
import { Button, Skeleton } from "@/components/ui";
import { pipelinesService } from "@/services";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Pipeline() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;

  const {
    data: dataPipelines,
    isLoading: isLoadingPipelines,
    isError: isErrorPipelines,
  } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelines", token],
    queryFn: () =>
      pipelinesService.getPipelines({
        token: token as string,
      }),
  });

  return (
    <div
      className="relative flex flex-col space-y-3 p-4 pl-0"
      suppressHydrationWarning
    >
      <div className="sticky top-4 z-10 flex h-16 items-center justify-between rounded-lg border bg-white/50 p-6 pr-4 backdrop-blur-2xl transition-all duration-150 ease-in-out">
        <span className="font-heading text-xl font-medium">
          Magnitude Prediction
        </span>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/magnitude-prediction/create">
            <Button size="sm" className="flex gap-2">
              <IconPlus size={16} /> Create Prediction
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col flex-wrap space-y-4 rounded-lg border p-6">
        {isLoadingPipelines ? (
          <Skeleton className="h-12 w-full" />
        ) : isErrorPipelines ? (
          <div className="h-12 w-full rounded-md border">
            <p className="text-sm text-red-500">Error</p>
          </div>
        ) : (
          <DataTable
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            columns={pipelinesColumns}
            data={dataPipelines ? dataPipelines?.data?.results : []}
          />
        )}
      </div>
    </div>
  );
}
