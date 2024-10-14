import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { FloorKeys } from "../../floors";

async function deleteFloor(id: string) {
  const axios = await clients();
  return axios.delete(`/api/floors/${id}`).then(() => {});
}

export function useDeleteFloor(
  options?: UseMutationOptions<void, AxiosError, string>
) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteFloor(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(FloorKeys.lists());
      queryClient.invalidateQueries(FloorKeys.details());
    },
    ...options,
  });
}
