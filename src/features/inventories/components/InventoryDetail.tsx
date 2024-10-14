
import { Notifications } from "../../../components/notifications";
import {
  InventoryDto
} from "..";

import FieldDetail from "../../../components/Forms/FieldDetail";


interface InventoryFormProps {
  data?: InventoryDto;
}

function InventoryDetail({ data }: InventoryFormProps) {

 

  return (
    <div className="d-flex flex-column">
        <div className="row mb-4">
             
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.assetId}  label="AssetId" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.floorId}  label="FloorId" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.inventoryDate}  label="InventoryDate" />
                    </div>       
        </div>   
    </div>
  );
}

export { InventoryDetail };