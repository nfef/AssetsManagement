import * as yup from "yup";

export const companyValidationSchema = yup.object({
  companyId: yup.number(),
  code: yup.string(),
  name: yup.string(),
});