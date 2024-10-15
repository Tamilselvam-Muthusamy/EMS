import CustomTable from "@src/components/CustomTable";
import LayoutHeader from "@src/components/LayoutHeader";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Table } from "@mantine/core";
import { Pagination } from "@src/components/Index";
import { dateFormatter } from "@src/utils/util";
import { IconEye } from "@tabler/icons-react";
import CustomModalComponent from "@src/components/CustomModalComponent";
import moment from "moment";
import { LeaveStore } from "./LeaveStore";
import ApplyLeave from "./ApplyLeave";
import LeaveFilter from "./LeaveFilter";
import RemoveLeave from "./RemoveLeave";

function Leave() {
  const { page, search, setPage, fetchData, data, loading, isFilterApplied } =
    LeaveStore();
  const [leaveData, setLeaveData] = useState<any>();
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onpageChanged = (value: any) => {
    setPage(value);
  };

  useEffect(() => {
    fetchData();
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
        title="Leave"
        showSearchField={false}
        inputRef={inputRef}
        filterTiltle={isFilterApplied ? "Clear Filter" : "Filter"}
        placeholder="Search leave..."
        showAddButton={true}
        addTitle="Apply Leave"
        isFilterApplied={isFilterApplied}
        showFilterButton={true}
        onAddClick={() => setOpened(true)}
        onFilterClick={() => setFilterOpen(true)}
        onSearchSubmit={() => {}}
      />
      <ApplyLeave opened={opened} closed={setOpened} />
      <LeaveFilter opened={filterOpen} closed={setFilterOpen} />
      <CustomModalComponent
        opened={open}
        onClose={() => setOpen(false)}
        title={"Leaves"}
        loading={false}
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
          "Reason",
          "Created AT",
          "Approved Status",
          "Approved BY",
          "Approved AT",
          "Leave days",
          "Action",
        ]}
        total={data?.totalCount ?? 0}
      >
        {data?.data?.map((item: any, index: number) => (
          <Table.Tr key={item.id}>
            <Table.Td>{data?.from + index}</Table.Td>
            <Table.Td>{item.reason ?? "None"}</Table.Td>
            <Table.Td>{dateFormatter(item?.createdAt) ?? "None"}</Table.Td>

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
            <Table.Td>{item?.approvedBy ?? "None"}</Table.Td>
            <Table.Td>{dateFormatter(item?.approvedAt) ?? "None"}</Table.Td>
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
              <RemoveLeave leaveData={item} />
            </Table.Td>
          </Table.Tr>
        ))}
      </CustomTable>
      <Pagination
        from={data?.from ?? 0}
        to={data?.to ?? 0}
        total={data?.totalCount ?? 0}
        currentPage={page}
        isLoading={loading}
        totalPages={data?.totalPages ?? 0}
        onPageChanged={onpageChanged}
      />
    </div>
  );
}

export default Leave;
