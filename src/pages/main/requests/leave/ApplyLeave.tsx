import { Button, Select, Textarea, TextInput, Tooltip } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import CustomModalComponent from "@src/components/CustomModalComponent";
import apiProvider from "@src/network/apiProvider";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { LeaveStore } from "./LeaveStore";
import { IconTrash } from "@tabler/icons-react";
import moment from "moment";

const requestLeaveValidation = z.object({
  reason: z.string().min(1, { message: "Reason should not be empty" }),
  leaveTypeValue: z.string().min(1, { message: "Select Leave Type" }),
});

export type LeaveSchema = z.infer<typeof requestLeaveValidation>;
function ApplyLeave({ opened, closed }: any) {
  const form = useForm<LeaveSchema>({
    initialValues: {
      reason: "",
      leaveTypeValue: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(requestLeaveValidation),
  });
  const leaveSessionData = [
    { label: "General", value: "0" },
    { label: "Forenoon", value: "1" },
    { label: "Afternoon", value: "2" },
  ];

  const leaveType = [
    { label: "Single Day", value: "0" },
    { label: "Multiple Days", value: "1" },
  ];
  const leaveData = [
    { label: "Full Day", value: "0" },
    { label: "Half Day", value: "1" },
  ];

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const roleId = localStorage.getItem("roleId");
  const [value1, setValue1] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const lead = localStorage.getItem("lead");
  const manager = localStorage.getItem("manager");
  const [dateRange, setDateRange] = useState<any>([]);
  const [leaveDetails, setLeaveDetails] = useState<any[]>([]);
  const currentDate = new Date();
  const { fetchData } = LeaveStore();
  function closeModal() {
    form.reset();
    closed(false);
    setLeaveDetails([]);
    setDateRange([]);
    setValue1(null);
    setValue([null, null]);
  }
  const handleDateChange = (selectedDates: any) => {
    setValue(selectedDates);
    if (selectedDates[0] && selectedDates[1]) {
      const fullDateRange = getDateRange(selectedDates[0], selectedDates[1]);
      setDateRange(fullDateRange);

      setLeaveDetails(
        fullDateRange.map((date: any) => ({
          date: new Date(date),
          leaveMode: "0",
          sessionType: "0",
        }))
      );
    }
  };

  function handleDateChange1(value: any) {
    setValue1(value);

    setDateRange([new Date(value)]);

    const dateRange = [new Date(value)];
    setLeaveDetails(
      dateRange.map((date: any) => ({
        date: new Date(date),
        leaveMode: "0",
        sessionType: "0",
      }))
    );
  }
  useEffect(() => {}, [leaveDetails]);

  const getDateRange = (startDate: any, endDate: any) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  const handleLeaveModeChange = (index: number, leaveMode: string) => {
    const updatedLeaveDetails = [...leaveDetails];
    updatedLeaveDetails[index].leaveMode = leaveMode;
    setLeaveDetails(updatedLeaveDetails);
  };

  const handleLeaveSessionChange = (index: number, sessionType: string) => {
    const updatedLeaveDetails = [...leaveDetails];
    updatedLeaveDetails[index].sessionType = sessionType;
    setLeaveDetails(updatedLeaveDetails);
  };

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const leaveData = {
      reason: values.reason,
      roleID: Number(roleId),
      isCL: values.leaveTypeValue == "0" ? true : false,
      dates: leaveDetails.map((leave) => ({
        date: moment(leave.date).format("YYYY-MM-DD"),
        isFullDay: leave.leaveMode === "0",
        sessionType: Number(leave.sessionType),
      })),
    };

    const result = await apiProvider.applyLeave(leaveData);
    if (result != null) {
      form.reset();
      form.setFieldValue("leaveTypeValue", "");
      setValue([null, null]);
      closeModal();
      fetchData();
    }
    setLoading(false);
  };

  function changeLeaveType(value: any) {
    form.setFieldValue("leaveTypeValue", value);
    setDateRange([]);
    setLeaveDetails([]);
    setValue([null, null]);
    setValue1(null);
  }
  function removeDays(item: any) {
    let newValue = leaveDetails.filter((_, index) => item != index);
    setLeaveDetails(newValue);
  }
  const leaveDays = useMemo(() => {
    let count = 0;
    leaveDetails?.forEach((value) => {
      if (value?.leaveMode == "0") {
        count += 1;
      } else {
        count += 0.5;
      }
    });
    return count;
  }, [leaveDetails]);

  useEffect(() => {
    if (leaveDetails.length == 0) {
      setValue1(null);
      setValue([null, null]);
    }
  }, [leaveDetails]);

  return (
    <div className="w-full space-y-2">
      <CustomModalComponent
        opened={opened}
        title={"Apply Leave"}
        onClose={closeModal}
        loading={loading}
      >
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col w-full"
        >
          <div className="flex flex-col space-y-4 max-md:w-full  justify-center items-center pt-5">
            <div className="flex w-full space-x-4">
              <TextInput
                label="Employee Name"
                placeholder="Employee Name"
                value={`${localStorage.getItem("firstName")}  ${localStorage.getItem("lastName")}`}
                className="w-1/2"
                readOnly
                variant="filled"
              />
              <TextInput
                label="Request To"
                value={roleId == "5" ? lead ?? "" : manager ?? ""}
                placeholder="Request To"
                className="w-1/2"
                variant="filled"
                readOnly
              />
            </div>
            <div className="flex w-full space-x-4">
              <Select
                label="Department"
                placeholder="Select Department"
                value={localStorage.getItem("department") ?? ""}
                data={[localStorage.getItem("department") ?? ""]}
                className="w-1/2"
                variant="filled"
                readOnly
              />
              <TextInput
                label="Employee Code"
                placeholder="Employee Code"
                value={localStorage.getItem("code") ?? "None"}
                className="w-1/2"
                readOnly
                variant="filled"
              />
            </div>
            <Select
              {...form.getInputProps("leaveTypeValue")}
              label="Leave Type"
              placeholder="Select Leave Type"
              data={leaveType}
              variant="filled"
              withAsterisk
              onChange={changeLeaveType}
              className="w-full"
            />
            {form.values.leaveTypeValue == "0" ? (
              <DateInput
                value={value1}
                onChange={handleDateChange1}
                label="Leave date"
                placeholder="Select date"
                variant="filled"
                withAsterisk
                minDate={currentDate}
                maxDate={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 3,
                    0
                  )
                }
                className="w-full"
              />
            ) : form.values.leaveTypeValue == "1" ? (
              <DatePickerInput
                {...form.getInputProps("dateRanges")}
                valueFormat="YYYY MMM DD"
                type="range"
                label="Select leave dates"
                placeholder="Select dates range"
                value={value}
                onChange={handleDateChange}
                variant="filled"
                className="w-full"
                withAsterisk
                minDate={currentDate}
                maxDate={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 3,
                    0
                  )
                }
              />
            ) : (
              <></>
            )}
            <Textarea
              variant="filled"
              radius="md"
              className="w-full"
              label="Reason for leave"
              placeholder="Enter reason"
              withAsterisk
              {...form.getInputProps("reason")}
            />
          </div>
          <div className="mt-3 space-y-3 w-full">
            {leaveDetails.map((leave, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3  w-full justify-between items-center"
              >
                <DateInput
                  value={leave.date}
                  valueFormat="DD/MM/YYYY"
                  label="Date"
                  placeholder="Date"
                  readOnly
                  variant="filled"
                  className="w-full md:w-1/3"
                />
                <Select
                  label="Leave Mode"
                  placeholder="Select Leave Mode"
                  data={leaveData}
                  value={leave.leaveMode}
                  onChange={(value) => handleLeaveModeChange(index, value!)}
                  variant="filled"
                  className="w-full md:w-1/3"
                />
                <Select
                  label="Leave Session"
                  placeholder="Select Leave Session"
                  data={leaveSessionData}
                  value={leave.sessionType}
                  onChange={(value) => handleLeaveSessionChange(index, value!)}
                  variant="filled"
                  disabled={leave.leaveMode === "0"}
                  className="w-full md:w-1/3"
                />
                <div className="pt-0 w-full lg:pt-6 md:w-20 md:pt-6">
                  <Tooltip label="Remove">
                    <Button
                      size="xs"
                      variant="outline"
                      color="red"
                      onClick={() => removeDays(index)}
                      className="w-full  mt-2 md:mt-0"
                    >
                      <IconTrash size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            ))}
            {(value != null || dateRange != null) && (
              <TextInput
                label="Total Leave Days"
                placeholder="Leave Days"
                variant="filled"
                className="mt-2 max-w-xs sm:max-w-md md:max-w-sm lg:max-w-sm"
                value={leaveDays}
                readOnly
              />
            )}
          </div>

          <div className="flex w-full justify-center items-center mt-4">
            <Button
              type="submit"
              fullWidth
              disabled={
                value1 == null && (value[0] == null || value[1] == null)
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </CustomModalComponent>
    </div>
  );
}

export default ApplyLeave;
