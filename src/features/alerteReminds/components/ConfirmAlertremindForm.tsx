
import {
  AlerteRemindDto,
  AlerteRemindForCreationDto,
  AlerteRemindForUpdateDto,
  ConfirmAlerteRemindValidationSchema,
  alerteRemindValidationSchema,
  useAddAlerteRemind,
  useUpdateAlerteRemind,
} from "../../alerteReminds";
import { Button } from "@mui/material";
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
interface ConfirmAlerteRemindFormProps {
  alerteRemindId?: string | undefined;
  alerteRemindData?: AlerteRemindDto;
}

function ConfirmAlerteRemindForm({ alerteRemindId, alerteRemindData }: ConfirmAlerteRemindFormProps) {

  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const [alerteRemind,setAlerteRemind] = useState({
    finalizationDate: new Date(),
    receptionDate: new Date(),
    confirmationDate: new Date(),
    convincing: false,
    finalizer: {
      cuid: currentUser?.preferred_username,
      email: currentUser?.email,
      nom: currentUser?.name
    } as UserDto,
    } as AlerteRemindForCreationDto | AlerteRemindForUpdateDto);
    

  // handle default change request for update
  useEffect(()=>{
    if(alerteRemindData && alerteRemindData?.id) setAlerteRemind(alerteRemindData);
  },[alerteRemindData]);



  const onSubmit = (data: AlerteRemindForCreationDto | AlerteRemindForUpdateDto,formikHelpers: FormikHelpers<AlerteRemindForCreationDto | AlerteRemindForUpdateDto>) => { 
    console.log(data)
    console.log(alerteRemindData)
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
    const id = alerteRemindData?.id;
    
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
        Terminer l'alerte
        <div className="ml-auto d-flex">      
          <Button variant="text" type='button' className="annuler cursor-pointer " onClick={() => navigate(-1)} startIcon={<TiArrowBack/> } title="Retourner" />
        </div>
      </div>
        <Formik
          initialValues={alerteRemind}
          validationSchema={ConfirmAlerteRemindValidationSchema}
          onSubmit={(values,formikHelpers) => onSubmit(values,formikHelpers)}
          // validateOnChange={false}
          validateOnMount={false}
          // initialStatus={true}
          enableReinitialize={false} // Réinitialise les valeurs et désactive la validation lors du premier rendu
        >
          {({ errors,isSubmitting,values,setFieldValue}) => {
            return (
              <Form>
                <div>
                  {isSubmitting && <div className="lds-roller"></div>}
                  <div className="d-flex flex-column">
                    <div className="row mb-4">
                      <div className="col-12 col-md-6  mt-4">
                        <FormFieldInput type="date" name="receptionDate"  label={"Date de reception"} required/>
                      </div>
                      <div className="col-12 col-md-6  mt-4">
                        <FormFieldInput type="date" name="confirmationDate"  label={"Date de confirmation"} required/>
                      </div>
                      <div className="col-12 col-md-6  mt-4">
                        <FormFieldCheckbox  name={"convincing"} label={"La période été concluante ?"} />
                      </div>
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
                    className="annuler ml-auto" 
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

export { ConfirmAlerteRemindForm };