
import { Notifications } from "../../../components/notifications";
import { AssetTypeDto, useDeleteAssetType, useAssetTypes } from "..";
import "@tanstack/react-table";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import PaginationControls from "../../../components/Table/PaginationControls";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TableAction from "../../../components/Table/TableAction";
import { selectPageSize } from "../../../app/PageSlice";

interface AssetTypeListTableProps {
  queryFilter?: string | undefined;
}

export function AssetTypeListTable({ queryFilter }: AssetTypeListTableProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = useSelector(selectPageSize);

  
  const deleteAssetTypeApi = useDeleteAssetType();
  function deleteAssetType(id: string) {
    deleteAssetTypeApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("AssetType deleted successfully");
      })
      .catch((e) => {
        Notifications.error("There was an error deleting the assetType");
        console.error(e);
      });
  }

  const { data: assetTypeResponse, isLoading } = useAssetTypes({
    //sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const assetTypeData = assetTypeResponse?.data;
  const assetTypePagination = assetTypeResponse?.pagination;

  const columns = useMemo<MRT_ColumnDef<AssetTypeDto>[]>(
    () => [
    // {
    //     accessorKey: "assetTypeId",
    //     id: "assetTypeId", // id required if you use accessorFn instead of accessorKey
    //     header: "AssetTypeId",
    //     maxSize: 50
    // },
    {
        accessorKey: "code",
        id: "code", // id required if you use accessorFn instead of accessorKey
        header: "Code",
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
          consultUrl={`/assettypes/consult/${originalRow.id}`}
          editUrl={`/assettypes/edit/${originalRow.id}`}
          deleteData={ deleteAssetType }  
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
          data={assetTypeData??[]}
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
        totalPages={assetTypePagination?.totalPages}
        onPageNumberChange={setPageNumber}
        // onPageSizeChange={setPageSize}
        // pageSize={pageSize}
      /> 
    </>
  );
}