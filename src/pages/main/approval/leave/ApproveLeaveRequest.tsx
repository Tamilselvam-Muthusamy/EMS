import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import apiProvider from "@src/network/apiProvider";
import {
  IconBan,
  IconChecks,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import { useState } from "react";
import { ApproveLeaveStore } from "./ApproveLeaveStore";

function ApprovalLeaveRequest({ approvalData }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData, fetchManagerApprovedLeaveData } = ApproveLeaveStore();
  const roleId = localStorage.getItem("roleId");

  async function leaveApproval(value: any) {
    const data = {
      isApproved: value,
    };
    setIsLoading(true);
    try {
      const response = await apiProvider.updateLeave(data, approvalData?.id);
      if (response != null) {
        if (roleId == "2") {
          fetchManagerApprovedLeaveData();
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
      title: "Approve Leave",
      centered: true,
      padding: "lg",
      overlayProps: { backgroundOpacity: 0.2, blur: 1 },
      yOffset: 30,
      children: (
        <>
          <LoadingOverlay visible={isLoading} />
          <Text c="gray">
            Approve leave request for {approvalData?.departmentMember}?
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
      Approve Leave
    </Button>
  );
}

export default ApprovalLeaveRequest;
