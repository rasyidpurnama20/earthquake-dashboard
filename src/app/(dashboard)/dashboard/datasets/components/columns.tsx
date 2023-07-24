"use client";

import { Button } from "@/components/ui";
import { type Dataset } from "@/lib/dto";
import { formatDate } from "@/utils";
import { IconArrowsSort } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

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
    cell: ({ row }) => {
      switch (row.getValue("type")) {
        case 1:
          return "M";
        case 2:
          return "B";
        case 3:
          return "C";
        default:
          return "N/A";
      }
    },
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
