import * as yup from "yup";

export interface AuthFormValues {
    username: string
    password: string
}

export const schema = yup.object({
  username: yup
    .string()
    .email("Enter valid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required"),
});