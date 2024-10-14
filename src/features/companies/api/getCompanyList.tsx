import { clients } from "../../../lib/axios";
import { PagedResponse, Pagination } from "../../../types/apis";
import { generateSieveSortOrder } from "../../../utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";
import { QueryParams, CompanyDto, CompanyKeys } from "../../companies";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface companyListApiProps extends delayProps {
  queryString: string;
}
const getCompanies = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: companyListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients().then((axios) =>
      axios
        .get(`/api/companies${queryString}`)
        .then((response: AxiosResponse<CompanyDto[]>) => {
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
            data: response.data as CompanyDto[],
            pagination: pagination as Pagination,
          } as PagedResponse<CompanyDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface companyListHookProps extends QueryParams, delayProps {}
export const useCompanies = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: companyListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });

  return useQuery(CompanyKeys.list(queryParams ?? ""), () =>
    getCompanies({ queryString: queryParams, hasArtificialDelay, delayInMs })
  );
};