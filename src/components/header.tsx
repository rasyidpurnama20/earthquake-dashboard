import { NavigationConfig } from "@/configs";
import { cn } from "@/utils";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/components/ui";
import Link from "next/link";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="container mx-auto flex items-center justify-between py-4">
      <span className="">AutoML</span>

      <div className="flex items-center">
        <div className="flex gap-4">
          {NavigationConfig.map((item) => (
            <span
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                item.path === pathname ? "font-bold" : "font-normal",
                "cursor-pointer px-2 py-2"
              )}
            >
              {item.title}
            </span>
          ))}
        </div>

        <div className="flex">
          {status === "loading" ? (
            <Skeleton className="h-10 w-10 rounded-full p-2" />
          ) : session?.user ? (
            <Link href={"/dashboard"} className="flex cursor-pointer px-2 py-2">
              <Avatar>
                <AvatarImage src={session.user.image as string} />
                <AvatarFallback>
                  {session.user.name?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href={"/login"} className="cursor-pointer px-2 py-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
