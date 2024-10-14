import * as yup from "yup";

export const assetTypeValidationSchema = yup.object({
  assetTypeId: yup.number(),
  code: yup.string(),
  description: yup.string(),
});