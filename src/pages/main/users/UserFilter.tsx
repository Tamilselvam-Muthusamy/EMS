import CustomModalComponent from "@src/components/CustomModalComponent";
import { UserStore } from "./UserStore";
import { useEffect, useState } from "react";
import apiProvider from "@src/network/apiProvider";
import { Button, Select } from "@mantine/core";

function UserFilter({ opened, closed }: any) {
  const {
    roleID,
    departmentID,
    setRoleId,
    setDepartmentId,
    fetchData,
    reset,
    isFilterApplied,
    setIsFilterApplied,
  } = UserStore();
  const [roleData, setRoleData] = useState<any>(null);
  const [departmentData, setDepartmentData] = useState<any>(null);
  let commonData = { id: 0, name: "All" };

  async function fetchRoleData() {
    const result = await apiProvider.fetchRole();
    if (result != null) {
      setRoleData([commonData, ...result?.data]);
    }
  }
  async function fetchDepartmentData() {
    let data = {
      page: 0,
      search: "",
    };
    const result = await apiProvider.fetchDepartmentData(data);
    if (result != null) {
      setDepartmentData([commonData, ...result?.data?.data]);
    }
  }

  function changeRole(roleId: any) {
    setRoleId(Number(roleId));
  }
  function changeDepartment(departmentId: any) {
    setDepartmentId(Number(departmentId));
  }

  useEffect(() => {
    if (opened) {
      fetchRoleData();
      fetchDepartmentData();
    }
  }, [opened]);

  function applyFilter() {
    setIsFilterApplied(true);
    closed(false);
    fetchData();
  }
  function clearFilter() {
    setIsFilterApplied(false);
    closed(false);
    reset();
    fetchData();
  }

  return (
    <CustomModalComponent
      opened={opened}
      onClose={() => closed(false)}
      title={"User Filter"}
      loading={false}
    >
      <div className="flex flex-col space-y-4">
        <Select
          variant="filled"
          label="Role"
          placeholder="Select role"
          data={roleData
            ?.filter((value: any) => value?.id != 2)
            .map((e: any) => ({
              label: e.name,
              value: e.id.toString(),
            }))}
          value={roleID.toString()}
          onChange={changeRole}
        />
        <Select
          variant="filled"
          label="Department"
          placeholder="Select Department"
          data={departmentData?.map((e: any) => ({
            label: e.name,
            value: e.id.toString(),
          }))}
          value={departmentID.toString()}
          onChange={changeDepartment}
        />
        <div className="flex space-x-3">
          <Button
            variant="light"
            onClick={clearFilter}
            fullWidth
            type="submit"
            disabled={!isFilterApplied}
          >
            Clear Filter
          </Button>
          <Button onClick={applyFilter} fullWidth type="submit">
            Apply Filter
          </Button>
        </div>
      </div>
    </CustomModalComponent>
  );
}

export default UserFilter;
