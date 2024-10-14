import { clients } from "../../../lib/axios";
import { PagedResponse, Pagination } from "../../../types/apis";
import { generateSieveSortOrder } from "../../../utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";
import { QueryParams, AssetTypeDto, AssetTypeKeys } from "../../assetTypes";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface assettypeListApiProps extends delayProps {
  queryString: string;
}
const getAssetTypes = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: assettypeListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients().then((axios) =>
      axios
        .get(`/api/assettypes${queryString}`)
        .then((response: AxiosResponse<AssetTypeDto[]>) => {
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
            data: response.data as AssetTypeDto[],
            pagination: pagination as Pagination,
          } as PagedResponse<AssetTypeDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface assettypeListHookProps extends QueryParams, delayProps {}
export const useAssetTypes = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: assettypeListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });

  return useQuery(AssetTypeKeys.list(queryParams ?? ""), () =>
    getAssetTypes({ queryString: queryParams, hasArtificialDelay, delayInMs })
  );
};