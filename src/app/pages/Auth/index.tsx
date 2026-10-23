import { useNavigate } from "react-router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button, Card, Checkbox, Input } from "@/components/ui";
import { APP_LOGO } from "@/constants/app";
import { AuthFormValues, schema } from "./schema";
import { Page } from "@/components/shared/Page";
import { useAuthContext } from "@/app/contexts/auth/context";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    try {
      await login({ username: data.username, password: data.password });
      // OTP email bhej diya gaya hai, ab OTP page pe le jao
      navigate("/otp");
    } catch (error) {
      // error toast context ke login() ke andar hi dikha diya jaata hai
      console.log(error);
    }
  };

  return (
    <Page title="Login">
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-200">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 min-h-screen">

            <div className="flex items-center justify-center bg-white dark:bg-dark-100 p-8">

              <Card className="w-full max-w-md p-8">

                <div className="flex justify-center mb-8">
                  <img
                    src={APP_LOGO}
                    className="h-14"
                    alt="Logo"
                  />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                  <div className="space-y-5">

                    <Input
                      label="Email"
                      placeholder="Enter Email"
                      prefix={<EnvelopeIcon className="size-5" />}
                      {...register("username")}
                      error={errors.username?.message}
                    />

                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter Password"
                      prefix={<LockClosedIcon className="size-5" />}
                      {...register("password")}
                      error={errors.password?.message}
                    />

                  </div>

                  <div className="flex justify-between mt-4">
                    <Checkbox label="Remember me" />

                    <a
                      href="#"
                      className="text-sm text-blue-600"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <Button
                    className="w-full mt-6"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>

                </form>

              </Card>

            </div>

            <div className="hidden lg:block relative">
              <img
                src="/images/ammar/login.jpeg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Login"
              />
            </div>

          </div>
        </div>
      </main>
    </Page>
  );
}