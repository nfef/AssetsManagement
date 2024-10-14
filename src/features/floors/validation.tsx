import * as yup from "yup";

export const floorValidationSchema = yup.object({
  floorId: yup.number(),
  position: yup.string(),
  description: yup.string(),
});