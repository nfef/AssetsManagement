import * as yup from "yup";

export const userValidationSchema = yup.object({
  userId: yup.number(),
  username: yup.string(),
  password: yup.string(),
  role: yup.string(),
});