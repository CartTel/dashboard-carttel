
import { Skeleton } from "./skeleton";

interface SkeletonLoaderProps {
    number: number; // Define the prop type
  }


function SkeletonCard() {
    return (
      <div className="flex flex-col p-4 space-y-4 h-full">
        <Skeleton className="w-full h-36 bg-[#e4e4e7]" /> {/* Image Skeleton */}
        <Skeleton className="w-3/4 h-6 bg-[#e4e4e7]" /> {/* Title Skeleton */}
        <Skeleton className="w-full h-4 bg-[#e4e4e7]" /> {/* Description Skeleton */}
        <Skeleton className="w-1/2 h-4 bg-[#e4e4e7]" /> {/* Additional Info Skeleton */}
      </div>
    );
  }

export function SkeletonLoader({ number }: SkeletonLoaderProps) {
    const skeletonCards = Array.from({ length: number }); // Adjust the number of cards here
  
    return (
      <div className="grid bg-[#ffffff] grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 border-[1px] border-gray-200 shadow-md rounded-2xl h-fit">
        {skeletonCards.map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
}
  
  