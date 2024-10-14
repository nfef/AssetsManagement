import * as yup from "yup";

export const inventoryValidationSchema = yup.object({
  inventoryId: yup.number(),
  assetId: yup.number(),
  floorId: yup.number(),
  inventoryDate: yup.date(),
});