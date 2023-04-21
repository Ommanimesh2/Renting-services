import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UserData {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currUser: '',
    loading: false
  },
  reducers: {
    setCurrUser: (state,action:PayloadAction<string>) =>{
      state.currUser=action.payload;
    }
  }
})
export const {setCurrUser} =usersSlice.actions;
export default usersSlice.reducer