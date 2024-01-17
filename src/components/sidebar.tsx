"use client";

import { DashboardConfig } from "@/configs";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
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
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services";

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path.split("/")[2] === (pathname.split("/")[2] as string);
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data: userDetails, isLoading: isLoadingUserDetails } = useQuery({
    enabled: !!token,
    queryKey: ["getUserDetails", token],
    queryFn: () =>
      authService.getUserDetail({
        token: token as string,
      }),
  });

  return (
    <nav className="fixed flex h-full w-full max-w-[272px] flex-1 flex-col space-y-3 p-4">
      <div className="flex h-16 items-center justify-center rounded-lg border bg-white px-4 py-3">
        <Image
          src="/images/lapi-logo.svg"
          width={200}
          height={50}
          alt="Lapi Logo"
        />
      </div>

      <div className="flex h-full w-full flex-col space-y-4 rounded-lg bg-blue-50 p-4">
        {DashboardConfig.map((item) => (
          <div key={item.title}>
            <div key={item.title} className="mb-2 flex flex-col gap-2">
              <span className="font-heading text-sm font-medium">
                {item.title}
              </span>
            </div>

            {item.subMenu.map((subItem) => (
              <Link
                href={subItem.path}
                key={subItem.title}
                className={cn(
                  isActive(subItem.path) && "!bg-primary !text-white",
                  "flex cursor-pointer items-center gap-3 rounded-md p-2 text-sm text-gray-500 transition-all duration-150 ease-in-out hover:bg-primary/10",
                )}
              >
                {subItem.icon}
                <span className="text-sm">{subItem.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col rounded-lg border p-4">
        {/* <Link
          href={"/"}
          className={
            "flex cursor-pointer items-center justify-between gap-3 rounded-md p-2 text-sm font-medium"
          }
        >
          Homepage
          <IconExternalLink size={20} />
        </Link> */}
        <div className="flex gap-2">
          {!userDetails ? (
            <Skeleton className="flex h-[38px] w-full flex-1 rounded-md bg-blue-100" />
          ) : (
            <div className="flex flex-1 items-center gap-3 rounded-md">
              <Avatar className="h-8 w-8 bg-brand-500">
                <AvatarImage
                  className="h-8 w-8 rounded-full"
                  src={session?.user?.image as string}
                />
                <AvatarFallback className="bg-brand-5 h-8 w-8 rounded-full uppercase text-white">
                  {userDetails?.data.username.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              {isLoadingUserDetails ? (
                <Skeleton className="h-6 w-10" />
              ) : (
                <div className="flex w-full flex-col">
                  <span className="w-[80px] truncate text-sm font-medium">
                    {userDetails?.data.username}
                  </span>
                </div>
              )}
            </div>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="aspect-square h-full w-[38px] border"
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
                <AlertDialogAction
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </nav>
  );
}
