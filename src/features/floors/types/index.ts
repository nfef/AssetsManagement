import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface FloorDto {
  id: string;
  position: string;
  companyId: string;
  description: string;
}

export interface FloorForCreationDto {
  
  position: string;
  companyId: string;
  description: string;
}
export interface FloorForUpdateDto {
 
  position: string;
  companyId: string;
  description: string;
}

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
