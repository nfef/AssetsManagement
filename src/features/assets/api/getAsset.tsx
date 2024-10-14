import { clients } from "../../../lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { AssetDto, AssetKeys } from "../../assets";

const getAsset = async (id: string) => {
  const axios = await clients();

  return axios
    .get(`/api/assets/${id}`)
    .then((response: AxiosResponse<AssetDto>) => response.data);
};

export const useGetAsset = (id: string | null | undefined) => {
  return useQuery(AssetKeys.detail(id!), () => getAsset(id!), {
    enabled: id !== null && id !== undefined,
  });
};