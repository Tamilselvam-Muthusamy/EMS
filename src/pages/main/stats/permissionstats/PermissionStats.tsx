import { CustomTable, LayoutHeader, Pagination } from "@src/components/Index";
import { useEffect, useRef, useState } from "react";
import { Button, Table } from "@mantine/core";
import { UserStore } from "../../users/UserStore";
import { Link } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import UserFilter from "../../users/UserFilter";

export default function PermissionStats() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const role = localStorage.getItem("role");
  const {
    fetchData,
    data: userData,
    page,
    search,
    loading,
    reset,
    isFilterApplied,
  } = UserStore();

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        title="Permission Stats"
        inputRef={inputRef}
        placeholder="Search user..."
        isFilterApplied={isFilterApplied}
        filterTiltle={isFilterApplied ? "Clear Filter" : "Filter"}
        showAddButton={false}
        showSearchField={false}
        showFilterButton={true}
        onAddClick={() => {}}
        onFilterClick={() => setIsFilterOpen(true)}
        onSearchSubmit={() => {}}
      />

      <UserFilter opened={isFilterOpen} closed={setIsFilterOpen} />

      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Name",
          "Email",
          "Code",
          "Role",
          "Department",
          "Action",
        ]}
        total={userData?.totalCount ?? 0}
      >
        {userData?.data?.map((item: any, index) => (
          <Table.Tr key={item.id}>
            <Table.Td>{userData?.from + index}</Table.Td>
            <Table.Td>{`${item.firstName} ${item.lastName}`}</Table.Td>
            <Table.Td>{item.email ?? "None"}</Table.Td>
            <Table.Td>{item.code ?? "None"}</Table.Td>
            <Table.Td>{item.roleName ?? "None"}</Table.Td>
            <Table.Td>{item.department ?? "None"}</Table.Td>
            <Table.Td>
              <Link
                to={`details/${item?.firstName} ${item?.lastName}/${item?.departmentMemberID}`}
              >
                <Button
                  leftSection={<IconEye size={14} />}
                  variant="light"
                  size="compact-sm"
                  color="teal"
                  disabled={
                    (item?.roleID == 1 && role == "Manager") ||
                    (item?.roleID == 1 && role == "HR") ||
                    (item?.roleID == 2 && role == "HR")
                  }
                >
                  View Stats
                </Button>
              </Link>
            </Table.Td>
          </Table.Tr>
        ))}
      </CustomTable>
      <Pagination
        from={userData?.from ?? 0}
        to={userData?.to ?? 0}
        total={userData?.totalCount ?? 0}
        currentPage={page}
        isLoading={loading}
        totalPages={userData?.totalPages ?? 0}
        onPageChanged={() => {}}
      />
    </div>
  );
}
