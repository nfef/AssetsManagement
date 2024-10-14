import {InventoryForm} from "../components";
import { useParams } from "react-router-dom";
import { useGetInventory } from "../api";


const EditInventory = () => {
  const {id} = useParams();
  const { data: inventory } = useGetInventory(id); 

  return (
    <div className="card-add-change-request"> <InventoryForm inventoryId={id}  inventoryData={inventory} /></div>
  );
}
export { EditInventory };