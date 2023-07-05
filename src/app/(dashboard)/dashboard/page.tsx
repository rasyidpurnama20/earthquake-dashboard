"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { status } = useSession({
    required: true,
  });

  return (
    <div className="flex flex-col p-4">
      <span>Dashboard</span>
    </div>
  );
}
