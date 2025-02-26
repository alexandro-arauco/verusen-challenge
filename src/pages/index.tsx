import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import { title } from "@/components/primitives";
import { useDataContext } from "@/context/DataContext";
import useFetchItems from "@/hooks/useFetchItems";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import DefaultLayout from "@/layouts/default";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();
  const { data, setData } = useDataContext();

  const {
    data: queryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useFetchItems();

  const observerRef = useInfiniteScroll(hasNextPage, fetchNextPage);

  useEffect(() => {
    if (queryData) {
      const allItems = queryData.pages.flatMap((page) => page.items);
      const newData = [...data, ...allItems];

      setData(newData);
    }
  }, [queryData, setData]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1
            className={`${title()} bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}
          >
            Materials Inventory
          </h1>
          <p className="text-gray-500 mt-2">Manage and track your materials</p>
        </div>
      </section>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="gap-3 overflow-auto max-h-[650px] rounded-lg">
          {/* <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[240px] max-w-sm">
              <Input 
                label="Search materials" 
                placeholder="Search by name..." 
                className="w-full"
                startContent={
                  <svg className="w-4 h-4 text-gray-400" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>
            
            <select 
              className="flex-none h-[40px] min-w-[200px] rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Filter by Manufacturer</option>
              <option value="all">All Manufacturers</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="sony">Sony</option>
              <option value="lg">LG</option>
            </select>
          </div> */}
          <Table
            aria-label="Materials table"
            className="min-w-full"
            classNames={{
              th: "bg-gray-50 dark:bg-gray-900/50 text-sm font-semibold text-gray-600 dark:text-gray-300 py-4",
              td: "py-4",
            }}
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Material Name</TableColumn>
              <TableColumn>Category</TableColumn>
              <TableColumn>Manufacturer</TableColumn>
              <TableColumn>Price</TableColumn>
            </TableHeader>

            <TableBody
              isLoading={isLoading}
              loadingContent={
                <div className="w-full h-96 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              }
            >
              {data.map((item, index) => (
                <TableRow
                  key={item.id}
                  onClick={() => navigate(`/detail/${item.id}`)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    >
                      {item.category}
                    </Chip>
                  </TableCell>
                  <TableCell>{item.manufacturer_name}</TableCell>
                  <TableCell className="font-medium">
                    ${Number(item.requested_unit_price).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div ref={observerRef} className="p-4 text-center">
            {isFetchingNextPage && (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span className="text-gray-500">Loading more items...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
