/**
 * All the those config most be created as a configMap during deploeiment in kubernates environnment
 * You can remove un used variables like workflow center variables or add more 
 */
window.env={
  /**
   * The base url of the backend or API gateway, example: https://example.k8s.adcm.orangecm
   */
  'BASE_URL': "http://localhost:3001", // 

  /**
   * The base url for profile, example: https://example.k8s.adcm.orangecm
   */
  'BASE_PROFILE_URL': "https://tools-svc.orange.cm/api/InfoEmployee/photo/v0/",

  /**
   * The base url for keycloak used, example: https://keycloak.k8s.adcm.orangecm
   */
  'URL_KEYCLOAK': "https://idpo.orange.cm",

  /**
   * The realm used on keycloak plateform, example: digital-app
   */
  'REALM_KEYCLOAK': "digital-app",

  /**
   * The client created on keycloak plateform, example: template-react
   */
  'CLIENT_KEYCLOAK': "alerte-adq",

};
