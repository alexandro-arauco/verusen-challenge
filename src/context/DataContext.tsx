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
  settingSort: Sort;
  setSettingSort: (setting: Sort) => void;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Material[]>([]);
  const [categories, setCategories] = useState<DataDropdown[]>([]);
  const [settingSort, setSettingSort] = useState<Sort>({
    key: "requested_unit_price",
    sort: "asc",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const materials = await getMaterials();

    setCategories(
      materials.reduce<DataDropdown[]>(
        (acc: DataDropdown[], material: Material) => {
          if (
            !acc.find(
              (category: DataDropdown) => category.key === material.category
            )
          ) {
            acc.push({ key: material.category, label: material.category });
          }

          return acc;
        },
        []
      )
    );
  };

  return (
    <DataContext.Provider
      value={{ data, setData, categories, settingSort, setSettingSort }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext) as DataContextType;
