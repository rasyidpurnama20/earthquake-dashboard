"use client";

import { Button } from "@/components/ui";
import { type Pipeline } from "@/lib/dto";
import { formatDate } from "@/utils";
import { IconArrowsSort } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

export const pipelinesColumns: ColumnDef<Pipeline>[] = [
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
    accessorKey: "cave",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cave
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="uppercase">
        {row.getValue("cave") === 1 ? "DMLZ" : "GBC"}
      </div>
    ),
  },
  {
    accessorKey: "area",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Area
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("area")}</div>,
  },
  {
    accessorKey: "model",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("model") === 1 ? "Bayesian LSTM" : "Bayesian LSTM"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") === 1 ? "Training" : "Finished"}
      </div>
    ),
  },
  {
    accessorKey: "last_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Date
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("last_date"))}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("created_at"))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
