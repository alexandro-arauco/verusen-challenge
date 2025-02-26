import { Chip, Input } from "@heroui/react";

import ColumnHeader from "@/components/column-header";
import { title } from "@/components/primitives";
import { useDataContext } from "@/context/DataContext";
import useFetchItems from "@/hooks/useFetchItems";
import DefaultLayout from "@/layouts/default";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TableVirtuoso, VirtuosoHandle } from "react-virtuoso";

export default function IndexPage() {
  const navigate = useNavigate();
  const { data, setData } = useDataContext();
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const {
    data: queryData,
    fetchNextPage,
    isLoading,
  } = useFetchItems();

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
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Search"
            labelPlacement="outside"
            placeholder="Search by Material Name"
            variant="bordered"
          />
          <Input
            label="Name"
            labelPlacement="outside"
            placeholder="Enter item name"
            variant="bordered"
          />
          <Input
            label="Name"
            labelPlacement="outside"
            placeholder="Enter item name"
            variant="bordered"
          />
        </div>
        <div className="gap-3 overflow-auto max-h-[650px] rounded-lg mt-4">
          <TableVirtuoso
            ref={virtuosoRef}
            className="!h-[100vh] w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            data={data}
            endReached={() => fetchNextPage()}
            components={{
              Table: (props) => (
                <table {...props} className="w-full border-collapse" />
              ),
              TableRow: ({ item, ...props }) => (
                <tr
                  {...props}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => item && navigate(`/detail/${item.id}`)}
                />
              ),
            }}
            itemContent={(index, item) => (
              <>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
                  <Chip
                    size="sm"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  >
                    {item.category}
                  </Chip>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  {item.manufacturer_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  $ {Number(item.requested_unit_price).toLocaleString()}
                </td>
              </>
            )}
            fixedFooterContent={
              isLoading
                ? () => (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50"
                      >
                        Loading...
                      </td>
                    </tr>
                  )
                : undefined
            }
            fixedHeaderContent={() => (
              <tr>
                <ColumnHeader label="#" />
                <ColumnHeader label="Material Name" />
                <ColumnHeader label="Category" />
                <ColumnHeader label="Manufacturer" />
                <ColumnHeader label="Price" />
              </tr>
            )}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
