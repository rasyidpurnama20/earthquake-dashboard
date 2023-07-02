import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
