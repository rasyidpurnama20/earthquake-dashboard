"use client";

import { Button } from "@/components/ui";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="flex flex-col p-4">
      <span>Dashboard</span>
    </div>
  );
}
