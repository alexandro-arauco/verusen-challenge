import { useDataContext } from "@/context/DataContext";
import { Material } from "@/interfaces/materials";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type EditDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Material;
};

export default function EditDetail({ isOpen, onClose, data }: EditDetailProps) {
  const { categories, data: materials, setData } = useDataContext();

  const { register, handleSubmit, watch } = useForm<Material>({
    defaultValues: {
      name: data.name,
      category: data.category,
      requested_unit_price: data.requested_unit_price,
      manufacturer_name: data.manufacturer_name,
      long_description: data.long_description,
    },
  });

  const categorySelected = watch("category");

  const onSubmit: SubmitHandler<Material> = (formData) => {
    const id = data.id;

    const updatedMaterial = {
      ...formData,
      id,
    };

    const updatedMaterials = materials.map((material) =>
      material.id === id ? updatedMaterial : material
    );

    setData(updatedMaterials);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
      backdrop="blur"
      isDismissable={false}
      isKeyboardDismissDisabled
      closeButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Item</ModalHeader>
            <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              <ModalBody>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter item name"
                    variant="bordered"
                    {...register("name")}
                  />
                  <Select
                    label="Category"
                    labelPlacement="outside"
                    placeholder="Select category"
                    variant="bordered"
                    selectedKeys={[categorySelected]}
                    {...register("category")}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.key}>
                        {category.label.toUpperCase()}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Price"
                    labelPlacement="outside"
                    placeholder="Enter price"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    type="number"
                    variant="bordered"
                    {...register("requested_unit_price")}
                  />
                  <Input
                    label="Manufacturer"
                    labelPlacement="outside"
                    placeholder="Enter manufacturer"
                    variant="bordered"
                    {...register("manufacturer_name")}
                  />
                </div>

                <Textarea
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter item description"
                  variant="bordered"
                  minRows={3}
                  className="w-full"
                  {...register("long_description")}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Save Changes
                </Button>
              </ModalFooter>
            </Form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
