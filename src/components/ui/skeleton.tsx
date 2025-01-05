// import { cn } from "@/libs/utils"

// function Skeleton({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn("animate-pulse rounded-md bg-muted", className)}
//       {...props}
//     />
//   )
// }

// export { Skeleton }

import { cn } from "@/libs/utils";

function Skeleton({
  className,
  width = "w-full",
  height = "h-24", // Default height
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { width?: string; height?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", width, height, className)}
      {...props}
    />
  );
}

export { Skeleton };
