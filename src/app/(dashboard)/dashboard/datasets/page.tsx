"use client";

import {
  Button,
  Skeleton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { datasetsService } from "@/services/datasets-services";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Datasets() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const router = useRouter();
  const [cave, setCave] = useState<string>("1");

  const {
    data: dataMucking,
    isLoading: isLoadingMucking,
    isError: isErrorMucking,
  } = useQuery({
    enabled: !!token,
    queryKey: ["getDatasetsM", token, cave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave,
        type: "1",
      }),
  });
  const {
    data: dataBlasting,
    isLoading: isLoadingBlasting,
    isError: isErrorBlasting,
  } = useQuery({
    enabled: !!token,
    queryKey: ["getDatasetsB", token, cave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave,
        type: "2",
      }),
  });
  const {
    data: dataCatalog,
    isLoading: isLoadingCatalog,
    isError: isErrorCatalog,
  } = useQuery({
    enabled: !!token,
    queryKey: ["getDatasetsC", token, cave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave,
        type: "3",
      }),
  });

  return (
    <div className="relative flex flex-col">
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white p-6">
        <span>Datasets</span>

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

      <div className="flex flex-col flex-wrap space-y-4 p-6">
        <div>
          <Select onValueChange={setCave} value={cave}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Cave" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"1"}>DMLZ</SelectItem>
              <SelectItem value={"2"}>GBC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <div className="mb-4">
            <span className="text-sm font-medium">Mucking</span>
          </div>
          {isLoadingMucking ? (
            <Skeleton className="h-12 w-full" />
          ) : isErrorMucking ? (
            <div>
              <p className="text-red-500">Error</p>
            </div>
          ) : (
            <DataTable columns={columns} data={dataMucking?.data?.results} />
          )}
        </div>

        <Separator />

        <div>
          <div className="mb-4">
            <span className="text-sm font-medium">Blasting</span>
          </div>
          {isLoadingBlasting ? (
            <Skeleton className="h-12 w-full" />
          ) : isErrorBlasting ? (
            <div>
              <p className="text-red-500">Error</p>
            </div>
          ) : (
            <DataTable columns={columns} data={dataBlasting?.data?.results} />
          )}
        </div>

        <Separator />

        <div>
          <div className="mb-4">
            <span className="text-sm font-medium">Catalog</span>
          </div>
          {isLoadingCatalog ? (
            <Skeleton className="h-12 w-full" />
          ) : isErrorCatalog ? (
            <div>
              <p className="text-red-500">Error</p>
            </div>
          ) : (
            <DataTable columns={columns} data={dataCatalog?.data?.results} />
          )}
        </div>
      </div>
    </div>
  );
}
