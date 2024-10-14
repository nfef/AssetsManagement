
import { Notifications } from "../../../components/notifications";
import {
  FloorDto,
  FloorForCreationDto,
  FloorForUpdateDto,
  floorValidationSchema,
  useAddFloor,
  useUpdateFloor,
} from "..";

import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import FormFieldInput from "../../../components/Forms/FormFieldInput";
import { FiSave } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import FormFieldSelect from "../../../components/Forms/FormFieldSelect";
import { useCompanies } from "../../companies";



interface FloorFormProps {
  floorId?: string | undefined;
  floorData?: FloorDto;
}

function FloorForm({ floorId, floorData }: FloorFormProps) {

  const navigate = useNavigate();

  const [floor, setFloor] = useState({
  // floorId:floorData?.floorId??0,
position:floorData?.position??"",
description:floorData?.description??"",

  } as FloorDto);

  const { data: CompaniesResponse } = useCompanies({
    filters: "",
    hasArtificialDelay: true,
  });

  const CompaniesData = CompaniesResponse?.data;
  const [listCompanies, setListCompanies] = useState<{ label: string; value: string }[]>([]);

  console.log('CompaniesData',CompaniesData);

  useEffect(() => {
    setListCompanies((CompaniesData || []).map(item => ({
        label: item.name,
        value: item.id
    })))
  }, [CompaniesData]);

  useEffect(()=>{
    if(floorData && floorData.id) setFloor(floorData as FloorDto);
  },[floorData]);

  const onSubmit = (data:FloorDto, formikHelpers: FormikHelpers<FloorDto>) => {
    (floorId == null || floorId == undefined) ?  createFloor(data as FloorForCreationDto,formikHelpers) : updateFloor(data as FloorForUpdateDto,formikHelpers);
  };

  const createFloorApi = useAddFloor();
  function createFloor(data: FloorForCreationDto, formikHelpers: FormikHelpers<FloorDto>) {
    createFloorApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("Etage créé avec succès");
      })
      .then(() => {
        navigate("/list/floors")
      })
      .catch((e) => {
        Notifications.error("There was an error creating the floor");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  const updateFloorApi = useUpdateFloor();
  function updateFloor(data: FloorForUpdateDto, formikHelpers: FormikHelpers<FloorDto>) {
    const id = floorId;
    if (id === null || id === undefined) return;

    updateFloorApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("Etage mis à jour avec succès");
      })
      .then(() => {
        navigate("/list/floors");
      })
      .catch((e) => {
        Notifications.error("There was an error updating the Floor");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  return (
    <>
      <Formik
         initialValues={ floor as FloorDto}
        validationSchema={floorValidationSchema}
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
                        <FormFieldSelect options={listCompanies} name={"companyId"} label={"Société"} required />
                      </div>
                    
                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="position"  label="Position" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="description"  label="Description" required/>
                    </div>       
                    </div>
                  </div>    
                </div> 
              <div className="invf-form-submit d-flex">        
                <Button 
                  type='button' 
                  className=" mr-2 " 
                  onClick={() =>  navigate("/list/floors")} 
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

export { FloorForm };