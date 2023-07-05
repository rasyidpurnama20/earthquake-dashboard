"use client";

import { useSession } from "next-auth/react";
import { columns, type Dataset } from "./columns";
import { DataTable } from "./data-table";

// eslint-disable-next-line @typescript-eslint/require-await
async function getData(): Promise<Dataset[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function Datasets() {
  const { status } = useSession({
    required: true,
  });
  const data = await getData();

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="flex flex-col p-4">
      <span>Datasets</span>

      <div className="flex flex-col flex-wrap gap-2">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

Datasets.title = "Datasets";
