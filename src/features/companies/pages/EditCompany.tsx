import {CompanyForm} from "../components";
import { useParams } from "react-router-dom";
import { useGetCompany } from "../api";


const EditCompany = () => {
  const {id} = useParams();
  const { data: company } = useGetCompany(id); 

  return (
    <div className="card-add-change-request"> <CompanyForm companyId={id}  companyData={company} /></div>
  );
}
export { EditCompany };