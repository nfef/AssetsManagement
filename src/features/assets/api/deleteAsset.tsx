import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AssetKeys } from "../../assets";

async function deleteAsset(id: string) {
  const axios = await clients();
  return axios.delete(`/api/assets/${id}`).then(() => {});
}

export function useDeleteAsset(
  options?: UseMutationOptions<void, AxiosError, string>
) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteAsset(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(AssetKeys.lists());
      queryClient.invalidateQueries(AssetKeys.details());
    },
    ...options,
  });
}
