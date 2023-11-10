import { configureStore } from '@reduxjs/toolkit';
import isSidebarOpen from './slices/sidebarTogle';
import userAuth from './slices/userAuth';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store = configureStore({
  reducer: {
    user: userAuth,
    isSidebarOpen: isSidebarOpen,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
