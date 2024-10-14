import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { CompanyForUpdateDto, CompanyKeys } from "../../companies";

const updateCompany = async (id: string, data: CompanyForUpdateDto) => {
  const axios = await clients();
  return axios.put(`/api/companies/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: CompanyForUpdateDto;
}

export function useUpdateCompany(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedCompany }: UpdateProps) =>
      updateCompany(id, updatedCompany),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CompanyKeys.lists());
        queryClient.invalidateQueries(CompanyKeys.details());
      },
      ...options,
    }
  );
}