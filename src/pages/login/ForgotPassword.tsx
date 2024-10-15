import { useState } from "react";
import { Button, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm, zodResolver } from "@mantine/form";
import {
  forgotPasswordSchema,
  otpValidationSchema,
  passwordDetailsSchema,
} from "@src/models/auth";
import apiProvider from "@src/network/apiProvider";
import { ForgotPasswordLoaderState } from "../../models/enum";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ForgotPassowrd = () => {
  const [loadingState, setLoadingState] = useState(
    ForgotPasswordLoaderState.Idle
  );
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const emailForm = useForm<any>({
    initialValues: {
      email: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(forgotPasswordSchema),
  });

  const newPasswordDetailsForm = useForm({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(passwordDetailsSchema),
  });
  const verifyOtpForm = useForm({
    initialValues: {
      otp: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(otpValidationSchema),
  });

  const handleEmailSubmit = async (values: typeof emailForm.values) => {
    setLoadingState(ForgotPasswordLoaderState.SendingOtp);
    const response = await apiProvider.sendOtp({
      email: values.email,
    });
    if (response?.status) {
      setEmail(values.email);
      setIsSendOtp(true);
    }
    setLoadingState(ForgotPasswordLoaderState.Idle);
  };
  const handleverifyOtp = async (values: typeof verifyOtpForm.values) => {
    setLoadingState(ForgotPasswordLoaderState.VerifyingOtp);
    const response = await apiProvider.validateOtp({
      email: email,
      otp: values.otp,
    });
    if (response?.status) {
      setVerifyOtp(true);
      localStorage.setItem("token", response?.data?.token);
    }
    setLoadingState(ForgotPasswordLoaderState.Idle);
  };

  const handleOtpSubmit = async (
    values: typeof newPasswordDetailsForm.values
  ) => {
    setLoadingState(ForgotPasswordLoaderState.SubmitPassword);
    const response = await apiProvider.resetPassword({
      password: values.newPassword,
    });

    if (response?.status) {
      navigate("/");
    }
    setLoadingState(ForgotPasswordLoaderState.Idle);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <section className="background-pattern flex min-h-screen max-w-full flex-col items-center justify-center p-4">
      <motion.section
        className="w-full max-w-md rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-t-md bg-sky-500 px-2 py-4 text-center text-xl font-semibold tracking-wider text-white shadow-sm md:text-2xl">
          <span className="w-full">Employee Management System</span>
        </div>
        <section className="rounded-b-2xl bg-white px-8 pb-10 pt-6">
          {!isSendOtp ? (
            <form
              className="space-y-3"
              onSubmit={emailForm.onSubmit(handleEmailSubmit)}
            >
              <TextInput
                label="Email"
                placeholder="Enter email"
                className="w-full"
                {...emailForm.getInputProps("email")}
                withAsterisk
              />
              <Button
                type="submit"
                className="bg-sky-400"
                fullWidth
                loading={loadingState == ForgotPasswordLoaderState.SendingOtp}
              >
                Send OTP
              </Button>
              <Button variant="light" onClick={handleGoBack} fullWidth>
                Go Back
              </Button>
            </form>
          ) : isSendOtp && !verifyOtp ? (
            <form
              className="space-y-5"
              onSubmit={verifyOtpForm.onSubmit(handleverifyOtp)}
            >
              <div className="flex space-x-1">
                <label className="font-semibold">Enter OTP</label>{" "}
                <span className="text-red-500">*</span>
              </div>
              <PinInput
                size="xl"
                placeholder="-"
                length={6}
                type="number"
                {...verifyOtpForm.getInputProps("otp")}
              />
              <Button
                type="submit"
                className="bg-sky-400 mt-3"
                fullWidth
                loading={loadingState == ForgotPasswordLoaderState.VerifyingOtp}
              >
                Verify OTP
              </Button>
            </form>
          ) : verifyOtp ? (
            <form
              className="space-y-3"
              onSubmit={newPasswordDetailsForm.onSubmit(handleOtpSubmit)}
            >
              <PasswordInput
                label="New Password"
                placeholder="Enter new password"
                {...newPasswordDetailsForm.getInputProps("newPassword")}
                withAsterisk
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Enter  confirm password"
                {...newPasswordDetailsForm.getInputProps("confirmPassword")}
                withAsterisk
              />
              <Button
                type="submit"
                className="bg-sky-500"
                fullWidth
                loading={
                  loadingState == ForgotPasswordLoaderState.SubmitPassword
                }
              >
                Submit
              </Button>
            </form>
          ) : (
            <></>
          )}
        </section>
      </motion.section>
    </section>
  );
};

export default ForgotPassowrd;
