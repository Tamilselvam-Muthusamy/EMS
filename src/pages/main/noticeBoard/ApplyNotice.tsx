import { Button, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import CustomModalComponent from "@src/components/CustomModalComponent";
import apiProvider from "@src/network/apiProvider";
import { useState } from "react";
import { z } from "zod";
import { NoticeBoardStore } from "./NoticeBoardStore";

const ApplyNoticeValidation = z.object({
  remarks: z.string().min(4, { message: "Remarks should not be empty" }),
});

function ApplyNotice({ opened, closed }: any) {
  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  let code = localStorage.getItem("code");
  const department = localStorage.getItem("department");
  const [loading, setLoading] = useState(false);
  const { fetchData } = NoticeBoardStore();
  const form = useForm({
    initialValues: {
      remarks: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(ApplyNoticeValidation),
  });
  function closeModal() {
    form.reset();
    closed(false);
  }

  async function applyNotice(values: typeof form.values) {
    setLoading(true);
    let data = {
      remarks: values.remarks,
    };
    const result = await apiProvider.applyNotice(data);
    if (result != null) {
      closeModal();
      fetchData();
    }
    setLoading(false);
  }
  return (
    <>
      <CustomModalComponent
        opened={opened}
        title={"Apply Notice"}
        onClose={closeModal}
        loading={loading}
      >
        <form
          className="w-full flex flex-col space-y-5"
          onSubmit={form.onSubmit(applyNotice)}
        >
          <TextInput
            variant="filled"
            label="Employee Name"
            value={`${firstName} ${lastName}`}
          />
          <TextInput
            variant="filled"
            label="Employee Code"
            readOnly
            value={code ?? "None"}
          />
          <TextInput
            variant="filled"
            label="Departmnet"
            value={department ?? "None"}
          />
          <Textarea
            variant="filled"
            label="Remarks"
            withAsterisk
            {...form.getInputProps("remarks")}
          />
          <Button type="submit">Apply</Button>
        </form>
      </CustomModalComponent>
    </>
  );
}

export default ApplyNotice;
