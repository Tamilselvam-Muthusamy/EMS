import { Button, Select, Textarea, TextInput } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import CustomModalComponent from "@src/components/CustomModalComponent";
import apiProvider from "@src/network/apiProvider";
import { useEffect, useState } from "react";
import { requestPermissionValidation } from "./RequestPermission";
import { IconEdit } from "@tabler/icons-react";
import { PermissionStore } from "./PermissionStore";
import moment from "moment";

function UpdatePermission({ permissionData }: any) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { fetchData } = PermissionStore();
  const currentDate = new Date();

  const form = useForm<any>({
    initialValues: {
      reason: "",
      date: "",
      fromTime: "",
      toTime: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(requestPermissionValidation),
  });

  async function updatePermission(values: typeof form.values) {
    setLoading(true);
    let data = {
      reason: values.reason,
      date: moment(values.date).format("YYYY-MM-DD"),
      fromTime: values.fromTime,
      toTime: values.toTime,
    };
    const result = await apiProvider.updatePermission(data, permissionData.id);
    if (result != null) {
      form.reset();
      closeModal();
      fetchData();
    }
    setLoading(false);
  }

  function closeModal() {
    form.reset();
    setOpen(false);
  }

  function init() {
    form.setFieldValue("reason", permissionData?.reason);
    form.setFieldValue("fromTime", permissionData?.fromTime);
    form.setFieldValue("toTime", permissionData?.toTime);
    form.setFieldValue("date", new Date(permissionData?.date));
  }

  useEffect(() => {
    if (open) {
      init();
    }
  }, [open]);
  return (
    <>
      <CustomModalComponent
        opened={open}
        title={"Request Permission"}
        onClose={closeModal}
        loading={loading}
      >
        <form
          onSubmit={form.onSubmit(updatePermission)}
          className="flex flex-col space-y-7"
        >
          <div className="flex space-x-4">
            <Select
              label="Type"
              placeholder="Select Type"
              value={"Individual"}
              data={["Individual"]}
              variant="filled"
              className="w-1/2"
            />
            <Select
              label="Department"
              placeholder="Select Department"
              value={localStorage.getItem("department") ?? ""}
              data={[localStorage.getItem("department") ?? ""]}
              variant="filled"
              readOnly
              className="w-1/2"
            />
          </div>
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
              value={localStorage.getItem("lead") ?? "None"}
              placeholder="Request To"
              variant="filled"
              readOnly
              className="w-1/2"
            />
          </div>
          <TextInput
            label="Employee Code"
            placeholder="Employee Code"
            value={localStorage.getItem("code") ?? "None"}
            readOnly
            variant="filled"
          />
          <DateInput
            {...form.getInputProps("date")}
            label="Pick Date"
            placeholder="Pick Date"
            variant="filled"
            minDate={currentDate}
            maxDate={
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            }
            withAsterisk
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
          <Button type="submit" variant="filled">
            Submit
          </Button>
        </form>
      </CustomModalComponent>
      <Button
        color="orange"
        variant="light"
        size="compact-sm"
        leftSection={<IconEdit size={14} />}
        onClick={() => setOpen(true)}
        disabled={
          permissionData?.isApproved || permissionData?.isApproved == false
        }
      >
        Edit
      </Button>
    </>
  );
}

export default UpdatePermission;
