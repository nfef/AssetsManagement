import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { EnumPageSize } from '../types/apis';


export interface PageState {
  pageSize: EnumPageSize ;
  sideNavState: "expanded" | "collapsed";
}

const initialState: PageState = {
  pageSize: 10,
  sideNavState: "expanded"
};


export const PageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageSize: (state,action:PayloadAction<EnumPageSize>) => {
      state.pageSize = action.payload ;
    },
    setSideNavState: (state,action:PayloadAction<"expanded" | "collapsed">) => {
      state.sideNavState = action.payload ;
    },
  }
});

export const { setPageSize, setSideNavState } = PageSlice.actions;
export const selectPageSize = (state:RootState ) => state.page.pageSize;
export const selectSideNavState = (state:RootState ) => state.page.sideNavState;

export default PageSlice.reducer;
