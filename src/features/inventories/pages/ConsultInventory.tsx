import {InventoryDetail} from "../components";
import { useParams } from "react-router-dom";
import { useGetInventory } from "../api";


const ConsultInventory = () => {
  const {id} = useParams();
  const { data: inventory } = useGetInventory(id); 

  return (
    <div className="card-add-change-request"> <InventoryDetail  data={inventory} /></div>
  );
}
export { ConsultInventory };