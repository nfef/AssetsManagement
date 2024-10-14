import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface CompanyDto {
  id: string;
  
  code: string;
  name: string;
}

export interface CompanyForCreationDto {
  
  code: string;
  name: string;
}
export interface CompanyForUpdateDto {
  
  code: string;
  name: string;
}

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
