import { getMaterials } from "@/hooks/useFetchItems";
import { Material } from "@/interfaces/materials";
import { createContext, useContext, useEffect, useState } from "react";

type Category = {
  key: string;
  label: string;
};

type DataContextType = {
  data: Material[];
  setData: (data: Material[]) => void;
  categories: Category[];
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Material[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const materials = await getMaterials();

    setCategories(
      materials.reduce<Category[]>((acc: Category[], material: Material) => {
        if (
          !acc.find((category: Category) => category.key === material.category)
        ) {
          acc.push({ key: material.category, label: material.category });
        }

        return acc;
      }, [])
    );
  };

  console.log({ categories });

  return (
    <DataContext.Provider value={{ data, setData, categories }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext) as DataContextType;
