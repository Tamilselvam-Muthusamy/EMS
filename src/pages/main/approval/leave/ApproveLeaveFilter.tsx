import { Button, Select } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import CustomModalComponent from "@src/components/CustomModalComponent";
import { months } from "@src/utils/contants";
import { ApproveLeaveStore } from "./ApproveLeaveStore";

function ApproveLeaveFilter({ opened, closed }: any) {
  const roleId = localStorage.getItem("roleId");
  const {
    month,
    setMonth,
    year,
    setYear,
    fetchData,
    fetchManagerApprovedLeaveData,
    isFilterApplied,
    setIsFilterApplied,
    reset,
  } = ApproveLeaveStore();

  const handleYearChange = (date: Date | null) => {
    const year = date ? date.getFullYear() : null;
    setYear(Number(year));
  };
  function modalClose() {
    closed(false);
    setMonth(0);
  }
  function changeMonth(value: any) {
    setMonth(Number(value));
  }
  function applyFilter() {
    setIsFilterApplied(true);
    closed(false);
    if (roleId == "2") {
      fetchManagerApprovedLeaveData();
    } else {
      fetchData();
    }
  }
  function clearFilter() {
    setIsFilterApplied(false);
    closed(false);
    reset();
    if (roleId == "2") {
      fetchManagerApprovedLeaveData();
    } else {
      fetchData();
    }
  }

  return (
    <CustomModalComponent
      opened={opened}
      onClose={modalClose}
      title={"Approve Leave Filter"}
      loading={false}
    >
      <div className="flex flex-col space-y-4">
        <YearPickerInput
          label="Select Year"
          placeholder="Select Year"
          variant="filled"
          value={year ? new Date(year, 0) : null}
          onChange={handleYearChange}
        />
        <Select
          variant="filled"
          label="Month"
          placeholder="Select month"
          data={months?.map((e: any) => ({
            label: e.label,
            value: e.value,
          }))}
          searchable
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

export default ApproveLeaveFilter;
