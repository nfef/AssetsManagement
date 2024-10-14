
import { Notifications } from "../../../components/notifications";
import { AlerteRemindDto, useDeleteAlerteRemind, useAlerteReminds } from "../../alerteReminds";
import "@tanstack/react-table";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { Menu, MenuItem } from '@szhsin/react-menu';
import { useEffect, useMemo, useState } from "react";
import { TiEye } from "react-icons/ti";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { HiDotsVertical } from "react-icons/hi"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectPageSize } from "../../../app/PageSlice";
import PaginationControls from "../../../components/Table/PaginationControls";
import { BiEdit } from "react-icons/bi";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { MantineReactTable } from 'mantine-react-table';
import type { MRT_ColumnDef } from 'mantine-react-table'; // If using TypeScript (optional, but recommended)
import { BsCheck2Circle } from "react-icons/bs";
import { selectCurrentUser } from "../../../auth/AuthUserSlice";
import moment from "moment";


interface AlerteRemindListTableProps {
  queryFilter?: string | undefined;
}

function AlerteRemindListTable({ queryFilter }: AlerteRemindListTableProps) {
useEffect(()=> {console.log(queryFilter)},[queryFilter])
  const currentUser = useSelector(selectCurrentUser);
  const [opened, { open, close }] = useDisclosure(false);


  const pageSize = useSelector(selectPageSize);
  const [pageNumber, setPageNumber] = useState(1);
  const [alerteRemindId,setAlerteRemindId] = useState("");

  const navigate = useNavigate();

  const deleteAlerteRemindApi = useDeleteAlerteRemind();
  function deleteAlerteRemind(id: string) {
    deleteAlerteRemindApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("AlerteRemind deleted successfully");
        close();
      })
      .catch((e) => {
        Notifications.error("There was an error deleting the alerteRemind");
        console.error(e);
      });
  }

  const { data: alerteRemindResponse, isLoading } = useAlerteReminds({
    //// sortOrder: sorting as SortingState,
    // pageSize,
    // pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const alerteRemindData = alerteRemindResponse?.data;
  const alerteRemindPagination = alerteRemindResponse?.pagination;


  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo<MRT_ColumnDef<AlerteRemindDto>[]>(
    () => [
      {
        accessorFn: (originalRow) => <span>{moment(originalRow.createdOn).format("DD/MM/YYYY")}</span>, //simple recommended way to define a column
        id: 'createdOn', //id required if you use accessorFn instead of accessorKey
        header: 'Action',
        Header: 'Date de création'
      },
      {
        accessorKey: 'creator.nom', //simple recommended way to define a column
        header: 'Createur'
      },
      {
        accessorFn: (originalRow) => <span>{moment(originalRow.remindDate).format("DD/MM/YYYY")}</span>, //simple recommended way to define a column
        header: 'Date butoir',
        id: "remindDate"
      },
      {
        accessorKey: 'remindNumber', //simple recommended way to define a column
        header: 'Nombre de relance'
      },
      {
        accessorKey: 'remindInterval', //simple recommended way to define a column
        header: 'Interval de relance'
      },
      {
        accessorKey: 'motif', //simple recommended way to define a column
        header: 'Motif'
      },
      {
        accessorFn: (originalRow) => {
          return <Menu 
          className={""}
          // style={{padding:"0px !important"}}  
          menuButton={
            <Button 
              style={{color:"#ccc", borderRadius:"35px",minWidth:"35px",minHeight:"35px"}} 
              size="small"  
              variant="text"
            >
            <HiDotsVertical style={{color:"#333"}} />
          </Button>} 
          transition
        >
          <MenuItem onClick={() => navigate("/detail/alertes/" + originalRow.id )}><TiEye className="mr-2" /><span>Consulter</span></MenuItem>
          <MenuItem 
            disabled={originalRow.finalizer?.cuid != null || originalRow.finalizer?.cuid != currentUser.preferred_username}
            onClick={() => navigate("/close/alertes/" + originalRow.id )}
            // label="Confirm" 
          ><BsCheck2Circle />Terminer</MenuItem>

          <MenuItem 
            onClick={()=>{
              setAlerteRemindId(originalRow?.id);
              open();
            }}
            // label="Confirm" 
          ><MdDelete />Supprimer</MenuItem>
        </Menu>
        }, //alternate way
        id: 'action', //id required if you use accessorFn instead of accessorKey
        header: 'Action',
        Header: "Action", //optional custom markup
      },
    ],
    [],
  );

  return (
    <>
    <MantineReactTable 
        enablePagination={false}
        enableBottomToolbar={false}
        columns={columns}
        data={alerteRemindData??[]}
        enableRowSelection //enable some features
        enableColumnOrdering={false}
        enableGlobalFilter={false} //turn off a feature
        enableDensityToggle={false}
        initialState={{ density: 'xs' }}
      />  
      <PaginationControls
        pageNumber={pageNumber}
        totalPages={alerteRemindPagination?.totalPages}
        onPageNumberChange={setPageNumber}
      />
      
      <Modal opened={opened} onClose={close} title="Confirmation de l'action" centered withCloseButton>
        <span>Voules vous vraiment supprimer cette dmande?</span>
        <div className="d-flex mt-3">
          <Button 
            className="ml-auto"
            style={{color:"white",background:"green",border:"1px solid green"}}
            variant="contained"
            onClick={() => deleteAlerteRemind(alerteRemindId)}>Confirmer</Button>
          <div className="col-1"></div>
          <Button 
            variant="outlined"
            style={{color:"gray",border:"1px solid gray"}}
            onClick={close}>Annuler</Button> 
        </div>
      </Modal>  

    </>
  );
}

export { AlerteRemindListTable }