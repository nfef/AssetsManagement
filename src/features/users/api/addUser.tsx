import { clients } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UserDto, UserForCreationDto, UserKeys } from "../../users";

const addUser = async (data: UserForCreationDto) => {
  const axios = await clients();

  return axios
    .post("/api/users", data)
    .then((response) => response.data as UserDto);
};

export function useAddUser(
  options?: UseMutationOptions<UserDto, AxiosError, UserForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newUser: UserForCreationDto) => addUser(newUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(UserKeys.lists());
      },
      ...options,
    }
  );
}
