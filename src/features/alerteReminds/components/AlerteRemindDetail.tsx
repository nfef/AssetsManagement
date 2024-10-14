
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { TiArrowBack } from "react-icons/ti";

import FieldDetail from "../../../components/Forms/FieldDetail";
import moment from "moment";

import { AlerteRemindDto, useDeleteAlerteRemind, useAlerteReminds } from "../../alerteReminds";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { MantineReactTable } from "mantine-react-table";
import { UserDto } from "../../../types/user";
import { useMemo } from "react";

import type { MRT_ColumnDef } from 'mantine-react-table'; // If using TypeScript (optional, but recommended)

interface AlerteRemindListTableProps {
  data?: AlerteRemindDto | undefined;
}

function AlerteRemindDetail({ data }: AlerteRemindListTableProps) {
  const navigate = useNavigate();

  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'nom', //id required if you use accessorFn instead of accessorKey
        header: 'Action',
        Header: 'Nom'
      },
      {
        accessorKey: 'email', //simple recommended way to define a column
        header: 'Email'
      },
      {
        accessorFn: (originalRow) => <span>{originalRow?.direction?.split(",")[1].replaceAll("OU=","")}</span>, //simple recommended way to define a column
        header: 'Direction'
      },
      {
        accessorKey: 'tel', //simple recommended way to define a column
        header: 'Tél.'
      }
    ],
    [],
  );


  return (
    <>
  <div>
    <div className="bg-orange change-request-title d-flex ">
      Détail 
      <div className="ml-auto d-flex">      
        <Button variant="text" type='button' className="annuler cursor-pointer " onClick={() => navigate(-1)} startIcon={<TiArrowBack/> } title="Retourner" />
      </div>
    </div>
    
    <div
      className="wf-change-request-content"
      style={{
        padding: "15px",
        paddingLeft: "2.5%",
        paddingRight: "2.5%"
      }}
    >
      
      <div >
        <div className="d-flex flex-column">
          <div className="row mb-4">
            <div className="col-12 col-md-6  mt-2">
              <FieldDetail value={data?.motif}  label={"Motif du rappel"} />
            </div>
            <div className="col-12 col-md-6  mt-2">
              <FieldDetail value={data?.contractType} label={"Type de contrat"} />
            </div>
            <div className="col-12 col-md-4  mt-2">
              {/* <FormFieldDateTime name="remindDate" type="date" label={"Date de rappel"} /> */}
              <FieldDetail value={moment(data?.remindDate).format("DD/MM/YYYY")}  label={"Date de rappel"} />
            </div>
            <div className="col-12 col-md-4  mt-2">
              <FieldDetail value={data?.remindNumber}  label={"Nombre de rappel solicité"} />
            </div>
            <div className="col-12 col-md-4  mt-2">
              <FieldDetail value={data?.remindInterval}  label={"Interval de rappel en jour"} />
            </div>

            
            <br/>
            <div className="d-flex flex-column  mt-3">   
              <div className="row">
              <label className="form-label mb-2 w-100" >
              Les employé concerné par l'alerte
                </label>
              </div>
              </div>

            <MantineReactTable 
              enablePagination={false}
              enableBottomToolbar={false}
              columns={columns}
              data={data?.affecteds??[] as UserDto[]}
              enableRowSelection //enable some features
              enableColumnOrdering
              enableGlobalFilter={false} //turn off a feature
              enableDensityToggle={false}
              initialState={{ density: 'xs' }}
            />  
            

            <div className="d-flex flex-column mt-3">   
              <div className="row">
              <label className="form-label mb-2 w-100" >
              Les employé concerné par l'alerte
                </label>
              </div>
              </div>

            <MantineReactTable 
              enablePagination={false}
              enableBottomToolbar={false}
              columns={columns}
              data={data?.recipients??[] as UserDto[]}
              enableRowSelection //enable some features
              enableColumnOrdering
              enableGlobalFilter={false} //turn off a feature
              enableDensityToggle={false}
              initialState={{ density: 'xs' }}
            />  
            
            <div className="d-flex flex-column mb-4 mt-3">   
              <div className="row">
              <label className="form-label mb-2 w-100" >
                Les actions à renseigner dans le mail de rappel
                </label>
              </div>
              
              <MantineReactTable 
                enablePagination={false}
                enableBottomToolbar={false}
                columns={[
                  {
                    accessorKey: 'title', //id required if you use accessorFn instead of accessorKey
                    header: 'Libelé des actions'
                  }]}
                data={data?.actions??[]}
                enableRowSelection //enable some features
                enableColumnOrdering
                enableGlobalFilter={false} //turn off a feature
                enableDensityToggle={false}
              />  
                             
            </div>
            </div>
          </div>    
        </div>
    </div>
  </div>
    </>
  );
}

export { AlerteRemindDetail }