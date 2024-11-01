import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { CompanyDto, CompanyForCreationDto, CompanyKeys } from "../../companies";

const addCompany = async (data: FormData) => {
  const axios = await clients();

  return axios
    .post("/api/companies", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data as CompanyDto);
};

export function useAddCompany(
  options?: UseMutationOptions<CompanyDto, AxiosError, FormData>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newCompany: FormData) => addCompany(newCompany),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CompanyKeys.lists());
      },
      ...options,
    }
  );
}
