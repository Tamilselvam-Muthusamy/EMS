import { z } from "zod";

export const sendOtpSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(1, { message: "Enter Password" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid Email"),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP should 6 characters long"),
});

export const otpValidationSchema = z.object({
  otp: z.string().length(6, "OTP should 6 characters long"),
});

export const passwordDetailsSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "New password should contain minimum 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.newPassword == value.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
