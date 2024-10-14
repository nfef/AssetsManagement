import "@tanstack/react-table";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Modal } from '@mantine/core';
import moment from "moment";
import { title } from "process";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";

interface DeleteFormProps {
  opened: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  close: VoidFunction;
  title?: String;
}
const DeleteForm = ({
  opened,onClose,onConfirm, close,title
}:DeleteFormProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Confirmation de l'action" centered withCloseButton>
        <span>{title??"Voules vous vraiment supprimer cet élément?"}</span>
        <div className="d-flex mt-3">
          <Button 
            className="ml-auto"
            style={{color:"white",background:"green",border:"1px solid green"}}
            variant="contained"
            onClick={onConfirm}>Confirmer</Button>
          <div className="col-1"></div>
          <Button 
            variant="outlined"
            style={{color:"gray",border:"1px solid gray"}}
            onClick={close}>Annuler</Button> 
        </div>
      </Modal>
  );
}

export default DeleteForm;