import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { guestApi } from './apis/guestApi.js';
import { pharmacistApi } from './apis/pharmacistApi.js'; 
import { patientApi } from './apis/patientApi.js';  
export const store = configureStore({
  reducer: {
    [guestApi.reducerPath]: guestApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [pharmacistApi.reducerPath]: pharmacistApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
    .concat(guestApi.middleware)
    .concat(pharmacistApi.middleware)
    .concat(patientApi.middleware)
  },
});

setupListeners(store.dispatch);



export{
  useRegisterPharmacistMutation,
  useRegisterPatientMutation
} from './apis/guestApi';

export {
    useGetPharmacistQuery,
    useAddMedicineMutation,
    useEditMedicineMutation,
    useGetAllMedicinesQuery
} from './apis/pharmacistApi';

export { 
    useGetPatientQuery,
    useGetMedicinesQuery
} from './apis/patientApi';