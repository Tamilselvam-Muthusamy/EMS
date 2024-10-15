import { useState } from "react";
import apiProvider from "@src/network/apiProvider";
import { modals } from "@mantine/modals";
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { LeaveStore } from "./LeaveStore";

function RemoveLeave({ leaveData }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = LeaveStore();

  async function removeLeave() {
    setIsLoading(true);
    const response = await apiProvider.removeLeave(leaveData?.id);
    if (response != null) {
      modals.closeAll();
      fetchData();
    } else {
      setIsLoading(false);
    }
  }

  const openConfirmationModal = () =>
    modals.open({
      title: "Remove Leave",
      padding: "lg",
      centered: true,
      overlayProps: { backgroundOpacity: 0.2, blur: 1 },
      yOffset: 30,
      children: (
        <>
          <LoadingOverlay visible={isLoading} />
          <Text c="gray">Are you sure you want remove this leave?</Text>
          <Group className="flex justify-end">
            <Button variant="default" onClick={() => modals.closeAll()} mt="md">
              No
            </Button>
            <Button
              style={{ backgroundColor: "primary", color: "white" }}
              onClick={() => removeLeave()}
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
      disabled={leaveData?.isApproved}
    >
      Remove
    </Button>
  );
}

export default RemoveLeave;
