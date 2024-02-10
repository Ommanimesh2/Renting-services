import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import userReducer from '../features/admin/Slices/userSlice'
import imageReducer from '../features/admin/Slices/imageSlice'
import phoneNumberReducer from '../features/admin/Slices/phoneNumberSlice'
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    image: imageReducer,
    phone: phoneNumberReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch