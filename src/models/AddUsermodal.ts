import { z } from "zod";

export const addUserValidation = z.object({
  firstName: z.string().min(1, { message: "First name should not be empty" }),
  lastName: z.string().min(1, { message: "Last name should not be empty" }),
  email: z.string().min(1, { message: "Email should not be empty" }).email(),
  password: z
    .string()
    .min(6, { message: "Password should contain minimum 6 characters" }),
  mobile: z
    .string()
    .min(10, { message: "Mobile number should contain 10 digits" })
    .max(10, { message: "Mobile number should contain more than 10 digits" }),
  code: z.string().min(1, { message: "Code should not be empty" }),
  role: z
    .string()
    .nullable()
    .refine((value) => value != null && value.length > 0, {
      message: "Role should not be empty",
    }),
});

export const updateUserValidation = addUserValidation.omit({ password: true });
export type addUserValidatiionSchema = z.infer<typeof addUserValidation>;
export type updateUserValidationSchema = z.infer<typeof updateUserValidation>;
