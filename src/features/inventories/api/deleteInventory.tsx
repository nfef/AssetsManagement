import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { InventoryKeys } from "../../inventories";

async function deleteInventory(id: string) {
  const axios = await clients();
  return axios.delete(`/api/inventories/${id}`).then(() => {});
}

export function useDeleteInventory(
  options?: UseMutationOptions<void, AxiosError, string>
) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteInventory(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(InventoryKeys.lists());
      queryClient.invalidateQueries(InventoryKeys.details());
    },
    ...options,
  });
}
