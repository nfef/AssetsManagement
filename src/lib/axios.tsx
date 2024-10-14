import Axios from "axios";
import settings from "../config/settings";
import { store } from '../app/store';
import { Notifications } from "../components/notifications";

export const clients = (headers?: { [key: string]: string }) => buildApiClient({
  baseURL: settings.baseUrl,
  customHeaders: headers,
});

interface ApiClientProps {
  baseURL?: string;
  customHeaders?: {
    [key: string]: string;
  };
}

async function buildApiClient({ baseURL, customHeaders }: ApiClientProps) {

  const token = store.getState()?.authUser?.token?? "";
  const client = Axios.create({
    baseURL,
    withCredentials: true,
    timeout: 30_000, // If you want to increase this, do it for a specific call, not the global app API.
    headers: {
      "X-CSRF": "1",
      Authorization: `Bearer ${token}`, // uncomment this when authorization is implemented on your backend
      ...customHeaders,
    },
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          error.response.status,
          error.response.data,
          error.response.headers
        );
          
        // 400 ==  bad request
        if (error && error.response && error.response.status === 400) {
          Object.values(error.response.data.errors).forEach((value) => {
            let arr = new Array(value);//conver to array
              arr.map((val) => {
                let text = new String(val);//convert to string
                Notifications.error(text.toString());
              });
          });
        }
        
        // 404 ==  not found
        if (error && error.response && error.response.status === 404) {
          Notifications.error(error?.reponse?.detail);
        }

        // 500 ==  internal server error
        if (error && error.response && error.response.status === 500) {
          Notifications.error(error.reponse.detail);
        }
        

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
      }


      // 401 ==  token expired code
      if (error && error.response && error.response.status === 401) {
        //signIn(env.auth.nextAuthId, { callbackUrl: "/" });
        // logout when token expire
      }
      console.log((error && error.toJSON && error.toJSON()) || undefined);

      return Promise.reject(error);
    }
  );

  return client;
}
