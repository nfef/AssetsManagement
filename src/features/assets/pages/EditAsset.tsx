import {AssetForm} from "../components";
import { useParams } from "react-router-dom";
import { useGetAsset } from "../api";


const EditAsset = () => {
  const {id} = useParams();
  const { data: asset } = useGetAsset(id); 

  return (
    <div className="card-add-change-request"> <AssetForm assetId={id}  assetData={asset} /></div>
  );
}
export { EditAsset };