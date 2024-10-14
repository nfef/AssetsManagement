import { useCallback, useState, useEffect } from "react";

import { filterNameValue, getApiSuggestions, getUsersInfos } from "../../utils/loadOptions";
import { debounce } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import CustomSelect from "./CustomSelect";

interface SelectEmployeProps {
  name: string;
  isMulti?:boolean;
  label?:string;
  required?: boolean;
}
const SelectEmploye = ({name,isMulti,label,required}:SelectEmployeProps) => {
  const loadOptionsEmployes =  useCallback(
    debounce((inputValue : string, callback : Function) => {
      // getting the cuids for all user who have the name
      getApiSuggestions(inputValue).then((listLogins) => {
        // getting more informations on user whose have cuids
        getUsersInfos(listLogins).then((listUser) => {
          callback(filterNameValue(listUser));
        }).catch((e) => {
          callback(filterNameValue([]));
        });
      }).catch((e) => {
        callback(filterNameValue([]));
      });
    }, 500),
    [] 
  );
  return (
    <div className="d-block w-100 form-field col-12 mt-0 p-0">
      {label && <label className="form-label mb-2 w-100" htmlFor={name} >{label} {required && <span className=" text-danger">*</span>}</label>}
      <div className={"w-100"}>
        <Field
          className="custom-select"
          name={name}
          async
          loadOptions={loadOptionsEmployes}
          component={CustomSelect}
          placeholder="Rechercher..."
          isMulti={isMulti}
        />
        <div className="span field-error"> 
          <ErrorMessage name={name}/>
        </div>
      </div>
    </div>
  );
}

export default SelectEmploye;