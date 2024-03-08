import { createSlice } from "@reduxjs/toolkit";
import { getMenuList } from "./actions";
 
const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: ''
}
 
export const menuSlice = createSlice({
  name: 'tableMenuList',
  initialState,
  extraReducers: builder => {
    builder.addCase(getMenuList.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getMenuList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    })
    .addCase(getMenuList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
    });
  }
});
 
export default menuSlice.reducer;