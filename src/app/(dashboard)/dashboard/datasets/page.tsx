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
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IconHistory, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { datasetsService } from "@/services/datasets-services";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Datasets() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    enabled: !!session?.user,
    queryKey: ["getDatasets", session?.user?.accessToken as string, open],
    queryFn: () =>
      datasetsService.getDatasets({
        token: session?.user?.accessToken as string,
      }),
  });

  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b p-6">
        <span>Datasets</span>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/datasets/add/1">
            <Button
              size="sm"
              className="flex gap-2 text-xs"
              onClick={() => router.push("/dashboard/datasets/add/1")}
            >
              <IconPlus size={16} /> Add Datasets
            </Button>
          </Link>

          <Button size="icon" variant="outline" className="flex gap-2 text-xs">
            <IconHistory size={16} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-wrap space-y-4 p-6">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Area" defaultValue="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Area</SelectItem>
              <SelectItem value="gbc">GBC</SelectItem>
              <SelectItem value="dmlz">DMLZ</SelectItem>
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
