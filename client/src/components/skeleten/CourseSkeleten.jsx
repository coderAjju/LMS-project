import { Skeleton } from "@/components/ui/skeleton"

export function CourseSkeleten() {
  return (
    <div className="flex flex-col space-y-5 mb-4">
      <Skeleton className="h-[180px] w-[330px] sm:w-[310px] md:h-[160px] md:w-[290px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[290px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  )
}