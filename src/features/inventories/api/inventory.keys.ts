const InventoryKeys = {
  all: ["Inventorys"] as const,
  lists: () => [...InventoryKeys.all, "list"] as const,
  list: (queryParams: string) => 
    [...InventoryKeys.lists(), { queryParams }] as const,
  details: () => [...InventoryKeys.all, "detail"] as const,
  detail: (id: string) => [...InventoryKeys.details(), id] as const,
}

export { InventoryKeys };
