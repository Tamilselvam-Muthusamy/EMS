import { Button, Select, Textarea, TextInput } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import CustomModalComponent from "@src/components/CustomModalComponent";
import apiProvider from "@src/network/apiProvider";
import { useMemo, useState } from "react";
import { z } from "zod";
import { PermissionStore } from "./PermissionStore";
import moment from "moment";

export const requestPermissionValidation = z.object({
  reason: z.string().min(1, { message: "Reason should not be empty" }),
  date: z.date({ message: "Permission date should not be empty" }),
  fromTime: z.string().refine((val) => val.length != null && val.length > 0, {
    message: "From time should not be empty",
  }),
  toTime: z.string().refine((val) => val.length != null && val.length > 0, {
    message: "To time should not be empty",
  }),
});

function RequestPermission({ opened, closed }: any) {
  const [loading, setLoading] = useState(false);
  const { fetchData, data } = PermissionStore();
  const lead = localStorage.getItem("lead");
  const manager = localStorage.getItem("manager");
  const roleId = localStorage.getItem("roleId");
  const currentDate = new Date();

  const form = useForm({
    initialValues: {
      reason: "",
      date: "",
      fromTime: "",
      toTime: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(requestPermissionValidation),
  });

  async function applyPermission(values: typeof form.values) {
    setLoading(true);
    let permissionData = {
      reason: values.reason,
      date: moment(values.date).format("YYYY-MM-DD"),
      fromTime: values.fromTime,
      toTime: values.toTime,
      roleID: Number(roleId),
    };
    const result = await apiProvider.applyPermission(permissionData);
    if (result != null) {
      form.reset();
      closeModal();
      fetchData();
    }
    setLoading(false);
  }

  function closeModal() {
    form.reset();
    closed(false);
  }

  const remainingPermissionCount = useMemo(() => {
    const permissionCount = data?.data?.[0]?.userPermissionCount ?? 0;
    return 3 - permissionCount;
  }, [data]);

  return (
    <div className="w-full space-y-2">
      <CustomModalComponent
        opened={opened}
        title={"Apply Permission"}
        onClose={closeModal}
        loading={loading}
      >
        <form
          onSubmit={form.onSubmit(applyPermission)}
          className="flex flex-col space-y-7"
        >
          <div className="flex space-x-4">
            <TextInput
              label="Employee Name"
              placeholder="Employee Name"
              value={`${localStorage.getItem("firstName")}  ${localStorage.getItem("lastName")}`}
              readOnly
              variant="filled"
              className="w-1/2"
            />
            <TextInput
              label="Request To"
              value={roleId == "5" ? lead ?? "" : manager ?? ""}
              placeholder="Request To"
              variant="filled"
              readOnly
              className="w-1/2"
            />
          </div>
          <div className="flex space-x-4">
            <Select
              label="Department"
              placeholder="Select Department"
              value={localStorage.getItem("department") ?? ""}
              data={[localStorage.getItem("department") ?? ""]}
              variant="filled"
              readOnly
              className="w-1/2"
            />
            <TextInput
              label="Employee Code"
              placeholder="Employee Code"
              value={localStorage.getItem("code") ?? "None"}
              readOnly
              variant="filled"
              className="w-1/2"
            />
          </div>
          <DateInput
            {...form.getInputProps("date")}
            label="Permission Date"
            placeholder="Select date"
            variant="filled"
            withAsterisk
            minDate={currentDate}
            maxDate={
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            }
          />
          <TextInput
            label="Remaining Permission for This Month"
            placeholder="Remaining permission"
            value={remainingPermissionCount}
            readOnly
            variant="filled"
          />
          <div className="flex space-x-4">
            <TimeInput
              {...form.getInputProps("fromTime")}
              label="From Time"
              withAsterisk
              variant="filled"
              className="w-1/2"
            />
            <TimeInput
              label="To Time"
              withAsterisk
              variant="filled"
              {...form.getInputProps("toTime")}
              className="w-1/2"
            />
          </div>
          <Textarea
            variant="filled"
            radius="md"
            label="Reason for permission"
            placeholder="Enter reason"
            withAsterisk
            {...form.getInputProps("reason")}
          />
          {/* <Tooltip
            label={"Your permission limit has been exceeded for this month."}
            disabled={data?.data?.[0]?.userPermissionCount != 3}
          >
            <Button
              type="submit"
              variant="filled"
              disabled={data?.data?.[0]?.userPermissionCount == 3}
            >
              Submit
            </Button>
          </Tooltip> */}
          <Button type="submit" variant="filled">
            Submit
          </Button>
        </form>
      </CustomModalComponent>
    </div>
  );
}

export default RequestPermission;
