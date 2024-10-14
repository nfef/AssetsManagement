import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { InventoryForUpdateDto, InventoryKeys } from "../../inventories";

const updateInventory = async (id: string, data: InventoryForUpdateDto) => {
  const axios = await clients();
  return axios.put(`/api/inventories/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: InventoryForUpdateDto;
}

export function useUpdateInventory(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedInventory }: UpdateProps) =>
      updateInventory(id, updatedInventory),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(InventoryKeys.lists());
        queryClient.invalidateQueries(InventoryKeys.details());
      },
      ...options,
    }
  );
}
