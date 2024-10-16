import { ActionIcon, Badge, Table } from "@mantine/core";
import LayoutHeader from "@src/components/LayoutHeader";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LeaveStatsStore } from "./LeaveStatsStore";
import { CustomTable, Pagination } from "@src/components/Index";
import moment from "moment";
import LeaveStatsFilter from "./LeaveStatsFilter";
import { StatsCard } from "@src/components/stats";

function ViewLeaveStats() {
  const { id, name } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const { data, fetchData, loading, page, isFilterApplied } = LeaveStatsStore();

  useEffect(() => {
    fetchData(Number(id));
  }, []);

  const transformedData = data?.data?.flatMap((record: any) => {
    const dateArray = record.dates.split(",");
    return dateArray.map((date: any, index: any) => {
      return {
        ...record,
        dates: date,
        isFullDay: record.isFullDays.split(",")[index],
        sessionType: record.sessionTypes.split(",")[index],
      };
    });
  });
  let approvedCount = useMemo(() => {
    let count = 0;
    transformedData?.forEach((value) => {
      if (value.isFullDay == "1" && value?.isApproved) {
        count += 1;
      } else if (value.isFullDay == "0" && value?.isApproved) {
        count += 0.5;
      } else {
        count += 0;
      }
    });
    return count;
  }, [transformedData]);

  let pendingCount = useMemo(() => {
    let count = 0;
    transformedData?.forEach((value) => {
      if (value.isFullDay == "1" && value?.isApproved == null) {
        count += 1;
      } else if (value.isFullDay == "0" && value?.isApproved == null) {
        count += 0.5;
      } else {
        count += 0;
      }
    });
    return count;
  }, [transformedData]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        showSearchField={false}
        title={
          <div className="flex space-x-3">
            <Link to="/stats/leave">
              <ActionIcon radius="xl" variant="default" size="28px">
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Link>
            <p>{`${name}'s leave stats`}</p>
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
      <LeaveStatsFilter opened={open} closed={setOpen} memberId={Number(id)} />

      <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
        <StatsCard
          title="Total Applied Leave Count"
          value={
            loading ? "0" : data?.data?.[0].userLeaveCount.toString() ?? "0"
          }
          color="amber"
          shape="hexagon"
        />
        <StatsCard
          title="Total Approved Leave Count"
          value={approvedCount.toString() ?? "0"}
          color="green"
          shape="hexagon"
        />
        <StatsCard
          title="Total Pending Leave Count"
          value={pendingCount.toString() ?? "0"}
          color="blue"
          shape="hexagon"
        />
      </div>
      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Name",
          "Reason",
          "Leave Date",
          "Session Type",
          "Day Type",
          "Status",
        ]}
        total={transformedData?.length ?? 0}
      >
        {transformedData?.map((item: any, index: number) => (
          <Table.Tr key={index}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{item.departmentMember}</Table.Td>
            <Table.Td>{item.reason}</Table.Td>
            <Table.Td>{moment(item.dates).format("DD MMMM YYYY")}</Table.Td>
            <Table.Td>
              {item.sessionType === "0"
                ? "General"
                : item?.sessionType == "1"
                  ? "Forenoon"
                  : "Afternoon"}
            </Table.Td>
            <Table.Td>
              {item.isFullDay === "1" ? "Full Day" : "Half Day"}
            </Table.Td>
            <Table.Td>
              {" "}
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
        to={transformedData?.length ?? 0}
        total={transformedData?.length ?? 0}
        currentPage={page}
        isLoading={loading}
        totalPages={1}
        onPageChanged={() => {}}
      />
    </div>
  );
}

export default ViewLeaveStats;
