import React, { useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import keycloak from './auth/keycloak';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuthentificated, setAuthentificated, setAuthUser, setToken } from './auth/AuthUserSlice';
import { AbilityContext, unauthorized } from './security/Can';
import { updateAbility } from './security/updateAbility';
import Error403 from './components/Errors/Error403';
import { PrivateLayout } from './layout';
import routes from './routes';
import Error404 from './components/Errors/Error404';


function App() {

  const dispatch = useDispatch();
  const isAuthentificated = useSelector(selectAuthentificated);
  const ability = useContext(AbilityContext);

  const resetTimer = () => {
    refreshToken();
  };

  const refreshToken = () => {
    // let exp = keycloak.tokenParsed?.exp??0;
    // let ait = keycloak.tokenParsed?.iat??0;

    // let timeout = (exp - ait) * 1000 ; //conver to mili second

    // console.log(timeout);
    // // console.log(keycloak);
    // // //response.expires_in * 1000;
    // setTimeout(() => {
    //   // handle token expired
      
    // },timeout);

    keycloak.updateToken(70).then((refreshed) => {
      }).catch(_ => {
    });
  };

  //useEffect(() => {
  //  const handleMouseMove = () => resetTimer();
  //  const handleClick = () => resetTimer();
  //  window.addEventListener('mousemove', handleMouseMove);
  //  window.addEventListener('click', handleClick);
  //  return () => {
  //    window.removeEventListener('mousemove', handleMouseMove);
  //    window.removeEventListener('click', handleClick);
  //  };
  //}, []);
  
    
  // useEffect(() => {
  //   /**
  //    * This methode initiate the authentification flow when the user is not connected
  //    */
  //   keycloak.init({
  //     onLoad: "login-required",
  //     checkLoginIframe: false,
  //     scope: "openid"
  //   })
  //   .then(() => {
  //     /**
  //      * this section is executed when the user is connected
  //      */

  //     keycloak.authenticated && updateAbility(ability, keycloak);

  //     /**
  //      * We dispatch the information of authentificated user
  //      */
  //     dispatch(setAuthUser(keycloak.tokenParsed??{family_name:""}));
  //     dispatch(setAuthentificated(keycloak.authenticated??false));
  //     dispatch(setToken(keycloak.token??""));
  //     if(keycloak.authenticated){
  //       keycloak.onTokenExpired = () => {
  //         //dispatch(logout());
  //       }
  //     }
      
  //   });
  // },[]);

  return (
    <div className="main-app-container">

      {/* l'utilisateur est authentifié et est authorisé à consulter la plateform */}
      {/* {isAuthentificated && !unauthorized(keycloak) && */}

      <React.StrictMode>
      <Routes>
            {routes.map((route) => (
              // <Route path={route.to} element={ ability.can(route.action, route.entity) ? <route.element />: <Error403 />} key={route.to}></Route>
              <Route 
                path={route.to} 
                element={ 
                  route.to === "/login" ? (
                    <route.element />
                  ) : (
                    <PrivateLayout>
                      <route.element />
                    </PrivateLayout>
                  )
              } 
                key={route.to}>

                </Route>
            ))}
            <Route path={"*"} element={<Error404 />} ></Route>
          </Routes>
      </React.StrictMode>
      {/* } */}

      {/* The forbiden component is diplayed when the user is authentificated but dont have any role in the plateform */}
      {/* {unauthorized(keycloak) && <Error403 />} */}

      {/* the loading compoenent is displayed when the keycloak check if the user it authentificated */}
      {/* {keycloak.authenticated ? null : <>Chargement...</>} */}

    </div>
  );
}

export default App;
