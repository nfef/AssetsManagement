
import { Notifications } from "../../../components/notifications";
import {
  AssetTypeDto,
  AssetTypeForCreationDto,
  AssetTypeForUpdateDto,
  assetTypeValidationSchema,
  useAddAssetType,
  useUpdateAssetType,
} from "..";

import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import FormFieldInput from "../../../components/Forms/FormFieldInput";
import { FiSave } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";



interface AssetTypeFormProps {
  assetTypeId?: string | undefined;
  assetTypeData?: AssetTypeDto;
}

function AssetTypeForm({ assetTypeId, assetTypeData }: AssetTypeFormProps) {

  const navigate = useNavigate();

  const [assetType, setAssetType] = useState({
  // assetTypeId:assetTypeData?.assetTypeId??0,
code:assetTypeData?.code??"",
description:assetTypeData?.description??"",

  } as AssetTypeDto);


  useEffect(()=>{
    if(assetTypeData && assetTypeData.id) setAssetType(assetTypeData as AssetTypeDto);
  },[assetTypeData]);

  const onSubmit = (data:AssetTypeDto, formikHelpers: FormikHelpers<AssetTypeDto>) => {
    (assetTypeId == null || assetTypeId == undefined) ?  createAssetType(data as AssetTypeForCreationDto,formikHelpers) : updateAssetType(data as AssetTypeForUpdateDto,formikHelpers);
  };

  const createAssetTypeApi = useAddAssetType();
  function createAssetType(data: AssetTypeForCreationDto, formikHelpers: FormikHelpers<AssetTypeDto>) {
    createAssetTypeApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("Type de matériel créé avec succès");
      })
      .then(() => {
        navigate("/list/assettypes")
      })
      .catch((e) => {
        Notifications.error(" Une Erreur est survenue, Veuillez contacter l'administrateur");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  const updateAssetTypeApi = useUpdateAssetType();
  function updateAssetType(data: AssetTypeForUpdateDto, formikHelpers: FormikHelpers<AssetTypeDto>) {
    const id = assetTypeId;
    if (id === null || id === undefined) return;

    updateAssetTypeApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("Type de matériel mis à jour avec succès");
      })
      .then(() => {
        navigate("/list/assettypes");
      })
      .catch((e) => {
        Notifications.error("Une erreur est survenue, Veuillez contacter l'administrateur");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  return (
    <>
      <Formik
         initialValues={ assetType as AssetTypeDto}
        validationSchema={assetTypeValidationSchema}
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
                      <FormFieldInput name="description"  label="Description" required/>
                    </div>       
                    </div>
                  </div>    
                </div> 
              <div className="invf-form-submit d-flex">        
                <Button 
                  type='button' 
                  className=" mr-2 " 
                  onClick={() =>  navigate("/list/assettypes")} 
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

export { AssetTypeForm };