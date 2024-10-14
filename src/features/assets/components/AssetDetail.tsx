
import { Notifications } from "../../../components/notifications";
import {
  AssetDto
} from "..";

import FieldDetail from "../../../components/Forms/FieldDetail";


interface AssetFormProps {
  data?: AssetDto;
}

function AssetDetail({ data }: AssetFormProps) {

 

  return (
    <div className="d-flex flex-column">
        <div className="row mb-4">
             
                    
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.erpCode}  label="ErpCode" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.barcode}  label="Barcode" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.companyId}  label="CompanyId" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.floorId}  label="FloorId" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.assetTypeId}  label="AssetTypeId" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.description}  label="Description" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.status}  label="Status" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.purchaseDate}  label="PurchaseDate" />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FieldDetail value={data?.exityDate}  label="ExityDate" />
                    </div>       
        </div>   
    </div>
  );
}

export { AssetDetail };