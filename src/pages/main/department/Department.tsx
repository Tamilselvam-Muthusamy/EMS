import { CustomTable, LayoutHeader, Pagination } from "@src/components/Index";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Table } from "@mantine/core";
import { dateFormatter } from "@src/utils/util";
import { DepartmentStore } from "./DepartmentStore";
import AddDepartment from "./AddDepartment";
import UpdateDepartment from "./UpdateDepartment";
import { Link } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import RemoveDepartment from "./RemoveDepartment";

export default function Department() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const {
    fetchData,
    data: departmentData,
    page,
    search,
    setPage,
    setSearch,
    loading,
  } = DepartmentStore();

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

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        title="Department"
        showSearchField={true}
        inputRef={inputRef}
        placeholder="Search department..."
        showAddButton={true}
        showFilterButton={false}
        onAddClick={handleAddClick}
        onFilterClick={() => {}}
        onSearchSubmit={handleSearchSubmit}
      />

      <AddDepartment opened={open} closed={setOpen} />

      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Department Name",
          "Lead Name",
          "Created At",
          "Status",
          "Action",
        ]}
        total={departmentData?.totalCount ?? 0}
      >
        {departmentData?.data?.map((item: any, index: number) => (
          <Table.Tr key={item.id}>
            <Table.Td>{departmentData?.from + index}</Table.Td>
            <Table.Td>{item.name ?? "None"}</Table.Td>
            <Table.Td>{item.leadName ?? "None"}</Table.Td>
            <Table.Td>{dateFormatter(item?.createdAt)}</Table.Td>
            <Table.Td>
              {" "}
              <Badge
                variant="transparent"
                color={item?.isActive == true ? "green" : "red"}
              >
                {item?.isActive == true ? "Active" : "In Active"}
              </Badge>
            </Table.Td>
            <Table.Td>
              {
                <div className="flex space-x-2">
                  <Link to={`employees/${item?.id}/${item?.name}`}>
                    <Button
                      leftSection={<IconEye size={14} />}
                      variant="light"
                      size="compact-sm"
                      color="teal"
                    >
                      View Employees
                    </Button>
                  </Link>
                  <UpdateDepartment DepartmentValue={item} />{" "}
                  <RemoveDepartment DepartmentValue={item} />
                </div>
              }
            </Table.Td>
          </Table.Tr>
        ))}
      </CustomTable>
      <Pagination
        from={departmentData?.from ?? 0}
        to={departmentData?.to ?? 0}
        total={departmentData?.totalCount ?? 0}
        currentPage={page}
        isLoading={loading}
        totalPages={departmentData?.totalPages ?? 0}
        onPageChanged={onpageChanged}
      />
    </div>
  );
}
