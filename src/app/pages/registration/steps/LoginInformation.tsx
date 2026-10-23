// Import Dependencies
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

// Local Imports
import { Input } from "@/components/ui";
import { useAddProductFormContext } from "../AddProductFormContext";
import { loginSchema, LoginType } from "../schema";
import { StepActions } from "../components/StepActions";
import { Post, toastsuccessmsg, toasterrormsg } from "@/ApiHelper";

// ----------------------------------------------------------------------

export function LoginInformation({
  setCurrentStep,
  setFinished,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { state, dispatch } = useAddProductFormContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
    defaultValues: state.formData.login,
  });

  const onSubmit = async (data: LoginType) => {
    setLoading(true);

    const { confirmPassword, ...loginPayload } = data;

    const payload = {
      ...state.formData.company,
      ...state.formData.business,
      ...data,
    };

    try {
      const response = await Post("master/company/create", payload, false);

      if (response?.data?.status === 200) {
        dispatch({ type: "SET_FORM_DATA", payload: { login: data } });
        dispatch({
          type: "SET_STEP_STATUS",
          payload: { login: { isDone: true } },
        });
        toastsuccessmsg(response?.data?.message || "Registration submitted successfully");
        setFinished(true);
      } else {
        toasterrormsg(response?.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      // agar backend HTTP error status (4xx/5xx) bhejta hai to ye catch me aayega
      toasterrormsg(
        error?.response?.data?.message || "Failed to submit registration",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex grow flex-col"
    >
      <div className="grow space-y-4">
        <Input
          {...register("companyEmail")}
          label="Company Email ID"
          type="email"
          placeholder="Enter company email"
          prefix={<EnvelopeIcon className="size-5" strokeWidth="1" />}
          error={errors.companyEmail?.message}
        />
        <Input
          {...register("password")}
          label="Password"
          type="password"
          placeholder="Enter password"
          prefix={<LockClosedIcon className="size-5" strokeWidth="1" />}
          error={errors.password?.message}
        />
        <Input
          {...register("confirmPassword")}
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          prefix={<LockClosedIcon className="size-5" strokeWidth="1" />}
          error={errors.confirmPassword?.message}
        />
      </div>

      <StepActions
        showPrevious
        onPrevious={() => setCurrentStep(1)}
        onCancel={() => navigate("/dashboards/home")}
        submitLabel="Submit Registration"
        loading={loading}
      />
    </form>
  );
}