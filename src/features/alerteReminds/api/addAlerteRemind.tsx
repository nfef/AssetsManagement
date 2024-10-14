import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AlerteRemindDto, AlerteRemindForCreationDto, AlerteRemindKeys } from "../../alerteReminds";

const addAlerteRemind = async (data: AlerteRemindForCreationDto) => {
  const axios = await clients();

  return axios
    .post("/api/v1/alertereminds", data)
    .then((response) => response.data as AlerteRemindDto);
};

export function useAddAlerteRemind(
  options?: UseMutationOptions<AlerteRemindDto, AxiosError, AlerteRemindForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newAlerteRemind: AlerteRemindForCreationDto) => addAlerteRemind(newAlerteRemind),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AlerteRemindKeys.lists());
      },
      ...options,
    }
  );
}
