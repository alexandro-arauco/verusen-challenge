import { Material } from "@/interfaces/materials";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchItems = async ({ pageParam = 1 }) => {
  const json = await getMaterials();

  const pageSize = 10;
  const startIndex = (pageParam - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: json.slice(startIndex, endIndex),
    nextPage: endIndex < json.length ? pageParam + 1 : undefined,
  };
};

const useFetchItems = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["items"],
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
