import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UserForUpdateDto, UserKeys } from "../../users";

const updateUser = async (id: string, data: UserForUpdateDto) => {
  const axios = await clients();
  return axios.put(`/api/users/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: UserForUpdateDto;
}

export function useUpdateUser(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedUser }: UpdateProps) =>
      updateUser(id, updatedUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(UserKeys.lists());
        queryClient.invalidateQueries(UserKeys.details());
      },
      ...options,
    }
  );
}
