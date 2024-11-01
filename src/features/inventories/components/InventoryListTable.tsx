
import { Notifications } from "../../../components/notifications";
import { InventoryDto, useDeleteInventory, useInventories } from "..";
import "@tanstack/react-table";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import PaginationControls from "../../../components/Table/PaginationControls";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TableAction from "../../../components/Table/TableAction";
import { selectPageSize } from "../../../app/PageSlice";
import moment from 'moment';
import { download } from "../../../utils/download";

interface InventoryListTableProps {
  queryFilter?: string | undefined;
}

export function InventoryListTable({ queryFilter }: InventoryListTableProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = useSelector(selectPageSize);


  const deleteInventoryApi = useDeleteInventory();
  function deleteInventory(id: string) {
    deleteInventoryApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("Immobilisation supprimée avec succès");
      })
      .catch((e) => {
        Notifications.error("Une erreur s'est produite lors de la suppression de l'immobilisation");
        console.error(e);
      });
  }

  const { data: inventoryResponse, isLoading } = useInventories({
    //sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const inventoryData = inventoryResponse?.data;
  const inventoryPagination = inventoryResponse?.pagination;
  console.log('inventoryData', inventoryData);

  const printReport = (id: string) => {
    // window.open(`/api/inventories/${id}/report`, '_blank');
    const url = `/api/inventories/${id}/report`;
    const filename = `inventory_report_${id}.pdf`;
    download(url, filename);
  };

  const columns = useMemo<MRT_ColumnDef<InventoryDto>[]>(
    () => [
      {
        accessorKey: "id",
        header: "#ID",
      },
      // {
      //     accessorKey: "assetId",
      //     id: "assetId", // id required if you use accessorFn instead of accessorKey
      //     header: "AssetId",
      //     maxSize: 50
      // },
      // {
      //     accessorKey: "itemCount",
      //     id: "floorId", // id required if you use accessorFn instead of accessorKey
      //     header: "FloorId",
      //     maxSize: 50
      // },
      {
        accessorKey: "createdAt",
        id: "inventoryDate", // id required if you use accessorFn instead of accessorKey
        header: "Date Inventaire",
        maxSize: 50,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>();
          return moment(date).format('DD/MM/YYYY');
        }
      },
      {
        accessorFn: (originalRow) => {
          return (
            <div>
              {/* <TableAction
                data={originalRow}
                // consultUrl={`/inventories/consult/${originalRow.id}`}
                // editUrl={`/inventories/edit/${originalRow.id}`}
              // deleteData={ deleteInventory }  
              /> */}
              <button onClick={() => printReport(originalRow.id)}>Imprimer le rapport</button>
            </div>
          );
        }, //alternate way
        id: 'action', //id required if you use accessorFn instead of accessorKey
        header: 'Action',
        Header: "Action", //optional custom markup
        maxSize: 50
      }
    ], []);

  return (

    <>
      <div style={{
        maxHeight: "calc(100vh - 260px)",
        minHeight: "calc(100vh - 260px)",
        borderBottom: "1px solid #ccc"
      }} className="tiny-scroll">
        <MantineReactTable

          enableFullScreenToggle={false}
          enablePagination={false}
          enableBottomToolbar={false}
          columns={columns}
          data={inventoryData ?? []}
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
          state={{ isLoading: isLoading }}
          mantineTableContainerProps={{
            sx: { maxHeight: 'calc(100vh - 265px)', minHeight: "200px", overflow: "auto !important" },
            className: "tiny-scroll"
          }}

          mantineTableBodyCellProps={{
            sx: { padding: "0px !important" }
          }}

        />
      </div>

      <PaginationControls
        pageNumber={pageNumber}
        totalPages={inventoryPagination?.totalPages}
        onPageNumberChange={setPageNumber}
      // onPageSizeChange={setPageSize}
      // pageSize={pageSize}
      />
    </>
  );
}