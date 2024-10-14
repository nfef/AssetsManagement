import { clients } from "../../../lib/axios";
import { PagedResponse, Pagination } from "../../../types/apis";
import { generateSieveSortOrder } from "../../../utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";
import { QueryParams, InventoryDto, InventoryKeys } from "../../inventories";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface inventoryListApiProps extends delayProps {
  queryString: string;
}
const getInventories = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: inventoryListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients().then((axios) =>
      axios
        .get(`/api/inventories${queryString}`)
        .then((response: AxiosResponse<InventoryDto[]>) => {
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
            data: response.data as InventoryDto[],
            pagination: pagination as Pagination,
          } as PagedResponse<InventoryDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface inventoryListHookProps extends QueryParams, delayProps {}
export const useInventories = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: inventoryListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });

  return useQuery(InventoryKeys.list(queryParams ?? ""), () =>
    getInventories({ queryString: queryParams, hasArtificialDelay, delayInMs })
  );
};