import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AssetTypeForUpdateDto, AssetTypeKeys } from "../../assetTypes";

const updateAssetType = async (id: string, data: AssetTypeForUpdateDto) => {
  const axios = await clients();
  return axios.put(`/api/assettypes/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: AssetTypeForUpdateDto;
}

export function useUpdateAssetType(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedAssetType }: UpdateProps) =>
      updateAssetType(id, updatedAssetType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AssetTypeKeys.lists());
        queryClient.invalidateQueries(AssetTypeKeys.details());
      },
      ...options,
    }
  );
}
