"use client";

import { DashboardConfig } from "@/configs";
import {
  IconExternalLink,
  IconLayoutSidebarLeftCollapse,
  IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Separator,
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
    <nav className="flex h-screen w-56 flex-col border-r bg-blue-50">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <span>AutoML</span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {DashboardConfig.map((item) => (
          <Link
            href={item.path}
            key={item.title}
            className={cn(
              item.path === pathname && "bg-blue-100 text-blue-500",
              "flex cursor-pointer items-center gap-3 rounded-md p-2"
            )}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col p-4">
        <Link
          href={"/"}
          className={
            "flex cursor-pointer items-center justify-between gap-3 rounded-md p-2 text-sm font-medium"
          }
        >
          Homepage
          <IconExternalLink size={20} />
        </Link>
        <Separator className="my-2 w-full" />
        <div className="flex">
          <div className="flex flex-1 items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage
                className="h-8 w-8 rounded-full"
                src={session?.user?.image as string}
              />
              <AvatarFallback className="h-8 w-8 rounded-full">
                {session?.user?.name?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            {status === "loading" ? (
              <Skeleton className="h-6 w-10" />
            ) : (
              <div className="flex w-full flex-col">
                <span className="w-[100px] truncate text-sm font-medium">
                  {session?.user?.name}
                </span>
              </div>
            )}
          </div>

          <Button
            size="icon"
            variant="outline"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          >
            <IconLogout size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
