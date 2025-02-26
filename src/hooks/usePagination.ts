import { Material } from "@/interfaces/materials";
import { useEffect, useState } from "react";

interface UsePaginationProps {
  data: Material[];
  pageSize?: number;
  sortDependency?: any;
}

export function usePagination({
  data,
  pageSize = 10,
  sortDependency,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Reset and load initial data when data source or sort changes
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedData(data.slice(0, pageSize));
  }, [data, pageSize, sortDependency]);

  const fetchNextPage = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const startIndex = displayedData.length; // Use displayedData.length instead of currentPage
      const endIndex = startIndex + pageSize;

      // Check if we have more data to load
      if (startIndex >= data.length) {
        return;
      }

      const newElements = data.slice(startIndex, endIndex);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setDisplayedData((prev) => [...prev, ...newElements]);
      setCurrentPage((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const hasMore = displayedData.length < data.length;

  return {
    currentPage,
    displayedData,
    isLoading,
    fetchNextPage,
    hasMore,
  };
}
