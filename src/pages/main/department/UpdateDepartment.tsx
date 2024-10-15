import { Button, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { DepartmentStore } from "./DepartmentStore";
import {
  addDepartmentValidation,
  addDepartmentValidationSchema,
} from "@src/models/AddDepartmentmodal";
import apiProvider from "@src/network/apiProvider";
import { IconEdit } from "@tabler/icons-react";
import CustomModalComponent from "@src/components/CustomModalComponent";

function UpdateDepartment({ DepartmentValue }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<addDepartmentValidationSchema>({
    initialValues: {
      name: "",
      leadName: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(addDepartmentValidation),
  });
  const {
    fetchUpdateLeadUsers,
    updateLeadUserData,
    fetchData: fetchDepartmentData,
  } = DepartmentStore();

  async function UpdateDepartment(values: typeof form.values) {
    setLoading(true);
    const data = {
      name: values.name,
      leadId: +values.leadName,
    };
    const result = await apiProvider.updateDepartment(
      data,
      DepartmentValue?.id
    );
    if (result != null) {
      reset();
      fetchDepartmentData();
    }
    setLoading(false);
  }

  function init() {
    form.setFieldValue("name", DepartmentValue?.name);
    form.setFieldValue("leadName", DepartmentValue?.leadID?.toString());
  }

  useEffect(() => {
    if (open) {
      const data = {
        userId: DepartmentValue?.leadID,
        departmentId: DepartmentValue?.id,
      };
      fetchUpdateLeadUsers(data);
      init();
    }
  }, [open]);

  function reset() {
    form.reset();
    setOpen(false);
  }
  return (
    <>
      <CustomModalComponent
        opened={open}
        onClose={reset}
        title={"Update Department"}
        loading={loading}
      >
        <form
          className="flex flex-col space-y-5"
          onSubmit={form.onSubmit(UpdateDepartment)}
        >
          <TextInput
            label="Department Name"
            placeholder="Enter department name"
            withAsterisk
            {...form.getInputProps("name")}
            variant="filled"
          />

          <Select
            label="Lead Name"
            placeholder="Select lead name"
            data={updateLeadUserData?.map((e: any) => ({
              label: e.name,
              value: e.id.toString(),
            }))}
            withAsterisk
            searchable
            allowDeselect={false}
            nothingFoundMessage="No data found"
            {...form.getInputProps("leadName")}
            variant="filled"
          />
          <Button type="submit">Submit</Button>
        </form>
      </CustomModalComponent>
      <Button
        leftSection={<IconEdit size={14} />}
        variant="light"
        size="compact-sm"
        color="orange"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
    </>
  );
}

export default UpdateDepartment;
