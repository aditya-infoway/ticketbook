// Import Dependencies
import * as Yup from "yup";

// ----------------------------------------------------------------------

const mobileSchema = Yup.string()
  .trim()
  .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
  .required("Mobile number is required");

export const companySchema = Yup.object().shape({
  companyName: Yup.string().trim().required("Company name is required"),
  companyAddress: Yup.string().trim().required("Company address is required"),
  contactNumber: mobileSchema,
  businessEmail: Yup.string()
    .trim()
    .email("Enter a valid Gmail address")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Enter a valid Gmail address")
    .required("Business Gmail is required"),
  ownerName: Yup.string().trim().required("Owner name is required"),
  ownerContactNumber: mobileSchema,
  ownerEmail: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Owner email is required"),
  country: Yup.string().required("Please select a country"),
  state: Yup.string().required("Please select a state"),
  district: Yup.string().required("Please select a district"),
  taluka: Yup.string().required("Please select a taluka"),
});

export const businessSchema = Yup.object().shape({
  registrationDate: Yup.string().required("Registration date is required"),
  expiryDate: Yup.string()
    .required("Expiry date is required")
    .test(
      "is-after-registration",
      "Expiry date must be after registration date",
      function (value) {
        const { registrationDate } = this.parent;
        if (!value || !registrationDate) return true;
        return new Date(value) >= new Date(registrationDate);
      },
    ),
  businessType: Yup.string().required("Please select a business type"),
  employeeSize: Yup.string().required("Please select employee size"),
  gstNumber: Yup.string()
    .trim()
    .required("GST number is required")
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
      "Enter a valid GST number",
    ),
  panNumber: Yup.string()
    .trim()
    .required("PAN card number is required")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN card number"),
  aadhaarNumber: Yup.string()
    .trim()
    .required("Aadhaar number is required")
    .matches(/^[2-9][0-9]{11}$/, "Enter a valid 12-digit Aadhaar number"),
});

export const loginSchema = Yup.object().shape({
  companyEmail: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Company email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type CompanyType = Yup.InferType<typeof companySchema>;
export type BusinessType = Yup.InferType<typeof businessSchema>;
export type LoginType = Yup.InferType<typeof loginSchema>;
