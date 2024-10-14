
import { Notifications } from "../../../components/notifications";
import { CompanyDto, useDeleteCompany, useCompanies } from "..";
import "@tanstack/react-table";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import PaginationControls from "../../../components/Table/PaginationControls";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TableAction from "../../../components/Table/TableAction";
import { selectPageSize } from "../../../app/PageSlice";

interface CompanyListTableProps {
  queryFilter?: string | undefined;
}

export function CompanyListTable({ queryFilter }: CompanyListTableProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = useSelector(selectPageSize);

  
  const deleteCompanyApi = useDeleteCompany();
  function deleteCompany(id: string) {
    deleteCompanyApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("Company deleted successfully");
      })
      .catch((e) => {
        Notifications.error("There was an error deleting the company");
        console.error(e);
      });
  }

  const { data: companyResponse, isLoading } = useCompanies({
    //sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const companyData = companyResponse?.data;
  const companyPagination = companyResponse?.pagination;

  const columns = useMemo<MRT_ColumnDef<CompanyDto>[]>(
    () => [
    // {
    //     accessorKey: "companyId",
    //     id: "companyId", // id required if you use accessorFn instead of accessorKey
    //     header: "CompanyId",
    //     maxSize: 50
    // },
    {
        accessorKey: "code",
        id: "code", // id required if you use accessorFn instead of accessorKey
        header: "Code Entreprise",
        maxSize: 50
    },
    {
        accessorKey: "name",
        id: "name", // id required if you use accessorFn instead of accessorKey
        header: "Nom Entreprise",
        maxSize: 50
    },
      {
        accessorFn: (originalRow) => {
          return <TableAction 
          data={originalRow}
          consultUrl={`/companies/consult/${originalRow.id}`}
          editUrl={`/companies/edit/${originalRow.id}`}
          deleteData={ deleteCompany }  
          />
        }, //alternate way
        id: 'action', //id required if you use accessorFn instead of accessorKey
        header: 'Action',
        Header: "Action", //optional custom markup
        maxSize: 50
      }
  ],[]);

  return (

<>
    <div style={{
        maxHeight:"calc(100vh - 260px)",
        minHeight: "calc(100vh - 260px)",
        borderBottom: "1px solid #ccc"
        }} className="tiny-scroll">
        <MantineReactTable 
          
          enableFullScreenToggle={false}
          enablePagination={false}
          enableBottomToolbar={false}
          columns={columns}
          data={companyData??[]}
          enableRowSelection={false} //enable some features
          enableColumnOrdering={false}
          enableGlobalFilter={false} //turn off a feature
          enableDensityToggle={false}
          enableFilters={false}
          enableColumnActions={false}
          enableColumnDragging={false}
          enableHiding={false}
          initialState={{ density: 'xs' }}
          enableStickyHeader={true}
          state={{isLoading:isLoading}}
          mantineTableContainerProps={{
            sx:{ maxHeight: 'calc(100vh - 265px)', minHeight:"200px", overflow: "auto !important" },
            className:"tiny-scroll"
          }}
          
          mantineTableBodyCellProps={{
            sx:{padding:"0px !important"}
          }}
          
        />
      </div>
        
      <PaginationControls
        pageNumber={pageNumber}
        totalPages={companyPagination?.totalPages}
        onPageNumberChange={setPageNumber}
        // onPageSizeChange={setPageSize}
        // pageSize={pageSize}
      /> 
    </>
  );
}