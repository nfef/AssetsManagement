import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AlerteRemindForUpdateDto, AlerteRemindKeys } from "../../alerteReminds";

const updateAlerteRemind = async (id: string, data: AlerteRemindForUpdateDto) => {
  const axios = await clients();
  return axios.put(`/api/v1/alertereminds/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: AlerteRemindForUpdateDto;
}

export function useUpdateAlerteRemind(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedAlerteRemind }: UpdateProps) =>
      updateAlerteRemind(id, updatedAlerteRemind),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AlerteRemindKeys.lists());
        queryClient.invalidateQueries(AlerteRemindKeys.details());
      },
      ...options,
    }
  );
}
