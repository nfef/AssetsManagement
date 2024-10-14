import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AssetDto, AssetForCreationDto, AssetKeys } from "../../assets";

const addAsset = async (data: AssetForCreationDto) => {
  const axios = await clients();

  return axios
    .post("/api/assets", data)
    .then((response) => response.data as AssetDto);
};

export function useAddAsset(
  options?: UseMutationOptions<AssetDto, AxiosError, AssetForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newAsset: AssetForCreationDto) => addAsset(newAsset),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AssetKeys.lists());
      },
      ...options,
    }
  );
}
