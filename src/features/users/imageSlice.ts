import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const imageSlice = createSlice({
  name: "image",
  initialState: {
    image: '',
    loading: false
  },
  reducers: {
    setURLimage: (state,action:PayloadAction<string>) =>{
      state.image=action.payload;
    }
  }
})
export const {setURLimage} =imageSlice.actions;
export default imageSlice.reducer