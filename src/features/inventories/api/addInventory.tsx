import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { InventoryDto, InventoryForCreationDto, InventoryKeys } from "../../inventories";

const addInventory = async (data: InventoryForCreationDto) => {
  const axios = await clients();

  return axios
    .post("/api/inventories", data)
    .then((response) => response.data as InventoryDto);
};

export function useAddInventory(
  options?: UseMutationOptions<InventoryDto, AxiosError, InventoryForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newInventory: InventoryForCreationDto) => addInventory(newInventory),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(InventoryKeys.lists());
      },
      ...options,
    }
  );
}
