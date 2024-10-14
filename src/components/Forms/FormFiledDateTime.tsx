import classNames from "classnames";
import "./FormField.styles.css";
// import 'flatpickr/dist/flatpickr.min.css';
import { DateInput2 } from "@blueprintjs/datetime2";
import { format, parse } from "date-fns";
import { useCallback, useState } from "react";
import { ErrorMessage } from "formik";


interface Props {
  name: string;
  label?: string;
  errors?: Array<any>;
  required?: boolean;
  type?: string;
  values?: Array<any>;
  setFieldValue?: Function;
  placeholder?: string;
  enableTime?: boolean;

}

const FormFieldDateTime = ({enableTime,name,label,errors,required,type="text",values,setFieldValue,placeholder} : Props) => {
  
  const [dateValue, setDateValue] = useState<string>();
  const handleChange = useCallback(setDateValue, []);
  const dateFnsFormat = "yyyy-MM-dd HH:mm:ss";
  const formatDate = useCallback((date: Date) => format(date, dateFnsFormat), []);
  const parseDate = useCallback((str: string) => new Date(str), []);
  
  return (
    <div className={"d-block w-100 form-field col-12 mt-0 p-0"}>
      {label && <label className="form-label mb-2 w-100" htmlFor={name} >{label} {required && <span className=" text-danger">*</span>}</label>}
      <div className={classNames("w-100")}>
          <DateInput2
            // disabled={false}
            // contentEditable
            //readOnly={false}
            className={classNames("form-control form-date")} 
            // options={{
            //   format:"d/m/Y",
            //   dateFormat:"d/m/Y",
            //   // defaultDate: [moment(values[name]).format("YYYY/MM/DD")]
            // }}
            // onChange={(dates,currentDateString) => {
            //   setFieldValue(name,dates[0]);
            //   console.log(dates[0]);
            //   console.log( moment(dates[0]).format("YYYY-MM-DD"));
            // }}

            formatDate={formatDate}
            // onChange={handleChange}
            parseDate={parseDate}
            placeholder={dateFnsFormat}
            value={dateValue}
        />
        <div className="span field-error"> 
          <ErrorMessage name={name}/>
        </div>
      </div>
    </div>
  )
}

export default FormFieldDateTime;