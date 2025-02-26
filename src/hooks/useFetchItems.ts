import { Sort } from "@/context/DataContext";
import { Material } from "@/interfaces/materials";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchItems = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  const [_key, settingSort] = queryKey;
  const settingSortParsed = JSON.parse(settingSort) as Sort;
  const json = await getMaterials();

  json.sort((a, b) => {
    const aValue = a[settingSortParsed.key];
    const bValue = b[settingSortParsed.key];

    // Handle numeric values
    if (typeof aValue === "number" && typeof bValue === "number") {
      return settingSortParsed.sort === "asc"
        ? aValue - bValue
        : bValue - aValue;
    }

    // Handle string values
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();

    if (settingSortParsed.sort === "asc") {
      return aString.localeCompare(bString);
    } else {
      return bString.localeCompare(aString);
    }
  });

  const pageSize = 10;
  const startIndex = (pageParam - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: json.slice(startIndex, endIndex),
    nextPage: endIndex < json.length ? pageParam + 1 : undefined,
  };
};

const useFetchItems = (settingSort: Sort) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["items", JSON.stringify(settingSort)],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });

  if (error) {
    console.error(error);
  }

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
};

export default useFetchItems;

export const getMaterials = async () => {
  const response = await fetch("/materials.json");
  const json = (await response.json()) as Material[];

  return json;
};
