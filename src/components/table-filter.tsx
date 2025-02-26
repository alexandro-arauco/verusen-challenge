import { useDataContext } from "@/context/DataContext";
import { Filters } from "@/interfaces/filters";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";

export default function TableFilters({
  filters,
  handleFilter,
}: {
  filters: Filters;
  handleFilter: (key: keyof Filters, value: string) => void;
}) {
  const { setSettingSort, manufacturers } = useDataContext();
  return (
    <div className="grid grid-cols-3 gap-4">
      <Input
        label="Search"
        labelPlacement="outside"
        placeholder="Search by Material Name"
        variant="bordered"
        value={filters.name}
        onChange={(e) => handleFilter("name", e.target.value)}
        onClear={() => handleFilter("name", "")}
        isClearable
      />

      <Select
        label="Sort by Price"
        labelPlacement="outside"
        placeholder="Select category"
        variant="bordered"
        selectedKeys={[filters.sort]}
        onChange={(e) => {
          handleFilter("sort", e.target.value);
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
        selectedKeys={[filters.manufacturer]}
        onChange={(e) => {
          handleFilter("manufacturer", e.target.value);
        }}
      >
        <>
          <SelectItem key={"-1"}>{"All"}</SelectItem>
          {manufacturers.map((item) => (
            <SelectItem key={item.key}>{item.label.toUpperCase()}</SelectItem>
          ))}
        </>
      </Select>
    </div>
  );
}
