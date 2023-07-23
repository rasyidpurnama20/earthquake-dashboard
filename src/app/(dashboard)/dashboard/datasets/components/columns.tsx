"use client";

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui";
import { type Dataset } from "@/lib/dto";
import { formatDate } from "@/utils";
import { IconArrowsSort, IconDots } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Dataset>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timestamp Start
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("start_date"))}</div>
    ),
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timestamp End
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("end_date"))}</div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("updated_at"))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dataset = row.original;

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
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Hapus Datasets
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
