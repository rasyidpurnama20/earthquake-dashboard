import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="p-6">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
