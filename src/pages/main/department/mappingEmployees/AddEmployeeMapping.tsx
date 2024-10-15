import { Button, MultiSelect } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { employeeMappingValidation } from "@src/models/AddDepartmentmodal";
import { useEffect, useState } from "react";
import CustomModalComponent from "@src/components/CustomModalComponent";
import apiProvider from "@src/network/apiProvider";
import { EmployeeMappingStore } from "./EmployeeMappingStore";
import { useParams } from "react-router-dom";

function AddEmployeeMapping({ opened, closed }: any) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { fetchEmployees, employeeData, fetchData } = EmployeeMappingStore();
  const form = useForm({
    initialValues: {
      employees: [],
    },
    validateInputOnChange: true,
    validate: zodResolver(employeeMappingValidation),
  });

  async function mapEmployee(values: typeof form.values) {
    setLoading(true);
    const employeesId = values.employees.map(Number);
    const data = {
      userIDs: employeesId,
    };
    const result = await apiProvider.mappingEmployee(data, Number(id));
    if (result != null) {
      reset();
      fetchData(Number(id));
    }

    setLoading(false);
  }

  useEffect(() => {
    if (opened) {
      fetchEmployees(id);
    }
  }, [opened]);

  function reset() {
    form.reset();
    closed(false);
  }
  return (
    <>
      <CustomModalComponent
        opened={opened}
        onClose={reset}
        title={"Assigning Employees"}
        loading={loading}
      >
        <form
          className="flex flex-col space-y-5"
          onSubmit={form.onSubmit(mapEmployee)}
        >
          <MultiSelect
            label="Select Employees"
            placeholder="Select employee"
            data={employeeData?.map((e: any) => ({
              label: e.name,
              value: e.id.toString(),
            }))}
            searchable
            nothingFoundMessage="Nothing found..."
            withAsterisk
            {...form.getInputProps("employees")}
            variant="filled"
          />
          <Button fullWidth type="submit">
            Submit
          </Button>
        </form>
      </CustomModalComponent>
    </>
  );
}

export default AddEmployeeMapping;
