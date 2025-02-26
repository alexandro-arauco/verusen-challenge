import { Chip, Input, Select, SelectItem } from "@heroui/react";

import ColumnHeader from "@/components/column-header";
import { title } from "@/components/primitives";
import { useDataContext } from "@/context/DataContext";

import DefaultLayout from "@/layouts/default";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableVirtuoso, VirtuosoHandle } from "react-virtuoso";

export default function IndexPage() {
  const navigate = useNavigate();
  const { data, setSettingSort, settingSort, manufacturers } = useDataContext();
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const [filter, setFilter] = useState<string>("");
  const [manufacturer, setManufacturer] = useState("-1");
  const [sortPrice, setSortPrice] = useState<"asc" | "desc">(settingSort.sort);

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply filter
    if (filter) {
      result = result.filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (manufacturer !== "-1") {
      console.log({ manufacturer });
      result = result.filter(
        (item) =>
          item.manufacturer_name &&
          item.manufacturer_name.toLowerCase() === manufacturer.toLowerCase()
      );
    }

    result.sort((a, b) => {
      const valueA = Number(a[settingSort.key]);
      const valueB = Number(b[settingSort.key]);
      return sortPrice === "asc" ? valueA - valueB : valueB - valueA;
    });

    return result;
  }, [filter, data, sortPrice, manufacturer]);

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
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onClear={() => setFilter("")}
            isClearable
          />

          <Select
            label="Sort by Price"
            labelPlacement="outside"
            placeholder="Select category"
            variant="bordered"
            selectedKeys={[sortPrice]}
            onChange={(e) => {
              setSortPrice(e.target.value as "asc" | "desc");
              setSettingSort({
                key: "requested_unit_price",
                sort: e.target.value as "asc" | "desc",
              });
            }}
          >
            {["asc", "desc"].map((item) => (
              <SelectItem key={item}>{item.toUpperCase()}</SelectItem>
            ))}
          </Select>

          <Select
            label="Filter by Manufacturer"
            labelPlacement="outside"
            placeholder="Select manufacturer"
            variant="bordered"
            selectedKeys={[manufacturer]}
            onChange={(e) => {
              console.log(e.target.value);
              setManufacturer(e.target.value);
            }}
          >
            <>
              <SelectItem key={"-1"}>{"All"}</SelectItem>
              {manufacturers.map((item) => (
                <SelectItem key={item.key}>
                  {item.label.toUpperCase()}
                </SelectItem>
              ))}
            </>
          </Select>
        </div>
        <div className="gap-3 mt-4">
          <TableVirtuoso
            ref={virtuosoRef}
            className="!h-[500px] w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            data={filteredData}
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
