import { Textarea, TextInput } from "@mantine/core";
import apiProvider from "@src/network/apiProvider";
import moment from "moment";
import { useEffect, useState } from "react";

function KYCdetail() {
  const userId = localStorage.getItem("id");
  const [data, setData] = useState<any>(null);

  async function fetchExistingKycDetails() {
    let data = {
      userID: userId,
    };
    const result = await apiProvider.fetchExistingUserDetails(data);
    if (result != null) {
      setData(result?.data);
    }
  }

  useEffect(() => {
    fetchExistingKycDetails();
  }, []);
  return (
    <div className="flex flex-col space-y-5 w-full px-4">
      <p className="flex w-full justify-center font-bold text-lg tracking-wider">
        KYC Details
      </p>

      <div className="w-full flex space-x-3">
        <TextInput
          variant="filled"
          label="College"
          placeholder="Enter college"
          className="w-1/2"
          value={data?.college ?? "None"}
          readOnly
        />
        <TextInput
          variant="filled"
          label="Degree"
          placeholder="Enter degree"
          className="w-1/2"
          value={data?.degree ?? "None"}
          readOnly
        />
      </div>
      <div className="w-full flex space-x-3">
        <TextInput
          label="Date of Birth"
          placeholder="Select DOB"
          value={data?.dob ? moment(data.dob).format("YYYY-MM-DD") : "None"}
          variant="filled"
          className="w-1/2"
          readOnly
        />
        <TextInput
          label="Date of Joining"
          placeholder="Select Date"
          value={
            data?.dateOfJoining
              ? moment(data.dateOfJoining).format("YYYY-MM-DD")
              : "None"
          }
          className="w-1/2"
          variant="filled"
        />
      </div>
      <div className="w-full flex space-x-3">
        <TextInput
          variant="filled"
          label="Years of Experience"
          placeholder="Enter experience"
          className="w-1/2"
          value={data?.experience ?? "None"}
          readOnly
        />
        <TextInput
          variant="filled"
          label="Designation"
          placeholder="Enter designation"
          className="w-1/2"
          value={data?.designation ?? "None"}
          readOnly
        />
      </div>
      <div className="w-full flex space-x-3">
        <TextInput
          variant="filled"
          label="Pan Number"
          placeholder="Enter pan number"
          className="w-1/2 "
          value={data?.panNumber ?? "None"}
          readOnly
        />
        <TextInput
          variant="filled"
          label="Aadhar Number"
          placeholder="Enter aadhar number"
          className="w-1/2 "
          value={data?.aadharNumber ?? "None"}
          readOnly
        />
      </div>
      <div className="w-full flex space-x-3">
        <TextInput
          variant="filled"
          label="Bank A/C Number"
          placeholder="Enter account number"
          className="w-1/2 "
          value={data?.bankAccountNumber ?? "None"}
          readOnly
        />
        <TextInput
          variant="filled"
          label="IFSC Code"
          placeholder="Enter IFSC code"
          className="w-1/2 "
          value={data?.ifscCode ?? "None"}
          readOnly
        />
      </div>
      <div className="w-full flex space-x-3">
        <TextInput
          variant="filled"
          label="City"
          placeholder="Enter City"
          className="w-1/2"
          value={data?.city ?? "None"}
          readOnly
        />
        <Textarea
          variant="filled"
          label="Address"
          placeholder="Enter address"
          className="w-1/2"
          value={data?.address ?? "None"}
          readOnly
        />
      </div>
    </div>
  );
}

export default KYCdetail;
