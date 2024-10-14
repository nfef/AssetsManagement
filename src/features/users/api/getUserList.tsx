import { clients } from "../../../lib/axios";
import { PagedResponse, Pagination } from "../../../types/apis";
import { generateSieveSortOrder } from "../../../utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";
import { QueryParams, UserDto, UserKeys } from "../../users";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface userListApiProps extends delayProps {
  queryString: string;
}
const getUsers = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: userListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients().then((axios) =>
      axios
        .get(`/users${queryString}`)
        .then((response: AxiosResponse<UserDto[]>) => {
          let pagination = {};
          const paginationHeader = response.headers["x-pagination"];
          if (paginationHeader) {
            try {
              pagination = JSON.parse(paginationHeader);
            } catch (e) {
              console.error("Failed to parse pagination header", e);
            }
          }
          return {
            data: response.data as UserDto[],
            pagination: pagination as Pagination,
          } as PagedResponse<UserDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface userListHookProps extends QueryParams, delayProps {}
export const useUsers = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: userListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });

  return useQuery(UserKeys.list(queryParams ?? ""), () =>
    getUsers({ queryString: queryParams, hasArtificialDelay, delayInMs })
  );
};