import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {setCredentials, logOut} from '../../features/Auth/authSlice';

import {RootState} from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ommanimesh.pythonanywhere.com',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithRetryAuth= async (args: FetchArgs, api: any, extraOptions: {})=>{
//     let result =await baseQuery(args, api, extraOptions)
//     if (result?.error?.status===403){
//         console.log('refresh token sent')
//         const refreshResult= await baseQuery('/refresh',api, extraOptions)
//         console.log(refreshResult)
//         if(refreshResult?.data){
//             const user = api.getState().auth.user

//             api.dispatch(setCredentials({...refreshResult.data,user}))
//             result=await baseQuery(args,api,extraOptions)

//         }
//         else{
//              api.dispatch(logOut)
//         }
//     }
//     return result
// }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000',
  }),
  tagTypes: ['Machines', 'User', 'Query', 'Orders', 'Maintainer'],
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

    postRentMachines: builder.mutation({
      query: initialPost => ({
        url: '/api/machine/rentmachine/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Machines'],
    }),

    postBookedStatus: builder.mutation({
      query: initialPatch => ({
        url: `/api/machine/rentdata/${machineId}/`,
        method: 'PATCH',
        body: initialPatch,
      }),
      invalidatesTags: ['Machines'],
    }),

    markQueryResolved: builder.mutation({
      query: initialPatch => ({
        url: `/api/machine/query/${initialPatch.id}`,
        method: 'PATCH',
        body: initialPatch,
      }),
      invalidatesTags: ['Query'],
    }),

    getAllRentMachines: builder.query({
      query: machineId => `/api/machine/machine_kvk/${machineId}`,
      // transformResponse: res => res.sort((a, b) => b.id - a.id),
      providesTags: ['Machines'],
    }),

    getAllOrders: builder.query({
      query: kvkId => `/api/machine/order_kvk/${kvkId}`,
      providesTags: ['Orders'],
    }),
    getAllQuery: builder.query({
      query: kvkId => `/api/machine/query_kvk/${kvkId}`,
      providesTags: ['Query'],
    }),
    getRentMachine: builder.query({
      query: machineId => `/api/machine/rentdata/${machineId}`,
      invalidatesTags: ['Machines'],
    }),
    getFourImagesByOrderId: builder.query({
      query: orderId => `/api/machine/orderid/${orderId}`,
      invalidatesTags: ['Machines'],
    }),
    getOrderUser: builder.query({
      query: machineId => `/user/${machineId}/`,
    }),
    getAdminKvk: builder.query({
      query: adminid => `/api/machine/kvk_admin/${adminid}`,
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
    OrderReceived: builder.mutation({
      query: initialPatch => ({
        url: `/api/machine/query/${initialPatch.id}`,
        method: 'PATCH',
        body: initialPatch,
      }),
      invalidatesTags: ['Orders'],
    }),
    deleteRentMachine: builder.mutation({
      query: ({id}) => ({
        url: `/api/machine/rentdata/${id}`,
        method: 'DELETE',
        // Include the entire post object as the body of the request
        body: id,
      }),
      invalidatesTags: ['Machines'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetAllRentMachinesQuery,
  usePostRentMachinesMutation,
  useGetRentMachineQuery,
  useUpdateRentMachineMutation,
  useDeleteRentMachineMutation,
  useLoginMutation,
  useGetAllOrdersQuery,
  useNewAccessTokenMutation,
  useGetOrderUserQuery,
  useOrderReceivedMutation,
  useGetAdminKvkQuery,
  useGetFourImagesByOrderIdQuery,
  useGetAllQueryQuery,
  useMarkQueryResolvedMutation,
  useAddOperatorMutation,
  useOperatorSignUpMutation,
  useSendOTPMutation,
  useValidateOTPMutation,
  useGetMaintainersByAdminIdQuery,
} = apiSlice;
