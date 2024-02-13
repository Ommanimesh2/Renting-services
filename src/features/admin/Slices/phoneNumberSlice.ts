import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const phoneNumberSlice = createSlice({
    name: "phone",
    initialState: {
        phone: '',
        loading: false
    },
    reducers: {
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        }
    }
})
export const { setPhoneNumber } = phoneNumberSlice.actions;
export default phoneNumberSlice.reducer

