
const settings = {
  
  /**
   * The base url of the backend or API gateway, example: https://example.k8s.adcm.orangecm
   */
  baseUrl: window.env.BASE_URL,

   /**
   * The base url of the profile API, example: https://example.k8s.adcm.orangecm
   */
   baseProfileUrl: window.env.BASE_PROFILE_URL,

  /**
   * The base url for keycloak used, example: https://keycloak.k8s.adcm.orangecm
   */
  url_keycloak: window.env.URL_KEYCLOAK,

  /**
   * The realm used on keycloak plateform, example: digital-app
   */
  realm_keycloak: window.env.REALM_KEYCLOAK,

  /**
   * The client created on keycloak plateform, example: template-react
   */
  client_keycloak: window.env.CLIENT_KEYCLOAK,

  /**
   * The base url for the instance of workflow center used, example: https://workflowcenter.k8s.adcm.orangecm
   */
  workflow_center_url: window.env.WORKFLOW_CENTER_URL,

  /**
   * The calback url is the webhook used by workflow center to notify the backend at the end of the validation flow
   */
  callback_url : window.env.CALLBACK_URL,

  /**
   * The name of the application to identify it on workflow center, example: Template React Typescript
   */
  app_name : "EFMS",

  

};

export default settings;