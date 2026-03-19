import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse bg-warm-200 rounded-lg", className)} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-warm-100 p-5 space-y-3">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="px-6 py-8 space-y-4">
      <Skeleton className="h-7 w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}
