import { Button, Select } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import CustomModalComponent from "@src/components/CustomModalComponent";
import { months } from "@src/utils/contants";
import { PermissionApprovalStore } from "./PermissionApprovalStore";

function ApprovePermissionFilter({ opened, closed }: any) {
  const roleId = localStorage.getItem("roleId");
  const {
    month,
    setMonth,
    year,
    setYear,
    fetchData,
    isFilterApplied,
    setIsFilterApplied,
    reset,
    fetchManagerApprovedData,
  } = PermissionApprovalStore();

  const handleYearChange = (date: Date | null) => {
    const year = date ? date.getFullYear() : null;
    setYear(Number(year));
  };
  function modalClose() {
    closed(false);
    setIsFilterApplied(false);
    setMonth(0);
    setYear(null);
  }
  function changeMonth(value: any) {
    setMonth(Number(value));
  }
  function applyFilter() {
    setIsFilterApplied(true);
    closed(false);
    if (roleId == "2") {
      fetchManagerApprovedData();
    } else {
      fetchData();
    }
  }
  function clearFilter() {
    closed(false);
    setIsFilterApplied(false);
    reset();
    if (roleId == "2") {
      fetchManagerApprovedData();
    } else {
      fetchData();
    }
  }

  return (
    <CustomModalComponent
      opened={opened}
      onClose={modalClose}
      title={"Approve Permission Filter"}
      loading={false}
    >
      <div className="flex flex-col space-y-4">
        <YearPickerInput
          label="Select Year"
          placeholder="Select year"
          variant="filled"
          value={year ? new Date(year, 0) : null}
          onChange={handleYearChange}
        />
        <Select
          variant="filled"
          label="Month"
          placeholder="Select month"
          searchable
          data={months?.map((e: any) => ({
            label: e.label,
            value: e.value,
          }))}
          value={month.toString()}
          onChange={changeMonth}
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
          <Button
            onClick={applyFilter}
            fullWidth
            type="submit"
            disabled={year == null}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </CustomModalComponent>
  );
}

export default ApprovePermissionFilter;
