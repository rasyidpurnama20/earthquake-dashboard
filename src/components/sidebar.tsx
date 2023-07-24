"use client";

import { DashboardConfig } from "@/configs";
import { IconExternalLink, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Separator,
  Skeleton,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path.includes(pathname.split("/")[2] as string);
  const { data: session, status } = useSession();

  return (
    <nav className="flex h-screen w-56 flex-col border-r bg-blue-50">
      <div className="flex h-16 items-center justify-center border-b px-4">
        <Image
          src="/images/freeport-logo.svg"
          width={200}
          height={50}
          alt="Freeport Logo"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-4">
        {DashboardConfig.map((item) => (
          <div key={item.title}>
            <div key={item.title} className="mb-2 flex flex-col gap-2">
              <span className="text-xs font-medium">{item.title}</span>
            </div>

            {item.subMenu.map((subItem) => (
              <Link
                href={subItem.path}
                key={subItem.title}
                className={cn(
                  isActive(subItem.path) && "bg-brand-700 text-white",
                  "flex cursor-pointer items-center gap-3 rounded-md p-2"
                )}
              >
                {subItem.icon}
                <span className="text-sm">{subItem.title}</span>
              </Link>
            ))}
          </div>
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

          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                size="icon"
                variant="outline"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              >
                <IconLogout size={20} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure want to logout?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </nav>
  );
}
