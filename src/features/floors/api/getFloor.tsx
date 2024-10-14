import { clients } from "../../../lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { FloorDto, FloorKeys } from "../../floors";

const getFloor = async (id: string) => {
  const axios = await clients();

  return axios
    .get(`/api/floors/${id}`)
    .then((response: AxiosResponse<FloorDto>) => response.data);
};

export const useGetFloor = (id: string | null | undefined) => {
  return useQuery(FloorKeys.detail(id!), () => getFloor(id!), {
    enabled: id !== null && id !== undefined,
  });
};