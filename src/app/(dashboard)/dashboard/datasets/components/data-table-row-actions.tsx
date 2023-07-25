"use client";

import { type Row } from "@tanstack/react-table";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { datasetsService } from "@/services";
import { useToast } from "@/components/ui";
import { IconDots } from "@tabler/icons-react";
import { type Dataset } from "@/lib/dto";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData & Dataset>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dataset = row.original;
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;
  const router = useRouter();
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: previewData } = useQuery({
    queryKey: ["previewDatasets", token, selectedId],
    queryFn: async () =>
      await datasetsService.getDatasetsViewById({
        token: token as string,
        id: selectedId as string,
      }),
    enabled: !!token && !!selectedId,
  });

  const { refetch } = useQuery({
    queryKey: ["getDatasets", token],
    queryFn: async () =>
      await datasetsService.getDatasets({
        token: token as string,
      }),
    enabled: !!token,
  });

  const handleDelete = async (id: string) => {
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
  const handleDownload = async (id: string) => {
    try {
      const response = await datasetsService.getDatasetsById({
        token: token as string,
        id: id,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      saveAs(response.data.file, response.data.name);

      toast({
        title: "Download Success",
        description: "File has been downloaded.",
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
  const handlePreview = (id: string) => {
    setSelectedId(id);
    setIsOpen(true);
  };
  const handleUpdate = (id: string) => {
    router.push(`/dashboard/datasets/update?datasetsId=${id}`);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="max-w-max">
          <DialogHeader>
            <DialogTitle>Datasets Preview</DialogTitle>
          </DialogHeader>

          <div className="mb-4 flex flex-col space-y-2">
            <div>
              {previewData?.data.results ? (
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
                      {previewData.data.results.map((row, i) => (
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
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IconDots className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-argument
            onClick={() => handleDownload(dataset.id.toString())}
          >
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-argument
            onClick={() => handlePreview(dataset.id.toString())}
          >
            Preview
          </DropdownMenuItem>

          <DropdownMenuItem
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-argument
            onClick={() => handleUpdate(dataset.id.toString())}
          >
            Update
          </DropdownMenuItem>
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
