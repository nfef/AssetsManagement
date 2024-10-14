
import "@tanstack/react-table";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { Menu, MenuItem } from '@szhsin/react-menu';
import { TiEye } from "react-icons/ti";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { HiDotsVertical } from "react-icons/hi"
import { BsCheck2Circle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeleteForm from "../Forms/DeleteForm";
import { useDisclosure } from '@mantine/hooks';


interface TableActionProps {
  data: any,
  deleteData?: Function;
  withDelete?: boolean;
  editUrl?: string;
  consultUrl?: string;
}
const TableAction = ({data,deleteData,editUrl,consultUrl}:TableActionProps) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Menu 
        className={"table-action"}
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
        {consultUrl != undefined && <MenuItem onClick={() => navigate(consultUrl)}><TiEye className="mr-2" /><span>Consulter</span></MenuItem>}
        {editUrl != undefined && <MenuItem onClick={() => navigate(editUrl)}><BsCheck2Circle />Modifier</MenuItem>}
        {deleteData != undefined && <MenuItem onClick={()=>open()}><MdDelete />Supprimer</MenuItem>}
      </Menu>
      <DeleteForm 
        close={close} 
        onClose={close} 
        onConfirm={() => {
          if(deleteData != undefined) deleteData(data?.id);
          close();
        }} 
        opened={opened} 
      />
    </>
    
  );
}

export  default TableAction;