import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface AssetDto {
  id: number;
  erpCode: string;
  barcode: string;
  companyId: string;
  floorId: string;
  assetTypeId: string;
  description: string;
  status: string;
  purchaseDate: Date;
  exityDate: Date;
}

export interface AssetForCreationDto {

  erpCode: string;
  barcode: string;
  companyId: string;
  floorId: string;
  assetTypeId: string;
  description: string;
  status: string;
  purchaseDate: Date;
  exityDate: Date;
}
export interface AssetForUpdateDto {
  erpCode: string;
  barcode: string;
  companyId: string;
  floorId: string;
  assetTypeId: string;
  description: string;
  status: string;
  purchaseDate: Date;
  exityDate: Date;
}

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
