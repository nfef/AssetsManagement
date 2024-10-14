import {AssetTypeDetail} from "../components";
import { useParams } from "react-router-dom";
import { useGetAssetType } from "../api";


const ConsultAssetType = () => {
  const {id} = useParams();
  const { data: assetType } = useGetAssetType(id); 

  return (
    <div className="card-add-change-request"> <AssetTypeDetail  data={assetType} /></div>
  );
}
export { ConsultAssetType };