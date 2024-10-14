
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { BiSearchAlt2 } from "react-icons/bi";
import { ChangeEvent, useState } from "react";
import { AlerteRemindListTable } from "../components/AlerteRemindListTable";
import { Input, Paper } from "@mantine/core";
import moment from "moment";

const ListAlerteRemindIncoming = () => {

  const todayStr = moment().format("YYYY-MM-DD");

  const navigate = useNavigate();
  const [queryFilter,setQueryFilter] = useState("remindDate>"+todayStr);

  var Timer = setTimeout(()=>{},1000);

  function searchAlerteRemind(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
      clearTimeout(Timer);
      Timer = setTimeout(function () {
          if (target.value.length >= 3) {
            setQueryFilter(
              "(creator|remindInterval|remindNumber|remindDate|contractType|motif|finalizationDate|finalizer|actions|finalizer)@=" + target.value + ",remindDate>"+todayStr
            );
          }else if(target.value.length == 0) {
            setQueryFilter("remindDate>"+todayStr);
          }
      }, 2000);
  };

  return (
      <div className="p-4">
        <div className="mb-2">
          <div className="mb-2">Les alertes de rappels à venir</div> 
          <div className="d-flex">
            <div>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
                <Input
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Recherche d'une alerte"
                  rightSection={<BiSearchAlt2 color="gray"/>}
                  onChange={(e)=>searchAlerteRemind(e)}
                />
              </Paper>
            </div>
            <div className="ml-auto">
              <Button
                onClick={() => navigate("/create/alertes")}
                startIcon={<MdAdd /> }
                children="Configurer une alerte"
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
          <AlerteRemindListTable queryFilter={queryFilter} />
        </div>
      </div>
  );
}
export  { ListAlerteRemindIncoming };

