"use client";

import { type Row } from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { pipelinesService } from "@/services";
import { useToast } from "@/components/ui";
import { IconDots } from "@tabler/icons-react";
import { type Pipeline } from "@/lib/dto";
import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData & Pipeline>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dataset = row.original;

  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const { toast } = useToast();

  const { refetch } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelines", token],
    queryFn: () =>
      pipelinesService.getPipelines({
        token: token as string,
      }),
  });

  const handleDelete = async (id: string) => {
    try {
      await pipelinesService
        .removePipelinesById({
          token: token as string,
          id: id,
        })
        .then(async () => {
          await refetch();
        });

      toast({
        title: "Delete Success",
        description: "File has been deleted.",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IconDots className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>

          <Link
            href={`/dashboard/magnitude-prediction/${dataset.id.toString()}/target`}
            className="w-full"
          >
            <DropdownMenuItem>Preview</DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            className="text-red-500"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-argument
            onClick={() => handleDelete(dataset.id.toString())}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
