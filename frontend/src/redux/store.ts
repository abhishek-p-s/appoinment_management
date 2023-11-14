import { configureStore } from '@reduxjs/toolkit';
import isSidebarOpen from './slices/sidebarTogle';
import userAuth from './slices/userAuth';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { doctor } from './queries/doctor';
import { appointment } from './queries/appointment';

const store = configureStore({
  reducer: {
    user: userAuth,
    isSidebarOpen: isSidebarOpen,
    [doctor.reducerPath]: doctor.reducer,
    [appointment.reducerPath]: appointment.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      doctor.middleware,
      appointment.middleware,
    ),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
