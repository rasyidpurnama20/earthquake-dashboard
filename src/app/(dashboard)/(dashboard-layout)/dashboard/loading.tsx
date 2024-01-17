import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 pl-0">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}
