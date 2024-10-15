import { Button, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { DepartmentStore } from "./DepartmentStore";
import {
  addDepartmentValidation,
  addDepartmentValidationSchema,
} from "@src/models/AddDepartmentmodal";
import apiProvider from "@src/network/apiProvider";
import CustomModalComponent from "@src/components/CustomModalComponent";

function AddDepartment({ opened, closed }: any) {
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
    fetchLeadUsers,
    leadUserData,
    fetchData: fetchDepartmentData,
  } = DepartmentStore();

  async function createDepartment(values: typeof form.values) {
    setLoading(true);
    const data = {
      name: values.name,
      leadId: +values.leadName,
    };
    const result = await apiProvider.createDepartment(data);
    if (result != null) {
      reset();
      fetchDepartmentData();
    }
    setLoading(false);
  }

  function reset() {
    closed(false);
    form.reset();
  }

  useEffect(() => {
    if (opened) {
      fetchLeadUsers();
    }
  }, [opened]);
  return (
    <CustomModalComponent
      opened={opened}
      onClose={reset}
      title={"Add Department"}
      loading={loading}
    >
      <form
        className="flex flex-col space-y-5"
        onSubmit={form.onSubmit(createDepartment)}
      >
        <TextInput
          label="Department Name"
          placeholder="Enter department name"
          withAsterisk
          data-autofocus
          {...form.getInputProps("name")}
          variant="filled"
        />
        <Select
          label="Lead Name"
          placeholder="Select lead"
          data={leadUserData?.map((e: any) => ({
            label: e.name,
            value: e.id.toString(),
          }))}
          withAsterisk
          searchable
          nothingFoundMessage="No data found"
          {...form.getInputProps("leadName")}
          variant="filled"
        />
        <Button type="submit">Submit</Button>
      </form>
    </CustomModalComponent>
  );
}

export default AddDepartment;
