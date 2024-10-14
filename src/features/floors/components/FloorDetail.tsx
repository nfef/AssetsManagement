
import { Notifications } from "../../../components/notifications";
import {
  FloorDto
} from "..";

import FieldDetail from "../../../components/Forms/FieldDetail";


interface FloorFormProps {
  data?: FloorDto;
}

function FloorDetail({ data }: FloorFormProps) {

 

  return (
    <div className="d-flex flex-column">
        <div className="row mb-4">
             
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.position}  label="Position" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.description}  label="Description" />
                    </div>       
        </div>   
    </div>
  );
}

export { FloorDetail };