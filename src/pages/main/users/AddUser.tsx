import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import {
  addUserValidatiionSchema,
  addUserValidation,
} from "@src/models/AddUsermodal";
import apiProvider from "@src/network/apiProvider";
import { useEffect, useState } from "react";
import { UserStore } from "./UserStore";
import CustomModalComponent from "@src/components/CustomModalComponent";

function AddUser({ opened, closed }: any) {
  const [loading, setLoading] = useState(false);
  const {
    fetchRoleData,
    roleData,
    fetchData,
    fetchLastUserCode,
    lastUserData,
  } = UserStore();

  const form = useForm<addUserValidatiionSchema>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      code: "",
      role: "",
      password: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(addUserValidation),
  });
  async function createUserData(values: any) {
    setLoading(true);
    const userData = {
      firstname: values.firstName,
      lastName: values.lastName,
      email: values.email,
      code: values.code,
      mobile: values.mobile,
      password: values.password,
      roleID: +values.role,
    };
    const result = await apiProvider.createUser(userData);
    if (result != null) {
      reset();
      fetchData();
    }
    setLoading(false);
  }

  function reset() {
    closed(false);
    form.reset();
  }

  useEffect(() => {
    if (opened) {
      fetchRoleData();
      fetchLastUserCode();
    }
  }, [opened]);

  return (
    <CustomModalComponent
      opened={opened}
      onClose={reset}
      title={"Add Employee"}
      loading={loading}
    >
      <form
        className="flex flex-col space-y-5"
        onSubmit={form.onSubmit(createUserData)}
      >
        <div className="flex space-x-2 w-full">
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            withAsterisk
            className="w-1/2"
            data-autofocus
            {...form.getInputProps("firstName")}
            variant="filled"
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last Name"
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
        <PasswordInput
          label="Password"
          placeholder="Enter placeholder"
          withAsterisk
          variant="filled"
          {...form.getInputProps("password")}
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
        <Select
          label="Role"
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
          searchable
          clearable={false}
          nothingFoundMessage="No data found"
          variant="filled"
        />

        <Button type="submit">Submit</Button>
      </form>
    </CustomModalComponent>
  );
}

export default AddUser;
