import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  AvatarProfile  from '../components/Avatar/AvatarProfile';
import { logout, selectCurrentUser } from '../auth/AuthUserSlice';
import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import { RiLogoutCircleRLine } from 'react-icons/ri';
import "@szhsin/react-menu/dist/index.css";

const AppBar = () => {

  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <div className='perfit-header d-flex'>
      <div className='pl-2'>ASSETS MANAGEMENT</div>
      <div style={{ marginRight: "10px", marginLeft: "auto" }} ></div>
      <Menu
        direction={"bottom"}
        arrow={true}
        menuButton={
          <div className={"menu-profile"}>
            <AvatarProfile cuid={currentUser?.preferred_username} />
          </div>
        }>
        <MenuHeader className={"profile-item"}>
          <div className='mb-2'><AvatarProfile className='m-auto' cuid={currentUser?.preferred_username} /></div>
          
          <div>{currentUser.name}</div>
          <span className="email">{currentUser.email}</span>
        </MenuHeader>
        <MenuDivider />
        <MenuItem className={"logout-item"} onClick={() => dispatch(logout())}>
          <RiLogoutCircleRLine /><span>Se déconnecter</span>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AppBar;