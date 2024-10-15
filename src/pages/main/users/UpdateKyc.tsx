import { Button, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import CustomModalComponent from "@src/components/CustomModalComponent";
import { KYCDeatailsValidation } from "@src/models/Kycdetail";
import apiProvider from "@src/network/apiProvider";
import { IconUserScan } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { UserStore } from "./UserStore";

function UpdateKyc({ userData }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const { fetchData } = UserStore();
  const role = localStorage.getItem("role");

  const form = useForm<any>({
    initialValues: {
      dob: "",
      pan: "",
      aadhar: "",
      bank: "",
      ifsc: "",
      city: "",
      address: "",
      college: "",
      degree: "",
      designation: "",
      experience: "",
      dateOfJoin: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(KYCDeatailsValidation),
  });

  function init() {
    form.setValues({
      dob: data?.dob ? new Date(data?.dob) : null,
      pan: data?.panNumber ?? "",
      aadhar: data?.aadharNumber ?? "",
      bank: data?.bankAccountNumber ?? "",
      ifsc: data?.ifscCode ?? "",
      city: data?.city ?? "",
      address: data?.address ?? "",
      college: data?.college ?? "",
      degree: data?.degree ?? "",
      designation: data?.designation ?? "",
      experience: data?.experience ?? "",
      dateOfJoin: data?.dateOfJoining ? new Date(data?.dateOfJoining) : null,
    });
  }

  async function fetchExistingKycDetails() {
    let data = {
      userID: userData?.id,
    };
    const result = await apiProvider.fetchExistingUserDetails(data);
    if (result != null) {
      setData(result?.data);
    }
  }

  useEffect(() => {
    if (open) {
      fetchExistingKycDetails();
    }
  }, [open]);
  useEffect(() => {
    init();
  }, [data]);

  async function updateKycDetails(values: typeof form.values) {
    setLoading(true);
    const data = {
      userID: userData?.id,
      dateOfJoining: values.dateOfJoin,
      experience: values.experience,
      designation: values.designation,
      dob: values.dob,
      panNumber: values.pan,
      aadharNumber: values.aadhar,
      bankAccountNumber: values.bank,
      ifscCode: values.ifsc,
      city: values.city,
      address: values.address,
      degree: values.degree,
      college: values.college,
    };
    const result = await apiProvider.createUserProfileDetails(data);
    if (result != null) {
      setOpen(false);
      fetchData();
    }
    setLoading(false);
  }

  function reset() {
    setOpen(false);
    form.reset();
  }
  return (
    <>
      <CustomModalComponent
        opened={open}
        onClose={reset}
        title={"Update KYC"}
        loading={loading}
      >
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.onSubmit(updateKycDetails)}
        >
          <div className="w-full flex space-x-3">
            <TextInput
              variant="filled"
              label="College"
              placeholder="Enter college"
              className="w-1/2"
              {...form.getInputProps("college")}
              withAsterisk
            />
            <TextInput
              variant="filled"
              label="Degree"
              placeholder="Enter degree"
              className="w-1/2"
              {...form.getInputProps("degree")}
              withAsterisk
            />
          </div>
          <div className="w-full flex space-x-3">
            <DateInput
              label="Date of Birth"
              placeholder="Select DOB"
              valueFormat="YYYY MMM DD"
              {...form.getInputProps("dob")}
              variant="filled"
              className="w-1/2"
              withAsterisk
            />
            <DateInput
              label="Date of Joining"
              placeholder="Select Date"
              valueFormat="YYYY MMM DD"
              {...form.getInputProps("dateOfJoin")}
              className="w-1/2"
              variant="filled"
              withAsterisk
            />
          </div>
          <div className="w-full flex space-x-3">
            <TextInput
              variant="filled"
              label="Years of Experience"
              placeholder="Enter experience"
              className="w-1/2"
              type="number"
              {...form.getInputProps("experience")}
              withAsterisk
            />
            <TextInput
              variant="filled"
              label="Designation"
              placeholder="Enter designation"
              className="w-1/2"
              {...form.getInputProps("designation")}
              withAsterisk
            />
          </div>
          <div className="w-full flex space-x-3">
            <TextInput
              variant="filled"
              label="Pan Number"
              placeholder="Enter pan number"
              className="w-1/2 "
              {...form.getInputProps("pan")}
              withAsterisk
            />
            <TextInput
              variant="filled"
              label="Aadhar Number"
              type="number"
              placeholder="Enter aadhar number"
              className="w-1/2 "
              {...form.getInputProps("aadhar")}
              withAsterisk
            />
          </div>
          <div className="w-full flex space-x-3">
            <TextInput
              variant="filled"
              label="Bank A/C Number"
              placeholder="Enter account number"
              className="w-1/2 "
              {...form.getInputProps("bank")}
              withAsterisk
            />
            <TextInput
              variant="filled"
              label="IFSC Code"
              placeholder="Enter IFSC code"
              className="w-1/2 "
              {...form.getInputProps("ifsc")}
              withAsterisk
            />
          </div>
          <div className="w-full flex space-x-3">
            <TextInput
              variant="filled"
              label="City"
              placeholder="Enter City"
              className="w-1/2"
              {...form.getInputProps("city")}
              withAsterisk
            />
            <Textarea
              variant="filled"
              label="Address"
              placeholder="Enter address"
              className="w-1/2"
              {...form.getInputProps("address")}
              withAsterisk
            />
          </div>

          <Button className="mt-3" type="submit">
            Submit
          </Button>
        </form>
      </CustomModalComponent>
      <Button
        leftSection={<IconUserScan size={20} />}
        variant="light"
        size="compact-sm"
        color="blue"
        onClick={() => setOpen(true)}
        disabled={
          (userData?.roleID == 1 && role == "Manager") ||
          (userData?.roleID == 1 && role == "HR") ||
          (userData?.roleID == 2 && role == "HR")
        }
      >
        Update KYC
      </Button>
    </>
  );
}

export default UpdateKyc;
