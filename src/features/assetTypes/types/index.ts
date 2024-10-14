import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface AssetTypeDto {
  id: string;
  code: string;
  description: string;
}

export interface AssetTypeForCreationDto {
  
  code: string;
  description: string;
}
export interface AssetTypeForUpdateDto {
  
  code: string;
  description: string;
}

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
