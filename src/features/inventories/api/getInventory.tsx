import { clients } from "../../../lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { InventoryDto, InventoryKeys } from "../../inventories";

const getInventory = async (id: string) => {
  const axios = await clients();

  return axios
    .get(`/api/inventories/${id}`)
    .then((response: AxiosResponse<InventoryDto>) => response.data);
};

export const useGetInventory = (id: string | null | undefined) => {
  return useQuery(InventoryKeys.detail(id!), () => getInventory(id!), {
    enabled: id !== null && id !== undefined,
  });
};