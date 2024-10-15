import { CustomTable, LayoutHeader, Pagination } from "@src/components/Index";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Table } from "@mantine/core";
import moment from "moment";
import { dateFormatter } from "@src/utils/util";
import { IconEye } from "@tabler/icons-react";
import CustomModalComponent from "@src/components/CustomModalComponent";
import ApprovalLeaveRequest from "./ApproveLeaveRequest";
import ApproveLeaveFilter from "./ApproveLeaveFilter";
import { ApproveLeaveStore } from "./ApproveLeaveStore";

export default function ApproveLeave() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [leaveData, setLeaveData] = useState<any>();
  const roleId = localStorage.getItem("roleId");

  const {
    fetchData,
    data: approvalData,
    page,
    search,
    setPage,
    loading,
    isFilterApplied,
    fetchManagerApprovedLeaveData,
  } = ApproveLeaveStore();

  const onpageChanged = (value: any) => {
    setPage(value);
  };

  useEffect(() => {
    if (roleId == "2") {
      fetchManagerApprovedLeaveData();
    } else {
      fetchData();
    }
  }, [page, search]);

  function openModal(data: any) {
    setOpen(true);
    const leaveDatas = {
      dates: data?.dates.split(","),
      sessionTypes: data?.sessionTypes.split(","),
      isFullDays: data?.isFullDays.split(","),
    };
    setLeaveData(leaveDatas);
  }

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        title="Approve Leaves"
        inputRef={inputRef}
        isFilterApplied={isFilterApplied}
        filterTiltle={isFilterApplied ? "Clear Filter" : "Filter"}
        showSearchField={false}
        placeholder="Search user..."
        showAddButton={false}
        showFilterButton={true}
        onAddClick={() => {}}
        onFilterClick={() => setOpened(true)}
        onSearchSubmit={() => {}}
      />
      <ApproveLeaveFilter opened={opened} closed={setOpened} />
      <CustomModalComponent
        opened={open}
        onClose={() => setOpen(false)}
        title={"Leave Days"}
        loading={loading}
      >
        <Table.ScrollContainer
          minWidth={375}
          className="w-full rounded-lg bg-sky-50 px-2 pt-2"
        >
          <Table
            withTableBorder
            highlightOnHover
            withColumnBorders
            horizontalSpacing={"sm"}
            className="whitespace-nowrap bg-white"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="uppercase">Dates</Table.Th>
                <Table.Th className="uppercase">Day Types</Table.Th>
                <Table.Th className="uppercase">Session</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {leaveData?.dates?.map((date: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>{moment(date).format("DD MMMM YYYY")}</Table.Td>
                  <Table.Td>
                    {leaveData.isFullDays[index] == "1"
                      ? "Full Day"
                      : "Half Day"}
                  </Table.Td>
                  <Table.Td>
                    {leaveData.sessionTypes[index] == "0"
                      ? "General"
                      : leaveData.sessionTypes[index] == "1"
                        ? "Forenoon"
                        : "Afternoon"}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </CustomModalComponent>

      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Name",
          "Role",
          "Reason",
          "Created AT",
          "Leave Days",
          "Status",
          "Action",
        ]}
        total={approvalData?.totalCount ?? 0}
      >
        {approvalData?.data?.map((item: any, index: number) => (
          <Table.Tr key={item.id}>
            <Table.Td>{approvalData?.from + index}</Table.Td>
            <Table.Td>{item.departmentMember ?? "None"}</Table.Td>
            <Table.Td>{item.role ?? "None"}</Table.Td>
            <Table.Td>{item.reason ?? "None"}</Table.Td>
            <Table.Td>{dateFormatter(item?.createdAt) ?? "None"}</Table.Td>
            <Table.Td>
              <Button
                size="compact-xs"
                color="orange"
                variant="light"
                leftSection={<IconEye size={15} />}
                onClick={() => openModal(item)}
              >
                View Leaves
              </Button>
            </Table.Td>
            <Table.Td>
              {
                <Badge
                  size="md"
                  variant="light"
                  color={
                    item?.isApproved == null
                      ? "blue"
                      : item.isApproved
                        ? "green"
                        : "red"
                  }
                >
                  {item?.isApproved == null
                    ? "Pending"
                    : item.isApproved
                      ? "Approved"
                      : "Rejected"}
                </Badge>
              }
            </Table.Td>
            <Table.Td>{<ApprovalLeaveRequest approvalData={item} />}</Table.Td>
          </Table.Tr>
        ))}
      </CustomTable>
      <Pagination
        from={approvalData?.from ?? 0}
        to={approvalData?.to ?? 0}
        total={approvalData?.totalCount ?? 0}
        currentPage={page}
        isLoading={loading}
        totalPages={approvalData?.totalPages ?? 0}
        onPageChanged={onpageChanged}
      />
    </div>
  );
}
