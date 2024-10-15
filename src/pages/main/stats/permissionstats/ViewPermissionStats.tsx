import { ActionIcon, Badge, Table } from "@mantine/core";
import LayoutHeader from "@src/components/LayoutHeader";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useRef, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CustomTable, Pagination } from "@src/components/Index";
import moment from "moment";
import { PermissionStatsStore } from "./PermissionStatsStore";
import PermissionStatsFilter from "./PermissionStatsFilter";
import { dateFormatter } from "@src/utils/util";
import { StatsCard } from "@src/components/stats";

function ViewPermissionStats() {
  const { id, name } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const { data, fetchData, loading, page, isFilterApplied } =
    PermissionStatsStore();

  useEffect(() => {
    fetchData(Number(id));
  }, [id, fetchData]);

  // const approvedPermissionCount = useMemo(() => {
  //   return data?.data?.filter((value) => value.isApproved).length ?? 0;
  // }, [data]);

  const remainingPermissionCount = useMemo(() => {
    return 3 - (data?.data?.[0]?.userPermissionCount ?? 0);
  }, [data]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        showSearchField={false}
        title={
          <div className="flex space-x-3">
            <Link to="/stats/permission">
              <ActionIcon radius="xl" variant="default" size="28px">
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Link>
            <p>{`${name}'s permission stats`}</p>
          </div>
        }
        inputRef={inputRef}
        placeholder="Search document..."
        showAddButton={false}
        filterTiltle={isFilterApplied ? "Clear Filter" : "Filter"}
        isFilterApplied={isFilterApplied}
        addTitle="Upload document"
        showFilterButton={true}
        onAddClick={() => {}}
        onFilterClick={() => setOpen(true)}
        onSearchSubmit={() => {}}
      />
      <PermissionStatsFilter
        opened={open}
        closed={setOpen}
        memberId={Number(id)}
      />
      <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
        <StatsCard
          title="Total Permission Count For Current Month"
          value={loading ? "0" : "3"}
          color="amber"
          shape="hexagon"
        />
        <StatsCard
          title="Applied Permission Count"
          value={data?.data?.length.toString() ?? "0"}
          color="green"
          shape="hexagon"
        />
        <StatsCard
          title="Available Permission Count For Current Month"
          value={remainingPermissionCount.toString()}
          color="red"
          shape="hexagon"
        />
      </div>
      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Name",
          "Reason",
          "Permission Date",
          "Time",
          "Created AT",
          "Status",
        ]}
        total={data?.data?.length ?? 0}
      >
        {data?.data?.map((item: any, index: number) => (
          <Table.Tr key={item.id}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{item.departmentMember ?? "None"}</Table.Td>
            <Table.Td>{item.reason ?? "None"}</Table.Td>
            <Table.Td>
              {moment(item?.date).format("DD-MMMM-YYYY") ?? "None"}
            </Table.Td>
            <Table.Td>{`${item?.fromTime} - ${item?.toTime}`}</Table.Td>
            <Table.Td>{dateFormatter(item?.createdAt) ?? "None"}</Table.Td>
            <Table.Td>
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
            </Table.Td>
          </Table.Tr>
        ))}
      </CustomTable>

      <Pagination
        from={1}
        to={data?.data?.length ?? 0}
        total={data?.data?.length ?? 0}
        currentPage={page}
        isLoading={loading}
        totalPages={1}
        onPageChanged={() => {}}
      />
    </div>
  );
}

export default ViewPermissionStats;
