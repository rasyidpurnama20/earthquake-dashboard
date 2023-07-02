"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="flex p-4">
      <span>Datasets</span>
    </div>
  );
}
