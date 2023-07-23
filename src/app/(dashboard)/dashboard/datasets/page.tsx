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
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { datasetsService } from "@/services/datasets-services";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Datasets() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    enabled: !!session?.user,
    queryKey: ["getDatasets", token, open],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
      }),
  });

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b p-6">
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
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Cave" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cave</SelectItem>
              <SelectItem value="1">DMLZ</SelectItem>
              <SelectItem value="2">GBC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          {isLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : isError ? (
            <div>
              <p className="text-red-500">Error</p>
            </div>
          ) : (
            <DataTable columns={columns} data={data?.data?.results} />
          )}
        </div>
      </div>
    </div>
  );
}
