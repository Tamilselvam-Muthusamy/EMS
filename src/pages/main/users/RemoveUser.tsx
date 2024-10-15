import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import apiProvider from "@src/network/apiProvider";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { UserStore } from "./UserStore";

function RemoveUser({ userData }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = UserStore();
  const role = localStorage.getItem("role");

  async function removeUser() {
    setIsLoading(true);
    try {
      const response = await apiProvider.removeUser(userData?.id);
      if (response != null) {
        await fetchData();
        modals.closeAll();
      }
    } catch (error) {
      console.error("Error removing user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const openConfirmationModal = () =>
    modals.open({
      title: "Remove User",
      padding: "lg",
      centered: true,
      overlayProps: { backgroundOpacity: 0.2, blur: 1 },
      yOffset: 30,
      children: (
        <>
          <LoadingOverlay visible={isLoading} />
          <Text c="gray">Are you sure you want to remove this user?</Text>
          <Group className="flex justify-end">
            <Button variant="default" onClick={() => modals.closeAll()} mt="md">
              No
            </Button>
            <Button
              style={{ backgroundColor: "primary", color: "white" }}
              onClick={() => removeUser()}
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
      disabled={
        (userData?.roleID === 1 && (role === "HR" || role === "Manager")) ||
        (userData?.roleID === 2 && role == "HR")
      }
    >
      Remove
    </Button>
  );
}

export default RemoveUser;
