import { CustomTable, LayoutHeader, Pagination } from "@src/components/Index";
import { useEffect, useRef, useState } from "react";
import { Badge, Table } from "@mantine/core";
import { dateFormatter } from "@src/utils/util";
import { PermissionApprovalStore } from "./PermissionApprovalStore";
import ApprovePermissionRequest from "./ApprovePermission";
import moment from "moment";
import ApprovePermissionFilter from "./ApprovePermissionFilter";

export default function ApprovePermission() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [opened, setOpened] = useState(false);
  const roleId = localStorage.getItem("roleId");

  const {
    fetchData,
    data: approvalData,
    page,
    search,
    setPage,
    loading,
    setSearch,
    fetchManagerApprovedData,
    isFilterApplied,
  } = PermissionApprovalStore();

  const handleSearchSubmit = () => {
    if (inputRef.current) {
      setSearch(inputRef.current.value);
    }
  };

  const onpageChanged = (value: any) => {
    setPage(value);
  };

  useEffect(() => {
    if (roleId == "2") {
      fetchManagerApprovedData();
    } else {
      fetchData();
    }
  }, [page, search]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        title="Approve Permissions"
        inputRef={inputRef}
        showSearchField={false}
        placeholder="Search user..."
        isFilterApplied={isFilterApplied}
        filterTiltle={isFilterApplied ? "Clear Filter" : "Filter"}
        showAddButton={false}
        showFilterButton={true}
        onAddClick={() => {}}
        onFilterClick={() => setOpened(true)}
        onSearchSubmit={handleSearchSubmit}
      />
      <ApprovePermissionFilter opened={opened} closed={setOpened} />

      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Name",
          "Role",
          "Reason",
          "Permission Date",
          "Time",
          "Created AT",
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
            <Table.Td>
              {moment(item?.date).format("DD-MMMM-YYYY") ?? "None"}
            </Table.Td>
            <Table.Td>{`${item?.fromTime} - ${item?.toTime}`}</Table.Td>
            <Table.Td>{dateFormatter(item?.createdAt) ?? "None"}</Table.Td>
            <Table.Td>
              {
                <Badge
                  size="md"
                  variant="transparent"
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
            <Table.Td>
              {<ApprovePermissionRequest approvalData={item} />}
            </Table.Td>
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
