import { SortingState } from "@tanstack/react-table";
import { UserDto } from "../../../types/user";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface AlerteRemindDto {
  id: string;
  createdOn?: Date;
  creator?: UserDto;
  createdDate: Date;
  cuidCreator: string;
  nameCreator: string;
  emailCreator: string;
  remindDate: Date;
  remindInterval: number;
  remindNumber: number;
  cuidAffected: string;
  nameAffected: string;
  emailAffected: string;
  departmentAffected: string;
  contractType: string;
  emailsRecipients?: Array<UserDto>,
  motif: string;
  finalizationDate: Date;
  cuidFinalizer: string;
  nameFinalizer: string;
  emailFinalizer: string;
  receptionDate?: Date;
  confirmationDate?: Date;
  convincing: boolean;
  actions?: Array<any>;
  affecteds?: Array<any>;
  recipients?: Array<UserDto>;
  finalizer?: UserDto;
}

export interface AlerteRemindForManipulationDto {
  id?: string;
  createdDate?: Date;
  creator?: UserDto;
  remindDate?: Date;
  remindInterval?: number;
  remindNumber?: number;
  affecteds?: Array<UserDto>;
  contractType?: string;
  recipients?: Array<UserDto>;
  motif?: string;
  finalizer?: UserDto;
  finalizationDate?: Date;
  receptionDate?: Date;
  confirmationDate?: Date;
  convincing?: boolean;
  actions?: Array<any>
}

export interface AlerteRemindForCreationDto extends AlerteRemindForManipulationDto { }
export interface AlerteRemindForUpdateDto extends AlerteRemindForManipulationDto { }

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
