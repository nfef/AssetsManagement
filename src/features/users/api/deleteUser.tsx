import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UserKeys } from "../../users";

async function deleteUser(id: string) {
  const axios = await clients();
  return axios.delete(`/api/users/${id}`).then(() => {});
}

export function useDeleteUser(
  options?: UseMutationOptions<void, AxiosError, string>
) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(UserKeys.lists());
      queryClient.invalidateQueries(UserKeys.details());
    },
    ...options,
  });
}
