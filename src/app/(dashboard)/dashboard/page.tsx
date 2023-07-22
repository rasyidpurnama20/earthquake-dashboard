"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { status } = useSession({
    required: true,
  });

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <span>Dashboard</span>
      </div>

      <div className="flex flex-col flex-wrap gap-2">
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
}
