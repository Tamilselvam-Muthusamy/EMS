import { useState } from "react";
import { DepartmentStore } from "./DepartmentStore";
import apiProvider from "@src/network/apiProvider";
import { modals } from "@mantine/modals";
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

function RemoveDepartment({ DepartmentValue }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = DepartmentStore();

  async function removeDepartment() {
    setIsLoading(true);
    const response = await apiProvider.removeDepartment(DepartmentValue?.id);
    if (response != null) {
      modals.closeAll();
      fetchData();
    } else {
      setIsLoading(false);
    }
  }

  const openConfirmationModal = () =>
    modals.open({
      title: "Remove Department",
      padding: "lg",
      centered: true,
      overlayProps: { backgroundOpacity: 0.2, blur: 1 },
      yOffset: 30,
      children: (
        <>
          <LoadingOverlay visible={isLoading} />
          <Text c="gray">Are you sure you want remove this department?</Text>
          <Group className="flex justify-end">
            <Button variant="default" onClick={() => modals.closeAll()} mt="md">
              No
            </Button>
            <Button
              style={{ backgroundColor: "primary", color: "white" }}
              onClick={() => removeDepartment()}
              mt="md"
              loading={isLoading}
            >
              Yes
            </Button>
          </Group>
        </>
      ),
    });
  return (
    <Button
      leftSection={<IconTrash size={14} />}
      variant="light"
      size="compact-sm"
      color="red"
      onClick={openConfirmationModal}
    >
      Remove
    </Button>
  );
}

export default RemoveDepartment;
