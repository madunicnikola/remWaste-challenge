import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonSkipCard() {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto lg:h-[340px] flex flex-col bg-white/10 border border-zinc-700 rounded-2xl shadow-xl overflow-hidden">
      <div className="relative w-full h-40">
        <Skeleton className="w-full h-full rounded-t-2xl bg-zinc-800" />
      </div>
      
      <div className="flex-1 p-4 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24 bg-zinc-800" />
          <Skeleton className="h-8 w-16 bg-zinc-800" />
        </div>
        
        <Skeleton className="h-4 w-20 bg-zinc-800" />
        
        <div className="flex flex-wrap gap-2 mt-auto">
          <Skeleton className="h-6 w-16 bg-zinc-800 rounded-md" />
          <Skeleton className="h-6 w-20 bg-zinc-800 rounded-md" />
          <Skeleton className="h-6 w-24 bg-zinc-800 rounded-md" />
        </div>
      </div>
    </div>
  )
}