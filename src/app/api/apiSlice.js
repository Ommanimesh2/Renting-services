import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {setCredentials, logOut} from '../../features/Auth/authSlice';

import {RootState} from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://backend.bhoomicam.com/',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://backend.bhoomicam.com/'}),
  tagTypes: [
    'Machines',
    'User',
    'Orders',
    'Drones',
    'Query',
    'FourImages',
    'KVKs',
    'Drones',
    'Maintainer',
    'Chemicals',
  ],
  endpoints: builder => ({
    signUp: builder.mutation({
      query: initialPost => ({
        url: '/signup/',
        method: 'POST',
        body: initialPost,
      }),
      providesTags: ['User'],
    }),
    operatorSignUp: builder.mutation({
      query: initialPost => ({
        url: '/otp/create/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Maintainer'],
    }),
    addOperator: builder.mutation({
      query: initialPost => ({
        url: '/api/drone/maintainer/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Maintainer'],
    }),

    getMaintainersByAdminId: builder.query({
      query: id => `/api/drone/maintainer_admin/${id}`,
      providesTags: ['Maintainer'],
    }),
    getProfile: builder.query({
      query: userId => `/user/${userId}/`,
      // transformResponse: res => res.sort((a, b) => b.id - a.id),
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: user => ({
        url: `/user/${user.id}/`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: initialPost => ({
        url: '/login/',
        method: 'POST',
        body: initialPost,
      }),
      providesTags: ['User'],
    }),
    newAccessToken: builder.mutation({
      query: initialPost => ({
        url: '/jwt/refresh/',
        method: 'POST',
        body: initialPost,
      }),
    }),
    sendOTP: builder.mutation({
      query: initialPost => ({
        url: '/otp/create/',
        method: 'POST',
        body: initialPost,
      }),
    }),
    validateOTP: builder.mutation({
      query: initialPost => ({
        url: '/otp/validate/',
        method: 'POST',
        body: initialPost,
      }),
    }),

    sendOTP: builder.mutation({
      query: initialPost => ({
        url: '/otp/create/',
        method: 'POST',
        body: initialPost,
      }),
    }),
    validateOTP: builder.mutation({
      query: initialPost => ({
        url: '/otp/validate/',
        method: 'POST',
        body: initialPost,
      }),
    }),

    // ******************Rent machine queries******************

    getFourImagesByOrderId: builder.query({
      query: orderId => `/api/machine/orderid/${orderId}`,
      invalidatesTags: ['Orders'],
    }),

    postRentMachines: builder.mutation({
      query: initialPost => ({
        url: '/api/machine/rentmachine/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Machines'],
    }),
    postOrder: builder.mutation({
      query: initialPost => ({
        url: '/api/machine/rentinfo/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Orders'],
    }),

    postBookedStatus: builder.mutation({
      query: initialPatch => ({
        url: `/api/machine/rentdata/${machineId}/`,
        method: 'PATCH',
        body: initialPatch,
      }),
    }),

    getAllRentMachines: builder.query({
      query: ({searchvalue, sortoption, filteroption, filtervalue}) =>
        `/api/machine/rentmachine/?search=${searchvalue}&ordering=${sortoption}&${filteroption}=${filtervalue}`,
      providesTags: ['Machines'],
    }),

    getAllOrders: builder.query({
      query: () => '/api/machine/rentinfo/',
      providesTags: ['Orders'],
    }),

    postImages: builder.mutation({
      query: initialPost => ({
        url: '/api/machine/imgs/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['FourImages'],
    }),
    getAllKvks: builder.query({
      query: () => '/api/machine/kvks/',
      providesTags: ['KVKs'],
    }),
    getKVKById: builder.query({
      query: KVK_ID => `/api/machine/kvk/${KVK_ID}`,
      providesTags: ['KVKs'],
    }),
    postQuery: builder.mutation({
      query: initialPost => ({
        url: '/api/machine/query/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Query'],
    }),
    getRentMachine: builder.query({
      query: machineId => `/api/machine/rentdata/${machineId}`,
      invalidatesTags: ['Machines'],
      providesTags: ['Machines'],
    }),
    getQueryByUserId: builder.query({
      query: userId => `/api/machine/query_userid/${userId}`,
      invalidatesTags: ['Query'],
      providesTags: ['Query'],
    }),

    updateRentMachine: builder.mutation({
      query: machine => ({
        url: `/api/machine/rentdata/${machine.id}/`,
        method: 'PATCH',
        // Include the entire post object as the body of the request
        body: machine,
      }),
      invalidatesTags: ['Machines'],
    }),
    deleteOrder: builder.mutation({
      query: ({order_id}) => ({
        url: `/api/machine/rentinfo/${order_id}`,
        method: 'DELETE',
        // Include the entire post object as the body of the request
        body: order_id,
      }),
      invalidatesTags: ['Orders'],
    }),
    deleteRentMachine: builder.mutation({
      query: ({id}) => ({
        url: `/api/machine/rentdata/${id}/`,
        method: 'DELETE',
        // Include the entire post object as the body of the request
        body: id,
      }),
      invalidatesTags: ['Machines'],
    }),
    deleteQuery: builder.mutation({
      query: ({query_id}) => ({
        url: `/api/machine/query/${query_id}`,
        method: 'DELETE',
        body: query_id,
      }),
      invalidatesTags: ['Query'],
    }),

    // ************** Rent Drone Queries ****************

    postRentDrones: builder.mutation({
      query: initialPost => ({
        url: '/api/drone/rentdrone/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data ',
        },
        body: initialPost,
      }),
      invalidatesTags: ['Drones'],
    }),
    postDroneOrder: builder.mutation({
      query: initialPost => ({
        url: '/api/drone/rentinfo/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Orders'],
    }),

    postDroneBookedStatus: builder.mutation({
      query: initialPatch => ({
        url: `/api/drone/rentdata/${machineId}/`,
        method: 'PATCH',
        body: initialPatch,
      }),
    }),

    getAllDrones: builder.query({
      query: ({searchvalue, sortoption, filteroption, filtervalue}) =>
        `/api/drone/rentdrone/?search=${searchvalue}&ordering=${sortoption}&${filteroption}=${filtervalue}`,
      providesTags: ['Machines'],
    }),

    getAllDroneOrders: builder.query({
      query: () => '/api/drone/rentinfo/',
      providesTags: ['Orders'],
    }),

    postDroneImages: builder.mutation({
      query: initialPost => ({
        url: '/api/drone/imgs/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['FourImages'],
    }),
    postDroneQuery: builder.mutation({
      query: initialPost => ({
        url: '/api/drone/query/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Query'],
    }),
    getRentDrone: builder.query({
      query: droneId => `/api/drone/rentdata/${droneId}`,
      invalidatesTags: ['Drones'],
      providesTags: ['Drones'],
    }),
    deleteDroneQuery: builder.mutation({
      query: ({query_id}) => ({
        url: `/api/drone/query/${query_id}`,
        method: 'DELETE',
        body: query_id,
      }),
      invalidatesTags: ['Query'],
    }),
    getDroneQueryByUserId: builder.query({
      query: userId => `/api/drone/query_userid/${userId}`,
      invalidatesTags: ['Query'],
      providesTags: ['Query'],
    }),

    getDroneOrderByUserId: builder.query({
      query: userId => `/api/drone/order_userid/${userId}`,
      invalidatesTags: ['Orders'],
      providesTags: ['Orders'],
    }),
    getDroneOrderById: builder.query({
      query: Id => `/api/drone/rentinfo/${Id}`,
      invalidatesTags: ['Orders'],
      providesTags: ['Orders'],
    }),

    getDroneByAdminId: builder.query({
      query: Admin_id => `/api/drone/drone_admin/${Admin_id}`,
      invalidatesTags: ['Drones'],
      providesTags: ['Drones'],
    }),
    getDroneById: builder.query({
      query: id => `/api/drone/drone/${id}`,
      invalidatesTags: ['Drones'],
      providesTags: ['Drones'],
    }),
    getDroneRentingByAdminId: builder.query({
      query: Admin_id => `/api/drone/drone_rentings/${Admin_id}`,
      invalidatesTags: ['Drones'],
      providesTags: ['Drones'],
    }),
    getDroneOrderByAdminId: builder.query({
      query: Admin_id => `/api/drone/order_drone/${Admin_id}`,
      invalidatesTags: ['Drones'],
      providesTags: ['Drones'],
    }),
    getChemicalsbyName: builder.query({
      query: Name => `/api/drone/chemicals/${Name}`,
      invalidatesTags: ['Chemicals'],
      providesTags: ['Chemicals'],
    }),
    getMaintainer: builder.query({
      query: Id => `/api/drone/maintainer/${Id}`,
      invalidatesTags: ['Maintainer'],
      providesTags: ['Maintainer'],
    }),
    getMaintainerbyAdminId: builder.query({
      query: Id => `/api/drone/maintainer_admin/${Id}`,
      invalidatesTags: ['Maintainer'],
      providesTags: ['Maintainer'],
    }),
    updateRentDrone: builder.mutation({
      query: drone => ({
        url: `/api/drone/rentdata/${drone.id}/`,
        method: 'PATCH',
        // Include the entire post object as the body of the request
        body: drone,
      }),
      invalidatesTags: ['Drones'],
    }),
    updateDroneOrder: builder.mutation({
      query: initialPatch => ({
        url: `/api/drone/rentinfo/${initialPatch.id}`, // Assuming droneId is part of initialPatch
        method: 'PATCH',
        body: initialPatch,
      }),
      invalidatesTags: ['Orders'],
    }),
    updateDroneMaintainer: builder.mutation({
      query: initialPatch => ({
        url: `/api/drone/maintainer/${initialPatch.id}`, // Assuming droneId is part of initialPatch
        method: 'PATCH',
        body: initialPatch,
      }),
      invalidatesTags: ['Maintainer'],
    }),
    deleteDroneOrder: builder.mutation({
      query: ({order_id}) => ({
        url: `/api/drone/rentinfo/${order_id}`,
        method: 'DELETE',
        // Include the entire post object as the body of the request
        body: order_id,
      }),
      invalidatesTags: ['Orders'],
    }),
    deleteRentDrone: builder.mutation({
      query: ({id}) => ({
        url: `/api/drone/rentdata/${id}/`,
        method: 'DELETE',
        // Include the entire post object as the body of the request
        body: id,
      }),
      invalidatesTags: ['Drones'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetAllRentMachinesQuery,
  usePostRentMachinesMutation,
  useGetRentMachineQuery,
  useGetProfileQuery,
  useGetAllOrdersQuery,
  useGetAllDronesQuery,
  useGetDroneRentingByAdminIdQuery,
  usePostOrderMutation,
  useGetDroneOrderByIdQuery,
  useUpdateDroneOrderMutation,
  useGetDroneByIdQuery,
  usePostQueryMutation,
  useGetMaintainerbyAdminIdQuery,
  useUpdateProfileMutation,
  useUpdateRentMachineMutation,
  useDeleteQueryMutation,
  useDeleteOrderMutation,
  useGetQueryByUserIdQuery,
  useGetDroneQueryByUserIdQuery,
  useGetKVKByIdQuery,
  useLoginMutation,
  usePostDroneOrderMutation,
  useGetDroneOrderByAdminIdQuery,
  useNewAccessTokenMutation,
  useGetFourImagesByOrderIdQuery,
  useGetAllKvksQuery,
  useGetMaintainerQuery,
  usePostImagesMutation,
  useDeleteDroneOrderMutation,
  useDeleteRentMachineMutation,
  useGetAllDroneOrdersQuery,
  useGetRentDroneQuery,
  usePostRentDronesMutation,
  useGetChemicalsbyNameQuery,
  useUpdateRentDroneMutation,
  useValidateOTPMutation,
  useGetDroneByAdminIdQuery,
  useSendOTPMutation,
  useDeleteDroneQueryMutation,
  useGetDroneOrderByUserIdQuery,
  usePostDroneQueryMutation,
  useUpdateDroneMaintainerMutation,
  useAddOperatorMutation,
  useOperatorSignUpMutation,
  useGetMaintainersByAdminIdQuery,
} = apiSlice;
