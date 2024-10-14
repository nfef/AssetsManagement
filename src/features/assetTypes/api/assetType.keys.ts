const AssetTypeKeys = {
  all: ["AssetTypes"] as const,
  lists: () => [...AssetTypeKeys.all, "list"] as const,
  list: (queryParams: string) => 
    [...AssetTypeKeys.lists(), { queryParams }] as const,
  details: () => [...AssetTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...AssetTypeKeys.details(), id] as const,
}

export { AssetTypeKeys };
