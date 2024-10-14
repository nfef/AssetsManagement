export interface PagedResponse<T> {
  pagination: Pagination;
  data: T[];
}

export interface Pagination {
  currentEndIndex: number;
  currentPageSize: number;
  currentStartIndex: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const EnumPageSize = [1,10,25,50,100] as const;
export type EnumPageSize = typeof EnumPageSize[number];

