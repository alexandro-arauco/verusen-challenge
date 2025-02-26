import { getMaterials } from "@/hooks/useFetchItemsPaginated";
import { Material } from "@/interfaces/materials";
import { createContext, useContext, useEffect, useState } from "react";

type DataDropdown = {
  key: string;
  label: string;
};

export type Sort = {
  key: keyof Material;
  sort: "asc" | "desc";
};

type DataContextType = {
  data: Material[];
  setData: (data: Material[]) => void;
  categories: DataDropdown[];
  manufacturers: DataDropdown[];
  settingSort: Sort;
  setSettingSort: (setting: Sort) => void;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Material[]>([]);
  const [categories, setCategories] = useState<DataDropdown[]>([]);
  const [manufacturers, setManufacturers] = useState<DataDropdown[]>([]);
  const [settingSort, setSettingSort] = useState<Sort>({
    key: "requested_unit_price",
    sort: "asc",
  });

  useEffect(() => {
    getMaterialsFromJson();
  }, []);

  useEffect(() => {
    getCategories();
    getManufacturers();
  }, [data]);

  const getMaterialsFromJson = async () => {
    const response = await getMaterials();

    setData(response);
  };

  const getCategories = async () => {
    setCategories(
      data.reduce<DataDropdown[]>((acc: DataDropdown[], material: Material) => {
        if (
          !acc.find(
            (category: DataDropdown) => category.key === material.category
          )
        ) {
          acc.push({ key: material.category, label: material.category });
        }

        return acc;
      }, [])
    );
  };

  const getManufacturers = async () => {
    setManufacturers(
      data
        .reduce<DataDropdown[]>((acc: DataDropdown[], material: Material) => {
          if (
            !acc.find(
              (manufacturer: DataDropdown) =>
                manufacturer.key === material.manufacturer_name
            )
          ) {
            acc.push({
              key: material.manufacturer_name,
              label: material.manufacturer_name,
            });
          }

          return acc;
        }, [])
        .sort((a, b) => Number(a.key) - Number(b.key))
    );
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        categories,
        settingSort,
        setSettingSort,
        manufacturers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext) as DataContextType;
