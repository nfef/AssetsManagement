import { ReactNode } from "react";

export interface RouteObject {
  
  name?: string; // not used now, but can be the title of the page 
  to: string; // the path of the page
  element: any; // the react component page to render
  entity: string; // all user can read request
  action: string;
}