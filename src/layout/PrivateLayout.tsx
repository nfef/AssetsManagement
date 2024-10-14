import { useSelector } from "react-redux";
import { selectSideNavState } from "../app/PageSlice";
import Navbar from "./Navbar";
import AppBar from "./Appbar";
import Footer from "./Footer";
import './Layout.styles.scss';

interface Props {
  children: React.ReactNode;
}

export function PrivateLayout({ children }: Props) {

  const sideNavBar = useSelector(selectSideNavState);

  return (
    <div className={"perfit-main-container  " +sideNavBar}>
      <div className='perfit-menus-container'>
        <Navbar />
      </div>
      <div className='perfit-body-container'>
        <div className='perfit-header-container'>
          <AppBar />
        </div>
        <div id='perfit-page-container' className='perfit-page-container tiny-scroll'>
          <div className="perfit-page-content">
            {children}
          </div>
          
          <div className='perfit-footer-container'>
            <Footer />
          </div>
        </div>        
      </div>
    </div>
  );
}
