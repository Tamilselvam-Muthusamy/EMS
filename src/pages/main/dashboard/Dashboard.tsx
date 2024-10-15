import { StatsCard } from "@src/components/stats";
import { DashBoardStore } from "./DashboardStore";
import { useEffect, useRef, useState } from "react";
import Protected from "@src/components/Protected";
import LayoutHeader from "@src/components/LayoutHeader";
import DashboardFilter from "./DashboardFilter";

export default function Dashboard() {
  const { data, loading, fetchData, isFilterApplied } = DashBoardStore();
  const [opened, setOpened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  let roleId = localStorage.getItem("roleId");

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Protected>
      <LayoutHeader
        title="Dashboard"
        inputRef={inputRef}
        placeholder="Search..."
        filterTiltle={isFilterApplied ? "Clear Filter" : "Filter"}
        isFilterApplied={isFilterApplied}
        showAddButton={false}
        showSearchField={false}
        showFilterButton={true}
        onAddClick={() => {}}
        onFilterClick={() => setOpened(true)}
        onSearchSubmit={() => {}}
      />
      <DashboardFilter opened={opened} closed={setOpened} />
      {roleId == "4" || roleId == "5" ? (
        <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          <StatsCard
            title="Leave Count"
            value={loading ? 0 : (data?.leaveCount ?? 0).toString()}
            color="amber"
            shape="octagon"
          />
          <StatsCard
            title="Approve Leave Count"
            value={loading ? 0 : (data?.approvedLeaveCount ?? 0).toString()}
            color="pink"
            shape="squircle"
          />
          <StatsCard
            title="Pending Approval Leave Count"
            value={loading ? 0 : (data?.pendingLeaveCount ?? 0).toString()}
            color="red"
            shape="triangle"
          />
          <StatsCard
            title="Permission Count"
            value={loading ? 0 : (data?.permissionCount ?? 0).toString()}
            color="gray"
            shape="hexagon"
          />
          <StatsCard
            title="Approved Permission Count"
            value={
              loading ? 0 : (data?.approvedPermissionCount ?? 0).toString()
            }
            color="cyan"
            shape="hexagon"
          />
          <StatsCard
            title="Pending Approval Permission Count"
            value={loading ? 0 : (data?.pendingPermissionCount ?? 0).toString()}
            color="violet"
            shape="hexagon"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full pt-4">
          <StatsCard
            title="Employee Count"
            value={loading ? 0 : (data?.employeeCount ?? 0).toString()}
            color="primary"
            shape="diamond"
          />
          <StatsCard
            title="Employee Notice Count"
            value={loading ? 0 : (data?.employeeOnNoticeCount ?? 0).toString()}
            color="green"
            shape="diamond"
          />
          <StatsCard
            title="Leave Count"
            value={loading ? 0 : (data?.leaveCount ?? 0).toString()}
            color="amber"
            shape="octagon"
          />
          <StatsCard
            title="Approve Leave Count"
            value={loading ? 0 : (data?.approvedLeaveCount ?? 0).toString()}
            color="pink"
            shape="squircle"
          />
          <StatsCard
            title="Pending Approval Leave Count"
            value={loading ? 0 : (data?.pendingLeaveCount ?? 0).toString()}
            color="red"
            shape="triangle"
          />
          <StatsCard
            title="Permission Count"
            value={loading ? 0 : (data?.permissionCount ?? 0).toString()}
            color="gray"
            shape="hexagon"
          />
          <StatsCard
            title="Approved Permission Count"
            value={
              loading ? 0 : (data?.approvedPermissionCount ?? 0).toString()
            }
            color="cyan"
            shape="hexagon"
          />
          <StatsCard
            title="Pending Approval Permission Count"
            value={loading ? 0 : (data?.pendingPermissionCount ?? 0).toString()}
            color="violet"
            shape="hexagon"
          />
        </div>
      )}
    </Protected>
  );
}
