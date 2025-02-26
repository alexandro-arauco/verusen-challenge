import { Material } from "@/interfaces/materials";
import { createContext, useContext, useState } from "react";

type DataContextType = {
  data: Material[];
  setData: (data: Material[]) => void;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Material[]>([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext) as DataContextType;
