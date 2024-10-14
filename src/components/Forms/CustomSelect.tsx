import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";
import  OptionsType  from "react-select";
import  ValueType  from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import AsyncSelect from "react-select/async";

const animatedComponents = makeAnimated();

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Option[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  async?:boolean;
  loadOptions?:any;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  async = false,
  loadOptions

}: CustomSelectProps) => {
  const onChange = (option: Option | Option[]) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {

    if (options) {
      return isMulti
        ? options?.filter(option => field.value.indexOf(option.value) >= 0)
        : options?.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <>
      {async ? 
      <>
      <AsyncSelect
        //styles={customStyles}
        // name={field.name}
        // placeholder={placeholder}
        // value={getValue()}
        cacheOptions
        components={animatedComponents} 
        //value={value}
        className="custom-react-select"
        // isDisabled={disabled}
        // onChange={handleChange}
        loadOptions={loadOptions}
        // onInputChange={handleInputChange}
        isMulti={isMulti}
        
        defaultOptions
        onChange={(option : any) => {
          form.setFieldValue(
            field.name,
            isMulti
              ? option?.map((item: any) => item.value)
              : option?.value
          );
        }}
        //{...props}
      />
      </>: <Select
      className={className}
      name={field.name}
      value={getValue()}
      // onChange={onChange}
      onChange={(option : any) => {
        form.setFieldValue(
          field.name,
          isMulti
            ? option?.map((item: any) => item.value)
            : option?.value
        );
      }}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />}
    </>
    
  );
};

export default CustomSelect;

