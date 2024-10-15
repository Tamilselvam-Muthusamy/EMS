import LayoutHeader from "@src/components/LayoutHeader";
import { useEffect, useRef, useState } from "react";
import { EmployeeMappingStore } from "./EmployeeMappingStore";
import { Link, useParams } from "react-router-dom";
import { ActionIcon, Table } from "@mantine/core";
import { CustomTable, Pagination } from "@src/components/Index";
import { dateFormatter } from "@src/utils/util";
import AddEmployeeMapping from "./AddEmployeeMapping";
import { IconArrowLeft } from "@tabler/icons-react";
import UnmapEmployee from "./UnmapEmployee";

function EmployeeMapping() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { page, search, data, fetchData, setPage, setSearch } =
    EmployeeMappingStore();
  const { id, name } = useParams();
  const handleAddClick = () => {
    setOpen(true);
  };
  const handleSearchSubmit = () => {
    if (inputRef.current) {
      setSearch(inputRef.current.value);
    }
  };

  const onpageChanged = (value: any) => {
    setPage(value);
  };

  useEffect(() => {
    fetchData(Number(id));
  }, [page, search]);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        showSearchField={true}
        title={
          <div className="flex space-x-3">
            <Link to="/department">
              <ActionIcon radius="xl" variant="default" size="28px">
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Link>
            <p>{`${name} department`}</p>
          </div>
        }
        inputRef={inputRef}
        placeholder="Search employee..."
        showAddButton={true}
        showFilterButton={false}
        onAddClick={handleAddClick}
        onFilterClick={() => {}}
        onSearchSubmit={handleSearchSubmit}
      />
      <AddEmployeeMapping opened={open} closed={setOpen} />
      <CustomTable
        isLoading={false}
        columns={["S.no", "Name", "Role", "CreatedAt", "Action"]}
        total={data?.totalCount ?? 0}
      >
        {data?.data?.map((item: any, index: number) => (
          <Table.Tr key={item.id}>
            <Table.Td>{data?.from + index}</Table.Td>

            <Table.Td>{item.userName ?? "None"}</Table.Td>
            <Table.Td>{item.role ?? "None"}</Table.Td>
            <Table.Td>{dateFormatter(item?.createdAt)}</Table.Td>
            <Table.Td>
              {<UnmapEmployee employeeData={item} dataCount={data?.data} />}
            </Table.Td>
          </Table.Tr>
        ))}
      </CustomTable>
      <Pagination
        from={data?.from ?? 0}
        to={data?.to ?? 0}
        total={data?.totalCount ?? 0}
        currentPage={page}
        isLoading={false}
        totalPages={data?.totalPages ?? 0}
        onPageChanged={onpageChanged}
      />
    </div>
  );
}

export default EmployeeMapping;
