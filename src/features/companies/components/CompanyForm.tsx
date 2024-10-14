
import { Notifications } from "../../../components/notifications";
import {
  CompanyDto,
  CompanyForCreationDto,
  CompanyForUpdateDto,
  companyValidationSchema,
  useAddCompany,
  useUpdateCompany,
} from "..";

import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import FormFieldInput from "../../../components/Forms/FormFieldInput";
import { FiSave } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";



interface CompanyFormProps {
  companyId?: string | undefined;
  companyData?: CompanyDto;
}

function CompanyForm({ companyId, companyData }: CompanyFormProps) {

  const navigate = useNavigate();

  const [company, setCompany] = useState({
  // companyId:companyData?.companyId??0,
code:companyData?.code??"",
name:companyData?.name??"",

  } as CompanyDto);


  useEffect(()=>{
    if(companyData && companyData.id) setCompany(companyData as CompanyDto);
  },[companyData]);

  const onSubmit = (data:CompanyDto, formikHelpers: FormikHelpers<CompanyDto>) => {
    (companyId == null || companyId == undefined) ?  createCompany(data as CompanyForCreationDto,formikHelpers) : updateCompany(data as CompanyForUpdateDto,formikHelpers);
  };

  const createCompanyApi = useAddCompany();
  function createCompany(data: CompanyForCreationDto, formikHelpers: FormikHelpers<CompanyDto>) {
    createCompanyApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("Company created successfully");
      })
      .then(() => {
        navigate("/list/companies")
      })
      .catch((e) => {
        Notifications.error("There was an error creating the company");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  const updateCompanyApi = useUpdateCompany();
  function updateCompany(data: CompanyForUpdateDto, formikHelpers: FormikHelpers<CompanyDto>) {
    const id = companyId;
    if (id === null || id === undefined) return;

    updateCompanyApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("Company updated successfully");
      })
      .then(() => {
        navigate("/list/companies");
      })
      .catch((e) => {
        Notifications.error("There was an error updating the Company");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  return (
    <>
      <Formik
         initialValues={ company as CompanyDto}
        validationSchema={companyValidationSchema}
        onSubmit={(values,formikHelpers) => {
          onSubmit(values, formikHelpers);
        }}
        // validateOnChange={false}
        validateOnMount={false}
        // initialStatus={true}
        enableReinitialize={true} // Réinitialise les valeurs et désactive la validation lors du premier rendu
      >
        {({ errors,isSubmitting,values,setFieldValue}) => {
          return (
            <Form>
              <div >
                {isSubmitting && <div className="lds-roller"></div>}
                <div className="d-flex flex-column">
                  <div className="row mb-4">

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="code"  label="Code" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="name"  label="Name" required/>
                    </div>       
                    </div>
                  </div>    
                </div> 
              <div className="invf-form-submit d-flex">        
                <Button 
                  type='button' 
                  className=" mr-2 " 
                  onClick={() =>  navigate("/list/companies")} 
                  startIcon={<FaTimes/> } 
                  children="Annuler" 
                  variant="outlined"
                />
                
                <LoadingButton 
                  type='submit' 
                  variant="contained"
                  className="annuler  ml-auto" 
                  startIcon={<FiSave/> } 
                  children={"Enregister"}
                  loading={isSubmitting}
                  
                />        
              </div>

            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export { CompanyForm };