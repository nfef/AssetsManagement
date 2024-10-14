import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { CompanyKeys } from "../../companies";

async function deleteCompany(id: string) {
  const axios = await clients();
  return axios.delete(`/api/companies/${id}`).then(() => {});
}

export function useDeleteCompany(
  options?: UseMutationOptions<void, AxiosError, string>
) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteCompany(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(CompanyKeys.lists());
      queryClient.invalidateQueries(CompanyKeys.details());
    },
    ...options,
  });
}
