import { clients } from "../../../lib/axios";
import { PagedResponse, Pagination } from "../../../types/apis";
import { generateSieveSortOrder } from "../../../utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";
import { QueryParams, FloorDto, FloorKeys } from "../../floors";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface floorListApiProps extends delayProps {
  queryString: string;
}
const getFloors = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: floorListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients().then((axios) =>
      axios
        .get(`/api/floors${queryString}`)
        .then((response: AxiosResponse<FloorDto[]>) => {
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
            data: response.data as FloorDto[],
            pagination: pagination as Pagination,
          } as PagedResponse<FloorDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface floorListHookProps extends QueryParams, delayProps {}
export const useFloors = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: floorListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });

  return useQuery(FloorKeys.list(queryParams ?? ""), () =>
    getFloors({ queryString: queryParams, hasArtificialDelay, delayInMs })
  );
};