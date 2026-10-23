// Import Dependencies
import { useReducer } from "react";

// Local Imports
import {
  AddProductFormContextProvider,
  FormState,
  FormAction,
} from "./AddProductFormContext";

// ----------------------------------------------------------------------

const initialState: FormState = {
  formData: {
    company: {
      companyName: "",
      companyAddress: "",
      contactNumber: "",
      businessEmail: "",
      ownerName: "",
      ownerContactNumber: "",
      ownerEmail: "",
      country: "",
      state: "",
      district: "",
      taluka: "",
    },
    business: {
      registrationDate: "",
      expiryDate: "",
      businessType: "",
      employeeSize: "",
      gstNumber: "",
      panNumber: "",
      aadhaarNumber: "",
    },
    login: {
      companyEmail: "",
      password: "",
      confirmPassword: "",
    },
  },
  stepStatus: {
    company: { isDone: false },
    business: { isDone: false },
    login: { isDone: false },
  },
};

const reducerHandlers = {
  SET_FORM_DATA: (state: FormState, action: FormAction) => {
    if (action.type !== "SET_FORM_DATA") return state;
    return {
      ...state,
      formData: {
        ...state.formData,
        ...action.payload,
      },
    };
  },
  SET_STEP_STATUS: (state: FormState, action: FormAction) => {
    if (action.type !== "SET_STEP_STATUS") return state;
    return {
      ...state,
      stepStatus: {
        ...state.stepStatus,
        ...action.payload,
      },
    };
  },
};

const reducer = (state: FormState, action: FormAction): FormState =>
  reducerHandlers[action.type]?.(state, action) || state;

export function AddProductFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <AddProductFormContextProvider value={value}>
      {children}
    </AddProductFormContextProvider>
  );
}
