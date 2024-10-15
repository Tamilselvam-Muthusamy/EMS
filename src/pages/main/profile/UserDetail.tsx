import { TextInput } from "@mantine/core";

function UserDetail() {
  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  let email = localStorage.getItem("email");
  let mobile = localStorage.getItem("mobile");
  let role = localStorage.getItem("role");
  let code = localStorage.getItem("code");
  const department = localStorage.getItem("department");

  return (
    <div className="px-4">
      <p className="flex w-full justify-center font-bold text-lg pb-4 tracking-wide">
        Personal Details
      </p>
      <div className="flex flex-col  space-y-5 items-center w-full">
        <div className="flex space-x-3 w-full">
          <TextInput
            variant="filled"
            label="First Name"
            className="w-1/2"
            value={firstName || "None"}
            readOnly
          />
          <TextInput
            variant="filled"
            label="Last Name"
            className="w-1/2"
            value={lastName || "None"}
          />
        </div>
        <div className="flex space-x-3 w-full">
          <TextInput
            variant="filled"
            label="Email"
            className="w-1/2"
            value={email || "None"}
            readOnly
          />
          <TextInput
            variant="filled"
            label="Role"
            readOnly
            className="w-1/2"
            value={role || "None"}
          />
        </div>
        <div className="flex space-x-3 w-full">
          <TextInput
            variant="filled"
            label="Department"
            readOnly
            className="w-1/2"
            value={department || "None"}
          />
          <TextInput
            variant="filled"
            label="Employee Code"
            readOnly
            className="w-1/2"
            value={code || "None"}
          />
        </div>
        <div className="flex space-x-3 w-full">
          <TextInput
            variant="filled"
            label="Mobile"
            placeholder="Enter mobile number"
            className="w-1/2"
            type="number"
            value={mobile || "None"}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
