import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface InventoryDto {
  id: string;
  assetId: number;
  floorId: number;
  inventoryDate: Date;
}

export interface InventoryForCreationDto {

  assetId: number;
  floorId: number;
  inventoryDate: Date;
}
export interface InventoryForUpdateDto {

  assetId: number;
  floorId: number;
  inventoryDate: Date;
}

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;