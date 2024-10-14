const CompanyKeys = {
  all: ["Companys"] as const,
  lists: () => [...CompanyKeys.all, "list"] as const,
  list: (queryParams: string) => 
    [...CompanyKeys.lists(), { queryParams }] as const,
  details: () => [...CompanyKeys.all, "detail"] as const,
  detail: (id: string) => [...CompanyKeys.details(), id] as const,
}

export { CompanyKeys };
