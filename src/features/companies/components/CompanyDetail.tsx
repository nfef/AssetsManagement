
import { Notifications } from "../../../components/notifications";
import {
  CompanyDto
} from "..";

import FieldDetail from "../../../components/Forms/FieldDetail";


interface CompanyFormProps {
  data?: CompanyDto;
}

function CompanyDetail({ data }: CompanyFormProps) {

 

  return (
    <div className="d-flex flex-column">
        <div className="row mb-4">
             
                    
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.code}  label="Code" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.name}  label="Name" />
                    </div>       
        </div>   
    </div>
  );
}

export { CompanyDetail };