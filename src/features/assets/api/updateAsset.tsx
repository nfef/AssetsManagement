import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AssetForUpdateDto, AssetKeys } from "../../assets";

const updateAsset = async (id: string, data: AssetForUpdateDto) => {
  const axios = await clients();
  return axios.put(`/api/assets/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: AssetForUpdateDto;
}

export function useUpdateAsset(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedAsset }: UpdateProps) =>
      updateAsset(id, updatedAsset),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AssetKeys.lists());
        queryClient.invalidateQueries(AssetKeys.details());
      },
      ...options,
    }
  );
}
