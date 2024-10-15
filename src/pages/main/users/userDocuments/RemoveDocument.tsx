import { useState } from "react";
import apiProvider from "@src/network/apiProvider";
import { modals } from "@mantine/modals";
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { DocumentStore } from "./DocumentStore";

function RemoveDocument({ documentData }: any) {
  const { id, name } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = DocumentStore();

  async function removeDocument() {
    setIsLoading(true);
    const data = {
      path: documentData,
    };
    const response = await apiProvider.removeDocument(data);
    if (response != null) {
      modals.closeAll();
      fetchData(id);
    } else {
      setIsLoading(false);
    }
  }

  const openConfirmationModal = () =>
    modals.open({
      title: "Remove Document",
      padding: "lg",
      centered: true,
      overlayProps: { backgroundOpacity: 0.2, blur: 1 },
      yOffset: 30,
      children: (
        <>
          <LoadingOverlay visible={isLoading} />
          <Text c="gray">Are you sure you want remove {name}'s document?</Text>
          <Group className="flex justify-end">
            <Button variant="default" onClick={() => modals.closeAll()} mt="md">
              No
            </Button>
            <Button
              style={{ backgroundColor: "primary", color: "white" }}
              onClick={() => removeDocument()}
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

export default RemoveDocument;
