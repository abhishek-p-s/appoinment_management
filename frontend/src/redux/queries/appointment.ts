import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../services/service';
import { getAuthHeaders } from '../../helpers';

export const appointment = createApi({
  reducerPath: 'appointment',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
  }),
  tagTypes: ['APPOINTMENT','DOCTOR','PATIENT'],
  endpoints: (builder) => ({

  addAppointment: builder.mutation({
      query: (formData) => ({
        url: `users/add-appointment`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['APPOINTMENT'],
    }),
    getDoctorData: builder.query({
      query: () => ({
        url: `users/doctors`,
      }),
      providesTags: ['DOCTOR'],
    }),
    addPatient: builder.mutation({
      query: (formData) => ({
        url: `users/add-patients`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['PATIENT'],
    }),
    getAppointment: builder.query({
      query: () => ({
        url: `users/appointment`,
        headers: getAuthHeaders(),
      }),
      providesTags: ['APPOINTMENT'],
    }),
  }),
});

export const {
  useAddAppointmentMutation,
  useGetDoctorDataQuery,
  useAddPatientMutation,
  useGetAppointmentQuery,
} = appointment;
