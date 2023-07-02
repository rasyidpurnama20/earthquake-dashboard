"use client";

import { DashboardConfig } from "@/configs";
import { IconLayoutSidebarLeftCollapse } from "@tabler/icons-react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Skeleton,
} from "@/components/ui";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <nav className="flex w-1/6 flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <span>AutoML</span>
        <Button variant={"outline"} className="rounded-full">
          <IconLayoutSidebarLeftCollapse size={20} />
        </Button>
      </div>

      <div className="flex flex-1 flex-col">
        {DashboardConfig.map((item) => (
          <Link
            href={item.path}
            key={item.title}
            className={cn(
              item.path === pathname && "!text-black",
              "flex cursor-pointer items-center gap-3 rounded-lg p-2 text-gray-400 hover:text-black"
            )}
          >
            {item.icon}
            <span className="text-sm">{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={session?.user?.image as string} />
            <AvatarFallback>
              {session?.user?.name?.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          {status === "loading" ? (
            <Skeleton className="h-6 w-10" />
          ) : (
            <div className="flex flex-col">
              <span className="text-xs">{session?.user?.name}</span>
            </div>
          )}
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
          Keluar
        </Button>
      </div>
    </nav>
  );
}
