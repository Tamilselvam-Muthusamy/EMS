import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import apiProvider from "@src/network/apiProvider";
import {
  IconBan,
  IconChecks,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import { useState } from "react";
import { PermissionApprovalStore } from "./PermissionApprovalStore";

function ApprovePermissionRequest({ approvalData }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData, fetchManagerApprovedData } = PermissionApprovalStore();
  const roleId = localStorage.getItem("roleId");

  async function leaveApproval(value: any) {
    const data = {
      isApproved: value,
    };
    setIsLoading(true);
    try {
      const response = await apiProvider.updatePermission(
        data,
        approvalData?.id
      );
      if (response != null) {
        if (roleId == "2") {
          await fetchManagerApprovedData();
        } else {
          await fetchData();
        }
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
      title: "Approve Permission",
      centered: true,
      padding: "lg",
      overlayProps: { backgroundOpacity: 0.2, blur: 1 },
      yOffset: 30,
      children: (
        <>
          <LoadingOverlay visible={isLoading} />
          <Text c="gray">
            Approve Permission request for {approvalData?.departmentMember}?
          </Text>
          <Group className="flex justify-end">
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              variant="default"
              onClick={() => leaveApproval(false)}
              mt="md"
              leftSection={<IconBan />}
            >
              Reject
            </Button>
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => leaveApproval(true)}
              mt="md"
              loading={isLoading}
              leftSection={<IconChecks />}
            >
              Approve
            </Button>
          </Group>
        </>
      ),
    });

  return (
    <Button
      leftSection={<IconRosetteDiscountCheck size={19} />}
      variant="light"
      size="compact-sm"
      color="green"
      onClick={openConfirmationModal}
      disabled={approvalData?.roleID == 1}
    >
      Approve Permission
    </Button>
  );
}

export default ApprovePermissionRequest;
