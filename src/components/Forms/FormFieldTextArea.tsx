import classNames from "classnames";
import "./FormFieldTextArea.scss";
import { ErrorMessage, Field } from "formik";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  rows?:number;
}

const FormFieldTextArea = ({name,label,required,placeholder,rows = 3} : Props) => {
  
  return (
    <div className={"d-block w-100 form-field col-12 mt-0 p-0"}>
      {label && <label className="form-label mb-2 w-100" htmlFor={name} >{label} {required && <span className=" text-danger">*</span>}</label>}
      <div className={classNames("w-100 form-field-textarea")}>
        <div className="w-100">
          <Field name={name} type="textarea">
            {({ field } : any) => (
              <textarea 
                {...field}
                placeholder={placeholder}
                rows={rows} type="text" name={name} 
                className={classNames("form-control textarea ")}  >
              </textarea>                
            )}
          </Field>
        </div>
        <div className="span field-error"> 
          <ErrorMessage name={name}/>
        </div>
      </div>
    </div>
  )
}

export default FormFieldTextArea;