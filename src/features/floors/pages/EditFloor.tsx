import {FloorForm} from "../components";
import { useParams } from "react-router-dom";
import { useGetFloor } from "../api";


const EditFloor = () => {
  const {id} = useParams();
  const { data: floor } = useGetFloor(id); 

  return (
    <div className="card-add-change-request"> <FloorForm floorId={id}  floorData={floor} /></div>
  );
}
export { EditFloor };