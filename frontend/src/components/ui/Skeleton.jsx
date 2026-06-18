// Placeholder block used while content loads. Animated pulse via Tailwind.

export function Skeleton({ className = '' }) {
  return (
    <div className={`bg-slate-200/80 rounded-lg animate-pulse ${className}`} />
  );
}

// Pre-built skeleton for a provider card on /providers.
export function ProviderCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}
