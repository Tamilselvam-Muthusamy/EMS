import { z } from "zod";

export const KYCDeatailsValidation = z.object({
  dob: z.date({ message: "Date of birth should not be empty" }),
  pan: z.string().min(5, { message: "Pan number should not be empty" }),
  aadhar: z.string().min(12, { message: "Aadhar number should not be empty" }),
  bank: z.string().min(5, { message: "Account number should not be empty" }),
  ifsc: z.string().min(1, { message: "IFSC code should not be empty" }),
  city: z.string().min(1, { message: "City should not be empty" }),
  address: z.string().min(1, { message: "Address should not be empty" }),
  college: z.string().min(1, { message: "College should not be empty" }),
  degree: z.string().min(1, { message: "Degree should not be empty" }),
  dateOfJoin: z.date({ message: "Date of join should not be empty" }),
  designation: z
    .string()
    .min(1, { message: "Designation should not be empty" }),
  experience: z.string().min(1, { message: "Experience should not be empty" }),
});

export type KYCValidationSchema = z.infer<typeof KYCDeatailsValidation>;
