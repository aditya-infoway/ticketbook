// Import Dependencies
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";

// Local Imports
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Listbox } from "@/components/shared/form/StyledListbox";
import { Input } from "@/components/ui";
import { useAddProductFormContext } from "../AddProductFormContext";
import { businessTypes, employeeSizes } from "../constants";
import { businessSchema, BusinessType } from "../schema";
import { StepActions } from "../components/StepActions";

// ----------------------------------------------------------------------

export function BusinessInformation({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setFinished?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { state, dispatch } = useAddProductFormContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BusinessType>({
    resolver: yupResolver(businessSchema),
    defaultValues: state.formData.business,
  });

  const onSubmit = (data: BusinessType) => {
    dispatch({ type: "SET_FORM_DATA", payload: { business: data } });
    dispatch({ type: "SET_STEP_STATUS", payload: { business: { isDone: true } } });
    setCurrentStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex grow flex-col"
    >
      <div className="grow space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="registrationDate"
            render={({ field: { value, onChange, ...rest } }) => (
              <DatePicker
                value={value || ""}
                onChange={(_, dateStr) => onChange(dateStr)}
                options={{ dateFormat: "Y-m-d" }}
                label="Registration Date"
                placeholder="Select registration date"
                error={errors.registrationDate?.message}
                {...rest}
              />
            )}
          />
          <Controller
            control={control}
            name="expiryDate"
            render={({ field: { value, onChange, ...rest } }) => (
              <DatePicker
                value={value || ""}
                onChange={(_, dateStr) => onChange(dateStr)}
                options={{ dateFormat: "Y-m-d" }}
                label="Expiry Date"
                placeholder="Select expiry date"
                error={errors.expiryDate?.message}
                {...rest}
              />
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="businessType"
            render={({ field: { value, onChange, ...rest } }) => (
              <Listbox
                data={businessTypes}
                value={businessTypes.find((item) => item.id === value) || null}
                onChange={(item) => onChange(item.id)}
                label="Business Type"
                placeholder="Select business type"
                displayField="label"
                error={errors.businessType?.message}
                {...rest}
              />
            )}
          />
          <Controller
            control={control}
            name="employeeSize"
            render={({ field: { value, onChange, ...rest } }) => (
              <Listbox
                data={employeeSizes}
                value={employeeSizes.find((item) => item.id === value) || null}
                onChange={(item) => onChange(item.id)}
                label="Employee Size"
                placeholder="Select employee size"
                displayField="label"
                error={errors.employeeSize?.message}
                {...rest}
              />
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            {...register("gstNumber")}
            label="GST Number"
            placeholder="Enter GST number"
            error={errors.gstNumber?.message}
          />
          <Input
            {...register("panNumber")}
            label="PAN Card Number"
            placeholder="Enter PAN card number"
            error={errors.panNumber?.message}
          />
          <div className="sm:col-span-2">
            <Input
              {...register("aadhaarNumber")}
              label="Aadhaar Card Number"
              placeholder="Enter Aadhaar card number"
              error={errors.aadhaarNumber?.message}
            />
          </div>
        </div>
      </div>

      <StepActions
        showPrevious
        onPrevious={() => setCurrentStep(0)}
        onCancel={() => navigate("/dashboards/home")}
        submitLabel="Next"
      />
    </form>
  );
}
