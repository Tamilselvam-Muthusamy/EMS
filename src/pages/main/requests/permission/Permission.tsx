import { Badge, Table } from "@mantine/core";
import CustomTable from "@src/components/CustomTable";
import LayoutHeader from "@src/components/LayoutHeader";
import { useEffect, useRef, useState } from "react";
import { PermissionStore } from "./PermissionStore";
import moment from "moment";
import { dateFormatter } from "@src/utils/util";
import RequestPermission from "./RequestPermission";
import Pagination from "@src/components/Pagination";
import UpdatePermission from "./UpdatePermission";
import RemovePermission from "./RemovePermission";
import PermissionFilter from "./PermissionFilter";

function Permission() {
  const { data, page, search, fetchData, setPage, loading, isFilterApplied } =
    PermissionStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  const onpageChanged = (value: any) => {
    setPage(value);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        title="Permission"
        addTitle="Apply Permission"
        showSearchField={false}
        filterTiltle={isFilterApplied ? "Clear Filter" : "Filter"}
        inputRef={inputRef}
        placeholder="Search user..."
        showAddButton={true}
        isFilterApplied={isFilterApplied}
        showFilterButton={true}
        onAddClick={() => setOpen(true)}
        onFilterClick={() => setOpened(true)}
        onSearchSubmit={() => {}}
      />
      <PermissionFilter opened={opened} closed={setOpened} />
      <RequestPermission opened={open} closed={setOpen} />
      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Reason",
          "Permission Date",
          "Time",
          "Approved Status",
          "Approved BY",
          "Created AT",
          "Action",
        ]}
        total={data?.totalCount ?? 0}
      >
        {data?.data?.map((item: any, index: number) => (
          <Table.Tr key={item.id}>
            <Table.Td>{data?.from + index}</Table.Td>
            <Table.Td>{item.reason ?? "None"}</Table.Td>
            <Table.Td>
              {moment(item?.date).format("DD-MM-YYYY") ?? "None"}
            </Table.Td>
            <Table.Td>{`${item?.fromTime} - ${item?.toTime}`}</Table.Td>

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
            <Table.Td>{dateFormatter(item?.createdAt) ?? "None"}</Table.Td>
            <Table.Td>
              {
                <div className="">
                  <UpdatePermission permissionData={item} />{" "}
                  <RemovePermission permissionData={item} />
                </div>
              }
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

export default Permission;
