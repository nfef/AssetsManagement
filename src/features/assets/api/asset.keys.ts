const AssetKeys = {
  all: ["Assets"] as const,
  lists: () => [...AssetKeys.all, "list"] as const,
  list: (queryParams: string) => 
    [...AssetKeys.lists(), { queryParams }] as const,
  details: () => [...AssetKeys.all, "detail"] as const,
  detail: (id: string) => [...AssetKeys.details(), id] as const,
}

export { AssetKeys };
