
import { Notifications } from "../../../components/notifications";
import {
  AssetDto,
  AssetForCreationDto,
  AssetForUpdateDto,
  assetValidationSchema,
  useAddAsset,
  useUpdateAsset,
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
import { CompanyDto, useCompanies, useGetCompany } from "../../companies";
import { FloorDto, useFloors, useGetFloor } from "../../floors";
import { AssetTypeDto, useAssetTypes, useGetAssetType } from "../../assetTypes";
import FormFieldTextArea from "../../../components/Forms/FormFieldTextArea";



interface AssetFormProps {
  assetId?: string | undefined;
  assetData?: AssetDto;
}

function AssetForm({ assetId, assetData }: AssetFormProps) {

  const navigate = useNavigate();

  const [asset, setAsset] = useState({
  // assetId:assetData?.assetId??0,
erpCode:assetData?.erpCode??"",
barcode:assetData?.barcode??"",
companyId:assetData?.companyId??0,
floorId:assetData?.floorId??0,
assetTypeId:assetData?.assetTypeId??0,
description:assetData?.description??"",
status:assetData?.status??"",
purchaseDate:assetData?.purchaseDate??"",
exityDate:assetData?.exityDate??"",

  } as AssetDto);

// Section importation des sociétés
  const { data: CompaniesResponse } = useCompanies({
    filters: "",
    hasArtificialDelay: true,
  });


  function generateBarcode(companyCode:string,floorPosition:string, assetTypeCode:string, lastId:number)
    {
      const paddedId = String(lastId + 1).padStart(3, '0');
      return `${companyCode}${floorPosition}${assetTypeCode}${paddedId}`;

    }

  const CompaniesData = CompaniesResponse?.data;
  const [listCompanies, setListCompanies] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    setListCompanies((CompaniesData || []).map(item => ({
        label: item.name,
        value: item.id
    })))
  }, [CompaniesData]);


// Section importation des étages
  const { data: FloorsResponse } = useFloors({
    filters: "",
    hasArtificialDelay: true,
  });

  const FloorsData = FloorsResponse?.data;
  const [listFloors, setListFloors] = useState<{ label: string; value: string }[]>([]);


  useEffect(() => {
    setListFloors((FloorsData || []).map(item => ({
        label: item.position,
        value: item.id
    })))
  }, [FloorsData]);


// Section importation des types de materiel
  const { data: AssetTypesResponse } = useAssetTypes({
    filters: "",
    hasArtificialDelay: true,
  });

  const AssetTypesData = AssetTypesResponse?.data;
  const [listAssetTypes, setListAssetTypes] = useState<{ label: string; value: string }[]>([]);

  console.log('AssetTypesData',AssetTypesData);

  useEffect(() => {
    setListAssetTypes((AssetTypesData || []).map(item => ({
        label: item.code,
        value: item.id
    })))
  }, [AssetTypesData]);


  useEffect(()=>{
    if(assetData && assetData.id) setAsset(assetData as AssetDto);
  },[assetData]);

  const onSubmit = (data:AssetDto, formikHelpers: FormikHelpers<AssetDto>) => {
    
    (assetId == null || assetId == undefined) ?  createAsset(data as AssetForCreationDto,formikHelpers) : updateAsset(data as AssetForUpdateDto,formikHelpers);
  };

  const createAssetApi = useAddAsset();
  function createAsset(data: AssetForCreationDto, formikHelpers: FormikHelpers<AssetDto>) {
    createAssetApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("Immobilisation créée avec succès");
      })
      .then(() => {
        navigate("/list/assets")
      })
      .catch((e) => {
        Notifications.error("Une erreur s'est produite lors de la création de l'immobilisation");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  const updateAssetApi = useUpdateAsset();
  function updateAsset(data: AssetForUpdateDto, formikHelpers: FormikHelpers<AssetDto>) {
    const id = assetId;
    if (id === null || id === undefined) return;

    updateAssetApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("Asset updated successfully");
      })
      .then(() => {
        navigate("/list/assets");
      })
      .catch((e) => {
        Notifications.error("There was an error updating the Asset");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  return (
    <>
      <Formik
         initialValues={ asset as AssetDto}
        validationSchema={assetValidationSchema}
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
                       

                    {/* <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="assetId"  label="AssetId" required/>
                    </div> */}

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="erpCode"  label="Code ERP" required/>
                    </div>

                    {/* <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="barcode"  label="Code Barre" required />
                    </div> */}

                    <div className="col-12 col-md-6  mt-4">
                        <FormFieldSelect options={listCompanies} name={"companyId"} label={"Société"} required />
                      </div>

                    <div className="col-12 col-md-6  mt-4">
                        <FormFieldSelect options={listFloors} name={"floorId"} label={"Etage"} required />
                      </div>

                    <div className="col-12 col-md-6  mt-4">
                        <FormFieldSelect options={listAssetTypes} name={"assetTypeId"} label={"Type de Materiel"} required />
                      </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldTextArea name="description"  label="Description" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="status"  label="Status" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput type="date" name="purchaseDate"  label="Date d'achat" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput type="date" name="exityDate"  label="Date de sortie" required/>
                    </div>       
                    </div>
                  </div>    
                </div> 
              <div className="invf-form-submit d-flex">        
                <Button 
                  type='button' 
                  className=" mr-2 " 
                  onClick={() =>  navigate("/list/assets")} 
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

export { AssetForm };