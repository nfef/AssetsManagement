import { clients } from "../../../lib/axios";
import { PagedResponse, Pagination } from "../../../types/apis";
import { generateSieveSortOrder } from "../../../utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";
import { QueryParams, AssetDto, AssetKeys } from "../../assets";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface assetListApiProps extends delayProps {
  queryString: string;
}
const getAssets = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: assetListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients().then((axios) =>
      axios
        .get(`/api/assets${queryString}`)
        .then((response: AxiosResponse<AssetDto[]>) => {
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
            data: response.data as AssetDto[],
            pagination: pagination as Pagination,
          } as PagedResponse<AssetDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface assetListHookProps extends QueryParams, delayProps {}
export const useAssets = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: assetListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });

  return useQuery(AssetKeys.list(queryParams ?? ""), () =>
    getAssets({ queryString: queryParams, hasArtificialDelay, delayInMs })
  );
};