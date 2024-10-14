
import { Notifications } from "../../../components/notifications";
import { AssetDto, useDeleteAsset, useAssets } from "..";
import "@tanstack/react-table";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import PaginationControls from "../../../components/Table/PaginationControls";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TableAction from "../../../components/Table/TableAction";
import { selectPageSize } from "../../../app/PageSlice";
import bwipjs from "@bwip-js/browser";

interface AssetListTableProps {
  queryFilter?: string | undefined;
}

export function AssetListTable({ queryFilter }: AssetListTableProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = useSelector(selectPageSize);

  
  const deleteAssetApi = useDeleteAsset();
  function deleteAsset(id: string) {
    deleteAssetApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("Immobilisation supprimée avec succès");
      })
      .catch((e) => {
        Notifications.error("Une erreur s'est produite lors de la suppression de l'immobilisation");
        console.error(e);
      });
  }

  const { data: assetResponse, isLoading } = useAssets({
    //sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const assetData = assetResponse?.data;
  const assetPagination = assetResponse?.pagination;

  const columns = useMemo<MRT_ColumnDef<AssetDto>[]>(
    () => [
    // {
    //     accessorKey: "assetId",
    //     id: "assetId", // id required if you use accessorFn instead of accessorKey
    //     header: "AssetId",
    //     maxSize: 50
    // },
    {
        accessorKey: "erpCode",
        id: "erpCode", // id required if you use accessorFn instead of accessorKey
        header: "Code ERP",
        maxSize: 50,
        Cell: ({cell}) => (
          <div style={{padding: '8px'}}>
            {cell.getValue<string>()}
          </div>
        ),
    },
    {
        accessorKey: "barcode",
        id: "barcode", // id required if you use accessorFn instead of accessorKey
        header: "Code Barre",
        maxSize: 50,
        Cell: ({cell}) => {
          const barcode = cell.getValue<string>();
          const canvasRef = useRef<HTMLCanvasElement>(null);
          useEffect(() => {
            if (canvasRef.current && barcode) {
              bwipjs.toCanvas(canvasRef.current, {
                bcid: 'code128',       // Barcode type
                text: barcode,    // Text to encode
                scale: 3,               // 3x scaling factor
                height: 10,              // Bar height, in millimeters
                includetext: true,            // Show human-readable text
                textxalign: 'center',        // Always good to set this
              });
            }
          }, [barcode]);
          
          return <canvas ref={canvasRef} />;
        }
    },
    // {
    //     accessorKey: "companyId",
    //     id: "companyId", // id required if you use accessorFn instead of accessorKey
    //     header: "Société",
    //     maxSize: 50
    // },
    // {
    //     accessorKey: "floorId",
    //     id: "floorId", // id required if you use accessorFn instead of accessorKey
    //     header: "Etage",
    //     maxSize: 50
    // },
    // {
    //     accessorKey: "assetTypeId",
    //     id: "assetTypeId", // id required if you use accessorFn instead of accessorKey
    //     header: "Type de Matériel",
    //     maxSize: 50
    // },
    {
        accessorKey: "description",
        id: "description", // id required if you use accessorFn instead of accessorKey
        header: "Description",
        maxSize: 50
    },
    {
        accessorKey: "status",
        id: "status", // id required if you use accessorFn instead of accessorKey
        header: "Status",
        maxSize: 50
    },
    // {
    //     accessorKey: "purchaseDate",
    //     id: "purchaseDate", // id required if you use accessorFn instead of accessorKey
    //     header: "Date d'achat",
    //     maxSize: 50
    // },
    // {
    //     accessorKey: "exityDate",
    //     id: "exityDate", // id required if you use accessorFn instead of accessorKey
    //     header: "Date de sortie",
    //     maxSize: 50
    // },
      {
        accessorFn: (originalRow) => {
          return <TableAction 
          data={originalRow}
          consultUrl={`/assets/consult/${originalRow.id}`}
          editUrl={`/assets/edit/${originalRow.id}`}
          deleteData={ deleteAsset }  
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
          data={assetData??[]}
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
        totalPages={assetPagination?.totalPages}
        onPageNumberChange={setPageNumber}
        // onPageSizeChange={setPageSize}
        // pageSize={pageSize}
      /> 
    </>
  );
}