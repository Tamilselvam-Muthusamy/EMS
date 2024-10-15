import { useContext, useState } from "react";
import { TextInput, Button, Loader, PasswordInput } from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm, zodResolver } from "@mantine/form";
import { SendOtpInput, sendOtpSchema } from "@src/models/auth";
import apiProvider from "@src/network/apiProvider";
import { AuthContext } from "@src/context/AuthContext";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const emailForm = useForm<SendOtpInput>({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnChange: true,
    validate: zodResolver(sendOtpSchema),
  });

  const handleEmailSubmit = async (values: typeof emailForm.values) => {
    setIsLoading(true);
    const response = await apiProvider.login({
      email: values.email,
      password: values.password,
    });

    if (response?.status) {
      authContext?.login(response?.data);
      setIsLoading(false);
      navigate("/dashboard");
    } else {
      setIsLoading(false);
    }
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
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              {...emailForm.getInputProps("password")}
              withAsterisk
            />
            <div
              className="flex justify-end text-sky-400 text-sm hover:underline hover:cursor-pointer"
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password?
            </div>
            <Button type="submit" size="md" className="bg-sky-500" fullWidth>
              {isLoading ? (
                <Loader color="rgba(255, 255, 255, 1)" size="sm" />
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </section>
      </motion.section>
    </section>
  );
};

export default Login;
