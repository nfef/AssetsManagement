import { clients } from "../../../lib/axios";
import { PagedResponse, Pagination } from "../../../types/apis";
import { generateSieveSortOrder } from "../../../utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";
import { QueryParams, AlerteRemindDto, AlerteRemindKeys } from "../../alerteReminds";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface alerteremindListApiProps extends delayProps {
  queryString: string;
}
const getAlerteReminds = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: alerteremindListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients().then((axios) =>
      axios
        .get(`/api/v1/alertereminds${queryString}`)
        .then((response: AxiosResponse<AlerteRemindDto[]>) => {
          return {
            data: response.data as AlerteRemindDto[],
            pagination: JSON.parse(
              response.headers["x-pagination"] ?? ""
            ) as Pagination,
          } as PagedResponse<AlerteRemindDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface alerteremindListHookProps extends QueryParams, delayProps {}
export const useAlerteReminds = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: alerteremindListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });

  return useQuery(AlerteRemindKeys.list(queryParams ?? ""), () =>
    getAlerteReminds({ queryString: queryParams, hasArtificialDelay, delayInMs })
  );
};