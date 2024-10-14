import defaultAvatar from "../../images/avatar.png";
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Avatar, IconButton } from '@mui/material';
import settings from "../../config/settings";

interface Props {
  cuid: string;
  onClick?: Function;
  className?: string;
}

const AvatarProfile = ({className,cuid,onClick = ()=>{} } : Props) => {

  const [avatar, setAvatar] = useState(defaultAvatar);
  //useEffect(() => {
  //  axios.get(settings.baseProfileUrl + cuid)
  //  .then((res) => {
  //    if(res.config.url){
  //      setAvatar(res.config.url)
  //    }
  //  });
  //},[cuid]);

  return (
    <IconButton 
      onClick={(e) => onClick(e)}
      className={"circular-progess-profile " + className} 
    >
      <Avatar className="m-1" src={avatar} alt={"PP"}  sx={{ bgcolor:"#fff"}}/>
    </IconButton>
  );
}

export default AvatarProfile;

