
import { Notifications } from "../../../components/notifications";
import {
  InventoryDto,
  InventoryForCreationDto,
  InventoryForUpdateDto,
  inventoryValidationSchema,
  useAddInventory,
  useUpdateInventory,
} from "..";

import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import FormFieldInput from "../../../components/Forms/FormFieldInput";
import { FiSave } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";



interface InventoryFormProps {
  inventoryId?: string | undefined;
  inventoryData?: InventoryDto;
}

function InventoryForm({ inventoryId, inventoryData }: InventoryFormProps) {

  const navigate = useNavigate();

  const [inventory, setInventory] = useState({
  // inventoryId:inventoryData?.inventoryId??0,
// assetId:inventoryData?.assetId??0,
// floorId:inventoryData?.floorId??0,
inventoryDate:inventoryData?.inventoryDate??"",

  } as InventoryDto);


  // useEffect(()=>{
  //   if(inventoryData && inventoryData.id) setInventory(inventoryData as InventoryDto);
  // },[inventoryData]);

  const onSubmit = (data:InventoryDto, formikHelpers: FormikHelpers<InventoryDto>) => {
    (inventoryId == null || inventoryId == undefined) ?  createInventory(data as InventoryForCreationDto,formikHelpers) : updateInventory(data as InventoryForUpdateDto,formikHelpers);
  };

  const createInventoryApi = useAddInventory();
  function createInventory(data: InventoryForCreationDto, formikHelpers: FormikHelpers<InventoryDto>) {
    createInventoryApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("Inventory created successfully");
      })
      .then(() => {
        navigate("/inventories")
      })
      .catch((e) => {
        Notifications.error("There was an error creating the inventory");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  const updateInventoryApi = useUpdateInventory();
  function updateInventory(data: InventoryForUpdateDto, formikHelpers: FormikHelpers<InventoryDto>) {
    const id = inventoryId;
    if (id === null || id === undefined) return;

    updateInventoryApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("Inventory updated successfully");
      })
      .then(() => {
        navigate("/inventories");
      })
      .catch((e) => {
        Notifications.error("There was an error updating the Inventory");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  return (
    <>
      <Formik
         initialValues={ inventory as InventoryDto}
        validationSchema={inventoryValidationSchema}
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
                      <FormFieldInput name="inventoryId"  label="InventoryId" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="assetId"  label="AssetId" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="floorId"  label="FloorId" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="inventoryDate"  label="InventoryDate" required/>
                    </div>       
                    </div>
                  </div>    
                </div> 
              <div className="invf-form-submit d-flex">        
                <Button 
                  type='button' 
                  className=" mr-2 " 
                  onClick={() =>  navigate("/list/inventories")} 
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

export { InventoryForm };