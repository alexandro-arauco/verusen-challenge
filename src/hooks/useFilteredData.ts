import { useMemo } from "react";
import { Filters } from "@/interfaces/filters";
import { Material } from "@/interfaces/materials";
import { Sort } from "@/context/DataContext";

export function useFilteredData(
  data: Material[],
  filters: Filters,
  settingSort: Sort
) {
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply filter
    if (filters.name) {
      result = result.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.manufacturer !== "-1") {
      result = result.filter(
        (item) =>
          item.manufacturer_name &&
          item.manufacturer_name.toLowerCase() ===
            filters.manufacturer.toLowerCase()
      );
    }

    result.sort((a, b) => {
      const valueA = Number(a[settingSort.key]);
      const valueB = Number(b[settingSort.key]);
      return filters.sort === "asc" ? valueA - valueB : valueB - valueA;
    });

    return result;
  }, [data, filters, settingSort]);

  return filteredData;
}
