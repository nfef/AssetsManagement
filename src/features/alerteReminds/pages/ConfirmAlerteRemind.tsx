import {ConfirmAlerteRemindForm} from "../components/ConfirmAlertremindForm";
import { useParams } from "react-router-dom";
import { useGetAlerteRemind } from "../api/getAlerteRemind";


const ConfirmAlerteRemind = () => {
  const {id} = useParams();
  const { data: AlerteRemind } = useGetAlerteRemind(id); 

  return (
    
    <div className="card-add-change-request"> <ConfirmAlerteRemindForm alerteRemindData={AlerteRemind} /></div>
  );
}
export default ConfirmAlerteRemind;