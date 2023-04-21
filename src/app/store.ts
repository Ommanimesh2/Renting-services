import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authReducer from  '../features/Auth/authSlice'
import userReducer from  '../features/users/userSlice'
import imageReducer from  '../features/users/imageSlice'

export const store = configureStore({
  reducer: {
     [apiSlice.reducerPath]: apiSlice.reducer,
     auth: authReducer,
     user: userReducer,
     image: imageReducer
  },
  middleware: getDefaultMiddleware=>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch