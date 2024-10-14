
import { Notifications } from "../../../components/notifications";
import { FloorDto, useDeleteFloor, useFloors } from "..";
import "@tanstack/react-table";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import PaginationControls from "../../../components/Table/PaginationControls";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TableAction from "../../../components/Table/TableAction";
import { selectPageSize } from "../../../app/PageSlice";
import { original } from "@reduxjs/toolkit";
import { useCompanies, useGetCompany } from "../../companies";

interface FloorListTableProps {
  queryFilter?: string | undefined;
}

export function FloorListTable({ queryFilter }: FloorListTableProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = useSelector(selectPageSize);

  
  const deleteFloorApi = useDeleteFloor();
  function deleteFloor(id: string) {
    deleteFloorApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("Floor deleted successfully");
      })
      .catch((e) => {
        Notifications.error("There was an error deleting the floor");
        console.error(e);
      });
  }
  
  // récupération des sociétes
  const { data: CompaniesResponse } = useCompanies({
    filters: "",
    hasArtificialDelay: true,
  });
  const CompaniesData = CompaniesResponse?.data;

  // const [listCompanies, setListCompanies] = useState([]);

  // console.log('CompaniesData',CompaniesData);

  // useEffect(() => {
  //   setListCompanies(CompaniesData)
  // }, [CompaniesData]);
  // console.log('CompaniesData',CompaniesData);


  const { data: floorResponse, isLoading } = useFloors({
    //sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const floorData = floorResponse?.data;
  const floorPagination = floorResponse?.pagination;

  const columns = useMemo<MRT_ColumnDef<FloorDto>[]>(
    () => [
    {
      accessorFn: (originalRow) => {
        const foundCompany = CompaniesData?.find((company) => company.id === originalRow.companyId);
        console.log('foundCompany',foundCompany);
        return foundCompany?.name || 'Loading...';
      }, //alternate way
        id: "companyId", // id required if you use accessorFn instead of accessorKey
        header: "Société",
        maxSize: 50
    },
    {
        accessorKey: "position",
        id: "position", // id required if you use accessorFn instead of accessorKey
        header: "Position",
        maxSize: 50
    },
    {
        accessorKey: "description",
        id: "description", // id required if you use accessorFn instead of accessorKey
        header: "Description",
        maxSize: 50
    },
      {
        accessorFn: (originalRow) => {
          return <TableAction 
          data={originalRow}
          consultUrl={`/floors/consult/${originalRow.id}`}
          editUrl={`/floors/edit/${originalRow.id}`}
          deleteData={ deleteFloor }  
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
          data={floorData??[]}
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
        totalPages={floorPagination?.totalPages}
        onPageNumberChange={setPageNumber}
        // onPageSizeChange={setPageSize}
        // pageSize={pageSize}
      /> 
    </>
  );
}