const AlerteRemindKeys = {
  all: ["AlerteReminds"] as const,
  lists: () => [...AlerteRemindKeys.all, "list"] as const,
  list: (queryParams: string) => 
    [...AlerteRemindKeys.lists(), { queryParams }] as const,
  details: () => [...AlerteRemindKeys.all, "detail"] as const,
  detail: (id: string) => [...AlerteRemindKeys.details(), id] as const,
}

export { AlerteRemindKeys };
