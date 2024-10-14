import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AssetTypeKeys } from "../../assetTypes";

async function deleteAssetType(id: string) {
  const axios = await clients();
  return axios.delete(`/api/assettypes/${id}`).then(() => {});
}

export function useDeleteAssetType(
  options?: UseMutationOptions<void, AxiosError, string>
) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteAssetType(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(AssetTypeKeys.lists());
      queryClient.invalidateQueries(AssetTypeKeys.details());
    },
    ...options,
  });
}
