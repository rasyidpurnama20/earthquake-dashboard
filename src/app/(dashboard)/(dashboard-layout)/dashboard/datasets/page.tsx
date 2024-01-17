"use client";

import {
  Button,
  Skeleton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { IconAlertTriangle, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { datasetsService } from "@/services/datasets-services";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { DataTable, datasetsColumns } from "@/components";

export default function Datasets() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const router = useRouter();
  const [cave, setCave] = useState<string>("all");

  const {
    data: dataMucking,
    isLoading: isLoadingMucking,
    isError: isErrorMucking,
  } = useQuery({
    enabled: !!token && !!cave,
    queryKey: ["getDatasetsM", token, cave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave === "all" ? "" : cave,
        type: "1",
      }),
  });
  const {
    data: dataBlasting,
    isLoading: isLoadingBlasting,
    isError: isErrorBlasting,
  } = useQuery({
    enabled: !!token && !!cave,
    queryKey: ["getDatasetsB", token, cave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave === "all" ? "" : cave,
        type: "2",
      }),
  });
  const {
    data: dataCatalog,
    isLoading: isLoadingCatalog,
    isError: isErrorCatalog,
  } = useQuery({
    enabled: !!token && !!cave,
    queryKey: ["getDatasetsC", token, cave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave === "all" ? "" : cave,
        type: "3",
      }),
  });

  if (typeof window === "undefined") return null;

  return (
    <div
      className="relative flex flex-col space-y-3 p-4 pl-0"
      suppressHydrationWarning
    >
      <div className="sticky top-4 z-10 flex h-16 items-center justify-between rounded-lg border bg-white/50 p-6 pr-4 backdrop-blur-2xl transition-all duration-150 ease-in-out">
        <span className="font-heading text-xl font-medium">Datasets</span>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/datasets/add/1">
            <Button
              size="sm"
              className="flex gap-2"
              onClick={() => router.push("/dashboard/datasets/add/1")}
            >
              <IconPlus size={16} /> Add Datasets
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col flex-wrap space-y-4 rounded-lg border p-6">
        <div>
          <Select onValueChange={setCave} value={cave}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Cave" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"}>All</SelectItem>
              <SelectItem value={"1"}>DMLZ</SelectItem>
              <SelectItem value={"2"}>GBC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="mb-4">
            <span className="text-sm font-medium">Mucking</span>
          </div>
          {isLoadingMucking ? (
            <Skeleton className="h-12 w-full" />
          ) : isErrorMucking ? (
            <div className="flex h-12 w-full rounded-md border p-4 text-destructive">
              <IconAlertTriangle size={20} stroke={1.5} />
              <p className="text-sm">Error</p>
            </div>
          ) : (
            <DataTable
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              columns={datasetsColumns}
              data={dataMucking ? dataMucking?.data?.results : []}
            />
          )}
        </div>

        <div>
          <div className="mb-4">
            <span className="text-sm font-medium">Blasting</span>
          </div>
          {isLoadingBlasting ? (
            <Skeleton className="h-12 w-full" />
          ) : isErrorBlasting ? (
            <div className="flex h-12 w-full rounded-md border p-4 text-destructive">
              <IconAlertTriangle size={20} stroke={1.5} />
              <p className="text-sm">Error</p>
            </div>
          ) : (
            <DataTable
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              columns={datasetsColumns}
              data={dataBlasting ? dataBlasting?.data?.results : []}
            />
          )}
        </div>

        <div>
          <div className="mb-4">
            <span className="text-sm font-medium">Catalog</span>
          </div>
          {isLoadingCatalog ? (
            <Skeleton className="h-12 w-full" />
          ) : isErrorCatalog ? (
            <div className="flex h-12 w-full rounded-md border p-4 text-destructive">
              <IconAlertTriangle size={20} stroke={1.5} />
              <p className="text-sm">Error</p>
            </div>
          ) : (
            <DataTable
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              columns={datasetsColumns}
              data={dataCatalog ? dataCatalog?.data?.results : []}
            />
          )}
        </div>
      </div>
    </div>
  );
}
