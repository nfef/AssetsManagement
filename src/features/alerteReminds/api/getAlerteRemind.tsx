import { clients } from "../../../lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { AlerteRemindDto, AlerteRemindKeys } from "../../alerteReminds";

const getAlerteRemind = async (id: string) => {
  const axios = await clients();

  return axios
    .get(`/api/v1/alertereminds/${id}`)
    .then((response: AxiosResponse<AlerteRemindDto>) => response.data);
};

export const useGetAlerteRemind = (id: string | null | undefined) => {
  return useQuery(AlerteRemindKeys.detail(id!), () => getAlerteRemind(id!), {
    enabled: id !== null && id !== undefined,
  });
};