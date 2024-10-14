import {AssetTypeForm} from "../components";
import { useParams } from "react-router-dom";
import { useGetAssetType } from "../api";


const EditAssetType = () => {
  const {id} = useParams();
  const { data: assetType } = useGetAssetType(id); 

  return (
    <div className="card-add-change-request"> <AssetTypeForm assetTypeId={id}  assetTypeData={assetType} /></div>
  );
}
export { EditAssetType };