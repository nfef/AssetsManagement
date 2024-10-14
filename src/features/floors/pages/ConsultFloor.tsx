import {FloorDetail} from "../components";
import { useParams } from "react-router-dom";
import { useGetFloor } from "../api";


const ConsultFloor = () => {
  const {id} = useParams();
  const { data: floor } = useGetFloor(id); 

  return (
    <div className="card-add-change-request"> <FloorDetail  data={floor} /></div>
  );
}
export { ConsultFloor };