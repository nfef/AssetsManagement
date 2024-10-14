import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { FloorForUpdateDto, FloorKeys } from "../../floors";

const updateFloor = async (id: string, data: FloorForUpdateDto) => {
  const axios = await clients();
  return axios.put(`/api/floors/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: FloorForUpdateDto;
}

export function useUpdateFloor(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedFloor }: UpdateProps) =>
      updateFloor(id, updatedFloor),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(FloorKeys.lists());
        queryClient.invalidateQueries(FloorKeys.details());
      },
      ...options,
    }
  );
}
