import { CustomTable, LayoutHeader, Pagination } from "@src/components/Index";
import { useEffect, useRef, useState } from "react";
import { UserStore } from "./UserStore";
import AddUser from "./AddUser";
import { Button, Table } from "@mantine/core";
import UpdateUser from "./UpdateUser";
import moment from "moment";
import RemoveUser from "./RemoveUser";
import UpdateKyc from "./UpdateKyc";
import { Link } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import UserFilter from "./UserFilter";

export default function Users() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const role = localStorage.getItem("role");
  const {
    fetchData,
    data: userData,
    page,
    search,
    setPage,
    loading,
    setSearch,
    isFilterApplied,
    reset,
  } = UserStore();

  const handleSearchSubmit = () => {
    if (inputRef.current) {
      setSearch(inputRef.current.value);
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const onpageChanged = (value: any) => {
    setPage(value);
  };
  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };
  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        title="Users"
        inputRef={inputRef}
        placeholder="Search user..."
        isFilterApplied={isFilterApplied}
        filterTiltle={isFilterApplied ? "Clear Filter" : "Filter"}
        showAddButton={true}
        showSearchField={true}
        showFilterButton={true}
        onAddClick={handleAddClick}
        onFilterClick={handleFilterClick}
        onSearchSubmit={handleSearchSubmit}
      />

      <AddUser opened={open} closed={setOpen} />
      <UserFilter opened={isFilterOpen} closed={setIsFilterOpen} />

      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Name",
          "Email",
          "Mobile",
          "Code",
          "Role",
          "Department",
          "Designation",
          "Years Of experience",
          "Date of joining",
          "Update KYC",
          "User Document",
          "Action",
        ]}
        total={userData?.totalCount ?? 0}
      >
        {userData?.data?.map((item: any, index: number) => (
          <Table.Tr key={item.id}>
            <Table.Td>{userData?.from + index}</Table.Td>
            <Table.Td>{`${item.firstName} ${item.lastName}`}</Table.Td>
            <Table.Td>{item.email ?? "None"}</Table.Td>
            <Table.Td>{item.mobile ?? "None"}</Table.Td>
            <Table.Td>{item.code ?? "None"}</Table.Td>
            <Table.Td>{item.roleName ?? "None"}</Table.Td>
            <Table.Td>{item.department ?? "None"}</Table.Td>
            <Table.Td>{item.designation || "None"}</Table.Td>
            <Table.Td>{item.experience || "None"}</Table.Td>
            <Table.Td>
              {item?.dateOfJoining
                ? moment(item?.dateOfJoining).format("DD MMMM YYYY")
                : "None"}
            </Table.Td>
            <Table.Td>
              <UpdateKyc userData={item} />
            </Table.Td>
            <Table.Td>
              <Link
                to={`document/${item?.firstName} ${item?.lastName}/${item?.id}`}
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
                  View Document
                </Button>
              </Link>
            </Table.Td>
            <Table.Td>
              {
                <div className="flex space-x-2">
                  <UpdateUser userData={item} />
                  <RemoveUser userData={item} />
                </div>
              }
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
        onPageChanged={onpageChanged}
      />
    </div>
  );
}
