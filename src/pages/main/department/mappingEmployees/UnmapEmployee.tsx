import { Button, Group, LoadingOverlay, Select, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import apiProvider from "@src/network/apiProvider";
import { IconUserMinus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmployeeMappingStore } from "./EmployeeMappingStore";
import { DepartmentStore } from "../DepartmentStore";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import CustomModalComponent from "@src/components/CustomModalComponent";

const newLeadValidation = z.object({
  leadName: z.string().refine((value) => value.length > 0 && value != null, {
    message: "New lead should not be empty",
  }),
});

function UnmapEmployee({ employeeData, dataCount }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = EmployeeMappingStore();
  const { id } = useParams();
  const { fetchLeadUsers, leadUserData, fetchUnMappedHR } = DepartmentStore();
  const [roleName, setRoleName] = useState(null);
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      leadName: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(newLeadValidation),
  });

  function reset() {
    form.reset();
    setOpened(false);
  }

  useEffect(() => {
    if (opened) {
      if (roleName == "Department Lead") {
        fetchLeadUsers();
      } else {
        fetchUnMappedHR();
      }
    }
  }, [opened]);

  async function unmapEmployee(values?: typeof form.values) {
    setIsLoading(true);
    const data = {
      userID: employeeData?.userID,
      leadID: values?.leadName ? Number(values.leadName) : undefined,
    };

    const response = await apiProvider.unMapEmployee(data);
    if (response != null) {
      modals.closeAll();
      setOpened(false);
      reset();
      fetchData(Number(id));
    }
    setIsLoading(false);
  }

  const openConfirmationModal = (role: any) => {
    setRoleName(role);
    if (role == "Department Lead" || (role == "HR" && dataCount.length == 1)) {
      setOpened(true);
    } else {
      modals.open({
        title: "Unassign Employee",
        padding: "lg",
        centered: true,
        overlayProps: { backgroundOpacity: 0.2, blur: 1 },
        yOffset: 30,
        children: (
          <>
            <LoadingOverlay visible={isLoading} />
            <Text c="gray">Are you sure you want unassign this employee?</Text>
            <Group className="flex justify-end">
              <Button
                variant="default"
                onClick={() => modals.closeAll()}
                mt="md"
              >
                No
              </Button>
              <Button
                style={{ backgroundColor: "primary", color: "white" }}
                onClick={() => unmapEmployee()}
                mt="md"
                loading={isLoading}
              >
                Yes
              </Button>
            </Group>
          </>
        ),
      });
    }
  };

  return (
    <>
      <CustomModalComponent
        opened={opened}
        onClose={() => reset()}
        title={
          roleName == "Department Lead" ? "Assign New Lead" : "Assign New HR"
        }
        loading={false}
      >
        {roleName == "Department Lead" ? (
          <p className=" tracking-wide pb-3 text-gray-600">
            <span className="pr-1 text-black">Note:</span>Please assign a new
            lead before unmapping the current lead.
          </p>
        ) : (
          <p className=" tracking-wide pb-3 text-gray-600">
            <span className="pr-1 text-black">Note:</span>Please assign a new HR
            before unmapping the current HR.
          </p>
        )}

        <form onSubmit={form.onSubmit(unmapEmployee)}>
          <Select
            label={
              roleName == "Department Lead" ? "New Lead Name" : "New HR Name"
            }
            placeholder={
              roleName == "Department Lead"
                ? "Select new lead"
                : "Select new HR"
            }
            data={leadUserData?.map((e: any) => ({
              label: e.name,
              value: e?.id.toString(),
            }))}
            withAsterisk
            searchable
            nothingFoundMessage="No data found"
            variant="filled"
            {...form.getInputProps("leadName")}
          />
          <Button fullWidth type="submit" className="mt-3">
            Submit
          </Button>
        </form>
      </CustomModalComponent>
      <Button
        leftSection={<IconUserMinus size={14} />}
        variant="light"
        size="compact-sm"
        color="red"
        onClick={() => openConfirmationModal(employeeData?.role)}
      >
        Unassign Employee
      </Button>
    </>
  );
}

export default UnmapEmployee;
