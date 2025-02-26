import { Material } from "@/interfaces/materials";
import { useMemo } from "react";

interface UseFilteredDataProps {
  data: Material[];
  filter: string;
  sortPrice: "asc" | "desc";
}

export function useFilteredData({
  data,
  filter,
  sortPrice,
}: UseFilteredDataProps) {
  const filteredData = useMemo(() => {
    let result = [...data];

    if (filter) {
      result = result.filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const priceA = Number(a.requested_unit_price);
      const priceB = Number(b.requested_unit_price);
      return sortPrice === "asc" ? priceA - priceB : priceB - priceA;
    });

    return result;
  }, [filter, data, sortPrice]);

  return filteredData;
}
