import { ErrorMessage, Field } from "formik"
import classNames from "classnames";
import "./FormField.styles.css";

interface Props {
  name: string;
  label?: string | undefined;
  required?: boolean;
  values?: Array<any>;
  placeholder?: string;
  type?: "text" | "number" | "color" | "date" | "datetime-local" | "month" | "password" | "search" | "time"
}

const FormFieldInput = ({
  name,
  label,
  required,
  placeholder,
  type = "text"} : Props) => {
  
  
  return (
    <div className="d-block w-100 form-field col-12 mt-0 p-0">
      {label && <label className="form-label mb-2 w-100" htmlFor={name} >{label} {required && <span className=" text-danger">*</span>}</label>}
      
      <div className={classNames("w-100")}>
        <Field  
          placeholder={placeholder} 
          name={name} 
          id={name} 
          className={classNames("form-control")}
          type={type}
        />
        <div className="span field-error"> 
          <ErrorMessage name={name}/>
        </div>
      </div>
    </div>
  )
}

export default FormFieldInput;