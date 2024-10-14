import { createContext } from "react";
import { createContextualCan } from "@casl/react";  
import settings from "../config/settings";

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

/**
 * This method return true if the use is not auhorized to visit the app
 * @param {*} keycloak 
 * @returns boolean
 */
export const unauthorized = (keycloak) => {
    
    if(keycloak && keycloak.authenticated){
        if(keycloak.resourceAccess && keycloak.resourceAccess[settings.client_keycloak] && keycloak.resourceAccess[settings.client_keycloak].roles){
            // vérifier si l'utilisateur à au moins un role parmis les roles possibles de l'application
            if(keycloak.resourceAccess[settings.client_keycloak].roles?.length > 0){
                // un role a été trouvé, 
                return false;
            }
        }
        // aucun role n'a été retrouvé, l'utilisateur n'est pas authorisé
        return true;
    }else {
        return false;
    }
} 