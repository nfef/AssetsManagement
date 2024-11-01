import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface InventoryDto {
  id: string;
  createdAt?: Date;
}

export interface InventoryForCreationDto {

 
  createdAt?: Date;
}
export interface InventoryForUpdateDto {

  
  createdAt: Date;
}

export interface InventoryItemDto {
  id: string;
  inventoryId: string;
  assetId: string;
  createdAt: Date;
  updatedAt: Date;
}

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
