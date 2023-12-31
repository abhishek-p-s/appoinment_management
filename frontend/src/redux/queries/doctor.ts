import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../services/service';
import { getAuthHeaders } from '../../helpers';

export const doctor = createApi({
  reducerPath: 'doctor',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
  }),
  tagTypes: ['USER','ROLE'],
  endpoints: (builder) => ({
    getDocterData: builder.query({
      query: () => ({
        url: `users/users`,
        headers: getAuthHeaders(),
      }),
      providesTags: ['USER'],
    }),
    getPatients: builder.query({
      query: () => ({
        url: `users/patients`,
        headers: getAuthHeaders(),
      }),
      providesTags: ['USER'],
    }),
    getRoleData: builder.query({
      query: () => ({
        url: `users/roles`,
        headers: getAuthHeaders(),
      }),
      providesTags: ['ROLE'],
    }),
    editUser: builder.query({
      query: (id) => ({
        url: `users/user/${id}`,
        headers: getAuthHeaders(),
      }),
      providesTags: ['USER'],
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: `users/user`,
        method: 'PUT',
        body: formData,
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ['USER'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/user/${id}`,
        method: 'DELETE',
        body: id,
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ['USER'],
    }),
  addUser: builder.mutation({
      query: (formData) => ({
        url: `users/add-user`,
        method: 'POST',
        body: formData,
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ['USER'],
    }),
  }),
});

export const {
  useGetDocterDataQuery,
  useGetRoleDataQuery,
  useAddUserMutation,
  useGetPatientsQuery,
  useEditUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = doctor;
