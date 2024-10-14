const FloorKeys = {
  all: ["Floors"] as const,
  lists: () => [...FloorKeys.all, "list"] as const,
  list: (queryParams: string) => 
    [...FloorKeys.lists(), { queryParams }] as const,
  details: () => [...FloorKeys.all, "detail"] as const,
  detail: (id: string) => [...FloorKeys.details(), id] as const,
}

export { FloorKeys };
