
import {
  AlerteRemindDto,
  AlerteRemindForCreationDto,
  AlerteRemindForUpdateDto,
  alerteRemindValidationSchema,
  useAddAlerteRemind,
  useUpdateAlerteRemind,
} from "../../alerteReminds";
import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { FiSave } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router";
import { TiArrowBack } from "react-icons/ti";

import FormFieldInput from "../../../components/Forms/FormFieldInput";
import FormatedTextEditor from "../../../components/Forms/FormatedTextEditor";
import { LoadingButton } from '@mui/lab';
import { Notifications } from "../../../components/notifications";
import FormFieldDateTime from "../../../components/Forms/FormFiledDateTime";
import FormFieldCheckbox from "../../../components/Forms/FormFieldCheckbox";
import FormFieldTextArea from "../../../components/Forms/FormFieldTextArea";
import { UserDto } from "../../../types/user"
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../auth/AuthUserSlice";
import CustomSelect from "../../../components/Forms/CustomSelect";
import SelectEmploye from "../../../components/Forms/SelectEmploye";
import { RiFileAddLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import FormFieldSelect from "../../../components/Forms/FormFieldSelect";
interface AlerteRemindFormProps {
  alerteRemindId?: string | undefined;
  alerteRemindData?: AlerteRemindDto;
}

function AlerteRemindForm({ alerteRemindId, alerteRemindData }: AlerteRemindFormProps) {

  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const [alerteRemind,setAlerteRemind] = useState({
    remindDate: new Date(),
    remindInterval: 1,
    remindNumber: 1,
    creator: {
      cuid: currentUser?.preferred_username,
      email: currentUser?.email,
      nom: currentUser?.name
    } as UserDto,
    affecteds: [] as Array<UserDto>,
    contractType: "",
    recipients: [] as Array<UserDto>,
    motif: "",
    actions: [] as Array<any>
    } as AlerteRemindForCreationDto | AlerteRemindForUpdateDto);
    

  // handle default change request for update
  useEffect(()=>{
    if(alerteRemindData && alerteRemindData?.id) setAlerteRemind(alerteRemindData);
  },[alerteRemindData]);



  const onSubmit = (data: AlerteRemindForCreationDto | AlerteRemindForUpdateDto,formikHelpers: FormikHelpers<AlerteRemindForCreationDto | AlerteRemindForUpdateDto>) => { 
    alerteRemindData && alerteRemindData?.id ? updateAlerteRemind(data,formikHelpers) : createAlerteRemind(data,formikHelpers) ;  
  };

  const createAlerteRemindApi = useAddAlerteRemind();
  function createAlerteRemind(data: AlerteRemindForCreationDto,formikHelpers: FormikHelpers<AlerteRemindForCreationDto | AlerteRemindForUpdateDto>) {
    createAlerteRemindApi
      .mutateAsync(data)
      .then(() => {
        formikHelpers.setSubmitting(false);
        Notifications.success("AlerteRemind created successfully");
        navigate(-1);
      })
      .then(() => {
       
      })
      .catch((e) => {
        formikHelpers.setSubmitting(false);
        Notifications.error("There was an error creating the alerteRemind");
        console.error(e);
      });
  }

  const updateAlerteRemindApi = useUpdateAlerteRemind();
  function updateAlerteRemind(data: AlerteRemindForUpdateDto,formikHelpers: FormikHelpers<AlerteRemindForCreationDto | AlerteRemindForUpdateDto>) {
    const id = alerteRemindId;
    if (id === null || id === undefined) return;

    updateAlerteRemindApi
      .mutateAsync({ id, data })
      .then(() => {
        formikHelpers.setSubmitting(false);
        Notifications.success("AlerteRemind updated successfully");
        navigate(-1);
      })
      .then(() => {
        
      })
      .catch((e) => {
        formikHelpers.setSubmitting(false);
        Notifications.error("There was an error updating the AlerteRemind");
        console.error(e);
      });
  }
  return (
    <div>
    
    
    <div
      className="wf-change-request-content"
      style={{
        padding: "15px",
        paddingLeft: "2.5%",
        paddingRight: "2.5%"
      }}
    >
      <div className="bg-orange change-request-title d-flex ">
      Création une alerte de rappel
      <div className="ml-auto d-flex">      
        <Button variant="text" type='button' className="annuler cursor-pointer " onClick={() => navigate(-1)} startIcon={<TiArrowBack/> } title="Retourner" />
      </div>
    </div>
      <Formik
        initialValues={alerteRemind}
        validationSchema={alerteRemindValidationSchema}
        onSubmit={(values,formikHelpers) => onSubmit(values,formikHelpers)}
        // validateOnChange={false}
        validateOnMount={false}
        // initialStatus={true}
        enableReinitialize={false} // Réinitialise les valeurs et désactive la validation lors du premier rendu
      >
        {({ errors,isSubmitting,values,setFieldValue}) => {
          return (
            <Form>
              <div >
                {isSubmitting && <div className="lds-roller"></div>}
                <div className="d-flex flex-column">
                  <div className="row mb-4">
                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="motif"  label={"Motif du rappel"} required/>
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      {/* <FormFieldDateTime name="remindDate" type="date" label={"Date de rappel"} required/> */}
                      <FormFieldInput name="remindDate" type="date" label={"Date de rappel"} required/>
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="remindNumber" type="number" label={"Nombre de rappel solicité"} required/>
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="remindInterval" type="number" label={"Interval de rappel en jour"} required/>
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <SelectEmploye isMulti name={"affecteds"} label={"Les employés concernés"} />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldSelect options={[{label:"CDI",value:"CDI"},{label:"CDD",value:"CDD"}]} name={"contractType"} label={"Type de contrat"} />
                    </div>
                    <div className="col-12 col-md-6  mt-4">
                      <SelectEmploye isMulti name={"recipients"} label={"Personne à mettre en copie"} />
                    </div>
                    <Divider className="mt-3 mb-3 form-label">Les actions à renseigner dans le mail de rappel</Divider>
                    <FieldArray
                      name="actions"
                      render={arrayHelpers => (       
                      
                      <div className="d-flex flex-column">   
                        
                        {values?.actions?.map((livrable,index) => (
                          <div className="col-12 row d-flex" key={index}>
                            <div className="col-11">
                            <FormFieldInput  name={`actions[${index}].title`}  placeholder={"Libélé de l'action"} required/>
                            </div>
                            <div className="col-1">
                            <Button 
                                variant="text"
                                title=  {"Supprimer"}
                                color="error"
                                aria-label="delete"
                                style={{
                                  marginTop:"auto",
                                  marginBottom:"auto",
                                  borderRadius:"40px",
                                  minHeight:"40px",
                                  maxHeight: "40px",
                                  minWidth:"40px",
                                  maxWidth: "40px",
                                }}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <MdDelete size={24}/>
                              </Button>
                            </div>
                          
                          </div>

                        ))} 
                        <div className="col-12 d-flex  mt-2 mb-2">
                            <Button
                              onClick={() => arrayHelpers.push({ title: '' })}
                              startIcon={<RiFileAddLine /> }
                              title= {"Ajouter une action"}
                              style={{
                                color:"#fff",
                                backgroundColor:"#ff9900",
                                width: "250px !important"
                              }}
                              children={"Ajouter une tâche"}
                              className="ml-auto"
                              type="button"
                              variant="contained"
                              sx={{
                                  "&.MuiButton-root": {
                                      backgroundColor: "#FD6620",
                                      textTransform: 'none',
                                      height: "32px",
                                      width: "200px",
                                  },
                                  "&.Mui-disabled": {
                                      color: "white",
                                  }
                              }}
                            />
                          </div>                    
                      </div>)}

                    />
                    </div>
                  </div>    
                </div> 

                    
    
              <div className="invf-form-submit d-flex">        
                <Button 
                  type='button' 
                  className=" mr-2 " 
                  onClick={() =>  navigate(-1)} 
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
    </div>
  </div>
  );
}

export { AlerteRemindForm };