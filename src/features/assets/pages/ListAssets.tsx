
import { MdAdd, MdPrint } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { BiSearchAlt2 } from "react-icons/bi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, Paper } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../auth/AuthUserSlice";
import { AssetListTable } from "../components";
import { AssetDto } from "../types";
import { clients } from "../../../lib/axios";


const ListAssets = () => {

  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [queryFilter, setQueryFilter] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  var Timer = setTimeout(() => { }, 1000);

  function search(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    clearTimeout(Timer);
    Timer = setTimeout(function () {
      if (target.value.length >= 3) {
        setQueryFilter(
          "(AssetId|ErpCode|Barcode|CompanyId|FloorId|AssetTypeId|Description|Status|PurchaseDate|ExityDate)@=" + target.value
        );
      } else if (target.value.length == 0) {
        setQueryFilter("");
      }
    }, 2000);
  };

  const printBarcodes = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const downloadBarcodes = async () => {
    const axios = await clients();
    try {
      const response = await axios.get('/api/assets/download/barcodes', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'barcodes.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erreur lors du téléchargement des codes barres:', error);
    }
  };


  return (
    <div className="p-4">
      <div className="mb-2">
        <div className="mb-2">Liste des Immobilisations</div>
        <div className="d-flex">
          <div>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <Input
                sx={{ ml: 1, flex: 1 }}
                placeholder="Rechercher une immobilisation"
                rightSection={<BiSearchAlt2 color="gray" />}
                onChange={(e) => search(e)}
              />
            </Paper>
          </div>
          <div className="ml-auto">
            <Button
              onClick={() => navigate("/assets/new")}
              startIcon={<MdAdd />}
              children="Ajouter une immobilisation"
              style={{
                color: "#FF7900",
                backgroundColor: "#fff !important",
                width: "250px !important"
              }}
              sx={{
                backgroundColor: "#fff !important",
                textTransform: "none",
                fontSize: "12px"
              }}
              className="ml-auto"
              variant="contained"
            />
            <Button
              onClick={downloadBarcodes}
              startIcon={<MdPrint />}
              children="Imprimer les codes barres"
              style={{
                color: "#FF7900",
                backgroundColor: "#fff !important",
                width: "250px !important",
                marginLeft: '10px !important'
              }}
              sx={{
                backgroundColor: "#fff !important",
                textTransform: 'none',
                fontSize: '12px',
              }}
              className="ml-auto"
              variant="contained"
            />
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div ref={printRef}>
          <AssetListTable queryFilter={queryFilter} />
        </div>
      </div>
    </div>
  );
}
export { ListAssets };