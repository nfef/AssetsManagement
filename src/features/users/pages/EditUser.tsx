import {UserForm} from "../components";
import { useParams } from "react-router-dom";
import { useGetUser } from "../api";


const EditUser = () => {
  const {id} = useParams();
  const { data: user } = useGetUser(id); 

  return (
    <div className="card-add-change-request"> <UserForm userId={id}  userData={user} /></div>
  );
}
export { EditUser };