import { createSlice } from '@reduxjs/toolkit';

export type SidebarOpenedTabs = {
  [key: string]: boolean;
};

type SidebarTogleState = {
  isSidebarOpen: boolean;
  sidebarOpenedTabs: SidebarOpenedTabs;
};

const initialState: SidebarTogleState = {
  isSidebarOpen: false,
  sidebarOpenedTabs: {},
};

export const isSidebarOpen = createSlice({
  name: 'isSidebarOpen',
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setSidebarOpenedTabs: (state, action) => {
      state.sidebarOpenedTabs = action.payload;
    },
  },
});

export const { setToggle, setSidebarOpenedTabs } = isSidebarOpen.actions;

export default isSidebarOpen.reducer;
