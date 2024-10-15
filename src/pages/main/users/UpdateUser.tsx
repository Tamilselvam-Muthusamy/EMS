import { Button, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import {
  updateUserValidation,
  updateUserValidationSchema,
} from "@src/models/AddUsermodal";
import apiProvider from "@src/network/apiProvider";
import { useEffect, useState } from "react";
import { UserStore } from "./UserStore";
import { IconEdit } from "@tabler/icons-react";
import CustomModalComponent from "@src/components/CustomModalComponent";

function UpdateUser({ userData }: any) {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(false);
  const {
    fetchRoleData,
    roleData,
    fetchData,
    fetchLastUserCode,
    lastUserData,
  } = UserStore();

  const form = useForm<updateUserValidationSchema>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      code: "",
      role: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(updateUserValidation),
  });
  async function updateUserData(values: any) {
    setLoading(true);
    const updateUserData = {
      firstname: values.firstName,
      lastName: values.lastName,
      email: values.email,
      code: values.code,
      mobile: values.mobile,
      roleID: +values.role,
      statusID: +values.status,
    };

    const result = await apiProvider.updateUser(updateUserData, userData?.id);
    if (result != null) {
      reset();
      fetchData();
    }
    setLoading(false);
  }

  function reset() {
    setOpen(false);
    form.reset();
  }

  function init() {
    setLoading(true);
    form.setFieldValue("firstName", userData?.firstName);
    form.setFieldValue("lastName", userData?.lastName);
    form.setFieldValue("email", userData?.email);
    form.setFieldValue("code", userData?.code);
    form.setFieldValue("mobile", userData?.mobile);
    form.setFieldValue("role", userData?.roleID.toString());
    setLoading(false);
  }

  useEffect(() => {
    if (open) {
      init();
      fetchRoleData();
      fetchLastUserCode();
    }
  }, [open]);

  return (
    <>
      <CustomModalComponent
        opened={open}
        onClose={reset}
        title={"Update Employee"}
        loading={loading}
      >
        <form
          className="flex flex-col space-y-5"
          onSubmit={form.onSubmit(updateUserData)}
        >
          <div className="flex space-x-2 w-full">
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              withAsterisk
              className="w-1/2"
              {...form.getInputProps("firstName")}
              variant="filled"
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              className="w-1/2"
              withAsterisk
              variant="filled"
              {...form.getInputProps("lastName")}
            />
          </div>
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter email"
            withAsterisk
            variant="filled"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Mobile"
            type="number"
            placeholder="Enter mobile number"
            withAsterisk
            variant="filled"
            {...form.getInputProps("mobile")}
          />

          <div className="flex flex-col space-y-1">
            <label className="flex  w-full justify-between">
              <p className="text-sm font-bold flex space-x-3">
                Code<p className="text-red-600">*</p>
              </p>
              <p className="text-gray-900 flex  justify-end tracking-wide">
                Last Employee Code:{" "}
                <span className="font-bold pl-2 tracking-wide">
                  {lastUserData?.code ?? "None"}
                </span>
              </p>
            </label>
            <TextInput
              placeholder="Enter code"
              {...form.getInputProps("code")}
              variant="filled"
            />
          </div>
          {userData?.roleName == "Admin" ? (
            <TextInput
              label="Role"
              readOnly
              placeholder="role"
              value={"Admin"}
              variant="filled"
            />
          ) : (
            <Select
              label="Role"
              variant="filled"
              placeholder="Select role"
              data={roleData?.map((e: any) => ({
                label: e.name,
                value: e.id.toString(),
              }))}
              withAsterisk
              comboboxProps={{
                transitionProps: { transition: "pop", duration: 200 },
              }}
              {...form.getInputProps("role")}
              readOnly
            />
          )}

          <Button type="submit">Submit</Button>
        </form>
      </CustomModalComponent>{" "}
      <Button
        leftSection={<IconEdit size={14} />}
        variant="light"
        size="compact-sm"
        color="orange"
        onClick={() => setOpen(true)}
        disabled={
          (userData?.roleID === 1 && (role === "HR" || role === "Manager")) ||
          (userData?.roleID === 2 && role == "HR")
        }
      >
        Edit
      </Button>
    </>
  );
}

export default UpdateUser;
