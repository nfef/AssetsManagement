import { useParams } from "react-router-dom";
import { AlerteRemindDetail } from "../components";
import { useGetAlerteRemind } from "../api";

const DetailAlerteRemind = () => {
  const {id} = useParams();
  const { data: AlerteRemind } = useGetAlerteRemind(id); 

  return (
    <div className="card-add-change-request"><AlerteRemindDetail data={AlerteRemind}  /></div>
  );
}
export default DetailAlerteRemind;