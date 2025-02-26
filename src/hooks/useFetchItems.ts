import { Material } from "@/interfaces/materials";

export const getMaterials = async () => {
  const response = await fetch("/materials.json");
  const json = (await response.json()) as Material[];

  return json;
};
