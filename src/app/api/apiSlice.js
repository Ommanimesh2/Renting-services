import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {setCredentials, logOut} from '../../features/Auth/authSlice';

import {RootState} from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost/8000',
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
  baseQuery: fetchBaseQuery({baseUrl: 'https://ommanimesh.pythonanywhere.com'}),
  tagTypes: ['Machines', 'User'],
  endpoints: builder => ({
    signUp: builder.mutation({
      query: initialPost => ({
        url: '/signup/',
        method: 'POST',
        body: initialPost,
      }),
      providesTags: ['User'],
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
    postRentMachines: builder.mutation({
      query: initialPost => ({
        url: '/api/rentmachine/',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Machines'],
    }),

    postBookedStatus: builder.mutation({
      query: initialPatch => ({
        url: `/api/rentdata/${machineId}/`,
        method: 'PATCH',
        body: initialPatch,
      }),
      invalidatesTags: ['Machines'],
    }),

    getAllRentMachines: builder.query({
      query: () => '/api/rentmachine/',
      // transformResponse: res => res.sort((a, b) => b.id - a.id),
      providesTags: ['Machines'],
    }),

    getAllOrders: builder.query({
      query: () => '/api/rentinfo/',
    }),
    getRentMachine: builder.query({
      query: machineId => `/api/rentdata/${machineId}`,
      invalidatesTags: ['Machines'],
    }),
    getOrderUser: builder.query({
      query: machineId => `/user/${machineId}/`,
    }),

    updateRentMachine: builder.mutation({
      query: machine => ({
        url: `/api/rentdata/${machine.id}/`,
        method: 'PATCH',
        // Include the entire post object as the body of the request
        body: machine,
      }),
      invalidatesTags: ['Machines'],
    }),
    deleteRentMachine: builder.mutation({
      query: ({id}) => ({
        url: `/api/rentdata/${id}`,
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
} = apiSlice;
