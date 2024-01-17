"use client";

import { DataTable } from "@/components";
import { pipelinesTargetColumns } from "@/components/tables/pipelines";
import { Button, Skeleton } from "@/components/ui";
import { pipelinesService } from "@/services";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function PipelineTarget({ params }: { params: { id: string } }) {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;

  const {
    data: dataPipelineTargets,
    isLoading: isLoadingPipelineTargets,
    isError: isErrorPipelineTargets,
  } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelineTargets", token],
    queryFn: () =>
      pipelinesService.getTargetPipelines({
        token: token as string,
        id: params.id,
      }),
  });

  const { data: detailPipeline } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelineById", token],
    queryFn: () =>
      pipelinesService.getPipelinesById({
        token: token as string,
        id: params.id,
      }),
  });

  if (typeof window === "undefined") return null;
  return (
    <div className="relative flex flex-col space-y-3 p-4 pl-0">
      <div className="sticky top-4 z-10 flex h-16 items-center justify-between rounded-lg border bg-white/50 p-6 pr-4 backdrop-blur-2xl transition-all duration-150 ease-in-out">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/magnitude-prediction">
            <Button size="sm" className="flex gap-2" variant="outline">
              <IconArrowLeft size={16} /> Back to Prediction List
            </Button>
          </Link>
          <span className="font-heading font-medium">
            Target Prediction - {detailPipeline?.data.name}{" "}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/magnitude-prediction/${params.id}/target/create`}
          >
            <Button size="sm" className="flex gap-2">
              <IconPlus size={16} /> Create Target
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col flex-wrap space-y-4 rounded-lg border p-6">
        {isLoadingPipelineTargets ? (
          <Skeleton className="h-12 w-full" />
        ) : isErrorPipelineTargets ? (
          <div className="h-12 w-full rounded-md border">
            <p className="text-sm text-red-500">Error</p>
          </div>
        ) : (
          <DataTable
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            columns={pipelinesTargetColumns}
            data={dataPipelineTargets ? dataPipelineTargets?.data?.results : []}
          />
        )}
      </div>
    </div>
  );
}
