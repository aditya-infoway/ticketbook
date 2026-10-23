// Import Dependencies
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

// Local Imports
import { Listbox } from "@/components/shared/form/StyledListbox";
import { Input, Textarea } from "@/components/ui";
import { useAddProductFormContext } from "../AddProductFormContext";
import {
  countries,
  getStatesByCountry,
  getDistrictsByState,
  getTalukasByDistrict,
} from "../constants";
import { companySchema, CompanyType } from "../schema";
import { StepActions } from "../components/StepActions";

// ----------------------------------------------------------------------

export function CompanyInformation({
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<CompanyType>({
    resolver: yupResolver(companySchema),
    defaultValues: state.formData.company,
  });

  // Form fields (country/state) ab NAME store karenge (DB ke liye)
  // Ye local codes sirf dropdown cascading (states/districts fetch) ke liye hain
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const selectedCountryName = watch("country"); // e.g. "India"
  const selectedStateName = watch("state");     // e.g. "Gujarat"
  const selectedDistrict = watch("district");

  const statesList = countryCode ? getStatesByCountry(countryCode) : [];
  const districts =
    countryCode && stateCode ? getDistrictsByState(countryCode, stateCode) : [];
  const talukas =
    countryCode && stateCode ? getTalukasByDistrict(countryCode, stateCode) : [];

  // Edit mode / defaultValues me naam se code reverse-derive karna
  // (taaki page load pe states/districts list correctly populate ho)
  useEffect(() => {
    if (selectedCountryName && !countryCode) {
      const match = countries.find((c) => c.label === selectedCountryName);
      if (match) setCountryCode(match.id);
    }
  }, [selectedCountryName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedStateName && countryCode && !stateCode) {
      const match = getStatesByCountry(countryCode).find(
        (s) => s.label === selectedStateName,
      );
      if (match) setStateCode(match.id);
    }
  }, [selectedStateName, countryCode]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data: CompanyType) => {
    dispatch({ type: "SET_FORM_DATA", payload: { company: data } });
    dispatch({ type: "SET_STEP_STATUS", payload: { company: { isDone: true } } });
    setCurrentStep(1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex grow flex-col"
    >
      <div className="grow space-y-4">
        <Input
          {...register("companyName")}
          label="Company Name"
          placeholder="Enter company name"
          prefix={<BuildingOffice2Icon className="size-5" strokeWidth="1" />}
          error={errors.companyName?.message}
        />

        <Textarea
          {...register("companyAddress")}
          label="Company Address"
          placeholder="Enter company address"
          rows={3}
          error={errors.companyAddress?.message}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            {...register("contactNumber")}
            label="Business Contact Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            prefix={<PhoneIcon className="size-5" strokeWidth="1" />}
            error={errors.contactNumber?.message}
          />
          <Input
            {...register("businessEmail")}
            label="Business Gmail"
            type="email"
            placeholder="Enter business Gmail"
            prefix={<EnvelopeIcon className="size-5" strokeWidth="1" />}
            error={errors.businessEmail?.message}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            {...register("ownerName")}
            label="Owner Name"
            placeholder="Enter owner name"
            prefix={<UserIcon className="size-5" strokeWidth="1" />}
            error={errors.ownerName?.message}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            {...register("ownerContactNumber")}
            label="Owner Contact Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            prefix={<PhoneIcon className="size-5" strokeWidth="1" />}
            error={errors.ownerContactNumber?.message}
          />
          <Input
            {...register("ownerEmail")}
            label="Owner Email ID"
            type="email"
            placeholder="Enter owner email"
            prefix={<EnvelopeIcon className="size-5" strokeWidth="1" />}
            error={errors.ownerEmail?.message}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="country"
            render={({ field: { value, onChange, ...rest } }) => (
              <Listbox
                data={countries}
                value={countries.find((item) => item.label === value) || null}
                onChange={(item) => {
                  onChange(item.label); // DB me naam store hoga
                  setCountryCode(item.id); // cascading ke liye code
                  setStateCode("");
                  setValue("state", "");
                  setValue("district", "");
                  setValue("taluka", "");
                }}
                label="Country"
                placeholder="Select country"
                displayField="label"
                error={errors.country?.message}
                {...rest}
              />
            )}
          />
          <Controller
            control={control}
            name="state"
            render={({ field: { value, onChange, ...rest } }) => (
              <Listbox
                data={statesList}
                value={statesList.find((item) => item.label === value) || null}
                onChange={(item) => {
                  onChange(item.label); // DB me naam store hoga
                  setStateCode(item.id); // cascading ke liye code
                  setValue("district", "");
                  setValue("taluka", "");
                }}
                label="State"
                placeholder="Select state"
                displayField="label"
                error={errors.state?.message}
                inputProps={{ disabled: !countryCode }}
                {...rest}
              />
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="district"
            render={({ field: { value, onChange, ...rest } }) => (
              <Listbox
                data={districts}
                value={districts.find((item) => item.id === value) || null}
                onChange={(item) => {
                  onChange(item.id);
                  setValue("taluka", "");
                }}
                label="District"
                placeholder="Select district"
                displayField="label"
                error={errors.district?.message}
                inputProps={{ disabled: !stateCode }}
                {...rest}
              />
            )}
          />
          <Controller
            control={control}
            name="taluka"
            render={({ field: { value, onChange, ...rest } }) => (
              <Listbox
                data={talukas}
                value={talukas.find((item) => item.id === value) || null}
                onChange={(item) => onChange(item.id)}
                label="Taluka"
                placeholder="Select taluka"
                displayField="label"
                error={errors.taluka?.message}
                inputProps={{ disabled: !stateCode }}
                {...rest}
              />
            )}
          />
        </div>
      </div>

      <StepActions
        onCancel={() => navigate("/dashboards/home")}
        submitLabel="Next"
      />
    </form>
  );
}