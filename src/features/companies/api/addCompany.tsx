import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { CompanyDto, CompanyForCreationDto, CompanyKeys } from "../../companies";

const addCompany = async (data: CompanyForCreationDto) => {
  const axios = await clients();

  return axios
    .post("/api/companies", data)
    .then((response) => response.data as CompanyDto);
};

export function useAddCompany(
  options?: UseMutationOptions<CompanyDto, AxiosError, CompanyForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newCompany: CompanyForCreationDto) => addCompany(newCompany),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CompanyKeys.lists());
      },
      ...options,
    }
  );
}
