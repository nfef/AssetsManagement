import {CompanyDetail} from "../components";
import { useParams } from "react-router-dom";
import { useGetCompany } from "../api";


const ConsultCompany = () => {
  const {id} = useParams();
  const { data: company } = useGetCompany(id); 

  return (
    <div className="card-add-change-request"> <CompanyDetail  data={company} /></div>
  );
}
export { ConsultCompany };