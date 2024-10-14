import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { FaBuilding, FaCar, FaChevronLeft, FaChevronRight, FaLaptop, FaLaptopHouse, FaTable, FaTasks, FaUsers, FaWarehouse, } from "react-icons/fa";
import { Accordion, AccordionDetails, AccordionSummary, IconButton } from "@mui/material";
import { selectSideNavState, setSideNavState } from "../app/PageSlice";
import { logout, selectCurrentUser, selectCurrentUserRoles } from "../auth/AuthUserSlice";
import { BiLogOut } from "react-icons/bi";
import AvatarProfile from "../components/Avatar/AvatarProfile";

const Navbar = () => {
  const sideNavBar = useSelector(selectSideNavState);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserRoles = useSelector(selectCurrentUserRoles);


  const navListDemande = [
    
    {
      title: "Utilisateurs",
      to: "/list/users",
      icon: <FaUsers />,
      code: "GRANT_ALL",
      count: 0,
    },

    {
      title: "Sociétés",
      to: "/list/companies",
      icon: <FaWarehouse />,
      code: "GRANT_ALL",
      count: 0,
    },

    {
      title: "Etages",
      to: "/list/floors",
      icon: <FaBuilding />,
      code: "GRANT_ALL",
      count: 0,
    },

    {
      title: "Types Actifs",
      to: "/list/assettypes",
      icon: <FaCar />,
      code: "GRANT_ALL",
      count: 0,
    },

    {
      title: "Immobilisations",
      to: "/list/assets",
      icon: <FaLaptop />,
      code: "GRANT_ALL",
      count: 0,
    },

    {
      title: "Inventaires",
      to: "/list/inventories",
      icon: <FaTasks />,
      code: "GRANT_ALL",
      count: 0,
    },

  ];


  
  return (
    <>
      <Link to={"/"} ><div className="logo-perfit"></div></Link>
      <div className="custome-divider"></div>
      {/* <div className="profile-user">
        <AvatarProfile cuid={currentUser?.preferred_username} />
        <div>
          <div className="name">{currentUser?.name}</div>
          <div className="role">
            {currentUserRoles?.length > 0 ? currentUserRoles[0] : "..."}
          </div>
        </div>
      </div> */}
      {sideNavBar == "expanded" && <div className="custome-divider"></div>}
      <div className={"nav-menus fixed-height tiny-scroll"}>
        <div>
          {/* Nav links demandes  */}
          <Accordion defaultExpanded={true} disabled>
            <AccordionSummary
              expandIcon={<></>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            </AccordionSummary>
            <AccordionDetails>
              {navListDemande.map((nav) => (
                <Tippy 
                  offset={[0,5]}
                  placement={"right"} 
                  content={<span>{nav.title}</span>} 
                  arrow={false}
                  key={nav.title}
                  disabled={sideNavBar == "expanded"}
                >
                  <NavLink 
                    className={"nav-menu"}
                    to={nav.to}
                  >
                    {nav.icon}
                    {sideNavBar == "expanded" && <span>{nav.title}</span>}
                  </NavLink>
                </Tippy>
              ))}
            </AccordionDetails>
          </Accordion>        
      </div> 
      </div>
      <div className="custome-divider"></div>
      {sideNavBar == "expanded"  && <div className="nav-menus p-3 ml-2">
        <IconButton 
          className={"nav-menu"}
          onClick={()=> dispatch(logout())}
        >
          <BiLogOut />
          <span>{"Se déconnecter"}</span>
        </IconButton>
    </div> }
    {sideNavBar == "collapsed"  && <div className="nav-menus p-1">
      <Tippy 
        offset={[0,5]}
        placement={"right"} 
        content={<span>{"Se déconnecter"}</span>} 
        arrow={false}
      >
        <IconButton 
          className={"nav-menu"}
          onClick={()=> dispatch(logout())}
        >
          <BiLogOut />
        </IconButton>
      </Tippy>
    </div> }
      <button className="toggle-sidebar" onClick={() => {
        dispatch(setSideNavState(sideNavBar == "expanded" ? "collapsed" : "expanded"))
      }}>{sideNavBar == "collapsed"? <FaChevronRight/> : <FaChevronLeft style={{marginLeft:"-3px"}} />}</button>
    </>
  );
};

export default Navbar;
