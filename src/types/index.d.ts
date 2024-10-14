export {};

interface envType {
  /**
   * The base url of the backend or API gateway, example: https://example.k8s.adcm.orangecm
   */
  BASE_URL: string;

  /**
   * The base url of the backend or API gateway, example: https://example.k8s.adcm.orangecm
   */
  BASE_PROFILE_URL: string;

  /**
   * The base url for keycloak used, example: https://keycloak.k8s.adcm.orangecm
   */
  URL_KEYCLOAK: string;

  /**
   * The realm used on keycloak plateform, example: digital-app
   */
  REALM_KEYCLOAK: string;

  /**
   * The client created on keycloak plateform, example: template-react
   */
  CLIENT_KEYCLOAK: string;

  /**
   * The base url for the instance of workflow center used, example: https://workflowcenter.k8s.adcm.orangecm
   */
  WORKFLOW_CENTER_URL?: string;

  /**
   * The calback url is the webhook used by workflow center to notify the backend at the end of the validation flow
   */
  CALLBACK_URL? : string;

}

declare global {
  interface Window {
    env: envType;
  }
}