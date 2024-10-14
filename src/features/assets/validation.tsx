import * as yup from "yup";

export const assetValidationSchema = yup.object({
  assetId: yup.number(),
  erpCode: yup.string(),
  barcode: yup.string(),
  companyId: yup.number(),
  floorId: yup.number(),
  assetTypeId: yup.number(),
  description: yup.string(),
  status: yup.string(),
  purchaseDate: yup.date(),
  exityDate: yup.date(),
});