import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface UserDto {
  id: string;
  username: string;
  password: string;
  role: string;
}

export interface UserForCreationDto {

  username: string;
  password: string;
  role: string;
}
export interface UserForUpdateDto {
  username: string;
  password: string;
  role: string;
}

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
