import {AlerteRemindForm} from "../components";
import { useParams } from "react-router-dom";
import { useGetAlerteRemind } from "../api/getAlerteRemind";


const EditAlerteRemind = () => {
  const {id} = useParams();
  const { data: AlerteRemind } = useGetAlerteRemind(id); 

  return (
    <div className="card-add-change-request"> <AlerteRemindForm alerteRemindData={AlerteRemind} /></div>
  );
}
export default EditAlerteRemind;