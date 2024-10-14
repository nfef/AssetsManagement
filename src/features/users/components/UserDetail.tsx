
import { Notifications } from "../../../components/notifications";
import {
  UserDto
} from "..";

import FieldDetail from "../../../components/Forms/FieldDetail";


interface UserFormProps {
  data?: UserDto;
}

function UserDetail({ data }: UserFormProps) {

 

  return (
    <div className="d-flex flex-column">
        <div className="row mb-4">
             
                    {/* <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.userId}  label="UserId" />
                    </div> */}
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.username}  label="Username" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.password}  label="Password" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.role}  label="Role" />
                    </div>       
        </div>   
    </div>
  );
}

export { UserDetail };