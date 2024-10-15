import { z } from "zod";

export const addDepartmentValidation = z.object({
  name: z.string().min(1, { message: "Department should not be empty" }),
  leadName: z.string().min(1, { message: "Lead should not be empty" }),
});

export const employeeMappingValidation = z.object({
  employees: z.array(z.string()).refine((value) => value.length >= 1, {
    message: "Select minimum one employee",
  }),
});

export type addDepartmentValidationSchema = z.infer<
  typeof addDepartmentValidation
>;
