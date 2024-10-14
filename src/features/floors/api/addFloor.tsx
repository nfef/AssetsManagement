import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { FloorDto, FloorForCreationDto, FloorKeys } from "../../floors";

const addFloor = async (data: FloorForCreationDto) => {
  const axios = await clients();

  return axios
    .post("/api/floors", data)
    .then((response) => response.data as FloorDto);
};

export function useAddFloor(
  options?: UseMutationOptions<FloorDto, AxiosError, FloorForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newFloor: FloorForCreationDto) => addFloor(newFloor),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(FloorKeys.lists());
      },
      ...options,
    }
  );
}
