import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import CustomModalComponent from "@src/components/CustomModalComponent";
import apiProvider from "@src/network/apiProvider";
import { IconChecks } from "@tabler/icons-react";
import { useState } from "react";
import { ApproveNoticeStore } from "./ApproveNoticeStore";

function ApproveNoticeRequest({ noticeData }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchData } = ApproveNoticeStore();
  const form = useForm({
    initialValues: {
      days: "",
    },
    validateInputOnChange: true,
    validate: {
      days: (value: any) =>
        value.length < 1 ? "Enter Notice serving days" : null,
    },
  });

  async function approveNotice(values: typeof form.values) {
    setLoading(true);
    const data = {
      serveDays: +values.days,
      departmentMemberID: noticeData?.departmentMemberID,
    };
    const result = await apiProvider.approveNotice(data);
    if (result != null) {
      setOpen(false);
      fetchData();
      form.reset();
    }
    setLoading(false);
  }
  return (
    <>
      <CustomModalComponent
        opened={open}
        onClose={() => setOpen(false)}
        title={"Approve Notice"}
        loading={loading}
      >
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.onSubmit(approveNotice)}
        >
          <TextInput
            label="Notice Serving Days"
            placeholder="Enter days in number"
            withAsterisk
            data-autofocus
            type="number"
            {...form.getInputProps("days")}
          />
          <Button fullWidth type="submit">
            Submit
          </Button>
        </form>
      </CustomModalComponent>
      <Button
        leftSection={<IconChecks size={14} />}
        variant="light"
        size="compact-sm"
        color="green"
        onClick={() => setOpen(true)}
      >
        Approve Notice
      </Button>
    </>
  );
}

export default ApproveNoticeRequest;
