import { createSafeContext } from "@/utils/createSafeContext";
import { Dispatch } from "react";
import { BusinessType, CompanyType, LoginType } from "./schema";

// Define the context state and action types
export interface StepStatus {
  isDone: boolean;
}

export interface FormState {
  formData: {
    company: CompanyType;
    business: BusinessType;
    login: LoginType;
  };
  stepStatus: {
    company: StepStatus;
    business: StepStatus;
    login: StepStatus;
  };
}

export type FormAction =
  | { type: "SET_FORM_DATA"; payload: Partial<FormState["formData"]> }
  | { type: "SET_STEP_STATUS"; payload: Partial<FormState["stepStatus"]> };

export interface AddProductFormContextType {
  state: FormState;
  dispatch: Dispatch<FormAction>;
}

export const [AddProductFormContextProvider, useAddProductFormContext] =
  createSafeContext<AddProductFormContextType>(
    "useAddProductFormContext must be used within a AddProductFormProvider",
  );
