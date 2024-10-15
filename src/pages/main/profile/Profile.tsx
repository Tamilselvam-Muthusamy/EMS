import {
  Button,
  Card,
  LoadingOverlay,
  PasswordInput,
  Tabs,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import LayoutHeader from "@src/components/LayoutHeader";
import apiProvider from "@src/network/apiProvider";

import {
  IconPasswordUser,
  IconUserCog,
  IconUserScan,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { z } from "zod";
import UserDetail from "./UserDetail";
import KYCdetail from "./KYCdetail";

const passwordValidation = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Old password should not be empty" }),
    password: z
      .string()
      .min(6, { message: "New password should contain minimum 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password == value.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

function Profile() {
  let useref = useRef(null);
  const [loading, setLoading] = useState<any>(false);
  let email = localStorage.getItem("email");

  const form = useForm({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(passwordValidation),
  });

  async function changePassword(values: typeof form.values) {
    setLoading(true);
    const data = {
      email: email,
      oldPassword: values.oldPassword,
      newPassword: values.password,
    };
    const result = await apiProvider.changePassword(data);
    if (result != null) {
      form.reset();
    }
    setLoading(false);
  }

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        showSearchField={false}
        title="Profile"
        inputRef={useref}
        placeholder="Search user..."
        showAddButton={false}
        showFilterButton={false}
        onAddClick={() => {}}
        onFilterClick={() => {}}
        onSearchSubmit={() => {}}
      />
      <Tabs orientation="vertical" defaultValue="userDetails">
        <Tabs.List>
          <Tabs.Tab value="userDetails" leftSection={<IconUserCog size={30} />}>
            User Details
          </Tabs.Tab>
          <Tabs.Tab value="kycdetails" leftSection={<IconUserScan size={30} />}>
            KYC Details
          </Tabs.Tab>
          <Tabs.Tab
            value="changepassword"
            leftSection={<IconPasswordUser size={30} />}
          >
            Change Password
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="userDetails" className="p-2">
          <UserDetail />
        </Tabs.Panel>
        <Tabs.Panel value="kycdetails" className="p-2">
          <KYCdetail />
        </Tabs.Panel>

        <Tabs.Panel value="changepassword">
          <Card shadow="sm" padding={"lg"} radius={"md"} className="space-y-3 ">
            <p className="flex w-full justify-center font-bold text-lg tracking-wide">
              Change Password
            </p>
            <form
              onSubmit={form.onSubmit(changePassword)}
              className="w-full flex flex-col space-y-4 justify-center items-center "
            >
              <PasswordInput
                 data-autofocus
                label="Old Password"
                placeholder="Enter old password"
                withAsterisk
                className="w-1/2"
                variant="filled"
                {...form.getInputProps("oldPassword")}
              />
              <PasswordInput
                label="New Password"
                placeholder="Enter new password"
                withAsterisk
                className="w-1/2"
                variant="filled"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Enter confirm password"
                withAsterisk
                className="w-1/2"
                variant="filled"
                {...form.getInputProps("confirmPassword")}
              />
              <div className="w-full flex justify-center items-center mt-2">
                <Button type="submit">Submit</Button>
              </div>
            </form>
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
          </Card>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
export default Profile;
