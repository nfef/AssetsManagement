import classNames from "classnames";
import "./FormField.styles.css";
import { ErrorMessage, Field } from "formik";

interface Props {
  name: string;
  label?: string;
  errors?: Array<any>;
  required?: boolean;
  values?: Array<any>;
  setFieldValue?: Function;
  placeholder?: string;
}

const FormFieldCheckbox = ({name,label} : Props) => {
  
  return (
    <div className={"d-block w-100 form-field col-12 mt-0 p-0"}>
      <div className={classNames("w-100")}
      >
        <div className="w-100 form-checkbox">
          <Field name={name} type="checkbox">
            {({ field } : any) => (
              <label>
                <input
                  name={name}
                  id={name}
                  type="checkbox"
                  {...field}
                  checked={field.value}
                />
                <label className="pl-2" htmlFor={name}>{label}</label>
              </label>
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

export default FormFieldCheckbox;