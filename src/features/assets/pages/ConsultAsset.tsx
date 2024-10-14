import {AssetDetail} from "../components";
import { useParams } from "react-router-dom";
import { useGetAsset } from "../api";


const ConsultAsset = () => {
  const {id} = useParams();
  const { data: asset } = useGetAsset(id); 

  return (
    <div className="card-add-change-request"> <AssetDetail  data={asset} /></div>
  );
}
export { ConsultAsset };