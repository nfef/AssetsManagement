import Keycloak from "keycloak-js";
import settings from "../config/settings";

/**
 * Keycloak instance to handle authentification
 */
const keycloak = new Keycloak({
    /**
     * The base url for keycloak used, example: https://keycloak.k8s.adcm.orangecm/auth
     */
    url:  settings.url_keycloak + "/auth",

    /**
     * The realm used on keycloak plateform, example: digital-app
     */
    realm: settings.realm_keycloak,

    /**
     * The client created on keycloak plateform, example: template-react
     */
    clientId: settings.client_keycloak,
    
});

export default keycloak;