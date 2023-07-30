"use client";

import { Button } from "@/components/ui";
import {
  type ViewMuckingDatasetsResultsResponse,
  type ViewCatalogDatasetsResultsResponse,
  type ViewBlastingDatasetsResultsResponse,
} from "@/lib/dto";
import { formatDate } from "@/utils";
import { IconArrowsSort } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

export const viewBlastingDatasetsPreviewColumns: ColumnDef<ViewBlastingDatasetsResultsResponse>[] =
  [
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
      accessorKey: "x",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            x
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("x")}</div>,
    },
    {
      accessorKey: "y",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            y
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("y")}</div>,
    },
    {
      accessorKey: "z",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            z
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("z")}</div>,
    },
  ];

export const viewMuckingDatasetsPreviewColumns: ColumnDef<ViewMuckingDatasetsResultsResponse>[] =
  [
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
      accessorKey: "x",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            x
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("x")}</div>,
    },
    {
      accessorKey: "y",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            y
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("y")}</div>,
    },
    {
      accessorKey: "z",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            z
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("z")}</div>,
    },
    {
      accessorKey: "tons",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tons
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("tons")}</div>
      ),
    },
  ];

export const viewCatalogDatasetsPreviewColumns: ColumnDef<ViewCatalogDatasetsResultsResponse>[] =
  [
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
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("time")}</div>
      ),
    },
    {
      accessorKey: "apparent_stress",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Apparent Stress
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("apparent_stress")}</div>
      ),
    },
    {
      accessorKey: "apparent_volume",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Apparent Volume
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("apparent_volume")}</div>
      ),
    },
    {
      accessorKey: "depth",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Depth
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("depth")}</div>
      ),
    },
    {
      accessorKey: "easting",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Easting
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("easting")}</div>
      ),
    },
    {
      accessorKey: "energy_index",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Energy Index
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("energy_index")}</div>
      ),
    },
    {
      accessorKey: "es/ep_ratio",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            es/ep Ratio
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("es/ep_ratio")}</div>
      ),
    },
    {
      accessorKey: "moment_magnitude",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Moment Magnitude
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("moment_magnitude")}</div>
      ),
    },
    {
      accessorKey: "northing",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 px-2 text-start !text-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Northing
            <IconArrowsSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("northing")}</div>
      ),
    },
  ];
