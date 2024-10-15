import LayoutHeader from "@src/components/LayoutHeader";
import { useEffect, useRef } from "react";
import { ApproveNoticeStore } from "./ApproveNoticeStore";
import { Badge, Table } from "@mantine/core";
import Pagination from "@src/components/Pagination";
import { CustomTable } from "@src/components/Index";
import ApproveNoticeRequest from "./ApproveNoticeRequest";
import moment from "moment";

function ApproveNotice() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchData, data, loading, page, search } = ApproveNoticeStore();

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        title="Approve Notice"
        inputRef={inputRef}
        placeholder="Search user..."
        showAddButton={false}
        showSearchField={false}
        showFilterButton={false}
        onAddClick={() => {}}
        onFilterClick={() => {}}
        onSearchSubmit={() => {}}
      />

      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Name",
          "Role",
          "Remarks",
          "Applied Date",
          "Notice End Date",
          "Approved Status",
          "Approved BY",
          "Action",
        ]}
        total={data?.totalCount ?? 0}
      >
        {data?.data?.map((item: any, index: number) => (
          <Table.Tr key={item.id}>
            <Table.Td>{data?.from + index}</Table.Td>
            <Table.Td>{item?.departmentMember ?? "None"}</Table.Td>
            <Table.Td>{item?.role ?? "None"}</Table.Td>
            <Table.Td>{item?.remarks ?? "None"}</Table.Td>
            <Table.Td>
              {" "}
              {moment(data?.createdAt).format("DD MMMM YYYY") ?? "None"}
            </Table.Td>
            <Table.Td>
              {item?.noticeEndDate == null
                ? "None"
                : moment(item?.noticeEndDate).format("DD MMMM YYYY") ?? "None"}
            </Table.Td>

            <Table.Td>
              <Badge
                size="md"
                variant="light"
                color={item?.isApproved ? "green" : "red"}
              >
                {item?.isApproved ? "Approve" : "Pending"}
              </Badge>
            </Table.Td>
            <Table.Td>
              {item?.approvedBy == null ? "None" : item?.approvedBy}
            </Table.Td>
            <Table.Td>
              <ApproveNoticeRequest noticeData={item} />
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
        onPageChanged={() => {}}
      />
    </div>
  );
}

export default ApproveNotice;
