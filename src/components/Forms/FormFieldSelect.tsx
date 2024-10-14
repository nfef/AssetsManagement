import classNames from "classnames";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { BiError } from "react-icons/bi";
import AsyncSelect from "react-select/async";
import { ErrorMessage, Field } from "formik";
import CustomSelect from "./CustomSelect";

const animatedComponents = makeAnimated();

interface SelectProps {
  name: string;
  isMulti?:boolean;
  label?:string;
  required?: boolean;
  loadOptions?: Function;
  options?: Array<any>;
  async?: boolean;
}

const FormFieldSelect = ({async,name,isMulti,label,required,loadOptions,options}:SelectProps) => {

  return (
    <div className="d-block w-100 form-field col-12 mt-0 p-0">
      {label && <label className="form-label mb-2 w-100" htmlFor={name} >{label} {required && <span className=" text-danger">*</span>}</label>}
      <div className={"w-100"}>
        <Field
          className="custom-select"
          name={name}
          async={async}
          options={options}
          loadOptions={loadOptions}
          component={CustomSelect}
          placeholder="Select..."
          isMulti={isMulti}
        />
        <div className="span field-error"> 
          <ErrorMessage name={name}/>
        </div>
      </div>
    </div>
  );
}

export default FormFieldSelect;