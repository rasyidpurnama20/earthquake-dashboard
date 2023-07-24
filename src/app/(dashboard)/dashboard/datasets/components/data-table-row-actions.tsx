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
import { datasetsService } from "@/services";
import { useToast } from "@/components/ui";
import { IconDots } from "@tabler/icons-react";
import { type Dataset } from "@/lib/dto";

interface DataTableRowActionsProps<TData> {
  row: Row<TData & Dataset>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dataset = row.original;
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;
  const { refetch } = useQuery({
    queryKey: ["getDatasets", token],
    queryFn: async () =>
      await datasetsService.getDatasets({
        token: token as string,
      }),
    enabled: !!token,
  });
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await datasetsService
        .removeDatasetsById({
          token: token as string,
          id: id,
        })
        .then(() => {
          void refetch();
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <IconDots className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>

        <DropdownMenuItem>Download</DropdownMenuItem>
        <DropdownMenuItem>Preview</DropdownMenuItem>
        <DropdownMenuItem>Update</DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-argument
          onClick={() => handleDelete(dataset.id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
