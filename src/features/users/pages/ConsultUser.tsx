import {UserDetail} from "../components";
import { useParams } from "react-router-dom";
import { useGetUser } from "../api";


const ConsultUser = () => {
  const {id} = useParams();
  const { data: user } = useGetUser(id); 

  return (
    <div className="card-add-change-request"> <UserDetail  data={user} /></div>
  );
}
export { ConsultUser };