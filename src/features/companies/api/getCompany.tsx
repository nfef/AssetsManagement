import { clients } from "../../../lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { CompanyDto, CompanyKeys } from "../../companies";

const getCompany = async (id: string) => {
  const axios = await clients();

  return axios
    .get(`/api/companies/${id}`)
    .then((response: AxiosResponse<CompanyDto>) => response.data);
};

export const useGetCompany = (id: string | null | undefined) => {
  return useQuery(CompanyKeys.detail(id!), () => getCompany(id!), {
    enabled: id !== null && id !== undefined,
  });
};