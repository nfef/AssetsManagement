import { clients } from "../../../lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { AssetTypeDto, AssetTypeKeys } from "../../assetTypes";

const getAssetType = async (id: string) => {
  const axios = await clients();

  return axios
    .get(`/api/assettypes/${id}`)
    .then((response: AxiosResponse<AssetTypeDto>) => response.data);
};

export const useGetAssetType = (id: string | null | undefined) => {
  return useQuery(AssetTypeKeys.detail(id!), () => getAssetType(id!), {
    enabled: id !== null && id !== undefined,
  });
};