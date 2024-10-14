
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { BiSearchAlt2 } from "react-icons/bi";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, Paper } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../auth/AuthUserSlice";
import { CompanyListTable } from "../components";
import { CompanyDto } from "../types";

const ListCompanies = () => {

  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [queryFilter,setQueryFilter] = useState("");
  
  var Timer = setTimeout(()=>{},1000);

  function search(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
      clearTimeout(Timer);
      Timer = setTimeout(function () {
          if (target.value.length >= 3) {
            setQueryFilter(
              "(CompanyId|Code|Name)@=" + target.value
            );
          }else if(target.value.length == 0) {
            setQueryFilter("");
          }
      }, 2000);
  };

  return (
      <div className="p-4">
        <div className="mb-2">
          <div className="mb-2">Liste des Sociétés</div> 
          <div className="d-flex">
            <div>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
                <Input
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Rechercher une société"
                  rightSection={<BiSearchAlt2 color="gray"/>}
                  onChange={(e)=>search(e)}
                />
              </Paper>
            </div>
            <div className="ml-auto">
              <Button
                onClick={() => navigate("/companies/new")}
                startIcon={<MdAdd /> }
                children="Ajoouter une société"
                style={{
                  color:"#FF7900",
                  backgroundColor:"#fff !important",
                  width: "250px !important"
                }}
                sx={{
                  backgroundColor:"#fff !important",
                  textTransform: "none",
                  fontSize: "12px"
                }}
                className="ml-auto"
                variant="contained"
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">    
          <CompanyListTable queryFilter={queryFilter} />
        </div>
      </div>
  );
}
export  { ListCompanies };