import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AssetTypeDto, AssetTypeForCreationDto, AssetTypeKeys } from "../../assetTypes";

const addAssetType = async (data: AssetTypeForCreationDto) => {
  const axios = await clients();

  return axios
    .post("/api/assettypes", data)
    .then((response) => response.data as AssetTypeDto);
};

export function useAddAssetType(
  options?: UseMutationOptions<AssetTypeDto, AxiosError, AssetTypeForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newAssetType: AssetTypeForCreationDto) => addAssetType(newAssetType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AssetTypeKeys.lists());
      },
      ...options,
    }
  );
}
