"use client";

import { Button } from "@/components/ui";
import { type PipelineTarget, type Pipeline, type Dataset } from "@/lib/dto";
import { formatDate } from "@/utils";
import { IconArrowsSort } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DataTableRowActions,
  DataTableTargetRowActions,
} from "./data-table-row-actions";

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
    accessorKey: "c",
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
      <div className="capitalize">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion */}
        {formatDate((row.getValue("c") as Dataset).end_date)}
      </div>
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

export const pipelinesTargetColumns: ColumnDef<PipelineTarget>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("date"))}</div>
    ),
  },
  {
    accessorKey: "pipeline_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-2 text-start !text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pipeline Name
          <IconArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */}
        {(row.getValue("pipeline_id") as Pipeline)?.name}
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
    cell: ({ row }) => <DataTableTargetRowActions row={row} />,
  },
];
