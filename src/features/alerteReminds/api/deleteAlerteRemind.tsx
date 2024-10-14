import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AlerteRemindKeys } from "../../alerteReminds";

async function deleteAlerteRemind(id: string) {
  const axios = await clients();
  return axios.delete(`/api/v1/alertereminds/${id}`).then(() => {});
}

export function useDeleteAlerteRemind(
  options?: UseMutationOptions<void, AxiosError, string>
) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteAlerteRemind(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(AlerteRemindKeys.lists());
      queryClient.invalidateQueries(AlerteRemindKeys.details());
    },
    ...options,
  });
}
