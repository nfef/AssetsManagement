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
import { Button, Modal, Box, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import FormFieldInput from "../../../components/Forms/FormFieldInput";
import { FiEye, FiSave } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { clients } from "../../../lib/axios";

interface InventoryFormProps {
  id?: number;
  inventoryData?: InventoryDto;
}

function InventoryForm({ id, inventoryData }: InventoryFormProps) {
  const navigate = useNavigate();
  const [scannedBarcodes, setScannedBarcodes] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBarcodeScan = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const barcode = (e.target as HTMLInputElement).value.trim();
        if (barcode && !scannedBarcodes.includes(barcode)) {
          setScannedBarcodes([...scannedBarcodes, barcode]);
          (e.target as HTMLInputElement).value = '';
        }
      }
    };

    const initialValuesItems: InventoryForCreationDto = {
      
      // Add other necessary fields here
    };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const createInventoryApi = useAddInventory();
 
  function createInventory(data: InventoryForCreationDto, formikHelpers: FormikHelpers<InventoryForCreationDto>) {
    createInventoryApi
      .mutateAsync(data)
      .then((reponse) => {
        console.log("reponse", reponse);
        const inventoryId = reponse.id;

        Notifications.success("Inventory created successfully");

        //enregistrer les items d'inventaire
        const addItemsPromises = scannedBarcodes.map((barcode) => 
          addInventoryItem(inventoryId, barcode)
      )

        return Promise.all(addItemsPromises);
      })
      .then(() => {
        navigate("/list/inventories")
      })
      .catch((e) => {
        Notifications.error("There was an error creating the inventory");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }


  const addInventoryItem = async (inventoryId: string, barcode: string) => {
    const axios = await clients();
    return axios.post(`/api/inventories/${inventoryId}/items`, { barcode });
  };

  return (
    <Formik
      initialValues={{
        id: inventoryData?.id ?? "",
        inventoryDate: inventoryData?.createdAt ? new Date(inventoryData.createdAt) : new Date(),
      } as InventoryForCreationDto}
      validationSchema={inventoryValidationSchema}
      onSubmit={(values, formikHelpers) => createInventory(values as InventoryForCreationDto, formikHelpers)}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            {isSubmitting && <div className="lds-roller"></div>}
            <div className="d-flex flex-column">
              <div className="row mb-4">
                <div className="col-12 col-md-6 mt-4">
                  <input
                    name="barcodeScanner"
                    // label="Scanner le code barre"
                    onKeyDown={handleBarcodeScan}
                  />
                </div>
                <div className="col-12 mt-4">
                  <Typography variant="h6">Nombre d'éléments scannés : {scannedBarcodes.length}</Typography>
                  <Button 
                    variant="contained"
                    onClick={handleModalOpen}
                    children="Voir les éléments scannés"
                    className="mt-4"
                    startIcon={<FiEye />}
                    />
                  <Modal open={isModalOpen} onClose={handleModalClose}>
                    <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 24 }}>
                      <Typography variant="h6">Éléments scannés</Typography>
                      <ul>
                        {scannedBarcodes.map((barcode, index) => (
                          <li key={index}>{barcode}</li>
                        ))}
                      </ul>
                      <Button onClick={handleModalClose}>Fermer</Button>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div className="invf-form-submit d-flex">
            <Button
              type="button"
              className="mr-2"
              onClick={() => navigate("/list/inventories")}
              startIcon={<FaTimes />}
            >
              Annuler
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              className="annuler ml-auto"
              startIcon={<FiSave />}
              children={"Enregistrer"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { InventoryForm };