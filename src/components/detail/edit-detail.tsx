import { Material } from "@/interfaces/materials";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

type EditDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Material;
};

export default function EditDetail({ isOpen, onClose, data }: EditDetailProps) {
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
            <ModalBody>
              {/* <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter item name"
                    variant="bordered"
                    value={data.name}
                  />
                  <Select
                    label="Category"
                    labelPlacement="outside"
                    placeholder="Select category"
                    variant="bordered"
                  >
                    <SelectItem key="electronics" value="electronics">
                      Electronics
                    </SelectItem>
                    <SelectItem key="clothing" value="clothing">
                      Clothing
                    </SelectItem>
                    <SelectItem key="books" value="books">
                      Books
                    </SelectItem>
                    <SelectItem key="home" value="home">
                      Home & Garden
                    </SelectItem>
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
                    value={data.requested_unit_price.toString()}
                  />
                  <Input
                    label="Manufacturer"
                    labelPlacement="outside"
                    placeholder="Enter manufacturer"
                    variant="bordered"
                    value={data.manufacturer_name}
                  />
                </div>

                <Textarea
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter item description"
                  variant="bordered"
                  minRows={3}
                  className="w-full"
                  value={data.long_description || ""}
                />
              </div> */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
