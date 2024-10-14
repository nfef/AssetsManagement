import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import keycloak from "./keycloak";
import { RootState } from "../app/store";
import type { KeycloakTokenParsed } from 'keycloak-js';
import settings from '../config/settings';

export interface AuthUserState {
  user: KeycloakTokenParsed,
  authentificated: boolean,
  token: string,
  tokenExpired?: boolean
  exp: number;
  iat: number;
}

const initialState: AuthUserState = {
  user: {family_name:""},
  authentificated: false,
  token: "",
  tokenExpired: false,
  exp: 0,
  iat: 0,
};


export const AuthUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state,action:PayloadAction<KeycloakTokenParsed>) => {
      state.user = action.payload ;
    },
    setAuthentificated: (state,action:PayloadAction<boolean>) => {
      state.authentificated = action.payload;
    },
    logout: (state) => {
      state.user = {family_name:""};
      state.authentificated = false;
      keycloak.logout();
    },
    setToken: (state, action:PayloadAction<string>) => {
      state.token = action.payload;
    },
  }
});

/**
 * export the reducers for authentifications process
 */
export const { setAuthUser, setAuthentificated, logout, setToken } = AuthUserSlice.actions;

/**
 * 
 * @param state 
 * @returns the profile on the current user authentificated
 */
export const selectCurrentUser = (state:RootState ) => state.authUser.user;

/**
 * 
 * @param state 
 * @returns the roles on the current user authentificated
 */
export const selectCurrentUserRoles = (state:RootState ) => {
  let currentUser = state.authUser.user;
  if(currentUser && currentUser?.resource_access && currentUser?.resource_access[settings.client_keycloak] ) return currentUser?.resource_access[settings.client_keycloak].roles
  else return []
};

/**
 * 
 * @param state 
 * @returns authentificated: Boolean; that indicated if the current user is or not authentificated
 */
export const selectAuthentificated = (state:RootState) => state.authUser.authentificated;

/**
 * 
 * @param state 
 * @returns tkoen: string; the unparsed token
 */
export const selectToken = (state:RootState) => state.authUser.token;


export default AuthUserSlice.reducer;
