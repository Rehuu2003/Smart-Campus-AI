import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-md ${className}`}
      {...props}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-xs space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-24 rounded" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-7 w-28 rounded" />
        <Skeleton className="h-3 w-36 rounded" />
      </div>
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-3 w-14 rounded" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 4, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="bg-slate-50 p-3 border-b border-slate-200 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-slate-100 p-3 space-y-3">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 items-center">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 'h-60' }: { height?: string }) {
  return (
    <div className={`w-full ${height} bg-slate-50/50 rounded-xl border border-slate-200/80 p-4 flex flex-col justify-between`}>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex items-end gap-3 h-32 px-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t"
            style={{ height: `${(i % 4 + 2) * 22}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
