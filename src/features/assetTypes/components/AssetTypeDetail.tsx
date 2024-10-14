
import { Notifications } from "../../../components/notifications";
import {
  AssetTypeDto
} from "..";

import FieldDetail from "../../../components/Forms/FieldDetail";


interface AssetTypeFormProps {
  data?: AssetTypeDto;
}

function AssetTypeDetail({ data }: AssetTypeFormProps) {

 

  return (
    <div className="d-flex flex-column">
        <div className="row mb-4">
             
                    
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.code}  label="Code" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.description}  label="Description" />
                    </div>       
        </div>   
    </div>
  );
}

export { AssetTypeDetail };